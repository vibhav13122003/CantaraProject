// Components/DeleteConfirmationModal.js
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  analystName,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-sm'>
        <div className='flex flex-col items-center text-center'>
          <div className='bg-red-100 p-3 rounded-full mb-4'>
            <FaExclamationTriangle className='text-red-600 text-2xl' />
          </div>
          <h2 className='text-xl font-semibold mb-2'>Confirm Deletion</h2>
          <p className='text-gray-600 mb-6'>
            Are you sure you want to delete{" "}
            <span className='font-bold'>{analystName}</span>? This action cannot
            be undone.
          </p>
          <div className='flex justify-center gap-4 w-full'>
            <button
              onClick={onClose}
              className='flex-1 px-4 py-2 rounded text-gray-700 bg-gray-200'
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className='flex-1 px-4 py-2 rounded text-white bg-red-600'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
