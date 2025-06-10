from fastapi import APIRouter, UploadFile, File, Form
from tempfile import NamedTemporaryFile
from app.flashcard_generator import generate_flashcards_from_pdf
from app.db import db
from datetime import datetime

router = APIRouter()

@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    description: str = Form("")
):
    filename = file.filename.replace(".pdf", "").replace(" ", "_")

    with NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    flashcards = generate_flashcards_from_pdf(tmp_path)

    # Buat collection baru per PDF
    collection = db[filename]
    collection.delete_many({})  # clear jika ada

    for i, section_cards in enumerate(flashcards):
        doc = {
            "section": f"Seksi {i+1}",
            "flashcards": section_cards
        }
        if i == 0:
            doc["meta"] = {
                "name": filename,
                "description": description,
                "created_at": datetime.utcnow(),
                "is_public": False
            }
        collection.insert_one(doc)

    return {"status": "success", "collection": filename, "count": len(flashcards)}
