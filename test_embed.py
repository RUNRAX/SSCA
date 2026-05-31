import asyncio
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.core.config import get_settings

async def test_embed():
    settings = get_settings()
    print(f"Using model: {settings.embedding_model}")
    embeddings = GoogleGenerativeAIEmbeddings(
        model=settings.embedding_model,
        google_api_key=settings.google_api_key,
    )
    
    try:
        res = await embeddings.aembed_query("Hello world")
        print(f"Success! Dimension: {len(res)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_embed())
