import asyncio
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.core.config import get_settings

async def test_embed():
    settings = get_settings()
    models_to_test = [
        "models/text-embedding-004",
        "text-embedding-004",
        "models/embedding-001",
        "embedding-001"
    ]
    
    for model_name in models_to_test:
        print(f"\nTesting model: {model_name}")
        embeddings = GoogleGenerativeAIEmbeddings(
            model=model_name,
            google_api_key=settings.google_api_key,
        )
        try:
            res = await embeddings.aembed_query("Hello world")
            print(f"  -> Success! Dimension: {len(res)}")
        except Exception as e:
            print(f"  -> Error: {type(e).__name__} - {str(e)[:150]}")

if __name__ == "__main__":
    asyncio.run(test_embed())
