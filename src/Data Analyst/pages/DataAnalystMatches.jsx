import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaSearch, FaFilter, FaCalendarAlt } from "react-icons/fa";

// --- Mock Data for the page ---
const matchesData = [
  {
    name: "Manchester City vs Liverpool",
    category: "Premier League",
    dateTime: "Apr 25, 2025 - 19:45",
    location: "Etihad Stadium",
    type: "Home",
    status: "Pending",
    action: "Enter Scorecard",
  },
  {
    name: "Barcelona vs Real Madrid",
    category: "La Liga",
    dateTime: "Apr 24, 2025 - 20:00",
    location: "Camp Nou",
    type: "Home",
    status: "Completed",
    action: "Edit Scorecard",
  },
  {
    name: "Bayern Munich vs Borussia Dortmund",
    category: "Bundesliga",
    dateTime: "Apr 23, 2025 - 15:30",
    location: "Allianz Arena",
    type: "Home",
    status: "Completed",
    action: "Edit Scorecard",
  },
  {
    name: "PSG vs Marseille",
    category: "Ligue 1",
    dateTime: "Apr 22, 2025 - 21:00",
    location: "Parc des Princes",
    type: "Home",
    status: "Pending",
    action: "Enter Scorecard",
  },
  {
    name: "Juventus vs AC Milan",
    category: "Serie A",
    dateTime: "Apr 21, 2025 - 20:45",
    location: "Allianz Stadium",
    type: "Home",
    status: "Completed",
    action: "Edit Scorecard",
  },
  {
    name: "Arsenal vs Chelsea",
    category: "Premier League",
    dateTime: "Apr 20, 2025 - 16:30",
    location: "Emirates Stadium",
    type: "Home",
    status: "Completed",
    action: "Edit Scorecard",
  },
  {
    name: "Tottenham vs West Ham",
    category: "Premier League",
    dateTime: "Apr 26, 2025 - 15:00",
    location: "Tottenham Hotspur Stadium",
    type: "Home",
    status: "Pending",
    action: "Enter Scorecard",
  },
  {
    name: "Inter Milan vs Roma",
    category: "Serie A",
    dateTime: "Apr 27, 2025 - 18:00",
    location: "San Siro",
    type: "Home",
    status: "Pending",
    action: "Enter Scorecard",
  },
  {
    name: "Atletico Madrid vs Sevilla",
    category: "La Liga",
    dateTime: "Apr 28, 2025 - 21:00",
    location: "Wanda Metropolitano",
    type: "Home",
    status: "Pending",
    action: "Enter Scorecard",
  },
  {
    name: "Manchester United vs Newcastle",
    category: "Premier League",
    dateTime: "Apr 29, 2025 - 20:00",
    location: "Old Trafford",
    type: "Away",
    status: "Pending",
    action: "Enter Scorecard",
  },
];

// --- The main content area of the Data Analyst Matches page ---
const DataAnalystMatchesContent = () => {
  const getStatusClass = (status) =>
    status === "Pending"
      ? "bg-pink-100 text-pink-800"
      : "bg-green-100 text-green-800";
  const getActionClass = (action) =>
    action === "Enter Scorecard"
      ? "bg-purple-600 text-white hover:bg-purple-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <div className='space-y-6'>
      {/* Filter Section */}
      <div className='bg-white p-6 rounded-xl shadow-sm border'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Filter Matches
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Category
            </label>
            <select className='w-full mt-1 p-2 border rounded-lg'>
              <option>All Categories</option>
              <option>Premier League</option>
              <option>La Liga</option>
            </select>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Scorecard Status
            </label>
            <select className='w-full mt-1 p-2 border rounded-lg'>
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
          <div className='relative'>
            <label className='text-sm font-medium text-gray-700'>
              Date Range
            </label>
            <FaCalendarAlt className='absolute top-10 left-3 text-gray-400' />
            <input
              type='text'
              placeholder='Select date range'
              className='w-full mt-1 p-2 pl-10 border rounded-lg'
            />
          </div>
          <button className='flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg h-10'>
            <FaFilter />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* All Matches Table */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold text-gray-800'>All Matches</h3>
          <div className='relative'>
            <FaSearch className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search matches...'
              className='pl-10 pr-4 py-2 border rounded-lg w-full'
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='bg-gray-50 text-sm text-gray-600'>
                <th className='p-4 font-medium'>Match Name</th>
                <th className='p-4 font-medium'>Category</th>
                <th className='p-4 font-medium'>Match Date & Time</th>
                <th className='p-4 font-medium'>Location</th>
                <th className='p-4 font-medium'>Match Type</th>
                <th className='p-4 font-medium'>Status</th>
                <th className='p-4 font-medium text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {matchesData.map((row, index) => (
                <tr key={index} className='border-b hover:bg-gray-50'>
                  <td className='p-4 font-semibold text-gray-700 whitespace-nowrap'>
                    {row.name}
                  </td>
                  <td className='p-4 text-gray-600'>{row.category}</td>
                  <td className='p-4 text-gray-600 whitespace-nowrap'>
                    {row.dateTime}
                  </td>
                  <td className='p-4 text-gray-600'>{row.location}</td>
                  <td className='p-4 text-gray-600'>{row.type}</td>
                  <td className='p-4'>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className='p-4 text-center'>
                    <button
                      className={`px-4 py-2 text-sm font-semibold rounded-lg ${getActionClass(
                        row.action
                      )}`}
                    >
                      {row.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
          <span>Showing 10 of 42 matches</span>
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
            <button className='p-2 w-8 h-8 rounded-md hover:bg-gray-200'>
              5
            </button>
            <button className='p-2 rounded-md hover:bg-gray-200'>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataAnalystMatches = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex h-screen bg-gray-100 font-sans'>
      <Sidebar onLogout={handleLogout} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header
          title='Matches'
          breadcrumbs='Home / Matches'
          userName='Michael Johnson'
          userRole='Data Analyst'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <DataAnalystMatchesContent />
        </main>
      </div>
    </div>
  );
};

export default DataAnalystMatches;
