import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";

const mockLogs = [
  {
    timestamp: "30 May 2025, 10:23 AM",
    admin: "Emma Thompson",
    activity: "Update",
    description:
      "Updated player profile: Lucas Hernandez - Added new performance metrics",
    module: "Player",
  },
  {
    timestamp: "30 May 2025, 09:45 AM",
    admin: "Michael Chen",
    activity: "Create",
    description: "Added new match: FC Barcelona vs Real Madrid on 15 June 2025",
    module: "Match",
  },
  {
    timestamp: "29 May 2025, 04:17 PM",
    admin: "Sophia Garcia",
    activity: "Delete",
    description:
      "Removed scout inquiry from Manchester United for player Carlos Vela",
    module: "Scout",
  },
  {
    timestamp: "29 May 2025, 02:34 PM",
    admin: "James Rodriguez",
    activity: "Create",
    description: "Added new player: Marco Asensio - U17 squad",
    module: "Player",
  },
  {
    timestamp: "29 May 2025, 11:05 AM",
    admin: "David Kim",
    activity: "Update",
    description: "Modified coach contract: Jürgen Klopp - Extended until 2027",
    module: "Coach",
  },
  {
    timestamp: "28 May 2025, 03:22 PM",
    admin: "Emma Thompson",
    activity: "Create",
    description: "Added new data analyst: Sarah Johnson - Performance Analysis",
    module: "Analyst",
  },
  {
    timestamp: "28 May 2025, 01:47 PM",
    admin: "Michael Chen",
    activity: "Update",
    description:
      "Rescheduled match: vs Athletic Bilbao from 10 June to 12 June 2025",
    module: "Match",
  },
  {
    timestamp: "27 May 2025, 05:11 PM",
    admin: "Sophia Garcia",
    activity: "Create",
    description:
      "Added new scout inquiry from Bayern Munich for player Jamal Musiala",
    module: "Scout",
  },
  {
    timestamp: "27 May 2025, 11:38 AM",
    admin: "James Rodriguez",
    activity: "Update",
    description:
      "Updated player injury status: Pedri González - Return date set to 15 June",
    module: "Player",
  },
  {
    timestamp: "26 May 2025, 04:55 PM",
    admin: "David Kim",
    activity: "Delete",
    description: "Removed coach: Antonio Conte - Contract terminated",
    module: "Coach",
  },
];

const badgeColors = {
  Player: "bg-green-100 text-green-600",
  Coach: "bg-blue-100 text-blue-600",
  Match: "bg-purple-100 text-purple-600",
  Scout: "bg-red-100 text-red-600",
  Analyst: "bg-yellow-100 text-yellow-600",
};

const AdminActivityLog = () => {
  const [adminFilter, setAdminFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleReset = () => {
    setAdminFilter("");
    setActivityFilter("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className='flex h-screen font-sans bg-gray-50'>
      <Sidebar />
      <div className='flex-1 overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header title='Admin Activity Log' route='Home / Admin Activity Log' />

        <main className='p-6'>
          {/* Filters */}
          <div className='bg-white p-4 rounded-xl shadow-sm mb-4'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <select
                value={adminFilter}
                onChange={(e) => setAdminFilter(e.target.value)}
                className='border rounded-md px-3 py-2 text-sm w-full'
              >
                <option>All Admins</option>
                <option>Emma Thompson</option>
                <option>Michael Chen</option>
                <option>Sophia Garcia</option>
              </select>

              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className='border rounded-md px-3 py-2 text-sm w-full'
              >
                <option>All Activities</option>
                <option>Create</option>
                <option>Update</option>
                <option>Delete</option>
              </select>

              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='border rounded-md px-3 py-2 text-sm w-full'
              />
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='border rounded-md px-3 py-2 text-sm w-full'
              />
            </div>

            <div className='flex justify-end gap-3 mt-4'>
              <button className='bg-purple-700 text-white text-sm px-4 py-2 rounded-md'>
                Apply Filters
              </button>
              <button
                onClick={handleReset}
                className='text-sm px-4 py-2 rounded-md border'
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className='bg-white rounded-xl shadow-sm overflow-x-auto'>
            <table className='w-full text-sm text-left'>
              <thead className='bg-gray-100 text-gray-700'>
                <tr className='border-b'>
                  <th className='px-4 py-2'>Timestamp</th>
                  <th className='px-4 py-2'>Admin Name</th>
                  <th className='px-4 py-2'>Activity</th>
                  <th className='px-4 py-2'>Action Description</th>
                  <th className='px-4 py-2'>Module</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map((log, index) => (
                  <tr key={index} className='border-b'>
                    <td className='px-4 py-2'>{log.timestamp}</td>
                    <td className='px-4 py-2'>{log.admin}</td>
                    <td className='px-4 py-2'>{log.activity}</td>
                    <td className='px-4 py-2'>{log.description}</td>
                    <td className='px-4 py-2'>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          badgeColors[log.module]
                        }`}
                      >
                        {log.module}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className='p-4 flex justify-between items-center text-sm text-gray-600'>
              <span>Showing page 1 of 5</span>
              <div className='flex items-center gap-2'>
                <button className='px-2 py-1 border rounded text-sm'>
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={`px-3 py-1 rounded text-sm ${
                      p === 1
                        ? "bg-purple-700 text-white"
                        : "border text-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button className='px-2 py-1 border rounded text-sm'>
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminActivityLog;
