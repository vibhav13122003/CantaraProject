import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaTimes,
  FaEye,
  FaEdit,
  FaFileExport,
} from "react-icons/fa";

// --- Mock Data for the Scoreboard Page and Modal ---
const scorecardsData = [
  {
    id: 1,
    matchName: "Arsenal FC vs Chelsea FC",
    category: "Premier League",
    dateTime: "Apr 24, 2025 - 20:00",
    finalScore: "2 - 1",
    submittedOn: "Apr 24, 2025",
    status: "Editable",
  },
  {
    id: 2,
    matchName: "FC Barcelona vs Real Madrid",
    category: "La Liga",
    dateTime: "Apr 23, 2025 - 19:30",
    finalScore: "0 - 0",
    submittedOn: "Apr 23, 2025",
    status: "Locked",
  },
  {
    id: 3,
    matchName: "Manchester City vs Liverpool FC",
    category: "Premier League",
    dateTime: "Apr 22, 2025 - 15:00",
    finalScore: "3 - 2",
    submittedOn: "Apr 22, 2025",
    status: "Editable",
  },
  {
    id: 4,
    matchName: "Bayern Munich vs Borussia Dortmund",
    category: "Bundesliga",
    dateTime: "Apr 21, 2025 - 18:30",
    finalScore: "4 - 1",
    submittedOn: "Apr 21, 2025",
    status: "Locked",
  },
  {
    id: 5,
    matchName: "Juventus vs AC Milan",
    category: "Serie A",
    dateTime: "Apr 20, 2025 - 20:45",
    finalScore: "1 - 1",
    submittedOn: "Apr 20, 2025",
    status: "Editable",
  },
  {
    id: 6,
    matchName: "Paris Saint-Germain vs Olympique Marseille",
    category: "Ligue 1",
    dateTime: "Apr 19, 2025 - 21:00",
    finalScore: "2 - 0",
    submittedOn: "Apr 19, 2025",
    status: "Locked",
  },
  {
    id: 7,
    matchName: "Manchester United vs Tottenham Hotspur",
    category: "Premier League",
    dateTime: "Apr 18, 2025 - 17:30",
    finalScore: "1 - 3",
    submittedOn: "Apr 18, 2025",
    status: "Editable",
  },
];

const scoreboardPlayerData = [
  {
    s_no: 1,
    jersey: 1,
    first_name: "Ter Stegen",
    last_name: "Marc-André",
    shots: 0,
    goals: 0,
    assists: 0,
    corner_kicks: 0,
    penalty_kicks: 0,
    fouls: 0,
    offsides: 0,
    yellow_cards: 0,
    red_cards: 0,
    def_actions: 2,
    in_band: true,
    sub: false,
  },
  {
    s_no: 2,
    jersey: 4,
    first_name: "Araujo",
    last_name: "Ronald",
    shots: 1,
    goals: 0,
    assists: 0,
    corner_kicks: 0,
    penalty_kicks: 0,
    fouls: 2,
    offsides: 0,
    yellow_cards: 1,
    red_cards: 0,
    def_actions: 8,
    in_band: true,
    sub: false,
  },
  // ... more players
];

const benchPlayerData = [
  {
    s_no: 12,
    jersey: 4,
    first_name: "Araujo",
    last_name: "Ronald",
    shots: 1,
    goals: 0,
    assists: 0,
    corner_kicks: 0,
    penalty_kicks: 0,
    fouls: 2,
    offsides: 0,
    yellow_cards: 1,
    red_cards: 0,
    def_actions: 8,
    in_band: true,
    sub: false,
  },
  // ... more bench players
];

