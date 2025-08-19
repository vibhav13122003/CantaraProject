import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaEye, FaPencilAlt, FaTelegramPlane } from "react-icons/fa";

// --- Navigation items for the Coach's Sidebar ---
const coachNavItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    to: "/coach/dashboard" /*, icon: "/path/to/icon.svg" */,
  },
  {
    id: "lineups",
    label: "Match - Lineups & Strategy",
    to: "/coach/lineups" /*, icon: "/path/to/icon.svg" */,
  },
  {
    id: "messages",
    label: "Messages",
    to: "/coach/messages" /*, icon: "/path/to/icon.svg" */,
  },
  {
    id: "players",
    label: "Player Management",
    to: "/coach/players" /*, icon: "/path/to/icon.svg" */,
  },
  {
    id: "settings",
    label: "Settings",
    to: "/coach/settings" /*, icon: "/path/to/icon.svg" */,
  },
];

// --- The main content area of the dashboard ---
const CoachDashboardContent = () => {
  // State for the dashboard data, mimicking the image
  const [stats, setStats] = useState({
    coachName: "Michael Rodriguez",
    assignedCategories: ["U13", "U15"],
    upcomingMatches: 8,
    totalPlayers: 42,
  });

  const [upcomingMatches, setUpcomingMatches] = useState([
    {
      name: "FC Barcelona vs Real Madrid",
      category: "U15",
      dateTime: "Apr 28, 2025 - 15:30",
      status: "Upcoming",
    },
    {
      name: "Atletico Madrid vs Valencia CF",
      category: "U13",
      dateTime: "Apr 30, 2025 - 14:00",
      status: "Upcoming",
    },
    {
      name: "Sevilla FC vs Athletic Bilbao",
      category: "U15",
      dateTime: "May 2, 2025 - 16:00",
      status: "Upcoming",
    },
    {
      name: "Real Betis vs Villarreal CF",
      category: "U13",
      dateTime: "May 5, 2025 - 15:00",
      status: "Upcoming",
    },
    {
      name: "FC Barcelona vs Espanyol",
      category: "U15",
      dateTime: "Apr 20, 2025 - 14:30",
      status: "Completed",
    },
  ]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='space-y-8'>
      {/* Top Stat Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {/* Coach Name */}
        <div className='bg-white rounded-xl shadow p-5'>
          <p className='text-gray-500 text-sm font-medium'>Coach Name</p>
          <p className='text-xl font-bold text-gray-800 mt-2'>
            {stats.coachName}
          </p>
        </div>
        {/* Assigned Categories */}
        <div className='bg-white rounded-xl shadow p-5'>
          <p className='text-gray-500 text-sm font-medium'>
            Assigned Categories
          </p>
          <div className='flex space-x-2 mt-2'>
            {stats.assignedCategories.map((cat) => (
              <span
                key={cat}
                className='bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full'
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        {/* Upcoming Matches */}
        <div className='bg-white rounded-xl shadow p-5'>
          <p className='text-gray-500 text-sm font-medium'>Upcoming Matches</p>
          <p className='text-2xl font-bold text-gray-800 mt-2'>
            {stats.upcomingMatches}
          </p>
        </div>
        {/* Total Players */}
        <div className='bg-white rounded-xl shadow p-5'>
          <p className='text-gray-500 text-sm font-medium'>Total Players</p>
          <p className='text-2xl font-bold text-gray-800 mt-2'>
            {stats.totalPlayers}
          </p>
        </div>
      </div>

      {/* Upcoming Matches Table */}
      <div className='bg-white rounded-xl shadow p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Upcoming Matches
        </h3>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b bg-gray-50 text-sm text-gray-600'>
                <th className='p-4 font-medium'>Match Name</th>
                <th className='p-4 font-medium'>Category</th>
                <th className='p-4 font-medium'>Date & Time</th>
                <th className='p-4 font-medium'>Status</th>
                <th className='p-4 font-medium text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingMatches.map((match, index) => (
                <tr key={index} className='border-b hover:bg-gray-50'>
                  <td className='p-4 font-semibold text-gray-700'>
                    {match.name}
                  </td>
                  <td className='p-4'>
                    <span className='bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full'>
                      {match.category}
                    </span>
                  </td>
                  <td className='p-4 text-gray-600'>{match.dateTime}</td>
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
                    <div className='flex justify-center items-center space-x-4 text-gray-500'>
                      <button className='hover:text-blue-600'>
                        <FaEye />
                      </button>
                      <button className='hover:text-yellow-600'>
                        <FaPencilAlt />
                      </button>
                      <button className='hover:text-green-600'>
                        <FaTelegramPlane />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table Footer with Pagination */}
        <div className='flex justify-between items-center mt-6'>
          <button className='text-sm font-semibold text-purple-600 hover:underline'>
            View all matches
          </button>
          <div className='flex items-center space-x-3'>
            <button className='text-sm text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md'>
              Previous
            </button>
            <span className='text-sm text-gray-500'>Page 1 of 3</span>
            <button className='text-sm text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md shadow'>
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className='text-center mt-8'>
        <p className='text-sm text-gray-500'>
          © 2025 Cantera Pro Coach Panel. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const CoachDashboard = () => {
  const { logout } = useAuth();

  // This handler is passed to the Sidebar to trigger logout
  const handleLogout = () => {
    logout();
  };

  // This handler can be used if the sidebar needs to inform the layout of its state
  const handleSidebarStateChange = useCallback((isCollapsed) => {
    // You can use this state if the main content's layout needs to adjust
    // console.log("Sidebar is collapsed:", isCollapsed);
  }, []);

  return (
    <div className='flex h-screen bg-gray-100 font-sans'>
      {/* Assuming you have a reusable Sidebar component.
        We pass the navigation items and the logout handler to it.
      */}
      <Sidebar
        navItems={coachNavItems}
        onLogout={handleLogout}
        onSidebarState={handleSidebarStateChange}
      />

      <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
        <Header
          title='Coach Dashboard'
          breadcrumbs='Home / Coach Dashboard'
          userName='Michael Johnson'
          userRole='Head Coach'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <CoachDashboardContent />
        </main>
      </div>
    </div>
  );
};

export default CoachDashboard;
