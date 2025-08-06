const AddNewClub = ({ isOpen, onClose, club, setClub, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 overflow-y-auto'>
      <div className='bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-gray-800'>Add New Club</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-xl font-bold'
          >
            &times;
          </button>
        </div>

        {/* Basic Info */}
        <div className='mb-4'>
          <h3 className='text-sm font-semibold text-gray-600 mb-2'>
            Basic Information
          </h3>
          <div className=' md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                Club Name
              </label>
              <input
                type='text'
                placeholder='Enter club name'
                value={club.name}
                onChange={(e) => setClub({ ...club, name: e.target.value })}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className='block text-sm text-gray-700 mb-1'>
                  Country
                </label>
                <input
                  type='text'
                  placeholder='Select country'
                  value={club.country}
                  onChange={(e) =>
                    setClub({ ...club, country: e.target.value })
                  }
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-100'
                />
              </div>
              <div className="w-1/2">
                <label className='block text-sm text-gray-700 mb-1'>
                  State
                </label>
                <input
                  type='text'
                  placeholder='Enter state'
                  value={club.state}
                  onChange={(e) => setClub({ ...club, state: e.target.value })}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className='mb-4'>
          <h3 className='text-sm font-semibold text-gray-600 mb-2'>
            Admin Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                Super Club Admin Name
              </label>
              <input
                type='text'
                placeholder='Enter admin name'
                value={club.adminName}
                onChange={(e) =>
                  setClub({ ...club, adminName: e.target.value })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                Super Club Admin Email ID
              </label>
              <input
                type='email'
                placeholder='Enter admin email'
                value={club.adminEmail}
                onChange={(e) =>
                  setClub({ ...club, adminEmail: e.target.value })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
          </div>
        </div>

        {/* Club Members */}
        <div className='mb-4'>
          <h3 className='text-sm font-semibold text-gray-600 mb-2'>
            Club Members
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                Number of Club Admins
              </label>
              <input
                type='number'
                value={club.clubAdmins}
                onChange={(e) =>
                  setClub({ ...club, clubAdmins: Number(e.target.value) })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                Number of Coaches
              </label>
              <input
                type='number'
                value={club.coaches}
                onChange={(e) =>
                  setClub({ ...club, coaches: Number(e.target.value) })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                Number of Players
              </label>
              <input
                type='number'
                value={club.players}
                onChange={(e) =>
                  setClub({ ...club, players: Number(e.target.value) })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                Number of Data Analysts
              </label>
              <input
                type='number'
                value={club.analysts}
                onChange={(e) =>
                  setClub({ ...club, analysts: Number(e.target.value) })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
          </div>
        </div>

        {/* License Info */}
        <div className='mb-6'>
          <h3 className='text-sm font-semibold text-gray-600 mb-2'>
            License Period
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                License Start Date
              </label>
              <input
                type='date'
                value={club.startDate}
                onChange={(e) =>
                  setClub({ ...club, startDate: e.target.value })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>
                License End Date
              </label>
              <input
                type='date'
                value={club.endDate}
                onChange={(e) => setClub({ ...club, endDate: e.target.value })}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm'
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className='px-6 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary_400'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddNewClub;