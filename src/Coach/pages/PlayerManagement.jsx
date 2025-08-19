import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import {
  FaSearch,
  FaRegEdit,
  FaRegStar,
  FaTh,
  FaTimes,
  FaPlay,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// --- Mock Data for the page ---
const featuredPlayers = [
  {
    id: 1,
    name: "James Rodriguez",
    category: "U15",
    position: "Midfielder",
    activeSince: "Jan 2024",
  },
  {
    id: 2,
    name: "Marcus Rashford",
    category: "U17",
    position: "Forward",
    activeSince: "Feb 2024",
  },
  {
    id: 3,
    name: "Trent Alexander-Arnold",
    category: "U15",
    position: "Defender",
    activeSince: "Dec 2023",
  },
  {
    id: 4,
    name: "Gianluigi Donnarumma",
    category: "U19",
    position: "Goalkeeper",
    activeSince: "Mar 2024",
  },
  {
    id: 5,
    name: "Eduardo Camavinga",
    category: "U17",
    position: "Midfielder",
    activeSince: "Jan 2024",
  },
  {
    id: 6,
    name: "Jamal Musiala",
    category: "U15",
    position: "Goalkeeper",
    activeSince: "Feb 2024",
  },
];

const mainPlayers = [
  {
    id: 7,
    name: "Carlos Mendoza",
    club: "FC Barcelona (U17)",
    country: "Spain",
    type: "Club",
    number: 10,
    imageUrl: "https://placehold.co/300x400/DB4437/FFFFFF?text=CM",
  },
  {
    id: 8,
    name: "Sofia Martinez",
    club: "Atletico Madrid (U15)",
    country: "Spain",
    type: "Club",
    number: 7,
    imageUrl: "https://placehold.co/300x400/4285F4/FFFFFF?text=SM",
  },
  {
    id: 9,
    name: "Lucas Silva",
    club: "Santos FC (U19)",
    country: "Brazil",
    type: "External",
    number: 23,
    imageUrl: "https://placehold.co/300x400/FFFFFF/000000?text=LS",
  },
  {
    id: 10,
    name: "Mohammed Al-Saeed",
    club: "Al-Ahli (U21)",
    country: "Saudi Arabia",
    type: "Club",
    number: 5,
    imageUrl: "https://placehold.co/300x400/0F9D58/FFFFFF?text=MA",
  },
  {
    id: 11,
    name: "Emma Johnson",
    club: "Arsenal Women (U17)",
    country: "England",
    type: "External",
    number: 11,
    imageUrl: "https://placehold.co/300x400/F4B400/FFFFFF?text=EJ",
  },
  {
    id: 12,
    name: "Antoine Dupont",
    club: "PSG (U19)",
    country: "France",
    type: "Club",
    number: 9,
    imageUrl: "https://placehold.co/300x400/4682B4/FFFFFF?text=AD",
  },
  {
    id: 13,
    name: "Mateo Rodriguez",
    club: "Racing Club (U15)",
    country: "Argentina",
    type: "External",
    number: 14,
    imageUrl: "https://placehold.co/300x400/87CEEB/000000?text=MR",
  },
  {
    id: 14,
    name: "Joost van der Berg",
    club: "Ajax (U17)",
    country: "Netherlands",
    type: "Club",
    number: 8,
    imageUrl: "https://placehold.co/300x400/FFA500/FFFFFF?text=JB",
  },
];

// --- Mock Data for the Modal ---
const playerProfileData = {
  performanceSummary: [
    { label: "Matches Played", value: 37 },
    { label: "Goals", value: 18 },
    { label: "Assists", value: 24 },
    { label: "Total Shots", value: 72 },
    { label: "Shots on Target", value: 15 },
    { label: "Corner Kicks", value: 42 },
    { label: "Penalty Kicks", value: 7 },
    { label: "Fouls", value: 23 },
    { label: "Offsides", value: 12 },
    { label: "Yellow Cards", value: 5 },
    { label: "Red Cards", value: 1 },
    { label: "Saves", value: 64 },
  ],
  performanceTrend: {
    labels: [
      "Apr 1",
      "Mar 8",
      "Mar 15",
      "Mar 22",
      "Mar 29",
      "Apr 5",
      "Apr 12",
      "Apr 19",
    ],
    datasets: [
      {
        label: "Goals",
        data: [1, 2, 1, 3, 2, 4, 3, 5],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Assists",
        data: [2, 1, 3, 2, 4, 3, 5, 4],
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  },
  matchHistory: [
    {
      date: "Apr 22, 2025",
      opponent: "FC Barcelona",
      category: "First Team",
      result: "W 2-1",
      stats: "2/0",
      actions: "View Details",
    },
    {
      date: "Apr 15, 2025",
      opponent: "Real Madrid",
      category: "First Team",
      result: "L 1-3",
      stats: "1/1",
      actions: "View Details",
    },
    {
      date: "Apr 5, 2025",
      opponent: "Atletico Madrid",
      category: "First Team",
      result: "D 2-2",
      stats: "0/2",
      actions: "View Details",
    },
  ],
  uploadedVideos: [
    {
      title: "Goal Highlights vs FC Barcelona",
      vs: "vs FC Barcelona",
      comments: "Coach comments available",
      imageUrl: "https://placehold.co/400x225/DB4437/FFFFFF?text=Video",
    },
    {
      title: "Penalty Kick vs Real Madrid",
      vs: "vs Real Madrid",
      comments: "Coach comments available",
      imageUrl: "https://placehold.co/400x225/4285F4/FFFFFF?text=Video",
    },
    {
      title: "Assist Highlights vs Atletico Madrid",
      vs: "vs Atletico Madrid",
      comments: "Coach comments available",
      imageUrl: "https://placehold.co/400x225/0F9D58/FFFFFF?text=Video",
    },
  ],
  wellnessActivity: [
    {
      title: "Nutrition Plans",
      completed: 12,
      total: 15,
      progress: 80,
      lastCompleted: "Apr 20",
    },
    {
      title: "Training Sessions",
      completed: 18,
      total: 20,
      progress: 90,
      lastCompleted: "Apr 23",
    },
    {
      title: "Psychology Materials",
      completed: 7,
      total: 10,
      progress: 70,
      lastCompleted: "Apr 15",
    },
    {
      title: "Recovery Articles",
      completed: 5,
      total: 8,
      progress: 62.5,
      lastCompleted: "Apr 21",
    },
  ],
};

// --- Player Profile Modal Component ---
const PlayerProfileModal = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10 pb-10 overflow-y-auto'>
      <div className='bg-gray-50 rounded-lg shadow-2xl w-full max-w-5xl relative m-4'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10'
        >
          <FaTimes size={20} />
        </button>

        <div className='p-8 space-y-8'>
          {/* Modal Header */}
          <div className='flex justify-between items-start'>
            <div className='flex items-center gap-4'>
              <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600'>
                {player.name.charAt(0)}
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>
                  {player.name}
                </h2>
                <p className='text-sm text-gray-500'>
                  {player.email ||
                    `${player.name
                      .toLowerCase()
                      .replace(" ", ".")}@example.com`}
                </p>
                <p className='text-sm text-gray-500'>Jersey #{player.number}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800'>
                U15
              </span>
              <span className='text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800'>
                First Team
              </span>
              <span className='text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800'>
                Active
              </span>
            </div>
          </div>

          {/* Performance Summary */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Performance Summary</h3>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {playerProfileData.performanceSummary.map((stat) => (
                <div key={stat.label} className='text-center'>
                  <p className='text-2xl font-bold text-purple-600'>
                    {stat.value}
                  </p>
                  <p className='text-xs text-gray-500'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Trend */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Performance Trend</h3>
            <div className='h-64'>
              <Line
                data={playerProfileData.performanceTrend}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Match History */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Match History</h3>
            <table className='w-full text-left text-sm'>
              <thead>
                <tr className='border-b'>
                  <th className='py-2'>Date</th>
                  <th>Opponent Team</th>
                  <th>Category</th>
                  <th>Result</th>
                  <th>Goals / Assists</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {playerProfileData.matchHistory.map((match, i) => (
                  <tr key={i} className='border-b'>
                    <td className='py-3'>{match.date}</td>
                    <td>{match.opponent}</td>
                    <td>{match.category}</td>
                    <td>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          match.result.startsWith("W")
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {match.result}
                      </span>
                    </td>
                    <td>{match.stats}</td>
                    <td>
                      <a href='#' className='text-purple-600 hover:underline'>
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Uploaded Videos */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Uploaded Videos</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {playerProfileData.uploadedVideos.map((video, i) => (
                <div
                  key={i}
                  className='relative rounded-lg overflow-hidden group'
                >
                  <img
                    src={video.imageUrl}
                    alt={video.title}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <FaPlay className='text-white text-4xl' />
                  </div>
                  <div className='absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full'>
                    <h4 className='font-bold text-white'>{video.title}</h4>
                    <p className='text-xs text-gray-200'>{video.comments}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Player Card Components ---
const FeaturedPlayerCard = ({ player, onViewProfile }) => (
  <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
    <div className='flex justify-between items-start'>
      <div>
        <p className='font-bold text-gray-800'>{player.name}</p>
        <span className='text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mr-2'>
          {player.category}
        </span>
        <span className='text-sm text-gray-500'>{player.position}</span>
      </div>
      <div className='flex items-center space-x-3 text-gray-400'>
        <button
          onClick={() => onViewProfile(player)}
          className='cursor-pointer hover:text-purple-600'
        >
          <FaTh />
        </button>
        <FaRegEdit className='cursor-pointer hover:text-purple-600' />
      </div>
    </div>
    <p className='text-xs text-gray-400 mt-2'>
      Active since {player.activeSince}
    </p>
  </div>
);

const PlayerCard = ({ player, onViewProfile }) => (
  <div className='bg-white rounded-xl shadow-md overflow-hidden'>
    <div className='relative'>
      <img
        src={player.imageUrl}
        alt={player.name}
        className='w-full h-48 object-cover'
      />
      <div className='absolute top-2 right-2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold'>
        {player.number}
      </div>
    </div>
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-bold text-gray-900'>{player.name}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            player.type === "Club"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {player.type}
        </span>
      </div>
      <p className='text-sm text-gray-600 mt-1'>{player.club}</p>
      <p className='text-sm text-gray-500'>{player.country}</p>
      <div className='flex justify-between items-center mt-4'>
        <button
          onClick={() => onViewProfile(player)}
          className='w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700'
        >
          View Profile
        </button>
        <div className='flex items-center space-x-3 ml-4 text-gray-400'>
          <FaRegEdit
            className='cursor-pointer hover:text-purple-600'
            size={18}
          />
          <FaRegStar
            className='cursor-pointer hover:text-purple-600'
            size={18}
          />
        </div>
      </div>
    </div>
  </div>
);

// --- The main content area of the Player Management page ---
const PlayerManagementContent = ({ onViewProfile }) => {
  return (
    <div className='space-y-6'>
      {/* Filter Bar */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='relative'>
          <FaSearch className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by player name'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>
        <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'>
          <option>All Categories</option>
          <option>U15</option>
          <option>U17</option>
          <option>U19</option>
          <option>U21</option>
        </select>
        <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'>
          <option>All Positions</option>
          <option>Goalkeeper</option>
          <option>Defender</option>
          <option>Midfielder</option>
          <option>Forward</option>
        </select>
      </div>

      {/* Featured Players Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {featuredPlayers.map((player) => (
          <FeaturedPlayerCard
            key={player.id}
            player={player}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>

      {/* Main Player Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {mainPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const PlayerManagement = () => {
  const { logout } = useAuth();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleViewProfile = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <>
      <div className='flex h-screen bg-gray-100 font-sans'>
        <Sidebar onLogout={handleLogout} />
        <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
          <Header
            title='Player Management'
            breadcrumbs='Home / Player Management'
            userName='Michael Johnson'
            userRole='Head Coach'
          />
          <main className='flex-1 overflow-y-auto p-6'>
            <PlayerManagementContent onViewProfile={handleViewProfile} />
          </main>
        </div>
      </div>
      <PlayerProfileModal player={selectedPlayer} onClose={handleCloseModal} />
    </>
  );
};

export default PlayerManagement;
