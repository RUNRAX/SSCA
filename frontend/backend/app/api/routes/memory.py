from fastapi import APIRouter, Depends, HTTPException
from google.cloud.firestore_v1 import Client
from app.api.dependencies import get_current_user, get_firestore_client
from app.services.vector_store import VectorStoreService
from app.models.memory import MemoryCreateRequest, MemoryResponse, MemoryListResponse

router = APIRouter()

@router.post("/", response_model=MemoryResponse, status_code=201)
async def create_memory(
    request: MemoryCreateRequest,
    user: dict = Depends(get_current_user),
    firestore: Client = Depends(get_firestore_client),
):
    """Store a new memory with vector embedding."""
    vs = VectorStoreService(firestore)
    result = await vs.store_memory(
        user_id=user["user_id"],
        content=request.content,
        metadata=request.metadata,
    )
    return MemoryResponse(**result)

@router.get("/", response_model=MemoryListResponse)
async def list_memories(
    user: dict = Depends(get_current_user),
    firestore: Client = Depends(get_firestore_client),
):
    """List all memories for the authenticated user."""
    vs = VectorStoreService(firestore)
    memories = await vs.list_memories(user_id=user["user_id"])
    return MemoryListResponse(memories=memories, count=len(memories))

@router.delete("/{memory_id}")
async def delete_memory(
    memory_id: str,
    user: dict = Depends(get_current_user),
    firestore: Client = Depends(get_firestore_client),
):
    """Delete a specific memory."""
    vs = VectorStoreService(firestore)
    deleted = await vs.delete_memory(user_id=user["user_id"], memory_id=memory_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Memory not found")
    return {"detail": "Memory deleted", "id": memory_id}
