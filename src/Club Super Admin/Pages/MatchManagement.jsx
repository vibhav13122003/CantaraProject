import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

// Sample Data
import MatchDetail from "../Components/MatchDetails"; 

const MatchManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tournamentFilter, setTournamentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState(null); 

  const itemsPerPage = 7;

  const allMatches = [
    {
      match: "Deflines FC vs Valledupar FC",
      tournament: "Copa Libertadores U15",
      category: "U15",
      homeTeam: "Deflines FC",
      awayTeam: "Valledupar FC",
      date: "Apr 25, 2025",
      time: "15:30",
      location: "Estadio Metropolitano, Barranquilla",
      type: "Home",
    },
    // Add more...
  ];

  const filteredMatches = allMatches.filter((match) => {
    const tournamentMatch =
      tournamentFilter === "All" || match.tournament === tournamentFilter;
    const categoryMatch =
      categoryFilter === "All" || match.category === categoryFilter;
    return tournamentMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (selectedMatch) {
    return (
      <div className='flex h-screen bg-gray-50 font-sans'>
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div className='flex-1 overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
          <Header title='Match Detail' route='Home / Match Management' />
          <button
            className='m-4 px-4 py-2 bg-gray-200 rounded-md text-sm'
            onClick={() => setSelectedMatch(null)}
          >
            ← Back to Match List
          </button>
          <MatchDetail match={selectedMatch} />
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0 mt-10 lg:mt-0'>
        <Header title='Match Management' route='Home / Match Management' />
        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            {/* Filters */}
            <div className='flex flex-wrap gap-4 mb-4'>
              <select
                value={tournamentFilter}
                onChange={(e) => setTournamentFilter(e.target.value)}
                className='border px-4 py-2 rounded-md text-sm bg-gray-200'
              >
                <option>All Tournaments</option>
                <option>Premier Youth Cup 2025</option>
                <option>International Youth League</option>
                <option>Regional Championship</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className='border px-4 py-2 rounded-md text-sm bg-gray-200'
              >
                <option>All Categories</option>
                <option>U13</option>
                <option>U15</option>
                <option>U17</option>
                <option>U19</option>
                <option>U21</option>
              </select>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr className='bg-gray-50 text-xs text-gray-500 uppercase'>
                    <th className='px-4 py-2 text-left'>Match Name</th>
                    <th className='px-6 py-4 text-left'>
                      <div className='flex items-center justify-between gap-1'>
                        Tournament <TbArrowsSort />
                      </div>
                    </th>
                    <th className='px-4 py-2 text-left'>
                      <div className='flex items-center justify-between gap-1'>
                        Category <TbArrowsSort />
                      </div>
                    </th>
                    <th className='px-4 py-2 text-left'>Home Team</th>
                    <th className='px-4 py-2 text-left'>Away Team</th>
                    <th className='px-4 py-4 text-left'>
                      <div className='flex items-center justify-between gap-1'>
                        Date <TbArrowsSort />
                      </div>
                    </th>
                    <th className='px-4 py-2 text-left'>Time</th>
                    <th className='px-4 py-2 text-left'>Location</th>
                    <th className='px-4 py-2 text-left'>Match Type</th>
                    <th className='px-4 py-2 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-gray-700'>
                  {paginatedMatches.map((match, index) => (
                    <tr
                      key={index}
                      className='border-t cursor-pointer hover:bg-gray-50'
                      onClick={() => setSelectedMatch(match)} 
                    >
                      <td className='px-4 py-2 font-semibold  hover:underline'>
                        {match.match}
                      </td>
                      <td className='px-4 py-2'>{match.tournament}</td>
                      <td className='px-4 py-2'>{match.category}</td>
                      <td className='px-4 py-2'>{match.homeTeam}</td>
                      <td className='px-4 py-2'>{match.awayTeam}</td>
                      <td className='px-4 py-2'>{match.date}</td>
                      <td className='px-4 py-2'>{match.time}</td>
                      <td className='px-4 py-2'>{match.location}</td>
                      <td className='px-4 py-2'>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            match.type === "Home"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {match.type}
                        </span>
                      </td>
                      <td className='px-4 py-2 flex gap-3 text-gray-500'>
                        <FaEye className='cursor-pointer' />
                        <FaEdit className='cursor-pointer' />
                        <FaTrash className='cursor-pointer' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex justify-between items-center mt-4'>
              <p className='text-sm text-gray-600'>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredMatches.length)}{" "}
                of {filteredMatches.length} results
              </p>
              <div className='flex space-x-1'>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded-md border ${
                      currentPage === i + 1
                        ? "bg-purple-700 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MatchManagement;
