from fastapi import APIRouter, UploadFile, File, Form
from tempfile import NamedTemporaryFile
from app.flashcard_generator import generate_flashcards_from_pdf
from app.db import db
from vertexai.preview.language_models import TextGenerationModel
from dotenv import load_dotenv
load_dotenv()
from datetime import datetime

router = APIRouter()

@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    description: str = Form("")
):
    # Siapkan nama koleksi dari nama file
    filename = file.filename.replace(".pdf", "").replace(" ", "_")

    # Simpan file upload ke disk sementara
    with NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    # Generate flashcards dengan pipeline baru (VertexAI + TensorFlow)
    flashcards_sections = generate_flashcards_from_pdf(tmp_path)

    # Buat collection baru per PDF
    collection = db[filename]
    collection.delete_many({})  # clear jika ada sebelumnya

    for i, section in enumerate(flashcards_sections):
        doc = {
            "section": section["section"],           # Sudah sesuai hasil fungsi baru
            "flashcards": section["flashcards"]      # Sudah termasuk Q&A + options + difficulty
        }
        if i == 0:
            doc["meta"] = {
                "name": filename,
                "description": description,
                "created_at": datetime.utcnow(),
                "is_public": False
            }
        collection.insert_one(doc)

    return {
        "status": "success",
        "collection": filename,
        "count": len(flashcards_sections)
    }
