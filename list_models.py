import os
import requests
from app.core.config import get_settings

def list_models():
    settings = get_settings()
    api_key = settings.google_api_key
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            print("Available models:")
            for model in data.get('models', []):
                print(f" - {model.get('name')}: {model.get('supportedGenerationMethods', [])}")
        else:
            print(f"Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    list_models()
