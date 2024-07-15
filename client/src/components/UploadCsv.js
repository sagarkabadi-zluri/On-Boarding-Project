import React, { useState, useEffect } from "react";
import { uploadCSV } from "../api";

const UploadCSV = ({ onUpload, onClose }) => {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => setUploadSuccess(null), 2000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [uploadSuccess]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadError(null); // Reset upload error when file changes
    setUploadSuccess(null); // Reset success message when file changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);
      try {
        await uploadCSV(file);
        setUploadSuccess("File uploaded successfully");
        onUpload();
      } catch (error) {
        console.error(error);
        setUploadError("Failed to upload file");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRetry = async () => {
    setUploadError(null); // Clear previous upload error
    setIsUploading(true);
    try {
      await uploadCSV(file); // Attempt upload again
      setUploadSuccess("File uploaded successfully");
      onUpload();
    } catch (error) {
      console.error(error);
      setUploadError("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-csv-popup fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="upload-csv-container bg-white p-6 rounded-md shadow-lg">
        {uploadSuccess && (
          <div className="upload-success  bg-green-100 mx-6 p-4 rounded-md">
            <p className="text-green-600 ">{uploadSuccess}</p>
          </div>
        )}
        {uploadError && (
          <div className="upload-error mt-4 bg-red-100 mx-6 py-4 rounded-md">
            <p className="text-red-600">{uploadError}</p>
            <button
              onClick={handleRetry}
              className="bg-purple-500 text-white px-4 py-2 mt-2 rounded-md"
            >
              Retry
            </button>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex my-2 flex-col items-center space-y-4"
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className={`bg-purple-500 text-white px-4 py-2 rounded-md ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUploading}
            >
              {isUploading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Upload"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default UploadCSV;
