import React, { useRef, useState } from "react";
import Header from "./components/Header";
import QuestionBox from "./components/QuestionBox";
import AnswerDisplay from "./components/AnswerDisplay";

function App() {
  // State to store uploaded filename, Loading indicator, answer and question
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState(null);

  // Function called when user clicks on upload button

  const uploadFile = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setUploadedFile(data.filename);
    } catch (err) {
      alert("Failed to upload PDF ❌");
    } finally {
      setIsUploading(false);
    }
  };
  
  // Function Called when user submits a question
  const handleAskQuestion = async (q) => {
    setQuestion(q);
    setAnswer("...thinking");

    const formData = new FormData();
    formData.append("question", q);
    formData.append("filename", uploadedFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ask/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer received.");
    } catch (err) {
      setAnswer("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">

      {/* Header */}

      <Header filename={uploadedFile} onUpload={uploadFile} />

      {/* Question and Answer display */}

      <main className="px-4 pt-4">
        {question && answer && (<AnswerDisplay question={question} answer={answer}/>)}
      </main>

      {/* For searching the question about pdf */}

      <QuestionBox onSubmit={handleAskQuestion} disabled={!uploadedFile} />

    </div>
  );
}

export default App;