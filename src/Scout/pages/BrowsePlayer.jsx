import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import {
  FaSearch,
  FaRedo,
  FaMapMarkerAlt,
  FaFutbol,
  FaRegEdit,
  FaRegStar,
  FaShareAlt,
  FaTh,
  FaList,
  FaTimes,
  FaPlay,
  FaArrowLeft,
  FaCommentDots,
} from "react-icons/fa";

// --- Mock Data for the page ---
const playersData = [
  {
    id: 7,
    name: "Carlos Mendoza",
    club: "FC Barcelona (U17)",
    country: "Spain",
    type: "Club",
    number: 10,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=CM",
  },
  {
    id: 8,
    name: "Sofia Martinez",
    club: "Atletico Madrid (U15)",
    country: "Spain",
    type: "Club",
    number: 7,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=SM",
  },
  {
    id: 9,
    name: "Lucas Silva",
    club: "Santos FC (U19)",
    country: "Brazil",
    type: "External",
    number: 23,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=LS",
  },
  {
    id: 10,
    name: "Mohammed Al-Saeed",
    club: "Al-Ahli (U21)",
    country: "Saudi Arabia",
    type: "Club",
    number: 5,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=MA",
  },
  {
    id: 11,
    name: "Emma Johnson",
    club: "Arsenal Women (U17)",
    country: "England",
    type: "External",
    number: 11,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=EJ",
  },
  {
    id: 12,
    name: "Antoine Dupont",
    club: "PSG (U19)",
    country: "France",
    type: "Club",
    number: 9,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=AD",
  },
  {
    id: 13,
    name: "Mateo Rodriguez",
    club: "Racing Club (U15)",
    country: "Argentina",
    type: "External",
    number: 14,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=MR",
  },
  {
    id: 14,
    name: "Joost van der Berg",
    club: "Ajax (U17)",
    country: "Netherlands",
    type: "Club",
    number: 8,
    imageUrl: "https://placehold.co/300x400/EEEEEE/333333?text=JB",
  },
];

// --- Mock Data for the Modal ---
const playerProfileData = {
  name: "James Rodriguez",
  category: "U17 Category",
  club: "Manchester United FC",
  location: "Manchester, England",
  jersey: 10,
  age: 17,
  country: "England",
  stats: [
    { label: "Matches Played", value: 28 },
    { label: "Total Goals", value: 14 },
    { label: "Assists", value: 9 },
    { label: "Shots", value: 42 },
    { label: "Fouls", value: 7 },
    { label: "Offsides", value: 5 },
    { label: "Yellow Cards", value: 2 },
    { label: "Red Cards", value: 0 },
    { label: "Direct Kicks", value: 8 },
    { label: "Corner Kicks", value: 17 },
    { label: "Penalty Kicks", value: 3 },
    { label: "Defensive Actions", value: 24 },
  ],
  matchHistory: [
    {
      date: "Apr 22, 2025",
      opponent: "Liverpool FC",
      category: "U17",
      result: "W 3-1",
      performance: "2 Goals, 1 Assist",
    },
    {
      date: "Apr 15, 2025",
      opponent: "Arsenal FC",
      category: "U17",
      result: "D 2-2",
      performance: "1 Goal",
    },
  ],
  videos: [
    {
      title: "Liverpool Match Highlights",
      date: "Apr 22, 2025",
      match: "U17 Match",
      comment:
        "Excellent positioning and finishing. Keep working on your right foot shots.",
      imageUrl: "https://placehold.co/400x225/DB4437/FFFFFF?text=Video",
    },
    {
      title: "Arsenal Match Skills",
      date: "Apr 15, 2025",
      match: "U17 Match",
      comment:
        "Great dribbling skills. Focus on decision making in the final third.",
      imageUrl: "https://placehold.co/400x225/4285F4/FFFFFF?text=Video",
    },
    {
      title: "Chelsea Match Goals",
      date: "Apr 8, 2025",
      match: "U17 Match",
      comment:
        "Fantastic finishing. Work on creating more space before receiving the ball.",
      imageUrl: "https://placehold.co/400x225/0F9D58/FFFFFF?text=Video",
    },
  ],
};

