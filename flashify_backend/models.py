# flashify_backend/models.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Dict # Pastikan semua diimpor

# Untuk request body ketika mengirim penilaian flashcard
class FlashcardReview(BaseModel):
    difficulty: str # "easy", "medium", "hard"

# Untuk respons flashcard yang ditampilkan ke frontend
class FlashcardResponse(BaseModel):
    id: str = Field(alias="_id") # MongoDB's _id is string
    question: str
    answer: str
    next_review_at: datetime
    ease_factor: float
    repetitions: int
    user_id: int
    pdf_id: Optional[str] = None

    class Config:
        populate_by_name = True # Mengizinkan _id di mapping ke id
        json_schema_extra = {
            "example": {
                "id": "60c72b2f9f1b2c3d4e5f6a7b",
                "question": "What is FastAPI?",
                "answer": "A modern, fast web framework for building APIs with Python.",
                "next_review_at": "2025-06-15T10:00:00Z",
                "ease_factor": 2.5,
                "repetitions": 1,
                "user_id": 1,
                "pdf_id": "document_123.pdf"
            }
        }

# Untuk respons MCQ
class MCQOption(BaseModel):
    label: str # A, B, C, D
    text: str

class MCQResponse(BaseModel):
    id: str = Field(alias="_id") # MongoDB's _id
    question: str
    options: List[MCQOption] # Pastikan List diimpor
    correct_answer_label: str # Label opsi yang benar, misal "B"

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "id": "60c72b2f9f1b2c3d4e5f6a7c",
                "question": "What is the capital of Indonesia?",
                "options": [
                    {"label": "A", "text": "Bandung"},
                    {"label": "B", "text": "Jakarta"},
                    {"label": "C", "text": "Surabaya"},
                    {"label": "D", "text": "Medan"}
                ],
                "correct_answer_label": "B"
            }
        }