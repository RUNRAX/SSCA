from google.cloud.firestore_v1 import Client
from google.cloud.firestore_v1.vector import Vector
from google.cloud.firestore_v1.base_vector_query import DistanceMeasure
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.core.config import get_settings
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
import asyncio

class VectorStoreService:
    def __init__(self, firestore_client: Client):
        self.db = firestore_client
        self.collection_name = "user_memories"
        settings = get_settings()
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model=settings.embedding_model,
            google_api_key=settings.google_api_key,
        )

    async def embed_text(self, text: str) -> List[float]:
        """Generate embedding vector for a text string. Runs in a threadpool to avoid blocking."""
        vector = await asyncio.to_thread(self.embeddings.embed_query, text)
        # Truncate to 768 dimensions to fit Firestore's limit (2048) and our index
        return vector[:768]

    async def store_memory(
        self,
        user_id: str,
        content: str,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Embed and store a memory. 
        In Firestore, we explicitly set the user_id to enforce isolation in queries."""
        vector = await self.embed_text(content)
        data = {
            "user_id": user_id,
            "content": content,
            "metadata": metadata or {},
            "embedding": Vector(vector),
            "created_at": datetime.now(timezone.utc)
        }
        
        # Add to Firestore collection
        _, doc_ref = await asyncio.to_thread(
            lambda: self.db.collection(self.collection_name).add(data)
        )
        
        return {
            "id": doc_ref.id,
            "content": content,
            "metadata": data["metadata"],
            "created_at": data["created_at"]
        }

    async def search_memories(
        self,
        user_id: str,
        query: str,
        match_count: int = 5,
        match_threshold: float = 0.3,
    ) -> List[Dict[str, Any]]:
        """Semantic search using Firestore find_nearest.
        We append .where("user_id", "==", user_id) to strictly enforce tenant isolation."""
        query_vector = await self.embed_text(query)
        
        def _search():
            # Requires a composite index on user_id (ASC) and embedding (VECTOR)
            docs = (
                self.db.collection(self.collection_name)
                .where("user_id", "==", user_id)
                .find_nearest(
                    vector_field="embedding",
                    query_vector=Vector(query_vector),
                    distance_measure=DistanceMeasure.COSINE,
                    limit=match_count,
                    # Note: distance_result_field enables retrieving the distance
                    distance_result_field="vector_distance"
                )
                .stream()
            )
            
            results = []
            for doc in docs:
                data = doc.to_dict()
                # Cosine distance: 0 is identical. Similarity = 1 - distance.
                distance = data.get("vector_distance", 1.0)
                similarity = 1.0 - distance
                
                if similarity > match_threshold:
                    results.append({
                        "id": doc.id,
                        "content": data["content"],
                        "metadata": data.get("metadata", {}),
                        "similarity": similarity
                    })
                    
            # Sort by highest similarity
            results.sort(key=lambda x: x["similarity"], reverse=True)
            return results

        return await asyncio.to_thread(_search)

    async def list_memories(self, user_id: str) -> List[Dict[str, Any]]:
        """List all memories for the current user."""
        def _list():
            docs = (
                self.db.collection(self.collection_name)
                .where("user_id", "==", user_id)
                .stream()
            )
            results = [{
                "id": doc.id, 
                "content": doc.to_dict()["content"],
                "metadata": doc.to_dict().get("metadata", {}),
                "created_at": doc.to_dict().get("created_at")
            } for doc in docs]
            # Sort by created_at descending in python to avoid firestore composite index error
            results.sort(key=lambda x: x["created_at"], reverse=True)
            return results
            
        return await asyncio.to_thread(_list)

    async def delete_memory(self, user_id: str, memory_id: str) -> bool:
        """Delete a specific memory. Enforces isolation by verifying ownership."""
        def _delete():
            doc_ref = self.db.collection(self.collection_name).document(memory_id)
            doc = doc_ref.get()
            if doc.exists and doc.to_dict().get("user_id") == user_id:
                doc_ref.delete()
                return True
            return False
            
        return await asyncio.to_thread(_delete)
