from fastapi import APIRouter
from app.db import db
from fastapi import HTTPException


router = APIRouter()

@router.get("/flashcard-collections")
async def list_collections():
    return [c for c in db.list_collection_names() if c not in ("admin", "local", "config")]

@router.get("/flashcards/{collection}")
async def get_flashcards(collection: str):
    print(f"🧪 Mencoba akses koleksi: {collection}")
    if collection not in db.list_collection_names():
        raise HTTPException(status_code=404, detail=f"Collection '{collection}' not found.")
    data = list(db[collection].find({}, {"_id": 0}))
    print(f"✅ Data ditemukan: {len(data)} item")
    return data
