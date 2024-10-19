// src/components/TextResult.js
import React from "react";
import './TextResult.css'

const TextResult = ({ text, loading, onButtonClick }) => {
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
      {/* Display the extracted text */}
      <p className="outputText">
        {text || "Text will appear here after processing..."}
      </p>
    </div>
  );
};

export default TextResult;
