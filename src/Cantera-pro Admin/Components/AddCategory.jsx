import React, { useState } from "react";
import { FaFlag, FaTimes, FaList } from "react-icons/fa";

// Data for the country and category dropdowns
const countryData = {
  "United States": ["States", "Cities", "Territories"],
  Canada: ["Provinces", "Territories", "Cities"],
  Mexico: ["States", "Cities"],
  Brazil: ["States", "Cities"],
  "United Kingdom": ["Countries", "Cities"],
  France: ["Regions", "Departments", "Cities"],
  Germany: ["States", "Cities"],
  Japan: ["Prefectures", "Cities"],
  Australia: ["States", "Territories", "Cities"],
  India: ["States", "Union Territories", "Cities"],
};

// Reusable modal component with the requested changes
const AddCategoryItemModal = ({
  isOpen,
  onClose,
  onSave,
  country,
  setCountry,
}) => {
  if (!isOpen) return null;

  // Get the categories for the currently selected country
  const categories = countryData[country.name] || [];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4'>
      <div className='bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all scale-100 ease-out duration-300'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>
            Add New Category Item
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-900 transition-colors duration-200'
          >
            <FaTimes className='w-6 h-6' />
          </button>
        </div>

        {/* Country Select Dropdown */}
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            Select Country
          </label>
          <div className='relative'>
            <FaFlag className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <select
              className='w-full border-2 border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200'
              value={country.name}
              onChange={(e) =>
                setCountry({
                  name: e.target.value,
                  category: "",
                  categoryItem: "",
                })
              }
            >
              <option value='' disabled>
                Select a country
              </option>
              {Object.keys(countryData).map((countryName) => (
                <option key={countryName} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Name Dropdown (now dependent on country) */}
        <div className='mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            Select Category
          </label>
          <div className='relative'>
            <FaList className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <select
              className='w-full border-2 border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200'
              value={country.category}
              onChange={(e) =>
                setCountry({ ...country, category: e.target.value })
              }
              disabled={!country.name}
            >
              <option value='' disabled>
                Select a category
              </option>
              {categories.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Item Field */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            Category Item
          </label>
          <div className='relative'>
            <FaList className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Enter category item'
              className='w-full border-2 border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200'
              value={country.categoryItem}
              onChange={(e) =>
                setCountry({ ...country, categoryItem: e.target.value })
              }
              disabled={!country.category}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-6 py-2 text-sm font-medium rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200'
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className='px-6 py-2 text-sm font-medium rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200'
            disabled={
              !country.name || !country.category || !country.categoryItem
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


export default AddCategoryItemModal;