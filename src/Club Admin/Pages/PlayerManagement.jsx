import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import PlayerProfileModal from "../Components/PlayerProfileModal";
// CHANGED: Renamed import from AddPlayerModal to InvitePlayerModal
import InvitePlayerModal from "../Components/AddPlayerModal";

const initialPlayers = [
  {
    id: 1,
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    jersey: 10,
    position: "Forward",
    categories: ["U19", "First Team"],
    status: "Active",
  },
  {
    id: 2,
    name: "Lionel Smith",
    email: "lionel.smith@example.com",
    jersey: 8,
    position: "Midfielder",
    categories: ["U19"],
    status: "Active",
  },
  {
    id: 3,
    name: "Cristiano Martinez",
    email: "cristiano.martinez@example.com",
    jersey: 7,
    position: "Forward",
    categories: ["First Team", "Reserve"],
    status: "Active",
  },
];


const mockPlayer = {
  name: "James Rodriguez",
  email: "james.rodriguez@example.com",
  jersey: 10,
  status: "Active",
  categories: ["U-19", "First Team"],
  matches: [
    {
      date: "Apr 22, 2025",
      opponent: "FC Barcelona",
      category: "First Team",
      result: "Win",
      stats: "2 / 0",
    },
    {
      date: "Apr 18, 2025",
      opponent: "Real Madrid",
      category: "First Team",
      result: "Loss",
      stats: "1 / 1",
    },
  ],
  videos: [
    {
      title: "Goal Highlights vs FC Barcelona",
      date: "Apr 22, 2025",
      thumbnail:
        "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    },
    {
      title: "Penalty Kick vs Real Madrid",
      date: "Apr 18, 2025",
      thumbnail:
        "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
    },
  ],
  wellness: [
    {
      title: "Nutrition Plans",
      lastCompleted: "Last completed: Apr 21, 2025",
      progress: 90,
    },
    {
      title: "Training Sessions",
      lastCompleted: "Last completed: Apr 19, 2025",
      progress: 80,
    },
    {
      title: "Psychology Materials",
      lastCompleted: "Last completed: Apr 18, 2025",
      progress: 75,
    },
    {
      title: "Recovery Articles",
      lastCompleted: "Last completed: Apr 16, 2025",
      progress: 60,
    },
  ],
};

const PlayerManagement = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  // CHANGED: Renamed state for clarity
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0 mt-10 lg:mt-0'>
        <Header title='Player Management' route='Home / Player Management' />
        <main className='flex-1 overflow-y-auto p-6'>
          {/* Top Actions */}
          <div className='flex justify-between items-center mb-4'>
            <div className='text-xl font-semibold'>Player Management</div>
            {/* CHANGED: Button text and onClick handler */}
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className='bg-purple-700 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2'
            >
              <FaPlus /> Invite Player
            </button>
          </div>

          {/* Player Table */}
          <div className='bg-white rounded-xl shadow-sm overflow-x-auto'>
            <table className='w-full text-sm text-left'>
              <thead className='bg-gray-100 text-gray-600'>
                <tr>
                  <th className='px-4 py-3'>Player Name</th>
                  <th className='px-4 py-3'>Email</th>
                  <th className='px-4 py-3'>Jersey No.</th>
                  <th className='px-4 py-3'>Assigned Categories</th>
                  <th className='px-4 py-3'>Status</th>
                  <th className='px-4 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr
                    key={player.id}
                    className='border-b cursor-pointer hover:bg-gray-50'
                    onClick={() =>
                      setSelectedPlayer({ ...player, ...mockPlayer })
                    }
                  >
                    <td className='px-4 py-3'>
                      <div className='font-medium'>{player.name}</div>
                      <div className='text-xs text-gray-500'>
                        {player.position}
                      </div>
                    </td>
                    <td className='px-4 py-3'>{player.email}</td>
                    <td className='px-4 py-3'>{player.jersey}</td>
                    <td className='px-4 py-3 flex gap-2 flex-wrap'>
                      {player.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className='text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full'
                        >
                          {cat}
                        </span>
                      ))}
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          player.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {player.status}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-gray-500'>
                      <FaEllipsisV />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modals */}
      {selectedPlayer && (
        <PlayerProfileModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
      {/* CHANGED: Render InvitePlayerModal and pass appropriate props */}
      {isInviteModalOpen && (
        <InvitePlayerModal
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={(player) => {
            setPlayers([...players, { ...player, id: players.length + 1 }]);
            setIsInviteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default PlayerManagement;
