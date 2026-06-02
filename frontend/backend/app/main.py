from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import firebase_admin
from firebase_admin import credentials
import base64
import json
from app.core.config import get_settings
from app.api.routes import auth, chat, memory

firebase_init_error = None

def initialize_firebase():
    global firebase_init_error
    settings = get_settings()
    try:
        # Check if already initialized
        firebase_admin.get_app()
    except ValueError:
        # Decode base64 credentials
        try:
            import re
            # Remove ALL whitespace from the base64 string (newlines, spaces, etc.)
            b64 = re.sub(r'\s+', '', settings.firebase_credentials_base64)
            if not b64:
                firebase_init_error = "FIREBASE_CREDENTIALS_BASE64 is empty."
                return
            # Fix missing padding if any
            b64 += "=" * ((4 - len(b64) % 4) % 4)
            creds_json = base64.b64decode(b64).decode('utf-8')
            cred_dict = json.loads(creds_json)
            
            # Extremely common issue: private_key gets double-escaped
            if "private_key" in cred_dict:
                cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")
                
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        except Exception as e:
            firebase_init_error = f"Failed to initialize Firebase: {str(e)}"

def create_app() -> FastAPI:
    settings = get_settings()
    
    # Initialize Firebase Admin
    initialize_firebase()
    
    app = FastAPI(
        title="Self-Sovereign Cognitive API",
        version="1.0.0",
        description="Multi-tenant AI memory vault with Firestore Vector Search",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routes
    app.include_router(auth.router, prefix=f"{settings.api_v1_prefix}/auth", tags=["Auth"])
    app.include_router(chat.router, prefix=f"{settings.api_v1_prefix}/chat", tags=["Chat"])
    app.include_router(memory.router, prefix=f"{settings.api_v1_prefix}/memories", tags=["Memory"])

    # Global exception handler
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error", "type": type(exc).__name__},
        )

    return app

app = create_app()
