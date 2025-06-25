import { useState } from "react";
import { Send } from "lucide-react";

function QuestionBox({ onSubmit, disabled }) {
  const [question, setQuestion] = useState("");

  // To submit the question

  const handleAsk = () => {
    if (!question.trim()) return;
    onSubmit(question);
    setQuestion("");
  };

//   Trigeers on enter key press

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault(); // prevent new line
      handleAsk();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 sm:px-6 py-4 bg-white border-t border-gray-200 flex flex-row items-center gap-3">
      
      {/* Input field to type the question */}

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        disabled={disabled}
        className="w-full sm:flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Send button */}

      <button
        onClick={handleAsk}
        disabled={disabled || !question.trim()}
        className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition"
      >
        <Send className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}

export default QuestionBox;