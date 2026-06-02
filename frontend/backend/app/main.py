from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# --- MONKEYPATCH START ---
# Force google-auth to use pure-python rsa to bypass Vercel AWS Lambda cryptography bugs
try:
    import google.auth.crypt
    import google.auth.crypt._python_rsa as _python_rsa
    google.auth.crypt.RSASigner = _python_rsa.RSASigner
    google.auth.crypt.RSAVerifier = _python_rsa.RSAVerifier
except Exception:
    pass
# --- MONKEYPATCH END ---

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
            import tempfile
            import os
            
            # Remove ALL whitespace from the base64 string
            b64 = re.sub(r'\s+', '', settings.firebase_credentials_base64)
            if not b64:
                firebase_init_error = "FIREBASE_CREDENTIALS_BASE64 is empty."
                return
                
            # Fix missing padding if any
            b64 += "=" * ((4 - len(b64) % 4) % 4)
            creds_json = base64.b64decode(b64).decode('utf-8')
            
            # Write the exact JSON string to a temporary file
            # This bypasses any string encoding bugs in the Vercel cryptography library
            # when passing dictionaries directly.
            with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as f:
                f.write(creds_json)
                tmp_path = f.name
                
            cred = credentials.Certificate(tmp_path)
            firebase_admin.initialize_app(cred)
            
            # Clean up the temporary file
            try:
                os.unlink(tmp_path)
            except Exception:
                pass
                
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
