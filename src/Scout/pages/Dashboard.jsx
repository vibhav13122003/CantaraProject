import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// --- Mock Data for the Scout Dashboard ---
const keyStatsData = [
  {
    title: "Messages Sent",
    value: 83,
    change: 8,
    changeType: "increase",
    icon: "💬",
  },
  {
    title: "External Players",
    value: 56,
    change: 3,
    changeType: "decrease",
    icon: "👤",
  },
  {
    title: "Club Players",
    value: 124,
    change: 15,
    changeType: "increase",
    icon: "👥",
  },
];

const quickAccessData = [
  {
    title: "Browse Players",
    description:
      "Discover new talents and review player profiles in your network.",
    buttonText: "View Players",
    icon: "🔍",
  },
  {
    title: "Messages",
    description: "Check your inbox and respond to players and other scouts.",
    buttonText: "Open Messages",
    icon: "📨",
  },
  {
    title: "Profile Settings",
    description:
      "Update your profile information and notification preferences.",
    buttonText: "Go to Settings",
    icon: "⚙️",
  },
];

const recentMessagesData = [
  {
    name: "Lucas Hernandez",
    message: "Thank you for the feedback on my recent match performance...",
    time: "2 hours ago",
    avatar: "LH",
  },
  {
    name: "Sarah Thompson",
    message: "Can we discuss the potential transfer of Miguel Santos to...",
    time: "Yesterday",
    avatar: "ST",
  },
  {
    name: "David Okonkwo",
    message: "I've updated my profile with recent match statistics and...",
    time: "2 days ago",
    avatar: "DO",
  },
  {
    name: "Michael Reeves",
    message: "We're looking for a defensive midfielder for the upcoming...",
    time: "3 days ago",
    avatar: "MR",
  },
];

// --- Reusable Components for the Dashboard ---
const StatCard = ({ item }) => (
  <div className='bg-white p-5 rounded-xl shadow-sm border border-gray-200'>
    <div className='flex justify-between items-start'>
      <div>
        <p className='text-sm text-gray-500 font-medium'>{item.title}</p>
        <p className='text-4xl font-bold text-gray-800 mt-2'>{item.value}</p>
        <div
          className={`flex items-center gap-1 mt-2 text-xs ${
            item.changeType === "increase" ? "text-green-500" : "text-red-500"
          }`}
        >
          {item.changeType === "increase" ? <FaArrowUp /> : <FaArrowDown />}
          <span>{item.change}% from last month</span>
        </div>
      </div>
      <div className='text-2xl bg-gray-100 p-3 rounded-full'>{item.icon}</div>
    </div>
  </div>
);

const QuickAccessCard = ({ item }) => (
  <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center'>
    <div className='text-3xl bg-gray-100 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4'>
      {item.icon}
    </div>
    <h3 className='text-lg font-semibold text-gray-800'>{item.title}</h3>
    <p className='text-sm text-gray-500 mt-2 mb-4 h-10'>{item.description}</p>
    <button className='w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700'>
      {item.buttonText}
    </button>
  </div>
);

// --- The main content area of the Scout Dashboard ---
const ScoutDashboardContent = () => {
  return (
    <div className='space-y-8'>
      {/* Key Statistics */}
      <div>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Key Statistics
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {keyStatsData.map((item, index) => (
            <StatCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Quick Access
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {quickAccessData.map((item, index) => (
            <QuickAccessCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Recent Messages
        </h3>
        <ul className='space-y-4'>
          {recentMessagesData.map((msg, index) => (
            <li
              key={index}
              className='flex items-center justify-between pb-4 border-b last:border-b-0'
            >
              <div className='flex items-center'>
                <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-purple-600 mr-4'>
                  {msg.avatar}
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>{msg.name}</p>
                  <p className='text-sm text-gray-500 truncate max-w-xs'>
                    {msg.message}
                  </p>
                </div>
              </div>
              <span className='text-xs text-gray-400 whitespace-nowrap'>
                {msg.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className='text-center pt-4'>
        <p className='text-sm text-gray-500'>
          © 2025 Cantera Pro Scout Panel. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const ScoutDashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex h-screen bg-gray-100 font-sans'>
      <Sidebar onLogout={handleLogout} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header
          title='Welcome'
          breadcrumbs='Home / Dashboard'
          userName='Michael Johnson'
          userRole='Scout'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <ScoutDashboardContent />
        </main>
      </div>
    </div>
  );
};

export default ScoutDashboard;
