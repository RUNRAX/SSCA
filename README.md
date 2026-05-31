# Self-Sovereign Cognitive API (SSCA) - Firebase Edition

A production-ready Python microservice enforcing absolute multi-tenant data isolation, powered by **Firebase Firestore Vector Search** and **Google Gemini 2.5 Flash**.

## Features

- **Multi-Tenant Data Isolation**: Tenant boundaries are enforced natively in Python before querying Firestore.
- **RAG Architecture**: Firestore native Vector Search to semantically match past interactions.
- **LangChain & Gemini**: Uses LangChain Expression Language (LCEL) and Google Gemini 2.5 Flash for generation.
- **SSE Streaming**: Asynchronous streaming of LLM tokens back to the client.

## Setup Instructions

### 1. Firebase Project Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database**.
3. Enable **Authentication** (Email/Password provider).
4. Go to **Project Settings -> Service Accounts** and click **Generate new private key**. This downloads a JSON file.

### 2. Environment Variables
To securely pass your Service Account to the backend, convert the JSON file to a Base64 string:
```bash
# Linux / macOS
base64 -w 0 path/to/service-account.json

# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\service-account.json"))
```

Copy `.env.example` to `.env` and fill in the values:
- `FIREBASE_CREDENTIALS_BASE64`: The base64 string you just generated.
- `FIREBASE_API_KEY`: Your Firebase Web API Key (found in Project Settings -> General).
- `GOOGLE_API_KEY`: Your Gemini API key.

### 3. Firestore Vector Index
You must create a composite vector index for the `find_nearest` search to work with the `user_id` pre-filter. Using the Google Cloud CLI:

```bash
gcloud firestore indexes composite create \
    --collection-group=user_memories \
    --query-scope=COLLECTION \
    --field-config="field-path=user_id,order=ascending" \
    --field-config="vector-config={dimension:768,flat},field-path=embedding"
```

### 4. Install Dependencies & Run
Make sure you are using Python 3.9+.

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Visit `http://localhost:8000/docs` to view the interactive Swagger UI and test the API endpoints.

## Testing

Run unit tests via pytest:

```bash
pytest tests/ -v
```
