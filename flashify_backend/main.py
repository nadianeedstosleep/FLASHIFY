# flashify_backend/main.py
import os
import sys # Digunakan untuk memanipulasi sys.path
import shutil
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple 
from bson import ObjectId # Untuk mengelola MongoDB _id
import logging

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, status
from fastapi.responses import JSONResponse

# --- PENTING: Penyesuaian sys.path untuk Absolute Imports ---
# Ini akan menambahkan direktori induk proyek (misal D:\flashify_project_root\) ke sys.path
# agar Python dapat menemukan paket 'flashify_backend'.
# os.path.abspath(__file__) -> D:\flashify_project_root\flashify_backend\main.py
current_file_dir = os.path.dirname(os.path.abspath(__file__)) # -> D:\flashify_project_root\flashify_backend
project_root_dir = os.path.dirname(current_file_dir) # -> D:\flashify_project_root\

if project_root_dir not in sys.path:
    sys.path.insert(0, project_root_dir) # Tambahkan ke awal sys.path
# --- Akhir Penyesuaian sys.path ---

# Sekarang, lakukan import dengan nama paket lengkap.
# Perhatikan: Nama folder 'flashify_backend' (dengan underscore) HARUS sama dengan yang diimpor.
try:
    from flashify_backend.config import GCP_PROJECT_ID, GCP_REGION, MAX_PDF_SIZE_MB
    from flashify_backend.database import connect_to_mongodb, close_mongodb_connection, Flashcard, UserFlashcardProgress, get_db_client
    from flashify_backend.models import FlashcardReview, FlashcardResponse, MCQResponse, MCQOption
except ImportError as e:
    print(f"FATAL ERROR: Failed to import internal modules: {e}")
    print("Please ensure your project structure is 'flashify_backend' with __init__.py inside,")
    print("and you are running `uvicorn flashify_backend.main:app --reload` from its parent directory (e.g., D:\flashify_project_root\).")
    print(f"Current sys.path when import failed: {sys.path}")
    raise # Re-raise the error as it's critical and prevents further execution


# --- PDF Processing Library ---
import PyPDF2

# --- Vertex AI Integration ---
import vertexai
from vertexai.generative_models import GenerativeModel, Part

# Inisialisasi Vertex AI di awal aplikasi
try:
    vertexai.init(project=GCP_PROJECT_ID, location=GCP_REGION)
    gemini_model = GenerativeModel("gemini-pro")
    print("Vertex AI initialized successfully.")
except Exception as e:
    print(f"Failed to initialize Vertex AI. Check GCP_PROJECT_ID, GCP_REGION, and GOOGLE_APPLICATION_CREDENTIALS. Error: {e}")
    gemini_model = None # Set to None if initialization fails


app = FastAPI()

# --- Startup & Shutdown Events: Koneksi MongoDB ---
@app.on_event("startup")
async def on_startup():
    await connect_to_mongodb()
    print("FastAPI application started and connected to MongoDB.")

@app.on_event("shutdown")
async def on_shutdown():
    await close_mongodb_connection()
    print("FastAPI application shut down and MongoDB connection closed.")

# --- Helper Functions ---

# Fungsi untuk mengekstrak teks dari PDF
def extract_text_from_pdf_file(file_path: str) -> str:
    text = ""
    try:
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""
    return text

# Fungsi untuk memanggil Vertex AI dan menghasilkan konten
async def generate_content_with_vertex_ai(
    extracted_text: str,
    content_type: str # "flashcard" or "mcq"
) -> str: # Mengembalikan teks mentah dari LLM
    if not gemini_model:
        raise HTTPException(status_code=500, detail="Vertex AI model not initialized or failed to load.")

    # --- Prompt Engineering ---
    # Sesuaikan prompt ini untuk kualitas terbaik
    prompt_flashcard = f"""
    Based on the following text, generate a list of flashcards. Each flashcard must be in the format:
    Question: [Your Question]
    Answer: [Your Answer]
    Ensure questions are relevant to the core text and answers are concise, clear, and accurate.
    Do not provide any introductory or concluding remarks.

    Text:
    {extracted_text}
    """

    prompt_mcq = f"""
    Based on the following text, generate a list of multiple-choice questions. For each question, provide the question text, 4 answer options (A, B, C, D), and clearly indicate the correct answer.
    Each question should be separated by two empty lines.
    Do not provide any introductory or concluding remarks.

    Text:
    {extracted_text}

    Example format:
    Question: What is the capital of Indonesia?
    A. Bandung
    B. Jakarta
    C. Surabaya
    D. Medan
    Correct Answer: B. Jakarta
    """
    
    prompt = prompt_flashcard if content_type == "flashcard" else prompt_mcq

    try:
        # Panggil model secara asynchronous
        response = await gemini_model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        print(f"Error calling Vertex AI for {content_type}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate {content_type} with AI. Detailed error: {e}")