// --- Scoreboard Modal Component ---
const ScoreboardModal = ({ scorecard, onClose }) => {
  if (!scorecard) return null;

  const metadata = {
    clubName: "FC Barcelona Academy",
    matchType: "Home",
    category: "U15",
    matchDate: "Apr 24, 2025",
    matchTime: "19:30",
    location: "Ciudad Deportiva Joan Gamper",
    match: scorecard.matchName,
    teamFormation: "4-3-3",
  };
  const playerStatsHeaders = [
    "S.No",
    "Jersey",
    "First Name",
    "Last Name",
    "Shots",
    "Goals",
    "Assists",
    "Corner Kicks",
    "Penalty Kicks",
    "Fouls",
    "Offsides",
    "Yellow Cards",
    "Red Cards",
    "Def. Actions",
    "In Band",
    "Sub",
  ];

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-10 pb-10 overflow-y-auto'>
      <div className='bg-gray-50 rounded-lg shadow-2xl w-full max-w-6xl relative m-4'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10'
        >
          <FaTimes size={20} />
        </button>
        <div className='p-8 space-y-8'>
          <h2 className='text-2xl font-bold text-gray-900'>Scorecard</h2>
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Match Metadata</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm'>
              <div>
                <p className='font-medium text-gray-500'>Club Name</p>
                <p className='font-semibold'>{metadata.clubName}</p>
              </div>
              <div>
                <p className='font-medium text-gray-500'>Match Type</p>
                <p className='font-semibold'>{metadata.matchType}</p>
              </div>
              <div>
                <p className='font-medium text-gray-500'>Category</p>
                <p className='font-semibold'>{metadata.category}</p>
              </div>
              <div>
                <p className='font-medium text-gray-500'>Match Date</p>
                <p className='font-semibold'>{metadata.matchDate}</p>
              </div>
              <div>
                <p className='font-medium text-gray-500'>Match Time</p>
                <p className='font-semibold'>{metadata.matchTime}</p>
              </div>
              <div>
                <p className='font-medium text-gray-500'>Location</p>
                <p className='font-semibold'>{metadata.location}</p>
              </div>
              <div className='col-span-2'>
                <p className='font-medium text-gray-500'>Match</p>
                <p className='font-semibold'>{metadata.match}</p>
              </div>
              <div>
                <p className='font-medium text-gray-500'>Team Formation</p>
                <p className='font-semibold'>{metadata.teamFormation}</p>
              </div>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Final Score</h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-sm'>
                <thead>
                  <tr className='border-b'>
                    {playerStatsHeaders.map((h) => (
                      <th
                        key={h}
                        className='py-2 px-1 font-medium text-gray-600'
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scoreboardPlayerData.map((p) => (
                    <tr key={p.s_no} className='border-b'>
                      {Object.values(p).map((val, i) => (
                        <td key={i} className='py-2 px-1'>
                          {typeof val === "boolean" ? (
                            <input
                              type='checkbox'
                              defaultChecked={val}
                              className='form-checkbox h-4 w-4 text-purple-600 rounded'
                            />
                          ) : (
                            val
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Bench</h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-sm'>
                <thead>
                  <tr className='border-b'>
                    {playerStatsHeaders.map((h) => (
                      <th
                        key={h}
                        className='py-2 px-1 font-medium text-gray-600'
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {benchPlayerData.map((p) => (
                    <tr key={p.s_no} className='border-b'>
                      {Object.values(p).map((val, i) => (
                        <td key={i} className='py-2 px-1'>
                          {typeof val === "boolean" ? (
                            <input
                              type='checkbox'
                              defaultChecked={val}
                              className='form-checkbox h-4 w-4 text-purple-600 rounded'
                            />
                          ) : (
                            val
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- The main content area of the Scoreboard page ---
const ScoreboardContent = ({ onOpenScorecard }) => {
  const [showEditable, setShowEditable] = useState(false);
  const getStatusClass = (status) =>
    status === "Editable" ? "text-green-600" : "text-gray-500";

  return (
    <div className='space-y-6'>
      {/* Filter Section */}
      <div className='bg-white p-6 rounded-xl shadow-sm border'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-end'>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Category
            </label>
            <select className='w-full mt-1 p-2 border rounded-lg'>
              <option>All Categories</option>
            </select>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Date Range
            </label>
            <div className='flex items-center mt-1'>
              <input
                type='text'
                placeholder='-/-/-'
                className='w-1/2 p-2 border rounded-l-lg'
              />
              <input
                type='text'
                placeholder='-/-/-'
                className='w-1/2 p-2 border border-l-0 rounded-r-lg'
              />
            </div>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Club Name
            </label>
            <select className='w-full mt-1 p-2 border rounded-lg'>
              <option>All Clubs</option>
            </select>
          </div>
          <div className='relative'>
            <label className='text-sm font-medium text-gray-700'>
              Search Match
            </label>
            <FaSearch className='absolute top-10 left-3 text-gray-400' />
            <input
              type='text'
              placeholder='Search by match name...'
              className='w-full mt-1 p-2 pl-10 border rounded-lg'
            />
          </div>
          <button className='flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg h-10'>
            <FaFilter />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Scorecards Table */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Scorecards (128)
          </h3>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 text-sm'>
              <label htmlFor='editableToggle' className='text-gray-600'>
                Show editable only
              </label>
              <div
                className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
                  showEditable ? "bg-purple-600" : "bg-gray-300"
                }`}
                onClick={() => setShowEditable(!showEditable)}
              >
                <div
                  className={`bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${
                    showEditable ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </div>
            <button className='flex items-center gap-2 text-purple-600 font-semibold'>
              <FaFileExport />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='bg-gray-50 text-sm text-gray-600'>
                <th className='p-4 font-medium'>Match Name</th>
                <th className='p-4 font-medium'>Category</th>
                <th className='p-4 font-medium'>Date & Time</th>
                <th className='p-4 font-medium'>Final Score</th>
                <th className='p-4 font-medium'>Submitted ON</th>
                <th className='p-4 font-medium'>Status</th>
                <th className='p-4 font-medium text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scorecardsData.map((row) => (
                <tr key={row.id} className='border-b hover:bg-gray-50'>
                  <td className='p-4 font-semibold text-gray-700 whitespace-nowrap'>
                    {row.matchName}
                  </td>
                  <td className='p-4'>
                    <span className='bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full'>
                      {row.category}
                    </span>
                  </td>
                  <td className='p-4 text-gray-600 whitespace-nowrap'>
                    {row.dateTime}
                  </td>
                  <td className='p-4 font-bold text-gray-800'>
                    {row.finalScore}
                  </td>
                  <td className='p-4 text-gray-600'>{row.submittedOn}</td>
                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          getStatusClass(row.status) === "text-green-600"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${getStatusClass(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </td>
                  <td className='p-4 text-center'>
                    <div className='flex justify-center items-center gap-2'>
                      <button
                        onClick={() => onOpenScorecard(row)}
                        className='flex items-center gap-1 text-gray-600 hover:text-purple-600'
                      >
                        <FaEye />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => onOpenScorecard(row)}
                        className='flex items-center gap-1 text-gray-600 hover:text-purple-600'
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
          <span>Showing 1 to 7 of 128 results</span>
          <div className='flex items-center space-x-1'>
            <button className='p-2 rounded-md hover:bg-gray-200'>&lt;</button>
            <button className='p-2 w-8 h-8 rounded-md bg-purple-600 text-white'>
              1
            </button>
            <button className='p-2 w-8 h-8 rounded-md hover:bg-gray-200'>
              2
            </button>
            <button className='p-2 w-8 h-8 rounded-md hover:bg-gray-200'>
              3
            </button>
            <button className='p-2 w-8 h-8 rounded-md hover:bg-gray-200'>
              4
            </button>
            <span className='px-2'>...</span>
            <button className='p-2 w-8 h-8 rounded-md hover:bg-gray-200'>
              18
            </button>
            <button className='p-2 rounded-md hover:bg-gray-200'>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const Scoreboard = () => {
  const { logout } = useAuth();
  const [selectedScorecard, setSelectedScorecard] = useState(null);

  const handleLogout = () => {
    logout();
  };
  const handleOpenScorecard = (scorecard) => {
    setSelectedScorecard(scorecard);
  };
  const handleCloseScorecard = () => {
    setSelectedScorecard(null);
  };

  return (
    <>
      <div className='flex h-screen bg-gray-100 font-sans'>
        <Sidebar onLogout={handleLogout} />
        <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
          <Header
            title='Scorecard'
            breadcrumbs='Home / Scorecard'
            userName='Michael Johnson'
            userRole='Data Analyst'
          />
          <main className='flex-1 overflow-y-auto p-6'>
            <ScoreboardContent onOpenScorecard={handleOpenScorecard} />
          </main>
        </div>
      </div>
      <ScoreboardModal
        scorecard={selectedScorecard}
        onClose={handleCloseScorecard}
      />
    </>
  );
};

export default Scoreboard;
