import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaPaperPlane } from "react-icons/fa";

// --- Mock Data for the page ---
const matchDetails = {
  id: 1,
  matchName: "FC Barcelona vs Real Madrid",
  category: "Under-19",
  dateTime: "2025-08-15T16:00",
  stadium: "Camp Nou, Barcelona",
  country: "Spain",
  matchType: "Home",
  formation: "4-3-3",
};

const players = {
  goalkeepers: [
    {
      id: 1,
      name: "Marc-André ter Stegen",
      role: "First-Choice Goalkeeper",
      number: 1,
    },
    {
      id: 13,
      name: "Iñaki Peña",
      role: "Second-Choice Goalkeeper",
      number: 13,
    },
  ],
  starting11: [
    { id: 3, name: "Jules Koundé", role: "Right Back", number: 3 },
    { id: 4, name: "Ronald Araújo", role: "Center Back", number: 4 },
    { id: 15, name: "Andreas Christensen", role: "Center Back", number: 15 },
    { id: 18, name: "Alejandro Balde", role: "Left Back", number: 18 },
  ],
  substitutes: [
    { id: 23, name: "Sergi Roberto", role: "Right Back", number: 23 },
    { id: 24, name: "Eric García", role: "Center Back", number: 24 },
    { id: 20, name: "Marcos Alonso", role: "Left Back", number: 20 },
    { id: 21, name: "Franck Kessié", role: "Central Midfielder", number: 21 },
    { id: 10, name: "Ansu Fati", role: "Forward", number: 10 },
  ],
};

// --- Player Card Component ---
const PlayerCard = ({ player }) => (
  <div className='flex items-center bg-white p-2 rounded-lg border border-gray-200'>
    <div className='bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold mr-3'>
      {player.number}
    </div>
    <div>
      <p className='font-semibold text-sm text-gray-800'>{player.name}</p>
      <p className='text-xs text-gray-500'>{player.role}</p>
    </div>
  </div>
);

