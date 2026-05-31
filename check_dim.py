import asyncio
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.core.config import get_settings

async def check_dim():
    settings = get_settings()
    embeddings = GoogleGenerativeAIEmbeddings(
        model=settings.embedding_model,
        google_api_key=settings.google_api_key,
    )
    res = await embeddings.aembed_query("Hello")
    print(f"Dimension is: {len(res)}")

if __name__ == "__main__":
    asyncio.run(check_dim())
