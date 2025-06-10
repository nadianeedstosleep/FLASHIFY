from fastapi import APIRouter, Body
from app.db import db

router = APIRouter()

@router.post("/update-collection/{name}")
async def update_collection(name: str, updates: dict = Body(...)):
    result = db[name].update_one(
        {"meta": {"$exists": True}},
        {"$set": {f"meta.{k}": v for k, v in updates.items()}}
    )
    return {"updated": result.modified_count}
