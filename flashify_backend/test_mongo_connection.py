# D:\FlashifyProjectBaru\test_mongo_connection.py
import os
import sys
import asyncio
from dotenv import load_dotenv, find_dotenv 
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure

async def test_connection():
    # Mencari file .env secara otomatis dari direktori saat ini ke atas
    dotenv_path = find_dotenv()
    if dotenv_path:
        load_dotenv(dotenv_path)
        print(f".env file loaded successfully from: {dotenv_path}")
    else:
        print("ERROR: .env file not found. Please ensure it exists in your project structure (e.g., in flashify_backend/ folder).")
        print("Please check your .env file location relative to where you run this script.")
        return 

    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

     # --- TAMBAHKAN BLOK VERIFIKASI INI ---
    print("\n--- Verifying AsyncIOMotorClient and SERVER_API_V1 ---")
    
    # 1. Verifikasi keberadaan kelas AsyncIOMotorClient
    if 'motor.motor_asyncio' in sys.modules and hasattr(sys.modules['motor.motor_asyncio'], 'AsyncIOMotorClient'):
        print("AsyncIOMotorClient class found in motor.motor_asyncio module.")
    else:
        print("ERROR: AsyncIOMotorClient class NOT found in motor.motor_asyncio module. Is 'motor' installed correctly?")
        return # Hentikan jika kelas utama tidak ditemukan

    # 2. Verifikasi keberadaan atribut SERVER_API_V1
    if hasattr(AsyncIOMotorClient, 'SERVER_API_V1'):
        print("SERVER_API_V1 attribute found on AsyncIOMotorClient.")
    else:
        print("ERROR: SERVER_API_V1 attribute NOT found on AsyncIOMotorClient. This typically means 'pymongo' version is < 4.0 or 'motor' version is < 2.0.")
        # Coba tampilkan versi yang terinstal untuk debug
        try:
            import importlib.metadata
            motor_version = importlib.metadata.version('motor')
            pymongo_version = importlib.metadata.version('pymongo')
            print(f"  Installed motor version: {motor_version}")
            print(f"  Installed pymongo version: {pymongo_version}")
        except importlib.metadata.PackageNotFoundError:
            print("  (Could not retrieve motor/pymongo versions - packages might be incorrectly installed)")
        return # Hentikan jika atribut kritis tidak ditemukan
    
    print("--- Verification Complete ---")

    print(f"Attempting to connect to MongoDB with URI: {MONGO_URI}")
    print(f"Using database name: {MONGO_DB_NAME}")

    if not MONGO_URI or not MONGO_DB_NAME:
        print("ERROR: MONGO_URI or MONGO_DB_NAME is None. Please ensure these variables are correctly set in your .env file.")
        return

    client = None
    try:
        # Set serverSelectionTimeoutMS untuk mendeteksi kegagalan koneksi lebih cepat
        # server_api digunakan untuk kompatibilitas masa depan dengan MongoDB
        client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000, server_api=AsyncIOMotorClient.SERVER_API_V1)

        # Perintah ping digunakan untuk memverifikasi koneksi ke server MongoDB
        await client.admin.command('ping') 
        print(f"\nSUCCESS: Successfully connected to MongoDB server at {MONGO_URI}")
        print(f"SUCCESS: Can access database: {MONGO_DB_NAME}")

        # Coba list collections untuk verifikasi lebih lanjut bahwa database aktif
        db = client[MONGO_DB_NAME]
        collections = await db.list_collection_names()
        print(f"Collections in database '{MONGO_DB_NAME}': {collections}")

    except ServerSelectionTimeoutError as err:
        print(f"\nERROR: Server selection timed out after 5 seconds.")
        print(f"Possible causes:")
        print(f"- MongoDB server is not running at {MONGO_URI}.")
        print(f"- Your internet connection is unstable (for MongoDB Atlas).")
        print(f"- A firewall is blocking the connection.")
        print(f"- For MongoDB Atlas, your IP address might not be whitelisted.")
        print(f"Details: {err}")
    except ConnectionFailure as err:
        print(f"\nERROR: MongoDB connection failed.")
        print(f"Possible causes:")
        print(f"- Incorrect MONGO_URI format (e.g., wrong port, invalid characters).")
        print(f"- Authentication issues (wrong username/password if specified in URI).")
        print(f"- MongoDB server is running but is not accessible from your current network/firewall settings.")
        print(f"Details: {err}")
    except Exception as e:
        print(f"\nAN UNEXPECTED ERROR OCCURRED during MongoDB connection: {e}")
    finally:
        if client:
            client.close()
            print("MongoDB client closed.")

if __name__ == "__main__":
    asyncio.run(test_connection())