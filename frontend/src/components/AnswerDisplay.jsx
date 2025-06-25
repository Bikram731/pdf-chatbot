import React from "react";
import aiPlanetLogo from "../assets/ai-planet-logo.png";

function AnswerDisplay({ question, answer }) {
  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6 px-2 sm:px-0">

      {/* User Question */}

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-300 text-white text-lg sm:text-2xl font-semibold">
          S
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow text-sm text-gray-900 max-w-full break-words">
          {question}
        </div>
      </div>

      {/* AI Answer  */}
      
      <div className="flex items-start gap-3">
        <img src={aiPlanetLogo} alt="AI Planet" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
        <div className="bg-gray-100 px-4 py-2 rounded-xl shadow text-sm text-gray-800 max-w-full break-words">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default AnswerDisplay;