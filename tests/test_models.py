import pytest
from pydantic import ValidationError
from app.models.auth import SignUpRequest
from app.models.chat import ChatRequest
from app.models.memory import MemoryCreateRequest

def test_signup_valid_email():
    req = SignUpRequest(email="test@example.com", password="password123")
    assert req.email == "test@example.com"

def test_signup_invalid_email():
    with pytest.raises(ValidationError):
        SignUpRequest(email="not-an-email", password="password123")

def test_signup_short_password():
    with pytest.raises(ValidationError):
        SignUpRequest(email="test@example.com", password="short")

def test_chat_empty_query():
    with pytest.raises(ValidationError):
        ChatRequest(query="")

def test_chat_top_k_bounds():
    with pytest.raises(ValidationError):
        ChatRequest(query="test", top_k=0)
    
    with pytest.raises(ValidationError):
        ChatRequest(query="test", top_k=21)

def test_memory_content_max_length():
    with pytest.raises(ValidationError):
        MemoryCreateRequest(content="a" * 10001)

def test_memory_default_metadata():
    req = MemoryCreateRequest(content="test memory")
    assert req.metadata == {}
