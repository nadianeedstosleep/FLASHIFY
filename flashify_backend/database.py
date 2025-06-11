# Tambahkan ini di bagian paling atas file untuk forward references, jika belum
from __future__ import annotations 
# flashify_backend/database.py
from motor.motor_asyncio import AsyncIOMotorClient # Pastikan ini diimpor
from beanie import Document, init_beanie
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING # Tambahkan TYPE_CHECKING
from pydantic import Field
from .config import MONGO_URI, MONGO_DB_NAME
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure, PyMongoError # Impor error spesifik
import logging # Tambahkan logging
import asyncio

# Ini adalah type hint untuk variabel global 'client'
# Menggunakan TYPE_CHECKING untuk menghindari circular import issue di runtime
if TYPE_CHECKING:
    from motor.motor_asyncio import AsyncIOMotorClient 

# Inisialisasi logger untuk file ini
logger = logging.getLogger(__name__)

# --- Model MongoDB (Beanie Documents) ---
# ... (Flashcard dan UserFlashcardProgress models Anda tetap sama)
# ...

# --- Model MongoDB (Beanie Documents) ---

class Flashcard(Document):
    user_id: int
    pdf_id: Optional[str] = None
    question: str
    answer: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "flashcards" # Nama koleksi di MongoDB

class UserFlashcardProgress(Document):
    user_id: int
    flashcard_id: str # Akan menyimpan ID string dari Flashcard (MongoDB _id)
    
    last_reviewed_at: datetime = Field(default_factory=datetime.utcnow)
    next_review_at: datetime = Field(default_factory=datetime.utcnow)
    ease_factor: float = 2.5 # SM-2 initial ease factor
    repetitions: int = 0 # SM-2 repetitions
    
    difficulty_rating: Optional[str] = None # "easy", "medium", "hard"

    class Settings:
        name = "user_flashcard_progress" # Nama koleksi di MongoDB

# --- Setup Database Connection ---

client: Optional["AsyncIOMotorClient"] = None

RETRY_ATTEMPTS = 3
RETRY_DELAY_SECONDS = 5

async def connect_to_mongodb():
    global client
    for attempt in range(1, RETRY_ATTEMPTS + 1):
        logger.info(f"Attempting to connect to MongoDB (Attempt {attempt}/{RETRY_ATTEMPTS})...")
        try:
            # Gunakan timeout untuk koneksi
            client = AsyncIOMotorClient(
                MONGO_URI, 
                server_api=AsyncIOMotorClient.SERVER_API_V1, 
                serverSelectionTimeoutMS=5000, # Waktu timeout untuk memilih server (5 detik)
                connectTimeoutMS=20000,      # Waktu timeout untuk koneksi awal (20 detik)
                uuidRepresentation='standard' # Standard UUID representation
            )
            
            # Perintah ping untuk memverifikasi koneksi yang berhasil
            await client.admin.command('ping') 
            logger.info(f"SUCCESS: Successfully connected to MongoDB server. Database: {MONGO_DB_NAME}")
            
            # Inisialisasi Beanie models
            await init_beanie(database=client[MONGO_DB_NAME], document_models=[Flashcard, UserFlashcardProgress])
            logger.info(f"Beanie models initialized for database: {MONGO_DB_NAME}")
            return # Koneksi berhasil, keluar dari loop
            
        except ServerSelectionTimeoutError as err:
            logger.critical(f"FATAL ERROR (Attempt {attempt}): MongoDB server not reachable (timeout). Check server status, MONGO_URI, firewall, or IP whitelist (for Atlas). Details: {err}")
            if attempt < RETRY_ATTEMPTS:
                logger.info(f"Retrying connection in {RETRY_DELAY_SECONDS} seconds...")
                await asyncio.sleep(RETRY_DELAY_SECONDS)
            else:
                logger.critical("All MongoDB connection attempts failed.")
                raise # Re-raise the exception after all attempts
        except ConnectionFailure as err:
            logger.critical(f"FATAL ERROR (Attempt {attempt}): MongoDB connection refused. Check MONGO_URI, authentication, or network access. Details: {err}")
            if attempt < RETRY_ATTEMPTS:
                logger.info(f"Retrying connection in {RETRY_DELAY_SECONDS} seconds...")
                await asyncio.sleep(RETRY_DELAY_SECONDS)
            else:
                logger.critical("All MongoDB connection attempts failed.")
                raise
        except PyMongoError as err: 
            logger.critical(f"FATAL ERROR (Attempt {attempt}): A PyMongo error occurred during connection: {err}")
            if attempt < RETRY_ATTEMPTS:
                logger.info(f"Retrying connection in {RETRY_DELAY_SECONDS} seconds...")
                await asyncio.sleep(RETRY_DELAY_SECONDS)
            else:
                logger.critical("All MongoDB connection attempts failed.")
                raise
        except Exception as e: # Tangkap exception umum lainnya
            logger.critical(f"FATAL ERROR (Attempt {attempt}): An unexpected error occurred during MongoDB connection: {e}")
            if attempt < RETRY_ATTEMPTS:
                logger.info(f"Retrying connection in {RETRY_DELAY_SECONDS} seconds...")
                await asyncio.sleep(RETRY_DELAY_SECONDS)
            else:
                logger.critical("All MongoDB connection attempts failed.")
                raise

    # Jika loop selesai tanpa return (semua percobaan gagal)
    logger.critical("MongoDB connection failed after all attempts and was not established.")
    raise Exception("MongoDB client not initialized after multiple attempts. Check server status and configurations.")
async def close_mongodb_connection():
    global client
    if client:
        client.close()
        print("MongoDB connection closed.")

# Dependency untuk mendapatkan klien MongoDB (digunakan oleh FastAPI)
async def get_db_client():
    if not client:
        # This case should ideally not happen if startup event runs correctly
        raise Exception("MongoDB client not initialized. Application startup failed or client closed unexpectedly.")
    return client