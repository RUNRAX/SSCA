from firebase_admin import auth
from fastapi import HTTPException, status

def verify_firebase_id_token(token: str) -> dict:
    """
    Verify a Firebase ID Token using the Admin SDK.
    Returns the decoded token payload (containing 'uid').
    Raises HTTPException on invalid/expired tokens.
    """
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}"
        )
