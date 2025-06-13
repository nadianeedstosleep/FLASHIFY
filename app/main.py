from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.db import db

from app.routes import flashcards, upload, history, update_collection  # ini harus ada


app = FastAPI()

# Mount public folder
app.mount("/static", StaticFiles(directory="public"), name="static")

# Tambahkan route viewer.html
@app.get("/")
async def homepage():
    return FileResponse("public/index.html")

@app.get("/viewer")
async def viewer_page():
    return FileResponse("public/viewer.html")

from fastapi.responses import FileResponse

@app.get("/viewer.html")
async def viewer_page():
    return FileResponse("public/viewer.html")

@app.get("/flashcardlist")
async def list_page():
    return FileResponse("public/flashcardlist.html")

@app.get("/upload.html")
async def upload_page():
    return FileResponse("public/upload.html")

# Tambahkan router
app.include_router(flashcards.router)
app.include_router(upload.router)
app.include_router(history.router)
app.include_router(update_collection.router)