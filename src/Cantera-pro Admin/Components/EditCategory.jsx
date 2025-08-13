import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const EditCategoryModal = ({ isOpen, onClose, onSave, country }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Effect to reset the state when a new country is selected for editing
  useEffect(() => {
    if (country) {
      setItems(country.categoryItems || []);
    } else {
      setItems([]);
    }
  }, [country]);

  if (!isOpen || !country) return null;

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem.trim()]);
      setNewItem(""); // Clear the input field
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = () => {
    // Create an updated country object and pass it to the parent
    const updatedCountry = { ...country, categoryItems: items };
    onSave(updatedCountry);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
        <h3 className='text-lg font-semibold text-gray-800'>
          Edit Category Items for {country.name}
        </h3>
        <p className='text-sm text-gray-500 mb-4'>
          Main Category: {country.category}
        </p>

        {/* List of current items */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Current Items:
          </label>
          <div className='flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]'>
            {items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full'
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className='ml-2 text-blue-600 hover:text-blue-800'
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-sm'>No items added yet.</p>
            )}
          </div>
        </div>

        {/* Input to add a new item */}
        <div className='mb-6'>
          <label
            htmlFor='newItem'
            className='block text-sm font-medium text-gray-700'
          >
            Add New Item
          </label>
          <div className='flex items-center gap-2 mt-1'>
            <input
              type='text'
              id='newItem'
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className='flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
              placeholder='e.g., U23'
            />
            <button
              onClick={handleAddItem}
              className='p-2 rounded-md bg-primary text-white hover:bg-primary_400'
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700'
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
