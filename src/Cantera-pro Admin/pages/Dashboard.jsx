import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const iconMap = {
  active: "/active.png",
  scout: "/scout.png",
  categories: "/categories.png",
  professional: "/professional.png",
  arrowUp: "/upArrow.png",
  approved: "/correct.png",
  registered: "/scout.png",
  rejected: "/wrong.png",
  license: "/clubs.png",
  tournament: "/tournamentIcon.png",
};

const DashboardContent = ({ refreshKey }) => {
  const [stats, setStats] = useState({
    activeClubs: 248,
    scouts: 1342,
    professionals: 567,
    categories: 32,
  });

  const [recentClubs, setRecentClubs] = useState([
    { name: "Real Madrid CF", location: "Madrid, Spain", time: "2 hours ago" },
    {
      name: "Ajax Amsterdam",
      location: "Amsterdam, Netherlands",
      time: "5 hours ago",
    },
    { name: "FC Porto", location: "Porto, Portugal", time: "8 hours ago" },
    {
      name: "Olympique Lyonnais",
      location: "Lyon, France",
      time: "12 hours ago",
    },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      status: "approved",
      action: "FC Barcelona approved as Premium club",
      time: "Today at 10:45 AM",
    },
    {
      status: "registered",
      action: "New scout registered: James Rodriguez",
      time: "Today at 09:32 AM",
    },
    {
      status: "scout",
      action: "Manchester United updated license information",
      time: "Yesterday at 5:18 PM",
    },
    {
      status: "tournament",
      action: "New tournament created: European Youth Cup 2025",
      time: "Yesterday at 3:45 PM",
    },
    {
      status: "approved",
      action: "Bayern Munich approved as Premium club",
      time: "April 24, 2025 at 11:20 AM",
    },
    {
      status: "rejected",
      action: "Rejected club application: Dynamo Zagreb",
      time: "April 24, 2025 at 10:15 AM",
    },
  ]);

  const statCards = [
    {
      label: "Total Active Clubs",
      value: stats.activeClubs,
      icon: iconMap.active,
      change: "12% from last month",
    },
    {
      label: "Total Scouts",
      value: stats.scouts,
      icon: iconMap.scout,
      change: "8% from last month",
    },
    {
      label: "External Professionals",
      value: stats.professionals,
      icon: iconMap.professional,
      change: "5% from last month",
    },
    {
      label: "Total Categories",
      value: stats.categories,
      icon: iconMap.categories,
      change: "No change from last month",
    },
  ];

  return (
    <div className='space-y-6 '>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {statCards.map((card, index) => (
          <div
            key={index}
            className='bg-white rounded-xl shadow-md p-5 flex justify-between items-center'
          >
            {/* Left: Textual Info */}
            <div className='flex flex-col justify-center'>
              <h4 className='text-gray-500 text-sm font-medium'>
                {card.label}
              </h4>
              <h2 className='text-2xl font-bold text-gray-800 mt-4'>
                {card.value}
              </h2>
              <div className="flex justify-center items-center gap-2">
                <img src="/upArrow.png" alt="" className="w-3 h-3 mt-4 " />
                <p className='text-xs text-green-500 mt-4'>{card.change}</p>
              </div>
            </div>

            {/* Right: Icon */}
            <div className='w-12 h-12 rounded-full flex -mt-12'>
              <img
                src={card.icon}
                alt=''
                className='w-10 h-10 object-contain'
              />
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white rounded-xl shadow-md p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Recently Added Clubs
          </h3>
          <ul className='divide-y divide-gray-100'>
            {recentClubs.map((club, index) => (
              <li
                key={index}
                className='py-3 flex justify-between items-center'
              >
                <div>
                  <div className='flex items-center justify-center gap-2'>
                    <img src='/clubs.png' alt='' />
                    <h4 className='font-semibold text-gray-800'>{club.name}</h4>
                  </div>
                  <p className='text-sm text-gray-500'>{club.location}</p>
                </div>
                <span className='text-xs text-gray-400'>{club.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Recent Activities
          </h3>
          <ul className='space-y-4'>
            {recentActivity.map((act, index) => {
              const iconPath = iconMap[act.status] || "/default.png";
              return (
                <li key={index} className='flex items-start'>
                  <img
                    src={iconPath}
                    alt={act.status}
                    className='w-10 h-10 mr-3 mt-0.5'
                  />
                  <div>
                    <p className='text-sm text-gray-700 font-semibold'>{act.action}</p>
                    <span className='text-xs text-gray-400'>{act.time}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);
  const activeRoute = `Home/${activeTab}`;


  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header title={activeTab} route={activeRoute} />
        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <DashboardContent refreshKey={refreshKey} />
        </main>
      </div>
    
    </div>
  );
};

export default Dashboard;