# Fungsi untuk mem-parse output LLM menjadi Flashcard terstruktur
def parse_flashcards_from_llm_output(llm_output: str) -> List[Dict[str, str]]:
    flashcards = []
    blocks = llm_output.strip().split("Question:") # Split by "Question:"
    for block in blocks:
        if "Answer:" in block:
            try:
                q_part = block.split("Answer:")[0].strip()
                a_part = block.split("Answer:")[1].strip()
                if q_part and a_part:
                    flashcards.append({"question": q_part, "answer": a_part})
            except IndexError:
                print(f"Warning: Could not parse flashcard block due to missing 'Answer:' or malformed structure: {block[:100]}...")
                continue
    return flashcards

# Fungsi untuk mem-parse output LLM menjadi MCQ terstruktur
def parse_mcqs_from_llm_output(llm_output: str) -> List[MCQResponse]:
    mcqs = []
    raw_questions = [q.strip() for q in llm_output.split('\n\n') if q.strip()]

    for raw_q in raw_questions:
        lines = raw_q.split('\n')
        # Minimum lines: Q, A, B, C, D, Correct
        if len(lines) < 6: 
            continue
        
        question_text = ""
        options_list = []
        correct_label = ""

        try:
            # Extract question
            if lines[0].startswith("Question:"): # Check for "Question:"
                question_text = lines[0].replace("Question:", "").strip()
            else:
                continue 

            # Extract options and correct answer
            for i in range(1, len(lines)):
                line = lines[i].strip()
                if line.startswith(("A.", "B.", "C.", "D.")):
                    label = line[0]
                    text = line[2:].strip()
                    options_list.append(MCQOption(label=label, text=text))
                elif line.startswith("Correct Answer:"): # Check for "Correct Answer:"
                    correct_label_full = line.replace("Correct Answer:", "").strip()
                    if len(correct_label_full) >= 1:
                        correct_label = correct_label_full[0] # Take only the first char (e.g., 'B')
            
            # Check if all necessary parts are found
            if question_text and len(options_list) == 4 and correct_label:
                mcqs.append(MCQResponse(
                    id=str(ObjectId()), 
                    question=question_text,
                    options=options_list,
                    correct_answer_label=correct_label
                ))

        except Exception as e:
            print(f"Error parsing MCQ block: {e}\nRaw Block:\n{raw_q}")
            continue 
    return mcqs

# Fungsi sederhana untuk logika SM-2
def calculate_next_review(
    last_reviewed_at: datetime,
    ease_factor: float,
    repetitions: int,
    difficulty_rating: str
) -> Tuple[datetime, float, int]: 
    q = {"easy": 5, "medium": 3, "hard": 1}.get(difficulty_rating.lower(), 3)

    if q >= 3: # Correct response
        if repetitions == 0:
            interval_days = 1
        elif repetitions == 1:
            interval_days = 6
        else:
            interval_days = round(repetitions * ease_factor)
            if repetitions > 2:
                pass # Simple placeholder for growing interval
        repetitions += 1
        new_ease_factor = ease_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
        new_ease_factor = max(1.3, new_ease_factor)
    else: # Incorrect response or forgot
        interval_days = 0 
        repetitions = 0
        new_ease_factor = ease_factor 

    next_review = datetime.utcnow() + timedelta(days=interval_days)
    return next_review, new_ease_factor, repetitions


# --- API Endpoints ---

# Inisialisasi FastAPI
app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to Flashify Backend!"}

