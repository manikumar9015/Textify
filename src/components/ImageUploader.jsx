import React, { useState } from "react";
import "./ImageUploader.css";

const InputImage = ({ onImageSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(""); // State for storing the file name

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name); // Set the file name in the state
      onImageSelect(file); // Pass the file to parent
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]; // Get the selected file
        const fileName = file.name; // Get the file name
        setFileName(fileName); // Store the filename in the state
        onImageSelect(file); // Pass the file to parent
    }
};


  return (
    <div className="uploader-container">
      <div
        className={`dropbox ${dragActive ? "dropbox-active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <h1 className="input-image-title">Upload an Image to Read Text</h1>
        {fileName ? ( // Conditionally render file name or default text
          <p className="dropbox-text">{fileName}</p>
        ) : (
          <p className="dropbox-text">Drag and drop an image here, or</p>
        )}
        <div className="sel-file">
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            className="file-input"
            onChange={handleFileSelect}
          />

          <label htmlFor="imageInput" className="file-label">
            Choose an image
          </label>
        </div>
      </div>
    </div>
  );
};

export default InputImage;
