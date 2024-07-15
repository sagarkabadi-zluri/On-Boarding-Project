// TopSection.js
import React from "react";

const TopSection = ({ onShowExpenseForm, onShowUploadCSV }) => (
  <div className="top-section flex flex-col items-center space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
    <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
    <div className="top-section-buttons space-x-4">
      <button
        onClick={onShowUploadCSV}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300"
      >
        Upload CSV
      </button>
      <button
        onClick={onShowExpenseForm}
        className="border border-solid border-purple-600 text-purple-600 py-2 px-4 rounded transition duration-300"
      >
        Add Expense
      </button>
    </div>
  </div>
);

export default TopSection;