// --- Soccer Field Component ---
const SoccerField = ({ formation }) => {
  // Positions for a 4-3-3 formation
  const positions = {
    GK: "bottom-2 left-1/2 -translate-x-1/2",
    LB: "bottom-1/4 left-1/4 -translate-x-1/2",
    CB: "bottom-1/4 left-1/2 -translate-x-1/2",
    RB: "bottom-1/4 right-1/4 -translate-x-1/2",
    CM1: "top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2",
    CM2: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    CM3: "top-1/2 right-1/3 -translate-x-1/2 -translate-y-1/2",
    LW: "top-1/4 left-1/4 -translate-x-1/2",
    ST: "top-1/4 left-1/2 -translate-x-1/2",
    RW: "top-1/4 right-1/4 -translate-x-1/2",
  };

  // A more generic mapping from 4-3-3 to our position keys
  const formationMap = {
    "4-3-3": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CM", "LW", "ST", "RW"],
  };

  const simplePositions = [
    "GK",
    "LB",
    "CB",
    "CB",
    "RB",
    "CM",
    "CM",
    "CM",
    "LW",
    "ST",
    "RW",
  ];

  return (
    <div className='bg-green-600 h-96 rounded-lg relative border-4 border-green-400/50 p-4'>
      {/* Center Circle */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-green-400/50 rounded-full'></div>
      {/* Halfway line */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-green-400/50'></div>
      {/* Penalty Boxes */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-24 border-2 border-green-400/50 border-t-0'></div>
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-24 border-2 border-green-400/50 border-b-0'></div>

      {/* Player Positions */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-400/50 rounded-full'></div>

      {/* Simplified positions for display */}
      <div className='absolute top-6 left-1/2 -translate-x-1/2'>
        <div className='player-position'>ST</div>
      </div>
      <div className='absolute top-12 left-1/4'>
        <div className='player-position'>LW</div>
      </div>
      <div className='absolute top-12 right-1/4'>
        <div className='player-position'>RW</div>
      </div>
      <div className='absolute top-1/2 -translate-y-1/2 left-1/3'>
        <div className='player-position'>CM</div>
      </div>
      <div className='absolute top-1/2 -translate-y-1/2 right-1/3'>
        <div className='player-position'>CM</div>
      </div>
      <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <div className='player-position'>CM</div>
      </div>
      <div className='absolute bottom-12 left-1/4'>
        <div className='player-position'>LB</div>
      </div>
      <div className='absolute bottom-6 left-1/3'>
        <div className='player-position'>CB</div>
      </div>
      <div className='absolute bottom-6 right-1/3'>
        <div className='player-position'>CB</div>
      </div>
      <div className='absolute bottom-12 right-1/4'>
        <div className='player-position'>RB</div>
      </div>
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2'>
        <div className='player-position'>GK</div>
      </div>
    </div>
  );
};

// --- The main content area of the Lineup page ---
const MatchLineupContent = () => {
  const { matchId } = useParams(); // In a real app, you'd fetch data based on this ID

  return (
    <div className='space-y-6'>
      {/* Match Information Section */}
      <div className='bg-white rounded-xl shadow p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Match Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          <div>
            <label className='text-sm font-medium text-gray-600'>
              Match Name
            </label>
            <input
              type='text'
              value={matchDetails.matchName}
              readOnly
              className='mt-1 w-full p-2 border rounded-md bg-gray-50'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-600'>
              Category
            </label>
            <input
              type='text'
              value={matchDetails.category}
              readOnly
              className='mt-1 w-full p-2 border rounded-md bg-gray-50'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-600'>
              Date & Time
            </label>
            <input
              type='text'
              value={new Date(matchDetails.dateTime).toLocaleString()}
              readOnly
              className='mt-1 w-full p-2 border rounded-md bg-gray-50'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-600'>
              Stadium Name
            </label>
            <input
              type='text'
              value={matchDetails.stadium}
              readOnly
              className='mt-1 w-full p-2 border rounded-md bg-gray-50'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-600'>Country</label>
            <input
              type='text'
              value={matchDetails.country}
              readOnly
              className='mt-1 w-full p-2 border rounded-md bg-gray-50'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-600'>
              Match Type
            </label>
            <input
              type='text'
              value={matchDetails.matchType}
              readOnly
              className='mt-1 w-full p-2 border rounded-md bg-gray-50'
            />
          </div>
        </div>
      </div>

      {/* Formation Section */}
      <div className='bg-white rounded-xl shadow p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Formation</h3>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
          <div>
            <select className='w-full md:w-1/2 p-2 border rounded-md'>
              <option>4-3-3</option>
              <option>4-4-2</option>
              <option>3-5-2</option>
            </select>
          </div>
         
        </div>
      </div>

      {/* Player Lists Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Goalkeepers */}
        <div className='bg-white rounded-xl shadow p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Goalkeepers
          </h3>
          <div className='space-y-3'>
            <h4 className='text-xs font-bold text-gray-500 uppercase'>
              Starting Goalkeeper
            </h4>
            <PlayerCard player={players.goalkeepers[0]} />
            <h4 className='text-xs font-bold text-gray-500 uppercase pt-2'>
              Substitute Goalkeeper
            </h4>
            <PlayerCard player={players.goalkeepers[1]} />
          </div>
        </div>
        {/* Starting 11 */}
        <div className='bg-white rounded-xl shadow p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Starting 11 (Field Players)
          </h3>
          <div className='space-y-3'>
            {players.starting11.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </div>
        {/* Substitutes */}
        <div className='bg-white rounded-xl shadow p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Substitutes
          </h3>
          <div className='space-y-3'>
            {players.substitutes.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Strategy and Actions */}
      <div className='bg-white rounded-xl shadow p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>Strategy</h3>
        <textarea
          placeholder='Add Strategy'
          className='w-full p-2 border rounded-md min-h-[100px]'
        ></textarea>
        <div className='flex justify-end gap-4 mt-4'>
          <button className='font-semibold px-6 py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50'>
            Save Lineup
          </button>
          <button className='font-semibold px-6 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-2'>
            <FaPaperPlane />
            Send Strategy to Team
          </button>
        </div>
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const MatchLineup = () => {
  const { logout } = useAuth();
  const { matchId } = useParams();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex h-screen bg-gray-100 font-sans'>
      <Sidebar onLogout={handleLogout} />
      <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
        <Header
          title='Match Lineup & Strategy'
          breadcrumbs={`Home / Matches / Lineup #${matchId}`}
          userName='Michael Johnson'
          userRole='Head Coach'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <MatchLineupContent />
        </main>
      </div>
    </div>
  );
};

export default MatchLineup;
