import React, { useState, useEffect } from "react";

// The modal now accepts `onSave`, `initialData`, and `title` props.
const AddCoachModal = ({ onClose, onSave, initialData, title }) => {
  const [coach, setCoach] = useState({
    name: "",
    email: "",
    role: "Assistant Coach", // Default role
    categories: [],
  });

  // NEW: useEffect to populate form if in "Edit" mode
  useEffect(() => {
    if (initialData) {
      setCoach(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoach((prev) => ({ ...prev, [name]: value }));
  };

  // A simple category handler (can be improved with a proper multi-select component)
  const handleCategoryChange = (e) => {
    const categories = e.target.value
      .split(",")
      .map((cat) => cat.trim())
      .filter(Boolean);
    setCoach((prev) => ({ ...prev, categories }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(coach);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-lg'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Full Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              required
              value={coach.name}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email Address
            </label>
            <input
              type='email'
              name='email'
              id='email'
              required
              value={coach.email}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500'
            />
          </div>
          <div>
            <label
              htmlFor='role'
              className='block text-sm font-medium text-gray-700'
            >
              Role
            </label>
            <select
              name='role'
              id='role'
              value={coach.role}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500'
            >
              <option>Head Coach</option>
              <option>Assistant Coach</option>
              <option>Fitness Coach</option>
              <option>Goalkeeper Coach</option>
              <option>Technical Coach</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='categories'
              className='block text-sm font-medium text-gray-700'
            >
              Assigned Categories (comma-separated)
            </label>
            <input
              type='text'
              name='categories'
              id='categories'
              value={coach.categories.join(", ")}
              onChange={handleCategoryChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500'
            />
          </div>
          <div className='mt-6 flex justify-end gap-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-800'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoachModal;
