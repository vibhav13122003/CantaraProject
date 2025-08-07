import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Assuming this path is correct
import Header from "../Components/Header"; // Assuming this path is correct
import AddCoachModal from "../Components/AddCoachModal"; // Assuming this path is correct
import { FaSearch, FaEye, FaPen, FaTrash } from "react-icons/fa";

// Updated mock data to match the UI in the screenshot
const initialCoaches = [
  {
    id: 1,
    name: "James Miller",
    role: "Head Coach",
    email: "james.miller@canterapro.com",
    categories: ["U13", "U15"],
    status: "Active",
    initials: "JM",
    avatarColor: "bg-blue-500",
  },
  {
    id: 2,
    name: "Sarah Rodriguez",
    role: "Assistant Coach",
    email: "sarah.rodriguez@canterapro.com",
    categories: ["U13"],
    status: "Active",
    initials: "SR",
    avatarColor: "bg-green-500",
  },
  {
    id: 3,
    name: "David Thompson",
    role: "Fitness Coach",
    email: "david.thompson@canterapro.com",
    categories: ["U15", "U17"],
    status: "Pending",
    initials: "DT",
    avatarColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Emma Johnson",
    role: "Goalkeeper Coach",
    email: "emma.johnson@canterapro.com",
    categories: ["U13", "U15", "U17"],
    status: "Active",
    initials: "EJ",
    avatarColor: "bg-red-500",
  },
  {
    id: 5,
    name: "Michael Kim",
    role: "Technical Coach",
    email: "michael.kim@canterapro.com",
    categories: ["U17"],
    status: "Pending",
    initials: "MK",
    avatarColor: "bg-yellow-500",
  },
  {
    id: 6,
    name: "Olivia Chen",
    role: "Head Coach",
    email: "olivia.chen@canterapro.com",
    categories: ["U19"],
    status: "Active",
    initials: "OC",
    avatarColor: "bg-pink-500",
  },
  {
    id: 7,
    name: "Ben Carter",
    role: "Assistant Coach",
    email: "ben.carter@canterapro.com",
    categories: ["U19"],
    status: "Pending",
    initials: "BC",
    avatarColor: "bg-indigo-500",
  },
];

const CoachManagement = () => {
  const [coaches, setCoaches] = useState(initialCoaches);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Coaches");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Logic for filtering and pagination ---
  const filteredCoaches = coaches
    .filter(
      (coach) =>
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (coach) => statusFilter === "All Coaches" || coach.status === statusFilter
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoaches = filteredCoaches.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // --- Helper components for cleaner JSX ---
  const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    const statusClasses = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span className={`${baseClasses} ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const ActionButtons = ({ coachId }) => (
    <div className='flex items-center space-x-4 text-gray-500'>
      <button className='hover:text-blue-600 transition-colors'>
        <FaEye />
      </button>
      <button className='hover:text-green-600 transition-colors'>
        <FaPen />
      </button>
      <button className='hover:text-red-600 transition-colors'>
        <FaTrash />
      </button>
    </div>
  );

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar />

      <div className='flex-1 flex flex-col overflow-hidden '>
        <Header
          title='Coach Management'
          route='Home / Coach Management'
          onAddCoachClick={() => setIsAddModalOpen(true)} 
        />

        <main className='flex-1 overflow-y-auto p-6'>
          {/* Search and Filter Controls */}
          <div className='bg-white p-4 rounded-xl shadow-sm mb-6'>
            <div className='flex justify-between items-center'>
              <div className='relative w-full max-w-xs'>
                <input
                  type='text'
                  placeholder='Search coaches...'
                  className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow'
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-600'>Show:</span>
                <select
                  className='border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow'
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option>All Coaches</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Coach Table */}
          <div className='bg-white rounded-xl shadow-sm overflow-x-auto'>
            <table className='w-full text-sm text-left'>
              <thead className='bg-gray-50 text-gray-600 uppercase text-xs'>
                <tr>
                  <th className='px-6 py-3 font-semibold'>Coach Name</th>
                  <th className='px-6 py-3 font-semibold'>Email ID</th>
                  <th className='px-6 py-3 font-semibold'>
                    Assigned Categories
                  </th>
                  <th className='px-6 py-3 font-semibold'>Status</th>
                  <th className='px-6 py-3 font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-gray-700'>
                {currentCoaches.map((coach) => (
                  <tr
                    key={coach.id}
                    className='border-b hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center'>
                        <div
                          className={`w-10 h-10 rounded-full ${coach.avatarColor} text-white flex items-center justify-center font-bold mr-3`}
                        >
                          {coach.initials}
                        </div>
                        <div>
                          <div className='font-medium'>{coach.name}</div>
                          <div className='text-xs text-gray-500'>
                            {coach.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>{coach.email}</td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2 flex-wrap'>
                        {coach.categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium'
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <StatusBadge status={coach.status} />
                    </td>
                    <td className='px-6 py-4'>
                      <ActionButtons coachId={coach.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
            <div>
              Showing {Math.min(indexOfFirstItem + 1, filteredCoaches.length)}{" "}
              to {Math.min(indexOfLastItem, filteredCoaches.length)} of{" "}
              {filteredCoaches.length} coaches
            </div>
            <div className='flex items-center'>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-3 py-1 border rounded-md mx-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                &lt;
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 border rounded-md mx-1 transition-colors ${
                    currentPage === number + 1
                      ? "bg-purple-700 text-white border-purple-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-3 py-1 border rounded-md mx-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                &gt;
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Add Coach Modal */}
      {isAddModalOpen && (
        <AddCoachModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(newCoach) => {
            // NOTE: This is a simple way to add a coach.
            // In a real app, you'd want a more robust ID generation system.
            const coachToAdd = {
              ...newCoach,
              id: coaches.length + 1,
              // Add default values for new fields if your modal doesn't provide them
              role: newCoach.role || "New Coach",
              status: "Pending",
              initials: `${newCoach.name.split(" ")[0][0]}${
                newCoach.name.split(" ")[1]?.[0] || ""
              }`.toUpperCase(),
              avatarColor: "bg-gray-500",
            };
            setCoaches([...coaches, coachToAdd]);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CoachManagement;