@app.post("/upload-and-generate/")
async def upload_and_generate(
    pdf_file: UploadFile = File(...),
    db_client = Depends(get_db_client) 
):
    if not pdf_file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    file_size_mb = pdf_file.size / (1024 * 1024)
    if file_size_mb > MAX_PDF_SIZE_MB:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Max size is {MAX_PDF_SIZE_MB} MB."
        )

    temp_file_path = os.path.join("temp", pdf_file.filename)
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(pdf_file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save PDF file: {e}")

    extracted_text = extract_text_from_pdf_file(temp_file_path)
    if not extracted_text:
        os.remove(temp_file_path)
        raise HTTPException(status_code=400, detail="Failed to extract readable text from PDF.")

    parsed_flashcards = []
    try:
        flashcards_raw_text = await generate_content_with_vertex_ai(extracted_text, "flashcard")
        parsed_flashcards = parse_flashcards_from_llm_output(flashcards_raw_text)
        if not parsed_flashcards:
            print(f"Warning: No flashcards parsed from AI output for {pdf_file.filename}. Raw AI text: {flashcards_raw_text[:500]}...")
    except HTTPException as e:
        os.remove(temp_file_path)
        raise e 
    except Exception as e:
        os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail=f"Error parsing flashcards from AI: {e}")

    parsed_mcqs = []
    try:
        mcqs_raw_text = await generate_content_with_vertex_ai(extracted_text, "mcq")
        parsed_mcqs = parse_mcqs_from_llm_output(mcqs_raw_text)
        if not parsed_mcqs:
            print(f"Warning: No MCQs parsed from AI output for {pdf_file.filename}. Raw AI text: {mcqs_raw_text[:500]}...")
    except HTTPException as e:
        os.remove(temp_file_path)
        raise e
    except Exception as e:
        os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail=f"Error parsing MCQs from AI: {e}")

    user_id = 1 # Dummy user ID for demonstration (Replace with actual user ID from authentication)
    pdf_identifier = pdf_file.filename

    new_flashcards_db_docs = []
    for fc_data in parsed_flashcards:
        new_flashcards_db_docs.append(Flashcard(
            user_id=user_id,
            pdf_id=pdf_identifier,
            question=fc_data["question"],
            answer=fc_data["answer"]
        ))
    
    if new_flashcards_db_docs:
        await Flashcard.insert_many(new_flashcards_db_docs)
    
    for fc_doc in new_flashcards_db_docs:
        initial_progress = UserFlashcardProgress(
            user_id=user_id,
            flashcard_id=str(fc_doc.id), 
            last_reviewed_at=datetime.utcnow(),
            next_review_at=datetime.utcnow(), 
            ease_factor=2.5,
            repetitions=0
        )
        await initial_progress.insert() 

    # TODO: Jika Anda ingin menyimpan MCQs ke database, tambahkan logika di sini.
    # Anda perlu membuat model MCQ di database.py dan menyimpannya ke koleksi terpisah.

    os.remove(temp_file_path)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={
        "message": "PDF processed and flashcards/MCQs generated successfully!",
        "flashcards_generated": len(parsed_flashcards),
        "mcqs_generated": len(parsed_mcqs),
        "first_flashcard_q": parsed_flashcards[0]["question"] if parsed_flashcards else None,
        "first_mcq_q": parsed_mcqs[0].question if parsed_mcqs else None,
    })


@app.get("/flashcards/for-review/{user_id}", response_model=List[FlashcardResponse])
async def get_flashcards_for_review(user_id: int, db_client = Depends(get_db_client)):
    progresses_to_review = await UserFlashcardProgress.find(
        UserFlashcardProgress.user_id == user_id,
        UserFlashcardProgress.next_review_at <= datetime.utcnow()
    ).sort(UserFlashcardProgress.next_review_at).to_list()

    response_list = []
    for progress in progresses_to_review:
        flashcard = await Flashcard.get(ObjectId(progress.flashcard_id)) 
        if flashcard:
            response_list.append(FlashcardResponse(
                id=str(flashcard.id), 
                user_id=flashcard.user_id,
                pdf_id=flashcard.pdf_id,
                question=flashcard.question,
                answer=flashcard.answer,
                next_review_at=progress.next_review_at,
                ease_factor=progress.ease_factor,
                repetitions=progress.repetitions
            ))
    return response_list


@app.post("/flashcards/{flashcard_id}/review/{user_id}")
async def review_flashcard(
    flashcard_id: str, 
    user_id: int,
    review_data: FlashcardReview,
    db_client = Depends(get_db_client)
):
    progress = await UserFlashcardProgress.find_one(
        UserFlashcardProgress.flashcard_id == flashcard_id,
        UserFlashcardProgress.user_id == user_id
    )

    if not progress:
        raise HTTPException(status_code=404, detail="Flashcard progress not found for this user.")

    next_review_at, new_ease_factor, new_repetitions = calculate_next_review(
        progress.last_reviewed_at,
        progress.ease_factor,
        progress.repetitions,
        review_data.difficulty
    )

    progress.last_reviewed_at = datetime.utcnow()
    progress.next_review_at = next_review_at
    progress.ease_factor = new_ease_factor
    progress.repetitions = new_repetitions
    progress.difficulty_rating = review_data.difficulty

    await progress.save() 

    return {"message": "Flashcard review recorded successfully!", "next_review_at": progress.next_review_at}

@app.get("/mcqs/{user_id}", response_model=List[MCQResponse])
async def get_mcqs_for_user(user_id: int, db_client = Depends(get_db_client)):
    return [] # Placeholder. Implement storage and retrieval for MCQs here.