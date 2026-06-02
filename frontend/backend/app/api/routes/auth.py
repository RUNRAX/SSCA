from fastapi import APIRouter, HTTPException, status, Depends
from firebase_admin import auth as firebase_auth
import httpx
from app.core.config import get_settings
from app.models.auth import SignUpRequest, LoginRequest, AuthResponse, UserResponse
from app.api.dependencies import get_current_user

router = APIRouter()

@router.get("/debug-firebase")
async def debug_firebase():
    from app.main import firebase_init_error
    import base64
    import json
    settings = get_settings()
    b64 = settings.firebase_credentials_base64
    
    debug_info = {
        "error": firebase_init_error,
        "b64_length": len(b64) if b64 else 0,
        "has_newlines": '\n' in b64 if b64 else False,
    }
    
    if b64:
        try:
            import re
            b64_clean = re.sub(r'\s+', '', b64)
            b64_clean += "=" * ((4 - len(b64_clean) % 4) % 4)
            creds_json = base64.b64decode(b64_clean).decode('utf-8')
            cred_dict = json.loads(creds_json)
            pk = cred_dict.get("private_key", "")
            debug_info["pk_length"] = len(pk)
            debug_info["pk_start"] = pk[:35]
            debug_info["pk_end"] = pk[-35:]
            debug_info["pk_newline_count"] = pk.count('\n')
            debug_info["pk_literal_slash_n_count"] = pk.count('\\n')
        except Exception as e:
            debug_info["parse_error"] = str(e)
            
    return debug_info

@router.post("/signup", response_model=AuthResponse, status_code=201)
async def signup(request: SignUpRequest):
    """Register a new user via Firebase Admin."""
    from app.main import firebase_init_error
    if firebase_init_error:
        raise HTTPException(status_code=400, detail=f"Backend Configuration Error: {firebase_init_error}")

    settings = get_settings()
    
    try:
        user_record = firebase_auth.create_user(
            email=request.email,
            password=request.password
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")
        
    # To get an ID token immediately upon signup (as the client expects),
    # we simulate a login via the REST API.
    return await login(LoginRequest(email=request.email, password=request.password))

@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest):
    """Authenticate via Firebase REST API (Identity Toolkit) to get an ID token."""
    settings = get_settings()
    api_key = settings.firebase_api_key
    
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={api_key}"
    payload = {
        "email": request.email,
        "password": request.password,
        "returnSecureToken": True
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload)
        
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    data = response.json()
    
    return AuthResponse(
        access_token=data["idToken"],
        refresh_token=data["refreshToken"],
        user_id=data["localId"],
    )

@router.get("/me", response_model=UserResponse)
async def get_me(user: dict = Depends(get_current_user)):
    """Return current authenticated user info."""
    return UserResponse(user_id=user["user_id"])
