// src/App.js
import React, { useState } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "./components/ImageUploader";
import TextResult from "./components/TextResult";
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image
  const [text, setText] = useState(""); // To store the extracted text
  const [loading, setLoading] = useState(false); // To manage loading state

  // Handle the selected image from ImageUploader component
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setText("");  // Clear any previous text when a new image is selected
  };

  // Function to handle the OCR process
  const handleGetText = () => {
    if (selectedImage) {
      setLoading(true); // Set loading to true during OCR
      Tesseract.recognize(
        selectedImage, // Pass the image to Tesseract
        'eng', // Specify the language (English in this case)
        {
          logger: (m) => console.log(m), // Log OCR progress
          tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK // Set the mode for better alignment
        }
      )
      .then((result) => {
        // Format the text to remove excess spaces and lines
        const formattedText = result.data.text
          .replace(/\n\s*\n/g, '\n') // Remove excessive blank lines
          .replace(/\t/g, '    ')     // Replace tabs with spaces
          .replace(/ +/g, ' ');       // Replace multiple spaces with a single space
          
        setText(formattedText); // Set the formatted text
        setLoading(false); // Stop the loading indicator
      })
      .catch((error) => {
        console.error(error); // Log any errors
        setLoading(false); // Stop the loading indicator in case of error
      });
    }
  };

  return (
    <div className="container">
      {/* Component for image upload */}
      <ImageUploader onImageSelect={handleImageSelect} />

      {/* Component for displaying the text result */}
      <div>
        <TextResult 
          text={text} 
          loading={loading} 
          onButtonClick={handleGetText} // Trigger OCR when button is clicked
        />
      </div>
    </div>
  );
}

export default App;
