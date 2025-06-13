import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load variabel dari file .env
load_dotenv()

# Ambil konfigurasi dari .env
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "flashifydb")

# Buat koneksi ke MongoDB
client = MongoClient(MONGODB_URL)
db = client[DB_NAME]  # db digunakan untuk akses koleksi dinamis: db["nama_koleksi"]

# Koleksi default (opsional, untuk endpoint umum)
flashcard_collection = db["flashcards"]
