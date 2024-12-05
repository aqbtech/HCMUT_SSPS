import React from 'react';

const ErrorForm = ({ message, onClose, type = 'error' }) => { // Add type prop
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50`}>
      <div className={`bg-white p-4 rounded shadow-md text-center ${type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}> 
        <p>{message}</p>
        <button 
          onClick={onClose} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorForm;