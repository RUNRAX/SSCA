from pydantic import BaseModel, Field
from typing import Optional

class ChatRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=4096)
    top_k: int = Field(default=5, ge=1, le=20)
    threshold: float = Field(default=0.3, ge=0.0, le=1.0)
    store_interaction: bool = Field(default=True)
    stream: bool = Field(default=True, description="Whether to stream the response via SSE")

class ChatResponse(BaseModel):
    response: str
    query: str
    user_id: str
