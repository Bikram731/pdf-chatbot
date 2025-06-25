import os
import fitz 
import pdfplumber
from fastapi import UploadFile


# Save pdf
async def save_pdf(file: UploadFile) -> str:
    file_path = os.path.join("uploads", file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    return file_path


# For Extract text 
def extract_text_from_pdf(file_path: str) -> str:
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        raise Exception(f"PDF parsing failed: {str(e)}")


# For extracting TABLES
def extract_table_text_from_pdf(file_path: str) -> str:
    try:
        table_text = []
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                tables = page.extract_tables()
                for table in tables:
                    for row in table:
                        if row:
                            table_text.append(" | ".join(str(cell or "") for cell in row))
        return "\n".join(table_text)
    except Exception as e:
        raise Exception(f"Table extraction failed: {str(e)}")


# For both tables+text
def get_best_text_from_pdf(file_path: str) -> str:
    full_text = ""
    
    # For text
    try:
        regular_text = extract_text_from_pdf(file_path)
        if regular_text.strip():
            full_text += regular_text.strip()
    except Exception as e:
        print(f"[WARN] Failed to extract normal text: {e}")

    # For tables
    try:
        table_text = extract_table_text_from_pdf(file_path)
        if table_text.strip():
            full_text += "\n\n---\n\nTables:\n" + table_text
    except Exception as e:
        print(f"[WARN] Failed to extract table text: {e}")

    return full_text.strip()