import os
import json
import re
from dotenv import load_dotenv
from vertexai.generative_models import GenerativeModel
import vertexai
from google.oauth2 import service_account

# Load variabel lingkungan
load_dotenv()

# Inisialisasi kredensial dari file service account
service_account_path = "G:/DBS CODING CAMP 2025/flashify-ekstraksipdf/app/vertex/inspired-ether-462408-q6-c6f6683d8b71.json"
credentials = service_account.Credentials.from_service_account_file(service_account_path)

# Inisialisasi Vertex AI
PROJECT_ID = "inspired-ether-462408-q6"
LOCATION = "us-central1"
vertexai.init(project=PROJECT_ID, location=LOCATION, credentials=credentials)

def generate_questions_answers(text: str):
    """
    Menggunakan Gemini untuk menghasilkan flashcard dalam format array:
    [
        {
            "question": "...",
            "answer": "...",
            "options": ["...", "...", "..."]
        }
    ]
    """
    model = GenerativeModel("gemini-2.0-flash-001")

    prompt = (
        "Dari teks berikut, buat 3 flashcard dalam format JSON array. "
        "Setiap flashcard harus terdiri dari: 'question', 'answer', dan 'options'. "
        "Jangan menyertakan jawaban di dalam pertanyaan. Format JSON harus valid dan langsung berupa array seperti:\n\n"
        "[\n"
        "  {\n"
        "    \"question\": \"...\",\n"
        "    \"answer\": \"...\",\n"
        "    \"options\": [\"...\", \"...\", \"...\"]\n"
        "  },\n"
        "  ...\n"
        "]\n\n"
        f"Teks:\n{text}"
    )

    response = model.generate_content(prompt)

    # Bersihkan jika terbungkus ```json ... ```
    cleaned_text = re.sub(r"^```(?:json)?|```$", "", response.text.strip(), flags=re.MULTILINE).strip()

    try:
        parsed = json.loads(cleaned_text)
        if isinstance(parsed, list) and all(isinstance(item, dict) for item in parsed):
            return parsed
        else:
            print("⚠️ Output Gemini bukan list of dict.")
            return []
    except json.JSONDecodeError as e:
        print("❌ Gagal parsing JSON dari Gemini:", e)
        print("📄 Output mentah:\n", response.text)
        return []
