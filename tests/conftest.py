import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def mock_jwt_payload():
    return {
        "sub": "550e8400-e29b-41d4-a716-446655440000",
        "email": "test@example.com",
        "role": "authenticated",
        "aud": "authenticated",
        "exp": 9999999999,
    }

@pytest.fixture
def auth_headers():
    return {"Authorization": "Bearer test-valid-jwt-token"}
