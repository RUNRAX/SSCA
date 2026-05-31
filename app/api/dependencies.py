from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import firestore
from google.cloud.firestore_v1 import Client
from app.core.security import verify_firebase_id_token

bearer_scheme = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> dict:
    """Extract and verify the Firebase JWT. Returns the decoded payload."""
    token = credentials.credentials
    payload = verify_firebase_id_token(token)
    return {"user_id": payload["uid"], "token": token}

async def get_firestore_client() -> Client:
    """
    Get the Firestore client for the request.
    Tenant isolation is enforced in the service layer, not via rules.
    """
    return firestore.client()
