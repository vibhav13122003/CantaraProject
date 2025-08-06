import React, { useState } from "react";

const categoriesList = ["U-19", "U-21", "First Team", "Reserve"];

const AddCoachModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);

  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && address && categories.length) {
      onAdd({ name, address, categories });
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6'>
        <h2 className='text-lg font-semibold mb-4'>Add Coach</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Full Name</label>
            <input
              type='text'
              className='mt-1 w-full border rounded-md px-3 py-2 text-sm'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Address</label>
            <input
              type='text'
              className='mt-1 w-full border rounded-md px-3 py-2 text-sm'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Assign Categories
            </label>
            <div className='flex flex-wrap gap-2 mt-2'>
              {categoriesList.map((cat) => (
                <label
                  key={cat}
                  className='text-sm px-3 py-1 border rounded-full cursor-pointer flex items-center gap-1'
                >
                  <input
                    type='checkbox'
                    checked={categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div className='flex justify-end gap-2 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm bg-gray-200 rounded-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-sm bg-purple-700 text-white rounded-md'
            >
              Add Coach
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoachModal;
