# flashify_backend/config.py
import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file

# Google Cloud Configuration
GCP_PROJECT_ID: str = os.getenv("GCP_PROJECT_ID")
GCP_REGION: str = os.getenv("GCP_REGION")

# Database Configuration (MongoDB)
MONGO_URI: str = os.getenv("MONGO_URI")
MONGO_DB_NAME: str = os.getenv("MONGO_DB_NAME", "flashify_db") 

# PDF Processing Configuration
MAX_PDF_SIZE_MB: int = int(os.getenv("MAX_PDF_SIZE_MB", 10))

# Basic validation for essential environment variables
if not all([GCP_PROJECT_ID, GCP_REGION, MONGO_URI, MONGO_DB_NAME]):
    raise ValueError("Missing one or more required environment variables (GCP_PROJECT_ID, GCP_REGION, MONGO_URI, MONGO_DB_NAME). Please check your .env file.")