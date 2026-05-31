from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List
from datetime import datetime

class MemoryCreateRequest(BaseModel):
    content: str = Field(..., min_length=1, max_length=10000)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)

class MemoryResponse(BaseModel):
    id: str
    content: str
    metadata: Dict[str, Any] = {}
    created_at: Optional[datetime] = None

class MemoryListResponse(BaseModel):
    memories: List[MemoryResponse]
    count: int
