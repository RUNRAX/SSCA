import sys
import os

# Add the 'backend' directory to the Python path so 'import app' resolves correctly
backend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend')
sys.path.append(backend_path)

from app.main import app