// --- Player Profile Modal Component ---
const PlayerProfileModal = ({ player, onClose }) => {
  if (!player) return null;

  const getResultClass = (result) => {
    if (result.startsWith("W")) return "bg-green-100 text-green-800";
    if (result.startsWith("L")) return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10 pb-10 overflow-y-auto'>
      <div className='bg-gray-50 rounded-lg shadow-2xl w-full max-w-6xl relative m-4'>
        <div className='p-8 space-y-8'>
          {/* Modal Header */}
          <div className='flex justify-between items-center'>
            <button
              onClick={onClose}
              className='flex items-center gap-2 text-gray-600 hover:text-gray-900'
            >
              <FaArrowLeft />
              <span>Player Profile</span>
            </button>
            {/* Header on the right can be added here if needed */}
          </div>

          {/* Player Info */}
          <div className='flex flex-wrap items-center gap-6'>
            <img
              src={player.imageUrl}
              alt={player.name}
              className='w-24 h-24 rounded-full object-cover'
            />
            <div>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                {player.name}{" "}
                <span className='text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800'>
                  Club Player
                </span>
              </h2>
              <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-1'>
                <span>{playerProfileData.category}</span>
                <span>{player.club}</span>
                <span>{playerProfileData.location}</span>
              </div>
            </div>
            <div className='flex items-center gap-6 ml-auto'>
              <div className='text-center'>
                <p className='font-bold text-xl'>{player.number}</p>
                <p className='text-xs text-gray-500'>Jersey</p>
              </div>
              <div className='text-center'>
                <p className='font-bold text-xl'>{playerProfileData.age}</p>
                <p className='text-xs text-gray-500'>Age</p>
              </div>
              <div className='text-center'>
                <p className='font-bold text-xl'>{player.country}</p>
                <p className='text-xs text-gray-500'>Country</p>
              </div>
            </div>
            <button className='bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-purple-700 flex items-center gap-2'>
              <FaCommentDots /> Message Club
            </button>
          </div>

          {/* Overall Match Stats */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Overall Match Stats</h3>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6'>
              {playerProfileData.stats.map((stat) => (
                <div key={stat.label}>
                  <p className='text-2xl font-bold text-gray-800'>
                    {stat.value}
                  </p>
                  <p className='text-sm text-gray-500'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Match History */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Match History</h3>
            <table className='w-full text-left text-sm'>
              <thead>
                <tr className='border-b'>
                  <th className='py-2'>Date</th>
                  <th>Opponent</th>
                  <th>Category</th>
                  <th>Result</th>
                  <th>Performance</th>
                  <th>Action</th>
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
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getResultClass(
                          match.result
                        )}`}
                      >
                        {match.result}
                      </span>
                    </td>
                    <td>{match.performance}</td>
                    <td>
                      <a
                        href='#'
                        className='text-purple-600 hover:underline font-semibold'
                      >
                        View Full Scorecard
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
              {playerProfileData.videos.map((video, i) => (
                <div key={i} className='rounded-lg overflow-hidden group'>
                  <div className='relative'>
                    <img
                      src={video.imageUrl}
                      alt={video.title}
                      className='w-full h-40 object-cover'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                      <FaPlay className='text-white text-4xl' />
                    </div>
                  </div>
                  <div className='p-3'>
                    <h4 className='font-bold text-gray-800'>{video.title}</h4>
                    <p className='text-xs text-gray-500'>
                      {video.date} • {video.match}
                    </p>
                    <p className='text-sm text-gray-600 mt-2'>
                      {video.comment}
                    </p>
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

// --- Reusable Player Card Component ---
const PlayerCard = ({ player, onViewProfile }) => (
  <div className='bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200'>
    <div className='relative bg-gray-200 h-48'>
      <img
        src={player.imageUrl}
        alt={player.name}
        className='w-full h-full object-cover'
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
      <div className='text-sm text-gray-500 mt-2 space-y-1'>
        <p className='flex items-center gap-2'>
          <FaFutbol /> {player.club}
        </p>
        <p className='flex items-center gap-2'>
          <FaMapMarkerAlt /> {player.country}
        </p>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <button
          onClick={() => onViewProfile(player)}
          className='flex-grow bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700'
        >
          View Profile
        </button>
        <div className='flex items-center space-x-3 ml-4 text-gray-400'>
          <FaShareAlt className='cursor-pointer hover:text-purple-600' />
          <FaRegEdit className='cursor-pointer hover:text-purple-600' />
          <FaRegStar className='cursor-pointer hover:text-purple-600' />
        </div>
      </div>
    </div>
  </div>
);

// --- The main content area of the Browse Players page ---
const BrowsePlayersContent = ({ onViewProfile }) => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  return (
    <div className='space-y-6'>
      {/* Filter Section */}
      <div className='bg-white p-6 rounded-xl shadow-sm border'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end'>
          <div className='col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>
                Player Type
              </label>
              <select className='w-full mt-1 p-2 border rounded-lg'>
                <option>All Players</option>
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>
                Country
              </label>
              <select className='w-full mt-1 p-2 border rounded-lg'>
                <option>All Countries</option>
              </select>
            </div>
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
                Club Name
              </label>
              <select className='w-full mt-1 p-2 border rounded-lg'>
                <option>All Clubs</option>
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>Age</label>
              <select className='w-full mt-1 p-2 border rounded-lg'>
                <option>Select Age</option>
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>
                Gender
              </label>
              <select className='w-full mt-1 p-2 border rounded-lg'>
                <option>Select Gender</option>
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>
                Preferred Foot
              </label>
              <select className='w-full mt-1 p-2 border rounded-lg'>
                <option>Select Foot</option>
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>
                Stats Filter
              </label>
              <select className='w-full mt-1 p-2 border rounded-lg'>
                <option>Filter by Stats</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <button className='flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg h-10'>
              Save Current Filter
            </button>
            <button className='flex items-center justify-center gap-2 text-gray-600 font-semibold px-4 py-2 rounded-lg h-10 hover:bg-gray-100'>
              <FaRedo /> Reset
            </button>
          </div>
        </div>
        <div className='relative mt-4 max-w-xs'>
          <label className='text-sm font-medium text-gray-700'>Search</label>
          <FaSearch className='absolute top-10 left-3 text-gray-400' />
          <input
            type='text'
            placeholder='Search by name or jersey'
            className='w-full mt-1 p-2 pl-10 border rounded-lg'
          />
        </div>
      </div>

      {/* View Toggle and Results Count */}
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-600'>Showing 24 players</span>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>View:</span>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md ${
              viewMode === "grid"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <FaTh />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${
              viewMode === "list"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Player Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {playersData.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
        <span>Showing 1-8 of 24 players</span>
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
          <button className='p-2 rounded-md hover:bg-gray-200'>&gt;</button>
        </div>
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const BrowsePlayers = () => {
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
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header
            title='Browse Players'
            breadcrumbs='Home / Browse Players'
            userName='Michael Johnson'
            userRole='Scout'
          />
          <main className='flex-1 overflow-y-auto p-6'>
            <BrowsePlayersContent onViewProfile={handleViewProfile} />
          </main>
        </div>
      </div>
      <PlayerProfileModal player={selectedPlayer} onClose={handleCloseModal} />
    </>
  );
};

export default BrowsePlayers;
