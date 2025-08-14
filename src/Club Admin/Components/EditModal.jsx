// Components/EditAnalystModal.js
import React, { useState, useEffect } from "react";

const allCategories = ["U13", "U15", "U17", "U19", "Senior", "Academy"];

const EditAnalystModal = ({ isOpen, onClose, onUpdate, analystData }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    categories: [],
  });

  // Pre-fill the form when the modal is opened or analystData changes
  useEffect(() => {
    if (analystData) {
      setForm({
        name: analystData.name || "",
        email: analystData.email || "",
        role: analystData.role || "",
        categories: analystData.categories || [],
      });
    }
  }, [analystData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category) => {
    setForm((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>Edit Data Analyst</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Full Name
            </label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Role
            </label>
            <input
              type='text'
              name='role'
              value={form.role}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Assign Categories
            </label>
            <div className='flex flex-wrap gap-2'>
              {allCategories.map((category) => (
                <button
                  type='button'
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    form.categories.includes(category)
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className='flex justify-end gap-4 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 rounded text-gray-700 bg-gray-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 rounded text-white bg-purple-700'
            >
              Update Analyst
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnalystModal;
