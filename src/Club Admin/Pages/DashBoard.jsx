import React from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import { FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";

const Dashboard = () => {
  const stats = [
    { label: "Players", count: 78, total: 100, icon: <FaUserFriends /> },
    { label: "Coaches", count: 14, total: 20, icon: <FaChalkboardTeacher /> },
    { label: "Data Analysts", count: 2, total: 2, icon: <IoMdAnalytics /> },
    { label: "Club Admins", count: 3, total: 5, icon: <RiAdminLine /> },
  ];

  const matches = [
    {
      name: "FC Barcelona vs Real Madrid",
      category: "U13",
      date: "Apr 28, 2025 • 15:30",
      location: "Camp Nou Stadium",
      status: "Upcoming",
    },
    {
      name: "Manchester United vs Liverpool",
      category: "U15",
      date: "Apr 27, 2025 • 14:00",
      location: "Old Trafford Stadium",
      status: "Upcoming",
    },
    {
      name: "Bayern Munich vs Borussia Dortmund",
      category: "U17",
      date: "Apr 25, 2025 • 18:00",
      location: "Allianz Arena",
      status: "Completed",
    },
    {
      name: "Paris Saint-Germain vs Marseille",
      category: "U13",
      date: "Apr 23, 2025 • 16:30",
      location: "Parc des Princes",
      status: "Completed",
    },
    {
      name: "Juventus vs AC Milan",
      category: "U15",
      date: "Apr 22, 2025 • 19:45",
      location: "Allianz Stadium",
      status: "Completed",
    },
    {
      name: "Ajax vs PSV Eindhoven",
      category: "U17",
      date: "Apr 20, 2025 • 14:30",
      location: "Johan Cruyff Arena",
      status: "Completed",
    },
  ];

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar />

      {/* Main Content + Sidebar Panel Side-by-Side */}
      <div className='flex flex-1 overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        {/* Main Content Area */}
        <div className='flex-1 flex flex-col overflow-y-auto'>
          <Header title='Dashboard' route='Home / Dashboard' />

          <main className='p-6'>
            {/* Top Cards */}
          

            {/* Recent Matches */}
            <div className='bg-white p-6 rounded-xl shadow-sm'>
              <h3 className='text-lg font-semibold mb-4'>Recent Matches</h3>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left'>
                  <thead className='bg-gray-100 text-gray-700'>
                    <tr className='border-b'>
                      <th className='px-4 py-2'>Match Name</th>
                      <th className='px-4 py-2'>Category</th>
                      <th className='px-4 py-2'>Match Date & Time</th>
                      <th className='px-4 py-2'>Location</th>
                      <th className='px-4 py-2'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match, i) => (
                      <tr key={i} className='border-b'>
                        <td className='px-4 py-2'>{match.name}</td>
                        <td className='px-4 py-2'>{match.category}</td>
                        <td className='px-4 py-2'>{match.date}</td>
                        <td className='px-4 py-2'>{match.location}</td>
                        <td className='px-4 py-2'>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              match.status === "Upcoming"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {match.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>

        {/* Right Sidebar Panel */}
        <div className='w-[320px] bg-white p-6 border-l shadow-sm hidden xl:block'>
          <div className='text-center'>
            <div className='bg-purple-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold'>
              🔰
            </div>
            <h3 className='text-lg font-semibold mt-2'>FC Barcelona Academy</h3>
            <p className='text-sm text-gray-500'>Premier Youth Club</p>
          </div>

          <div className='mt-6 space-y-2 text-sm text-gray-700'>
            <p>
              <strong>Country:</strong> Spain
            </p>
            <p>
              <strong>State/Region:</strong> Catalonia
            </p>
            <p>
              <strong>License Start Date:</strong> January 15, 2025
            </p>
            <p>
              <strong>License End Date:</strong> January 14, 2026
            </p>
            <p>
              <strong>License Status:</strong>{" "}
              <span className='text-green-600 font-medium'>● Active</span>
            </p>
          </div>

          <div className='mt-6'>
            <button className='w-full flex items-center justify-center gap-2 border border-purple-700 text-purple-700 rounded-md py-2 hover:bg-purple-50 text-sm'>
              <RiAdminLine />
              Add New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
