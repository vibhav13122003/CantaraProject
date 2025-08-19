import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaFilter, FaEye } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import ExternalPlayerProfile from "../Components/ExternalPlayerProfile";

const mockPlayers = [
  {
    name: "Carlos Mendoza",
    email: "carlos.mendoza@gmail.com",
    country: "Spain",
    category: "Forward",
    status: "Subscribed",
    subType: "Yearly",
    start: "2025-01-15",
    end: "2026-01-15",
  },
  {
    name: "James Wilson",
    email: "james.wilson@outlook.com",
    country: "United Kingdom",
    category: "Forward",
    status: "Subscribed",
    subType: "Monthly",
    start: "2025-08-10",
    end: "2025-09-10",
  },
  {
    name: "Antoine Dupont",
    email: "antoine.dupont@yahoo.fr",
    country: "France",
    category: "Defender",
    status: "Not Subscribed",
    subType: "-",
    start: "-",
    end: "-",
  },
  // Added more players to demonstrate pagination and scrolling
  {
    name: "Yuki Tanaka",
    email: "yuki.tanaka@example.jp",
    country: "Japan",
    category: "Midfielder",
    status: "Subscribed",
    subType: "Yearly",
    start: "2025-02-20",
    end: "2026-02-20",
  },
  {
    name: "Fatima Al-Fassi",
    email: "fatima.alfassi@example.sa",
    country: "Saudi Arabia",
    category: "Goalkeeper",
    status: "Not Subscribed",
    subType: "-",
    start: "-",
    end: "-",
  },
  {
    name: "Marco Rossi",
    email: "marco.rossi@example.it",
    country: "Italy",
    category: "Defender",
    status: "Subscribed",
    subType: "Monthly",
    start: "2025-08-01",
    end: "2025-09-01",
  },
  {
    name: "Chloe Dubois",
    email: "chloe.dubois@example.ca",
    country: "Canada",
    category: "Forward",
    status: "Subscribed",
    subType: "Yearly",
    start: "2025-05-15",
    end: "2026-05-15",
  },
  {
    name: "Liam O'Connell",
    email: "liam.oconnell@example.ie",
    country: "Ireland",
    category: "Midfielder",
    status: "Not Subscribed",
    subType: "-",
    start: "-",
    end: "-",
  },
];

const ExternalPlayersManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(mockPlayers.length / itemsPerPage);
  const paginatedPlayers = mockPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0 mt-10 lg:mt-0'>
        <Header
          title='External Players Management'
          route='Home / External Players Management'
        />

        <main className='flex-1 p-6 bg-gray-50 overflow-y-auto'>
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            <div className='flex flex-col md:flex-row md:justify-between gap-4'>
              <h3 className='text-lg font-semibold mb-4'>
                External Players List
              </h3>

              {/* Filters */}
              <div className='flex flex-wrap items-center gap-3 mb-4'>
                <select className='border rounded-md px-4 py-2 text-sm bg-gray-100'>
                  <option>All Categories</option>
                  <option>Forward</option>
                  <option>Defender</option>
                </select>
                <select className='border rounded-md px-4 py-2 text-sm bg-gray-100'>
                  <option>All Countries</option>
                  <option>Spain</option>
                  <option>France</option>
                </select>
                <select className='border rounded-md px-4 py-2 text-sm bg-gray-100'>
                  <option>All Subscriptions</option>
                  <option>Subscribed</option>
                  <option>Not Subscribed</option>
                </select>
                <button className='flex items-center gap-2 text-sm bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md shadow'>
                  <FaFilter /> Apply Filters
                </button>
              </div>
            </div>
            {/* Table Container: This div will handle the horizontal scrolling */}
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left'>
                <thead className='text-gray-700 bg-gray-100 text-sm'>
                  <tr className='border-b'>
                    {[
                      "Player Name",
                      "Email ID",
                      "Country",
                      "Category",
                      "Subscription Status",
                      "Subscription Type",
                      "Start Date",
                      "End Date",
                      "Action",
                    ].map((header, index) => (
                      // FIX: Added whitespace-nowrap to prevent header text from wrapping
                      <th
                        key={index}
                        className='px-4 py-3 font-medium whitespace-nowrap'
                      >
                        <div className='flex items-center gap-1'>
                          {header}
                          {header !== "Action" && (
                            <TbArrowsSort className='text-gray-400 text-base' />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedPlayers.map((player, index) => (
                    <tr
                      key={index}
                      className='border-b hover:bg-gray-50 transition'
                    >
                      {/* FIX: Added whitespace-nowrap to all cells */}
                      <td className='px-4 py-3 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          <div className='w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-700 p-2 rounded-full text-xs font-bold'>
                            {player.name.charAt(0)}
                          </div>
                          {player.name}
                        </div>
                      </td>
                      <td className='px-4 py-3 text-gray-700 whitespace-nowrap'>
                        {player.email}
                      </td>
                      <td className='px-4 py-3 text-gray-700 whitespace-nowrap'>
                        {player.country}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        <span className='bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold'>
                          {player.category}
                        </span>
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            player.status === "Subscribed"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {player.status}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-gray-700 whitespace-nowrap'>
                        {player.subType}
                      </td>
                      <td className='px-4 py-3 text-gray-700 whitespace-nowrap'>
                        {player.start}
                      </td>
                      <td className='px-4 py-3 text-gray-700 whitespace-nowrap'>
                        {player.end}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        <button
                          onClick={() => setSelectedPlayer(player)}
                          className='text-purple-700 hover:text-purple-900 text-lg'
                          aria-label={`View profile for ${player.name}`}
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4'>
              <p>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, mockPlayers.length)} of{" "}
                {mockPlayers.length} entries
              </p>
              <div className='flex items-center gap-1'>
                <button
                  className='px-2 py-1 border rounded disabled:opacity-50'
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded font-medium ${
                      currentPage === i + 1
                        ? "bg-purple-700 text-white"
                        : "bg-white border text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className='px-2 py-1 border rounded disabled:opacity-50'
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Player Modal */}
          {selectedPlayer && (
            <ExternalPlayerProfile
              player={selectedPlayer}
              onClose={() => setSelectedPlayer(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ExternalPlayersManagement;
