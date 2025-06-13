from pydantic import BaseModel
from typing import List

class Flashcard(BaseModel):
    question: str
    options: List[str]
    answer: str

class FlashcardSection(BaseModel):
    section: str
    flashcards: List[Flashcard]