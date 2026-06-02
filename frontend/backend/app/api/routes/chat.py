from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from google.cloud.firestore_v1 import Client
from app.api.dependencies import get_current_user, get_firestore_client
from app.services.vector_store import VectorStoreService
from app.services.ai_orchestrator import CognitiveOrchestrator
from app.models.chat import ChatRequest, ChatResponse

router = APIRouter()

@router.post("")
async def chat(
    request: ChatRequest,
    user: dict = Depends(get_current_user),
    firestore: Client = Depends(get_firestore_client),
):
    """RAG-powered chat endpoint. Retrieves user memories, generates response."""
    vector_store = VectorStoreService(firestore)
    orchestrator = CognitiveOrchestrator(vector_store)

    if request.stream:
        # SSE Streaming response
        return StreamingResponse(
            orchestrator.generate_response_stream(
                query=request.query,
                user_id=user["user_id"],
                top_k=request.top_k,
                threshold=request.threshold,
                store_interaction=request.store_interaction,
            ),
            media_type="text/event-stream"
        )
    else:
        # Single JSON response
        result = await orchestrator.generate_response(
            query=request.query,
            user_id=user["user_id"],
            top_k=request.top_k,
            threshold=request.threshold,
            store_interaction=request.store_interaction,
        )

        return ChatResponse(
            response=result["response"],
            query=result["query"],
            user_id=user["user_id"],
        )
