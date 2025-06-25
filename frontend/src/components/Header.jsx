import { Plus } from "lucide-react";
import { useRef } from "react";

function Header({ filename, onUpload }) {
  const inputRef = useRef();
  
//   For the hidden file input

  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
// To handle file selection

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are supported.");
      return;
    }

    onUpload(file);
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 sm:px-6 py-4 bg-white shadow-sm border-b border-gray-200 gap-4">

      {/* Logo + Name */}

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <img src="/ai-planet-logo.png" alt="AI Planet" className="h-10 w-10 sm:h-12 sm:w-12" />
          <span className="font-bold text-2xl sm:text-3xl text-black">planet</span>
        </div>
        <span className="text-[10px] sm:text-[11px] ml-12 mt-[-6px]">
          <span className="text-black">formerly </span>
          <span className="text-green-600 font-medium">DPhi</span>
        </span>
      </div>

      {/* Uploaded Filename and button */}
      
      <div className="flex flex-wrap items-center gap-4">
        {filename && (
          <span className="text-sm text-green-700 font-medium flex items-center gap-1 truncate max-w-[200px]">
            📄 {filename}
          </span>
        )}
        {/* Hidden file input element */}
        <input
          type="file"
          accept=".pdf"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={handleButtonClick}
          className="flex items-center gap-3 px-6 sm:px-10 py-2 sm:py-3 border-2 border-black font-bold text-black rounded-xl shadow-sm hover:bg-gray-100 transition"
        >
          <div className="h-5 w-5 rounded-full border border-black flex items-center justify-center">
            <Plus className="h-3 w-3 text-black" />
          </div>
          Upload PDF
        </button>
      </div>
    </header>
  );
}

export default Header;