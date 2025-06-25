import sqlite3

conn = sqlite3.connect("metadata.db")
cursor = conn.cursor()

for row in cursor.execute("SELECT * FROM pdf_metadata"):
    print(row)

conn.close()