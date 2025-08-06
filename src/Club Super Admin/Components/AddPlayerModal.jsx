import React, { useState } from "react";

const categoriesList = ["U17", "U19", "Reserve", "First Team"];
const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

const AddPlayerModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    jersey: "",
    position: "",
    categories: [],
  });

  const toggleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.jersey || !form.position)
      return alert("All fields are required");
    onAdd(form);
  };

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg w-full max-w-lg shadow-xl'>
        <h2 className='text-lg font-semibold mb-4'>Add New Player</h2>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full border px-3 py-2 mb-3 rounded-md'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type='email'
          placeholder='Email'
          className='w-full border px-3 py-2 mb-3 rounded-md'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type='number'
          placeholder='Jersey Number'
          className='w-full border px-3 py-2 mb-3 rounded-md'
          value={form.jersey}
          onChange={(e) => setForm({ ...form, jersey: e.target.value })}
        />
        <select
          className='w-full border px-3 py-2 mb-3 rounded-md'
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        >
          <option value=''>Select Position</option>
          {positions.map((pos, i) => (
            <option key={i} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        <div className='mb-4'>
          <p className='font-medium mb-1'>Categories</p>
          <div className='flex gap-2 flex-wrap'>
            {categoriesList.map((cat) => (
              <label
                key={cat}
                className='text-sm px-3 py-1 border rounded-full cursor-pointer'
              >
                <input
                  type='checkbox'
                  className='mr-2'
                  checked={form.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className='flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 border rounded-md text-sm'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-purple-700 text-white rounded-md text-sm'
          >
            Add Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerModal;
