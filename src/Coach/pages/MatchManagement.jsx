import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaEye, FaPencilAlt } from "react-icons/fa";

// --- Navigation items for the Sidebar (can be shared or specific) ---
// You would likely have a central file for these navigation items
const coachNavItems = [
  { id: "dashboard", label: "Dashboard", to: "/coach/dashboard" },
  { id: "matches", label: "Matches", to: "/coach/matches" },
  // ... other navigation links
];

// --- The main content area for the Matches page ---
const MatchManagementContent = () => {
  // Mock data based on the provided image
  const [matches, setMatches] = useState([
    {
      name: "Cantera FC vs Real Madrid Academy",
      category: "U16",
      dateTime: "Apr 26, 2025 - 15:30",
      location: "Cantera Stadium",
      type: "Home",
      status: "Upcoming",
      lineup: "Add",
    },
    {
      name: "Barcelona Youth vs Cantera FC",
      category: "U18",
      dateTime: "Apr 28, 2025 - 17:00",
      location: "Barcelona Youth Complex",
      type: "Away",
      status: "Upcoming",
      lineup: "Add",
    },
    {
      name: "Cantera FC vs Atletico Madrid Youth",
      category: "U14",
      dateTime: "May 2, 2025 - 14:00",
      location: "Cantera Training Ground",
      type: "Home",
      status: "Upcoming",
      lineup: "Add",
    },
    {
      name: "Valencia CF Academy vs Cantera FC",
      category: "U16",
      dateTime: "Apr 20, 2025 - 16:30",
      location: "Valencia Academy Field",
      type: "Away",
      status: "Completed",
      lineup: "View",
    },
    {
      name: "Cantera FC vs Sevilla FC Youth",
      category: "U18",
      dateTime: "Apr 15, 2025 - 18:00",
      location: "Cantera Stadium",
      type: "Home",
      status: "Completed",
      lineup: "View",
    },
    {
      name: "Villarreal Youth vs Cantera FC",
      category: "U14",
      dateTime: "Apr 10, 2025 - 15:00",
      location: "Villarreal Youth Complex",
      type: "Away",
      status: "Completed",
      lineup: "View",
    },
  ]);

  // Helper functions for styling badges
  const getStatusClass = (status) => {
    return status === "Upcoming"
      ? "bg-green-100 text-green-800"
      : "bg-gray-200 text-gray-700";
  };

  const getTypeClass = (type) => {
    return type === "Home"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  const getLineupButton = (status) => {
    if (status === "Add") {
      return (
        <button className='bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2'>
          <span className='bg-white text-purple-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold'>
            A
          </span>
          Add
        </button>
      );
    }
    return (
      <div className='flex justify-center items-center space-x-3 text-gray-500'>
        <button className='hover:text-blue-600'>
          <FaEye size={16} />
        </button>
        <button className='hover:text-yellow-600'>
          <FaPencilAlt size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className='space-y-6'>
      {/* Filter and Action Bar */}
      <div className='flex flex-wrap justify-between items-center gap-4'>
        <div className='flex items-center gap-4'>
          <select className='bg-white border border-gray-300 rounded-md px-4 py-2 text-sm'>
            <option>All Categories</option>
            <option>U18</option>
            <option>U16</option>
            <option>U14</option>
          </select>
          <select className='bg-white border border-gray-300 rounded-md px-4 py-2 text-sm'>
            <option>All Status</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
        </div>
        <button className='bg-purple-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-purple-700'>
          + Add Match
        </button>
      </div>

      {/* Matches Table */}
      <div className='bg-white rounded-xl shadow overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='bg-gray-50'>
              <tr className='text-sm text-gray-600'>
                <th className='p-4 font-medium'>Match Name</th>
                <th className='p-4 font-medium'>Category</th>
                <th className='p-4 font-medium'>Date & Time</th>
                <th className='p-4 font-medium'>Location</th>
                <th className='p-4 font-medium'>Match Type</th>
                <th className='p-4 font-medium'>Status</th>
                <th className='p-4 font-medium text-center'>
                  Lineup & Strategy
                </th>
                <th className='p-4 font-medium'>Scorecard</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index} className='border-t hover:bg-gray-50'>
                  <td className='p-4 font-semibold text-gray-800 whitespace-nowrap'>
                    {match.name}
                  </td>
                  <td className='p-4 text-gray-600'>{match.category}</td>
                  <td className='p-4 text-gray-600 whitespace-nowrap'>
                    {match.dateTime}
                  </td>
                  <td className='p-4 text-gray-600 whitespace-nowrap'>
                    {match.location}
                  </td>
                  <td className='p-4'>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeClass(
                        match.type
                      )}`}
                    >
                      {match.type}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClass(
                        match.status
                      )}`}
                    >
                      {match.status}
                    </span>
                  </td>
                  <td className='p-4 text-center'>
                    {getLineupButton(match.lineup)}
                  </td>
                  <td className='p-4'>
                    <a
                      href='#'
                      className='text-purple-600 font-semibold hover:underline text-sm'
                    >
                      View Scorecard
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer with Pagination */}
      <div className='flex justify-between items-center text-sm text-gray-600'>
        <span>Showing 6 of 24 matches</span>
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
          <button className='p-2 rounded-md hover:bg-gray-200'>&gt;</button>
        </div>
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const MatchManagement = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex h-screen bg-gray-100 font-sans'>
      {/* This page uses a Sidebar. You would pass the correct navItems for the current role. */}
      <Sidebar
        navItems={coachNavItems} // Example: using coach's nav items
        onLogout={handleLogout}
      />

      <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
        <Header
          title='Matches'
          breadcrumbs='Home / Matches'
          userName='Michael Johnson'
          userRole='Head Coach'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <MatchManagementContent />
        </main>
      </div>
    </div>
  );
};

export default MatchManagement;
