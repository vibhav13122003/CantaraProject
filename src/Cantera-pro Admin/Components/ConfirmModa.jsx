import React from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-white rounded-xl w-full max-w-sm p-6 shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-xl font-bold'
          >
            &times;
          </button>
        </div>
        <p className='text-gray-700 mb-6'>{message}</p>

        <div className='flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm rounded-lg bg-white text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
