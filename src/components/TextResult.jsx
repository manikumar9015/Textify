import React from "react";
import './TextResult.css';

const TextResult = ({ text, loading, onButtonClick }) => {
  // Determine if the extracted text is a code snippet
  const isCodeSnippet = text && (text.includes(';') ||  text.includes('{') || text.includes('}') || text.includes('<') || text.includes('>'));

   // Function to format the text for code snippets
   const formatCode = (code) => {
    // Normalize indentation (replace tabs with 4 spaces)
    return code
      .replace(/\t/g, '    ') // Replace tabs with 4 spaces
      .replace(/ {2,}/g, ' ') // Reduce multiple spaces to a single space
      .trim(); // Trim leading/trailing whitespace
  };

  return (
    <div className="result-container">
      {/* Button to trigger OCR process */}
      <button 
        className="getTextButton" 
        onClick={onButtonClick}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Get Text'}
      </button>

      {/* Display the extracted text or code */}
      {isCodeSnippet ? (
        <pre className="code-output outputText">
          <code>{text || "Text will appear here after processing..."}</code>
        </pre>
      ) : (
        <p className="outputText">{text || "Text will appear here after processing..."}</p>
      )}
    </div>
  );
};

export default TextResult;
