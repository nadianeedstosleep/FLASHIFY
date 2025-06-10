from fastapi import APIRouter, Body
from app.db import db
from datetime import datetime

router = APIRouter()

@router.post("/save-history")
async def save_history(data: dict = Body(...)):
    data["timestamp"] = datetime.utcnow()
    db["quiz_history"].insert_one(data)
    return {"status": "saved"}

@router.get("/history")
async def get_history():
    return list(db["quiz_history"].find({}, {"_id": 0}))
