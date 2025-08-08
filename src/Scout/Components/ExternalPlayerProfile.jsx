
import React from "react";
import { FaTimes, FaEdit, FaEye } from "react-icons/fa";

const ExternalPlayerProfile = ({ player, onClose }) => {
  const dummyMatchData = [
    {
      date: "Apr 22, 2025",
 
      competition: "U18 Premier League",
      opponent: "Liverpool U18",
      goals: 1,
      assists: 2,
      finalScore: "3-1 (Win)",
    },
    {
      date: "Apr 15, 2025",
      competition: "FA Youth Cup",
      opponent: "Chelsea U18",
      goals: 0,
      assists: 1,
      finalScore: "2-2 (Draw)",
    },
    {
      date: "Apr 8, 2025",
      competition: "U18 Premier League",
      opponent: "Arsenal U18",
      goals: 2,
      assists: 0,
      finalScore: "4-0 (Win)",
    },
  ];

  if (!player) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center'>
      <div className='bg-white w-[95%] max-w-7xl rounded-xl shadow-lg p-6 max-h-[95vh] overflow-y-auto relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl'
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            External Player Profile
          </h2>
          <p className='text-sm text-gray-500'>
            View and manage player information
          </p>
        </div>

        {/* Info Grid */}
        {/* Info Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          {/* Personal Info */}
          <div className='md:col-span-2 bg-white border rounded-lg p-6 shadow-sm'>
            <h4 className='text-md font-semibold text-gray-800 mb-4'>
              Personal Information
            </h4>

            {/* Two-column grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700'>
              <div>
                <div className='text-gray-400 text-xs'>Full Name</div>
                <div className='font-medium'>Lionel Messi</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>Email</div>
                <div className='font-medium'>GoatMessi@example.com</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>Country</div>
                <div className='font-medium'>England</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>Country</div>
                <div className='font-medium'>England</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>State</div>
                <div className='font-medium'>Manchester</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>Age / Birth Year</div>
                <div className='font-medium'>17 years / 2008</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>Category / Position</div>
                <div className='font-medium'>U-19 / Central Midfielder</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>Coach</div>
                <div className='font-medium'>Alex Mill</div>
              </div>
              <div>
                <div className='text-gray-400 text-xs'>Current Club</div>
                <div className='font-medium'>Manchester City Academy</div>
              </div>
            </div>
          </div>

          {/* Subscription Info */}
          <div className='bg-white border rounded-lg p-6 shadow-sm flex flex-col justify-between'>
            <div>
              <h4 className='text-md font-semibold text-gray-800 mb-4'>
                Subscription Details
              </h4>

              <div className='text-sm text-gray-700 space-y-3'>
                <div>
                  <span className='text-gray-400 text-xs block mb-1'>
                    Status
                  </span>
                  <span className='inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full'>
                    ● Subscribed
                  </span>
                </div>

                <div>
                  <span className='text-gray-400 text-xs block mb-1'>
                    Subscription Type
                  </span>
                  <div className='font-medium'>Yearly</div>
                </div>

                <div>
                  <span className='text-gray-400 text-xs block mb-1'>
                    Start Date
                  </span>
                  <div className='font-medium'>January 15, 2025</div>
                </div>

                <div>
                  <span className='text-gray-400 text-xs block mb-1'>
                    End Date
                  </span>
                  <div className='font-medium'>January 15, 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='mb-4 border-b'>
          <ul className='flex gap-6 text-sm font-medium text-gray-600'>
            <li className='text-purple-700 border-b-2 border-purple-700 pb-2'>
              Match History
            </li>
            <li className='hover:text-purple-700 cursor-pointer'>Videos</li>
            <li className='hover:text-purple-700 cursor-pointer'>
              Wellness Activity
            </li>
          </ul>
        </div>

        {/* Match History Table */}
        <div className='overflow-x-auto border rounded-lg'>
          <table className='w-full text-sm text-left'>
            <thead className='bg-gray-100 text-gray-700 font-medium'>
              <tr>
                <th className='px-4 py-2'>Date</th>
                <th className='px-4 py-2'>Competition</th>
                <th className='px-4 py-2'>Opponent</th>
                <th className='px-4 py-2'>Goals</th>
                <th className='px-4 py-2'>Assists</th>
                <th className='px-4 py-2'>Final Score</th>
                <th className='px-4 py-2 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {dummyMatchData.map((match, i) => (
                <tr key={i} className='border-t'>
                  <td className='px-4 py-2'>{match.date}</td>
                  <td className='px-4 py-2'>{match.competition}</td>
                  <td className='px-4 py-2'>{match.opponent}</td>
                  <td className='px-4 py-2'>{match.goals}</td>
                  <td className='px-4 py-2'>{match.assists}</td>
                  <td className='px-4 py-2'>{match.finalScore}</td>
                  <td className='px-4 py-2 text-center text-purple-700 hover:text-purple-900 cursor-pointer'>
                    <FaEye className='inline' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
          <p>Showing 1 to 3 of 12 entries</p>
          <div className='space-x-2'>
            <button className='px-3 py-1 border rounded text-gray-600 hover:bg-gray-100'>
              Previous
            </button>
            <button className='px-3 py-1 bg-purple-700 text-white rounded'>
              1
            </button>
            <button className='px-3 py-1 border rounded text-gray-600 hover:bg-gray-100'>
              2
            </button>
            <button className='px-3 py-1 border rounded text-gray-600 hover:bg-gray-100'>
              3
            </button>
            <button className='px-3 py-1 border rounded text-gray-600 hover:bg-gray-100'>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalPlayerProfile;
