import React, { useState } from "react";

const categories = ["U13", "U15", "U17", "U19", "Senior", "Academy"];

// CHANGED: Component renamed to InviteDataAnalystModal and prop 'onAdd' to 'onInvite'
const InviteDataAnalystModal = ({ isOpen, onClose, onInvite }) => {
  // CHANGED: State now uses firstName and lastName instead of name
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "", // This state holds the email address as per the placeholder
    categories: [],
  });

  const handleToggleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const handleSubmit = () => {
    // Combine firstName and lastName into a single 'name' field before submitting
    const analystData = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      address: form.address,
      categories: form.categories,
    };
    onInvite(analystData);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96 space-y-4'>
        {/* CHANGED: Title updated */}
        <h2 className='text-lg font-semibold'>Invite Data Analyst</h2>

        {/* CHANGED: Replaced 'Full Name' with 'First Name' and 'Last Name' inputs */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <input
            type='text'
            placeholder='First Name'
            className='w-full border p-2 rounded'
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            type='text'
            placeholder='Last Name'
            className='w-full border p-2 rounded'
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <input
          type='email' // Changed type to 'email' for better semantics
          placeholder='Email Address'
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
                className={`border px-2 py-1 rounded text-sm transition-colors ${
                  form.categories.includes(cat)
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-4'>
          <button
            className='px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200'
            onClick={onClose}
          >
            Cancel
          </button>
          {/* CHANGED: Button text and onClick handler */}
          <button
            className='text-sm bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700'
            onClick={handleSubmit}
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteDataAnalystModal;
