import pytest
import asyncio
from unittest.mock import MagicMock
from app.services.vector_store import VectorStoreService

"""
Cross-Tenant Isolation Test (Application Layer)

Since we bypass Firestore Security Rules using the Firebase Admin SDK,
we must ensure our VectorStoreService is strictly injecting the `user_id` 
into every query.
"""

@pytest.mark.asyncio
async def test_search_memories_enforces_user_id():
    mock_db = MagicMock()
    mock_collection = MagicMock()
    mock_query = MagicMock()
    
    mock_db.collection.return_value = mock_collection
    mock_collection.where.return_value = mock_query
    
    # We don't actually need to return a stream, just verify the call chain
    mock_query.find_nearest.return_value.stream.return_value = []
    
    vs = VectorStoreService(firestore_client=mock_db)
    
    # Mock the embedding generation so it doesn't hit Google API
    vs.embed_text = MagicMock(return_value=asyncio.Future())
    vs.embed_text.return_value.set_result([0.1] * 768)
    
    await vs.search_memories(user_id="user_A", query="test")
    
    # Assert that `.where("user_id", "==", "user_A")` was called on the collection
    mock_collection.where.assert_called_once_with("user_id", "==", "user_A")

@pytest.mark.asyncio
async def test_list_memories_enforces_user_id():
    mock_db = MagicMock()
    mock_collection = MagicMock()
    
    mock_db.collection.return_value = mock_collection
    mock_collection.where.return_value.order_by.return_value.stream.return_value = []
    
    vs = VectorStoreService(firestore_client=mock_db)
    
    await vs.list_memories(user_id="user_B")
    
    # Assert that `.where("user_id", "==", "user_B")` was called
    mock_collection.where.assert_called_once_with("user_id", "==", "user_B")
