import sqlite3
from datetime import datetime
import os


# Path to the database file
DB_PATH = os.path.join(os.path.dirname(__file__), "metadata.db")


# Connect to the database
def connect():
    return sqlite3.connect(DB_PATH)


# Create the metadata table
def create_table_if_not_exists():
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS pdf_metadata (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            upload_time TEXT NOT NULL,
            file_size_kb INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()


# Insert metadata 
def insert_metadata(filename: str, file_size_kb: int):
    upload_time = datetime.now().isoformat(timespec='seconds')
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO pdf_metadata (filename, upload_time, file_size_kb)
        VALUES (?, ?, ?)
    """, (filename, upload_time, file_size_kb))
    conn.commit()
    conn.close()