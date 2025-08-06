import React from "react";

const SavedFiltersModal = ({ scoutName, filters, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6'>
        <h2 className='text-lg font-semibold mb-1'>
          Saved Filters by {scoutName}
        </h2>
        <p className='text-sm text-gray-600 mb-4'>
          This scout has saved the following player filter preferences.
        </p>

        {filters.map((filter, idx) => (
          <div
            key={idx}
            className='mb-4 p-4 border-l-4 border-purple-600 bg-gray-50 rounded'
          >
            <div className='grid grid-cols-2 gap-y-1 text-sm text-gray-700'>
              <p>
                <strong>Player Type:</strong> {filter.playerType}
              </p>
              <p>
                <strong>Country:</strong> {filter.country}
              </p>
              <p>
                <strong>Category:</strong> {filter.category}
              </p>
              {filter.club && (
                <p>
                  <strong>Club Name:</strong> {filter.club}
                </p>
              )}
              <p>
                <strong>Age Range:</strong> {filter.ageRange}
              </p>
              <p>
                <strong>Footedness:</strong> {filter.foot}
              </p>
              <p>
                <strong>Gender:</strong> {filter.gender}
              </p>
              <p>
                <strong>Date Saved:</strong> {filter.date}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={onClose}
          className='w-full bg-purple-700 text-white py-2 rounded mt-4'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SavedFiltersModal;
