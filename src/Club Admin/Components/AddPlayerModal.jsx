import React, { useState } from "react";

// NEW COMPONENT: Replaces AddPlayerModal
const InvitePlayerModal = ({ onClose, onInvite }) => {
  const [playerData, setPlayerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jersey: "",
    position: "Forward", // Default value
    status: "Active", // Default value
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvite = (e) => {
    e.preventDefault();
    // Combine first and last name to create the full name
    const newPlayer = {
      ...playerData,
      name: `${playerData.firstName} ${playerData.lastName}`.trim(),
      jersey: Number(playerData.jersey), // Ensure jersey is a number
      // Dummy categories for now, can be improved with a multi-select
      categories: ["First Team"],
    };
    // We don't need firstName and lastName in the final object
    delete newPlayer.firstName;
    delete newPlayer.lastName;

    onInvite(newPlayer);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold'>Invite New Player</h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-800'
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleInvite}>
          <div className='space-y-4'>
            {/* NEW: Two text boxes for first name and last name */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  First Name
                </label>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  required
                  value={playerData.firstName}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
                />
              </div>
              <div>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last Name
                </label>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  required
                  value={playerData.lastName}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
                />
              </div>
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
                value={playerData.email}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='jersey'
                className='block text-sm font-medium text-gray-700'
              >
                Jersey No.
              </label>
              <input
                type='number'
                name='jersey'
                id='jersey'
                required
                value={playerData.jersey}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='position'
                className='block text-sm font-medium text-gray-700'
              >
                Position
              </label>
              <select
                name='position'
                id='position'
                value={playerData.position}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
              >
                <option>Forward</option>
                <option>Midfielder</option>
                <option>Defender</option>
                <option>Goalkeeper</option>
              </select>
            </div>
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
              Invite Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvitePlayerModal;
