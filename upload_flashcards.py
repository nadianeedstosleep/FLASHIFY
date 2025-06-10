import json
from pymongo import MongoClient

# Koneksi ke MongoDB lokal (atau ubah URL jika pakai Atlas)
client = MongoClient("mongodb://localhost:27017")
db = client["flashifydb"]
collection = db["flashcards"]

# Buka file hasil generate dari Colab
with open("flashcards.json") as f:
    data = json.load(f)

# Upload ke MongoDB
result = collection.insert_many(data)
print(f"{len(result.inserted_ids)} flashcards berhasil diupload.")