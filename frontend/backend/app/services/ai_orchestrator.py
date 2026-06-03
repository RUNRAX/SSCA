from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from app.services.vector_store import VectorStoreService
from app.core.config import get_settings
from typing import Dict, Any, AsyncGenerator
import json

SYSTEM_TEMPLATE = """You are a personalized AI assistant with access to the user's memory vault.
Use the following retrieved memories to provide contextually relevant, personalized responses.
If the memories are not relevant to the query, acknowledge that and respond based on your general knowledge.

## Retrieved Memories
{context}

## Instructions
- Reference specific memories when relevant
- Maintain continuity with past interactions
- Be concise but thorough
- If no memories are relevant, say so naturally"""

class CognitiveOrchestrator:
    def __init__(self, vector_store: VectorStoreService):
        self.vector_store = vector_store
        settings = get_settings()

        self.llm = ChatGroq(
            model=settings.groq_model,
            api_key=settings.groq_api_key,
            temperature=0.7,
            max_tokens=2048,
        )

        self.prompt = ChatPromptTemplate.from_messages([
            ("system", SYSTEM_TEMPLATE),
            ("human", "{query}"),
        ])

        # LCEL chain
        self.chain = (
            RunnablePassthrough.assign(
                context=RunnableLambda(self._retrieve_context)
            )
            | self.prompt
            | self.llm
            | StrOutputParser()
        )

    async def _retrieve_context(self, inputs: Dict[str, Any]) -> str:
        """Retrieve relevant memories and format as context block."""
        memories = await self.vector_store.search_memories(
            user_id=inputs["user_id"],
            query=inputs["query"],
            match_count=inputs.get("top_k", 5),
            match_threshold=inputs.get("threshold", 0.3),
        )
        if not memories:
            return "No relevant memories found."

        context_parts = []
        for i, mem in enumerate(memories, 1):
            similarity = f"{mem.get('similarity', 0):.2%}"
            context_parts.append(
                f"[Memory {i}] (relevance: {similarity})\n{mem['content']}"
            )
        return "\n\n".join(context_parts)

    async def _store_interaction(self, user_id: str, query: str, response_text: str):
        """Store the conversation turn as a new memory."""
        interaction_content = f"User asked: {query}\nAssistant responded: {response_text[:1000]}"
        await self.vector_store.store_memory(
            user_id=user_id,
            content=interaction_content,
            metadata={"type": "conversation", "query": query},
        )

    async def generate_response(
        self,
        query: str,
        user_id: str,
        top_k: int = 5,
        threshold: float = 0.3,
        store_interaction: bool = True,
    ) -> Dict[str, Any]:
        """Full RAG pipeline (single response): embed query → retrieve memories → generate response."""
        response_text = await self.chain.ainvoke({
            "query": query,
            "user_id": user_id,
            "top_k": top_k,
            "threshold": threshold,
        })

        if store_interaction:
            await self._store_interaction(user_id, query, response_text)

        return {
            "response": response_text,
            "query": query,
        }

    async def generate_response_stream(
        self,
        query: str,
        user_id: str,
        top_k: int = 5,
        threshold: float = 0.3,
        store_interaction: bool = True,
    ) -> AsyncGenerator[str, None]:
        """Full RAG pipeline (SSE stream): yields chunks as they are generated."""
        full_response = ""
        
        async for chunk in self.chain.astream({
            "query": query,
            "user_id": user_id,
            "top_k": top_k,
            "threshold": threshold,
        }):
            full_response += chunk
            yield f"data: {json.dumps({'chunk': chunk})}\n\n"
            
        yield "data: [DONE]\n\n"

        if store_interaction:
            await self._store_interaction(user_id, query, full_response)
