from fastapi import FastAPI, UploadFile, File, Form
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from pdf_utils import save_pdf, get_best_text_from_pdf
from qa_engine import get_answer
from database import create_table_if_not_exists, insert_metadata

# for fastapi working
app = FastAPI()

# to create metadata table
create_table_if_not_exists()

# Enable CORS for react
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# To make uploads folder
os.makedirs("uploads", exist_ok=True)

# To upload a file
@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = await save_pdf(file)
    file_size_kb = os.path.getsize(file_path)
    insert_metadata(file.filename, file_size_kb)

    return {"message": "Uploaded successfully", "filename": file.filename}

# For question and returning answer for pdf
@app.post("/ask/")
async def ask_question(question: str = Form(...), filename: str = Form(...)):
    if not question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    pdf_path = os.path.join("uploads", filename)
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="File not found. Please upload a PDF first.")

    try:
        text = get_best_text_from_pdf(pdf_path)
        if not text.strip():
             raise HTTPException(status_code=400, detail="The uploaded PDF contains no readable content.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting PDF content: {str(e)}")
    
    context = f"The following content is extracted from the uploaded file named '{filename}':\n\n{text}"

    try:
        answer = get_answer(question, context)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM failed: {str(e)}")