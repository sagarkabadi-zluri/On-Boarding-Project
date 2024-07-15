import React from 'react';

const Confirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <p className="text-lg mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-center space-x-2">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-1 px-3 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
