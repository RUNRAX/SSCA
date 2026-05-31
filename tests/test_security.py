import pytest
from app.core.security import verify_firebase_id_token
from fastapi import HTTPException
from unittest.mock import patch

def test_verify_valid_firebase_token():
    # Mock firebase_admin.auth.verify_id_token
    with patch('app.core.security.auth.verify_id_token') as mock_verify:
        mock_verify.return_value = {"uid": "firebase_user_123", "email": "test@test.com"}
        
        decoded = verify_firebase_id_token("valid_token")
        assert decoded["uid"] == "firebase_user_123"

def test_verify_invalid_firebase_token():
    with patch('app.core.security.auth.verify_id_token') as mock_verify:
        mock_verify.side_effect = Exception("Invalid token")
        
        with pytest.raises(HTTPException) as exc:
            verify_firebase_id_token("invalid_token")
            
        assert exc.value.status_code == 401
        assert "Invalid or expired token" in str(exc.value.detail)
