import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header"; 

const mockMatches = [
  {
    tournamentName: "Regional Youth Cup 2025",
    matchName: "Cantera FC vs Riverside United",
    category: "U15",
    opponentName: "Riverside United",
    matchType: "Home",
    location: "Cantera Stadium",
    dateTime: "2025-05-31T15:00:00",
    formation: "4-3-3",
    status: "Scheduled",
  },
  {
    tournamentName: "City Championship 2025",
    matchName: "Cantera FC vs Metro Academy",
    category: "U17",
    opponentName: "Metro Academy",
    matchType: "Away",
    location: "Metro Stadium",
    dateTime: "2025-06-05T17:30:00",
    formation: "4-4-2",
    status: "Scheduled",
  },
  {
    tournamentName: "Summer League 2025",
    matchName: "Cantera FC vs Westside FC",
    category: "U13",
    opponentName: "Westside FC",
    matchType: "Home",
    location: "Cantera Stadium",
    dateTime: "2025-05-28T14:00:00",
    formation: "4-3-3",
    status: "Completed",
  },
  {
    tournamentName: "National Youth Tournament",
    matchName: "Cantera FC vs Eastern Elites",
    category: "U19",
    opponentName: "Eastern Elites",
    matchType: "Away",
    location: "National Stadium",
    dateTime: "2025-06-12T19:00:00",
    formation: "3-5-2",
    status: "Scheduled",
  },
  {
    tournamentName: "City Championship 2025",
    matchName: "Cantera FC vs Northside Academy",
    category: "U15",
    opponentName: "Northside Academy",
    matchType: "Home",
    location: "Cantera Stadium",
    dateTime: "2025-05-25T16:00:00",
    formation: "4-3-3",
    status: "Completed",
  },
];

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);
  return `${formattedDate} - ${formattedTime}`;
};

const EditIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4 text-gray-500 hover:text-purple-600'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z'
    />
  </svg>
);
const CopyIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4 text-gray-500 hover:text-purple-600'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
    />
  </svg>
);
const DeleteIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4 text-gray-500 hover:text-red-600'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    />
  </svg>
);

export default function MatchSchedule() {
  const [matches, setMatches] = useState(mockMatches);

  const getStatusClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 bg-gray-50 min-h-screen'>
        <Header title='Match Schedule' />

        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Match Schedule
            </h2>
            <button className='bg-purple-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-purple-700 transition'>
              + Add Match
            </button>
          </div>

          <div className='bg-white p-4 rounded-lg shadow mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end'>
              <div className='flex flex-col'>
                <label className='text-xs font-semibold text-gray-600 mb-1'>
                  Tournament
                </label>
                <select className='border border-gray-300 rounded-md p-2 text-sm'>
                  <option>All Tournaments</option>
                  <option>Regional Youth Cup 2025</option>
                  <option>City Championship 2025</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='text-xs font-semibold text-gray-600 mb-1'>
                  Category
                </label>
                <select className='border border-gray-300 rounded-md p-2 text-sm'>
                  <option>All Categories</option>
                  <option>U15</option>
                  <option>U17</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='text-xs font-semibold text-gray-600 mb-1'>
                  Match Status
                </label>
                <select className='border border-gray-300 rounded-md p-2 text-sm'>
                  <option>All Matches</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className='flex flex-col col-span-2 md:col-span-2 lg:col-span-1'>
                <label className='text-xs font-semibold text-gray-600 mb-1'>
                  Date Range
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    type='date'
                    className='border border-gray-300 rounded-md p-2 text-sm w-full'
                  />
                  <span className='text-gray-500'>to</span>
                  <input
                    type='date'
                    className='border border-gray-300 rounded-md p-2 text-sm w-full'
                  />
                </div>
              </div>
              <button className='bg-purple-600 text-white px-4 py-2 rounded-md h-fit font-semibold shadow hover:bg-purple-700 transition'>
                Apply Filters
              </button>
            </div>
          </div>
          
          <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
            <table className='min-w-full text-sm text-left text-gray-700'>
              <thead className='bg-gray-100 text-xs font-semibold uppercase'>
                <tr>
                  <th className='px-6 py-3'>Tournament Name</th>
                  <th className='px-6 py-3'>Match Name</th>
                  <th className='px-6 py-3'>Category</th>
                  <th className='px-6 py-3'>Opponent Name</th>
                  <th className='px-6 py-3'>Match Type</th>
                  <th className='px-6 py-3'>Location</th>
                  <th className='px-6 py-3'>Date & Time</th>
                  <th className='px-6 py-3'>Formation</th>
                  <th className='px-6 py-3'>Status</th>
                  <th className='px-6 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {matches.map((match, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 font-medium'>
                      {match.tournamentName}
                    </td>
                    <td className='px-6 py-4'>{match.matchName}</td>
                    <td className='px-6 py-4'>{match.category}</td>
                    <td className='px-6 py-4'>{match.opponentName}</td>
                    <td className='px-6 py-4'>{match.matchType}</td>
                    <td className='px-6 py-4'>{match.location}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {formatDateTime(match.dateTime)}
                    </td>
                    <td className='px-6 py-4'>{match.formation}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusClass(
                          match.status
                        )}`}
                      >
                        {match.status}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <button title='Edit'>
                          <EditIcon />
                        </button>
                        <button title='Copy'>
                          <CopyIcon />
                        </button>
                        <button title='Delete'>
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
