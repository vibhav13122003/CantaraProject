import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

const mockCategories = [
  { name: "Coach", count: 124, date: "April 15, 2025", status: "Active" },
  { name: "Therapist", count: 87, date: "March 28, 2025", status: "Active" },
  {
    name: "Nutritionist",
    count: 56,
    date: "February 12, 2025",
    status: "Active",
  },
  {
    name: "Psychologist",
    count: 92,
    date: "January 05, 2025",
    status: "Active",
  },
  {
    name: "Physical Trainer",
    count: 103,
    date: "March 17, 2025",
    status: "Active",
  },
  {
    name: "Sports Medicine",
    count: 41,
    date: "April 02, 2025",
    status: "Pending",
  },
];

const ProfessionalCategoriesManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(mockCategories.length / itemsPerPage);
  const paginatedCategories = mockCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddCategory = () => {
    console.log("Adding category:", newCategory);
    setIsModalOpen(false);
    setNewCategory("");
  };

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header
          title='Professional Categories Management'
          route='Home / Professional Categories Management'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>
                Professional Categories List
              </h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className='bg-purple-700 text-white px-4 py-2 rounded-md text-sm'
              >
                + Add Category
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left'>
                <thead className='text-gray-700 bg-gray-100'>
                  <tr className='border-b'>
                    <th className='px-4 py-2'>Category Name</th>
                    <th className='px-4 py-2'>Professionals</th>
                    <th className='px-4 py-2'>Created Date</th>
                    <th className='px-4 py-2'>Status</th>
                    <th className='px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.map((cat, i) => (
                    <tr key={i} className='border-b'>
                      <td className='px-4 py-2 font-semibold'>{cat.name}</td>
                      <td className='px-4 py-2'>{cat.count}</td>
                      <td className='px-4 py-2'>{cat.date}</td>
                      <td className='px-4 py-2'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            cat.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {cat.status}
                        </span>
                      </td>
                      <td className='px-4 py-2 flex gap-3 text-gray-500'>
                        <FaEdit className='cursor-pointer' />
                        <FaTrash className='cursor-pointer' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, mockCategories.length)} of{" "}
                {mockCategories.length} entries
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 rounded-md border ${
                      currentPage === i + 1
                        ? "bg-purple-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
            <h3 className='text-lg font-semibold mb-4'>Add New Category</h3>
            <input
              type='text'
              className='w-full border px-4 py-2 rounded-md mb-4'
              placeholder='Enter category name'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 rounded-md border'
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className='px-4 py-2 rounded-md bg-purple-700 text-white'
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalCategoriesManagement;
