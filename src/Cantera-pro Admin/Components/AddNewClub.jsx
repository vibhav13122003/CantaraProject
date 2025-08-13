import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

// A list of countries for the dropdown. This can be moved to a separate file or fetched from an API.
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Australia",
  "Austria",
  "Bahamas",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Croatia",
  "Cuba",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Kenya",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Portugal",
  "Qatar",
  "Russia",
  "Saudi Arabia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
];

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
          <div className='space-y-4'>
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
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/2'>
                <label className='block text-sm text-gray-700 mb-1'>
                  Country
                </label>
                {/* --- MODIFICATION START --- */}
                <select
                  value={club.country}
                  onChange={(e) =>
                    setClub({ ...club, country: e.target.value })
                  }
                  // Note: Adjusted class for proper select element styling
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
                >
                  <option value='' disabled>
                    Select a country
                  </option>
                  {countries.map((countryName) => (
                    <option key={countryName} value={countryName}>
                      {countryName}
                    </option>
                  ))}
                </select>
                {/* --- MODIFICATION END --- */}
              </div>
              <div className='w-full md:w-1/2'>
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
                min='0'
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
                min='0'
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
                min='0'
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
                min='0'
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
                <div className='relative'>
                  <input
                    type='date'
                    value={club.startDate}
                    onChange={(e) =>
                      setClub({ ...club, startDate: e.target.value })
                    }
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-sm pr-10 ${
                      !club.startDate ? "text-gray-400" : "text-gray-900"
                    }`}
                  />
                  <FaCalendarAlt className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                </div>
              </div>
              <div>
                <label className='block text-sm text-gray-700 mb-1'>
                  License End Date
                </label>
                <div className='relative'>
                  <input
                    type='date'
                    value={club.endDate}
                    onChange={(e) =>
                      setClub({ ...club, endDate: e.target.value })
                    }
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-sm pr-10 ${
                      !club.endDate ? "text-gray-400" : "text-gray-900"
                    }`}
                  />
                  <FaCalendarAlt className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                </div>
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
