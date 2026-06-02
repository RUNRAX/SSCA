from fastapi import APIRouter, HTTPException, status, Depends
from firebase_admin import auth as firebase_auth
import httpx
from app.core.config import get_settings
from app.models.auth import SignUpRequest, LoginRequest, AuthResponse, UserResponse
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/signup", response_model=AuthResponse, status_code=201)
async def signup(request: SignUpRequest):
    """Register a new user via Firebase Admin."""
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
