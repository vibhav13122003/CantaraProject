import React from "react";
import { FaFlag,  } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

const AddCountryModal = ({ isOpen, onClose, onSave, country, setCountry }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-white rounded-xl w-full max-w-md p-6 shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Add New Country
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-xl font-bold'
          >
            &times;
          </button>
        </div>

        {/* Country Name Field */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Country Name
          </label>
          <div className='relative'>
            <FaFlag className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Enter country name'
              className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600'
              value={country.name}
              onChange={(e) => setCountry({ ...country, name: e.target.value })}
            />
          </div>
        </div>

        {/* Category Name Field */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Category Name
          </label>
          <div className='relative'>
            <BiCategory className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Enter category name'
              className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600'
              value={country.category}
              onChange={(e) =>
                setCountry({ ...country, category: e.target.value })
              }
            />
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm rounded-lg bg-white text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className='px-4 py-2 text-sm rounded-lg bg-primary_400 text-white hover:bg-primary'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCountryModal;
