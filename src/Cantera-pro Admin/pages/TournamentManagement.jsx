import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const TournamentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allTournaments = [
    {
      id: 1,
      name: "European Youth Cup 2025",
      category: "U15",
      matches: 32,
      startDate: "May 15, 2025",
      endDate: "May 30, 2025",
    },
    {
      id: 2,
      name: "Barcelona Summer Cup",
      category: "U13",
      matches: 24,
      startDate: "June 10, 2025",
      endDate: "June 20, 2025",
    },
    {
      id: 3,
      name: "Madrid Champions League",
      category: "U17",
      matches: 48,
      startDate: "July 5, 2025",
      endDate: "July 25, 2025",
    },
    {
      id: 4,
      name: "London International Cup",
      category: "U15",
      matches: 36,
      startDate: "August 8, 2025",
      endDate: "August 22, 2025",
    },
    {
      id: 5,
      name: "Paris Youth Tournament",
      category: "U13",
      matches: 28,
      startDate: "September 3, 2025",
      endDate: "September 14, 2025",
    },
    {
      id: 6,
      name: "Munich Elite Cup",
      category: "U17",
      matches: 42,
      startDate: "October 10, 2025",
      endDate: "October 25, 2025",
    },
    {
      id: 7,
      name: "Amsterdam Youth Challenge",
      category: "U15",
      matches: 30,
      startDate: "November 5, 2025",
      endDate: "November 18, 2025",
    },
    {
      id: 8,
      name: "Rome Winter Cup",
      category: "U13",
      matches: 26,
      startDate: "December 8, 2025",
      endDate: "December 18, 2025",
    },
    // Add more tournaments for testing pagination
  ];

  const totalPages = Math.ceil(allTournaments.length / itemsPerPage);
  const paginatedTournaments = allTournaments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header
          title='Tournament Management'
          route='Home / Tournament Management'
        />

        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Tournament Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Category
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Number of Matches
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Start Date
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      End Date
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider pr-10'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {paginatedTournaments.map((tournament) => (
                    <tr key={tournament.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                        {tournament.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {tournament.category}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {tournament.matches}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {tournament.startDate}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {tournament.endDate}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <button className='bg-primary_400 text-white px-4 py-1 rounded-lg text-sm hover:bg-primary'>
                          View Matches
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex justify-between items-center mt-4 flex-wrap gap-2'>
              <p className='text-sm text-gray-600'>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, allTournaments.length)} of{" "}
                {allTournaments.length} tournaments
              </p>
              <div className='flex items-center space-x-1'>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    currentPage === 1
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    currentPage === totalPages
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
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

export default TournamentManagement;
