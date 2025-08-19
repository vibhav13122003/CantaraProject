import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaSearch, FaFilter, FaArrowUp } from "react-icons/fa";

// --- Mock Data for the page ---
const statsCardsData = [
  {
    title: "Total Matches Assigned",
    value: "42",
    change: "12% increase from last month",
    changeColor: "text-green-500",
    icon: "⚙️",
  },
  {
    title: "Scorecards Pending",
    value: "7",
    change: "2 more than yesterday",
    changeColor: "text-red-500",
    icon: "⏳",
  },
  {
    title: "Scorecards Completed",
    value: "35",
    change: "83% completion rate",
    changeColor: "text-green-500",
    icon: "✅",
  },
  {
    title: "Last Scorecard Updated",
    value: "Apr 24",
    change: "Barcelona vs Real Madrid",
    changeColor: "text-gray-500",
    icon: "📅",
  },
];

const recentActivityData = [
  {
    name: "Manchester City vs Liverpool",
    category: "Premier League",
    date: "Apr 25, 2025",
    status: "Pending",
    action: "Enter Scorecard",
  },
  {
    name: "Barcelona vs Real Madrid",
    category: "La Liga",
    date: "Apr 24, 2025",
    status: "Completed",
    action: "Edit Scorecard",
  },
  {
    name: "Bayern Munich vs Borussia Dortmund",
    category: "Bundesliga",
    date: "Apr 23, 2025",
    status: "Completed",
    action: "Edit Scorecard",
  },
  {
    name: "PSG vs Marseille",
    category: "Ligue 1",
    date: "Apr 22, 2025",
    status: "Pending",
    action: "Enter Scorecard",
  },
  {
    name: "Juventus vs AC Milan",
    category: "Serie A",
    date: "Apr 21, 2025",
    status: "Completed",
    action: "Edit Scorecard",
  },
  {
    name: "Arsenal vs Chelsea",
    category: "Premier League",
    date: "Apr 20, 2025",
    status: "Completed",
    action: "Edit Scorecard",
  },
];

const upcomingMatchesData = [
  {
    date: "Apr 26, 2025",
    league: "Premier League",
    teamA: "TOT",
    teamB: "WHU",
  },
  { date: "Apr 27, 2025", league: "Serie A", teamA: "INT", teamB: "ROM" },
  { date: "Apr 28, 2025", league: "La Liga", teamA: "ATM", teamB: "SEV" },
];

// --- Reusable Components for the Dashboard ---
const StatCard = ({ item }) => (
  <div className='bg-white p-5 rounded-xl shadow-sm border border-gray-200'>
    <div className='flex justify-between items-start'>
      <div>
        <p className='text-sm text-gray-500 font-medium'>{item.title}</p>
        <p className='text-3xl font-bold text-gray-800 mt-2'>{item.value}</p>
        <div
          className={`flex items-center gap-1 mt-2 text-xs ${item.changeColor}`}
        >
          {item.title !== "Last Scorecard Updated" && <FaArrowUp />}
          <span>{item.change}</span>
        </div>
      </div>
      <div className='text-2xl bg-gray-100 p-3 rounded-full'>{item.icon}</div>
    </div>
  </div>
);

const UpcomingMatchCard = ({ match }) => (
  <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
    <div className='flex justify-between items-center text-xs text-gray-500 mb-2'>
      <span>{match.date}</span>
      <span>{match.league}</span>
    </div>
    <div className='flex justify-between items-center font-bold text-lg my-3'>
      <span>{match.teamA}</span>
      <span className='text-gray-400 text-sm'>vs</span>
      <span>{match.teamB}</span>
    </div>
    <button className='w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700'>
      Prepare Scorecard
    </button>
  </div>
);

// --- The main content area of the Data Analyst Dashboard ---
const DataAnalystDashboardContent = () => {
  const getStatusClass = (status) =>
    status === "Pending"
      ? "bg-pink-100 text-pink-800"
      : "bg-green-100 text-green-800";
  const getActionClass = (action) =>
    action === "Enter Scorecard"
      ? "bg-purple-600 text-white hover:bg-purple-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <div className='space-y-8'>
      {/* Top Stat Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {statsCardsData.map((item, index) => (
          <StatCard key={index} item={item} />
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Recent Activity
          </h3>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <FaSearch className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search matches...'
                className='pl-10 pr-4 py-2 border rounded-lg w-full'
              />
            </div>
            <button className='flex items-center gap-2 bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg'>
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='bg-gray-50 text-sm text-gray-600'>
                <th className='p-4 font-medium'>Match Name</th>
                <th className='p-4 font-medium'>Category</th>
                <th className='p-4 font-medium'>Match Date</th>
                <th className='p-4 font-medium'>Status</th>
                <th className='p-4 font-medium text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentActivityData.map((row, index) => (
                <tr key={index} className='border-b hover:bg-gray-50'>
                  <td className='p-4 font-semibold text-gray-700'>
                    {row.name}
                  </td>
                  <td className='p-4 text-gray-600'>{row.category}</td>
                  <td className='p-4 text-gray-600'>{row.date}</td>
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
          <span>Showing 6 of 42 matches</span>
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

      {/* Upcoming Matches Section */}
      <div>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Upcoming Matches
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {upcomingMatchesData.map((match, index) => (
            <UpcomingMatchCard key={index} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const DataAnalystDashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex h-screen bg-gray-100 font-sans'>
      <Sidebar onLogout={handleLogout} />
      <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
        <Header
          title='Welcome'
          breadcrumbs='Home / Dashboard'
          userName='Michael Johnson'
          userRole='Data Analyst'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <DataAnalystDashboardContent />
        </main>
      </div>
    </div>
  );
};

export default DataAnalystDashboard;
