from pypdf import PdfReader
from app.vertex.vertexai_client import generate_questions_answers  # VertexAI client untuk Q&A
import tensorflow as tf
import numpy as np
import re

# Load model TensorFlow untuk klasifikasi tingkat kesulitan (difficulty)
model = tf.keras.models.load_model('my_pdf_text_classifier.h5') 

# --- Fungsi untuk ekstraksi text dari file PDF ---
def extract_text_from_pdf(file_path):
    """
    Ekstrak setiap halaman PDF menjadi dict dengan key 'Seksi x'
    """
    reader = PdfReader(file_path)
    return {
        f"Seksi {i+1}": page.extract_text().strip()
        for i, page in enumerate(reader.pages)
        if page.extract_text()
    }

# --- Fungsi Klasifikasi Kesulitan Flashcard ---
def categorize_flashcard(text):
    """
    Klasifikasikan tingkat kesulitan flashcard (easy/medium/hard) dengan model TensorFlow.
    """
    # Dummy preprocessing
    x_input = np.array([[len(text)]])  # Sesuaikan ini dengan input model aslimu
    preds = model.predict(x_input)
    idx = np.argmax(preds)
    difficulty_labels = ['easy', 'medium', 'hard']
    return difficulty_labels[idx] if idx < len(difficulty_labels) else 'unknown'

# --- Fungsi utama generate flashcards dari PDF ---
def generate_flashcards_from_pdf(pdf_path):
    """
    Ekstrak teks dari PDF, generate Q&A dengan VertexAI, dan tambahkan prediksi difficulty dari TensorFlow.
    """
    sections = extract_text_from_pdf(pdf_path)
    all_sections = []

    for section_name, text in sections.items():
        flashcards = generate_questions_answers(text)

        if not flashcards:
            continue

        valid_flashcards = []
        for fc in flashcards:
            if isinstance(fc, dict) and 'question' in fc and 'answer' in fc:
                combined_text = f"{fc.get('question', '')} {fc.get('answer', '')}"
                fc['difficulty'] = categorize_flashcard(combined_text)
                valid_flashcards.append(fc)
            else:
                print(f"⚠️ Format flashcard tidak sesuai di {section_name}: {fc}")

        if valid_flashcards:
            all_sections.append({
                "section": section_name,
                "flashcards": valid_flashcards
            })

    return all_sections
