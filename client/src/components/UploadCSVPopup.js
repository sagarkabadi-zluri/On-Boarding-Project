// UploadCSVPopup.js
import React from 'react';
import UploadCSV from './UploadCsv';

const UploadCSVPopup = ({ onUpload, onClose }) => (
  <div className="upload-csv-popup">
    <div className="upload-csv-container">
      <UploadCSV onUpload={onUpload} onClose={onClose} />
    </div>
  </div>
);

export default UploadCSVPopup;
