# PDF Question Answering App

This is a full-stack web application that allows users to upload PDF documents and ask questions based on their content. The app uses FastAPI for the backend, React.js + Tailwind CSS for the frontend, and integrates with the Mistral-7B language model via LangChain to generate accurate answers.

# Features

Upload PDF files via a simple UI

Extract both text and tables from PDFs

Ask natural-language questions about the document

AI answers powered by LangChain and Mistral

Responsive interface using React and Tailwind

Metadata stored using SQLite

# Tech Stack

Frontend - React.js, Tailwind CSS
Backend - FastAPI
LLM Engine - LangChain + Mistral-7B
PDF Parsing - fitz (PyMuPDF), pdfplumber
Database - SQLite

# Folder Structure

project/

backend/
main.py - API endpoints
pdf_utils.py - PDF parsing functions
qa_engine.py - LangChain logic
database.py - SQLite interactions
uploads/ - Uploaded PDF storage

 # frontend/
App.jsx - Main app file
components/ - React components

.env - Environment variables

# how to run 
for backend - install dependencies and then 
uvicorn main:app --reload
for frontend -after installing dependencies
npm run install
