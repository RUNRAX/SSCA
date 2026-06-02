from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from functools import lru_cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Firebase
    firebase_credentials_base64: str = ""
    firebase_api_key: str = ""  # Needed for Identity Toolkit REST API (Email/Password Login)

    # Google Gemini
    google_api_key: str = ""
    gemini_model: str = "gemini-1.5-flash"
    embedding_model: str = "models/embedding-001"

    # App
    cors_origins: List[str] = ["http://localhost:3000", "https://ssca-frontend.onrender.com"]
    api_v1_prefix: str = "/api/v1"

@lru_cache()
def get_settings() -> Settings:
    return Settings()
