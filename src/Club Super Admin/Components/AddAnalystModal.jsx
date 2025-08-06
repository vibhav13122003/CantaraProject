import React, { useState } from "react";

const categories = ["U13", "U15", "U17", "U19", "Senior", "Academy"];

const AddDataAnalystModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({ name: "", address: "", categories: [] });

  const handleToggleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96 space-y-4'>
        <h2 className='text-lg font-semibold'>Add Data Analyst</h2>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full border p-2 rounded'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type='text'
          placeholder='Address'
          className='w-full border p-2 rounded'
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <div>
          <p className='mb-2 text-sm font-medium'>Assign Categories</p>
          <div className='flex flex-wrap gap-2'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleToggleCategory(cat)}
                className={`border px-2 py-1 rounded text-sm ${
                  form.categories.includes(cat)
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <button className='text-sm text-gray-500' onClick={onClose}>
            Cancel
          </button>
          <button
            className='text-sm bg-purple-600 text-white px-4 py-2 rounded'
            onClick={() => {
              onAdd(form);
              onClose();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDataAnalystModal;
