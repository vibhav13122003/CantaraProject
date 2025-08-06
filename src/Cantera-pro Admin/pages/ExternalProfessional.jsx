import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaFilter, FaEye } from "react-icons/fa";
import ExternalProfessionalProfile from "../Components/ExternalProfessionalProfile"; // Modal/view component

// Mock professional data
const mockProfessionals = [
  {
    name: "Lukas Podolski",
    email: "lukas.podolski@example.com",
    phone: "+49 176 9876 5432",
    category: "Coach",
    idProof: true,
    signature: "Not Connected",
  },
  {
    name: "Elena Rodriguez",
    email: "elena.rodriguez@example.com",
    phone: "+34 611 234 567",
    category: "Nutritionist",
    idProof: true,
    signature: "Connected",
  },
  {
    name: "David Williams",
    email: "david.williams@example.com",
    phone: "+44 7700 912345",
    category: "Psychologist",
    idProof: true,
    signature: "Connected",
  },
];

const ExternalProfessional = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(mockProfessionals.length / itemsPerPage);
  const paginatedData = mockProfessionals.slice(
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
          title='External Professionals'
          route='Home / External Professionals'
        />

        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            {/* Filters */}
            <div className='flex flex-wrap gap-3 mb-4'>
              <input
                placeholder='Search professionals...'
                className='border px-4 py-2 rounded-md text-sm w-64'
              />
              <select className='border rounded-md px-4 py-2 text-sm text-gray-700'>
                <option>All Categories</option>
                <option>Coach</option>
                <option>Therapist</option>
                <option>Psychologist</option>
              </select>
              <select className='border rounded-md px-4 py-2 text-sm text-gray-700'>
                <option>All Verification Status</option>
                <option>Verified</option>
                <option>Pending</option>
              </select>
              <select className='border rounded-md px-4 py-2 text-sm text-gray-700'>
                <option>All Stripe Status</option>
                <option>Connected</option>
                <option>Not Connected</option>
              </select>
              <button className='ml-auto flex items-center gap-2 text-sm bg-purple-700 text-white px-4 py-2 rounded-md'>
                <FaFilter /> Apply Filters
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left border-t'>
                <thead className='text-gray-700 bg-gray-100'>
                  <tr className='border-b'>
                    <th className='px-3 py-2 font-medium'>Full Name ⬍</th>
                    <th className='px-3 py-2 font-medium'>Email Address ⬍</th>
                    <th className='px-3 py-2 font-medium'>Phone Number</th>
                    <th className='px-3 py-2 font-medium'>
                      Professional Category
                    </th>
                    <th className='px-3 py-2 font-medium'>ID Proof Document</th>
                    <th className='px-3 py-2 font-medium'>Signature</th>
                    <th className='px-3 py-2 font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((pro, index) => (
                    <tr key={index} className='border-b'>
                      <td className='px-3 py-2'>{pro.name}</td>
                      <td className='px-3 py-2'>{pro.email}</td>
                      <td className='px-3 py-2'>{pro.phone}</td>
                      <td className='px-3 py-2'>{pro.category}</td>
                      <td className='px-3 py-2'>
                        {pro.idProof ? (
                          <img
                            src='/dummy-id.png'
                            alt='ID Proof'
                            className='w-12 h-8 object-cover border rounded'
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className='px-3 py-2'>
                        {pro.signature === "Connected" ? (
                          <span className='text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full'>
                            Signature
                          </span>
                        ) : (
                          <span className='text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full'>
                            Not Connected
                          </span>
                        )}
                      </td>
                      <td className='px-3 py-2 text-purple-700 cursor-pointer'>
                        <FaEye onClick={() => setSelectedProfessional(pro)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='mt-4 flex justify-between items-center text-sm text-gray-600'>
              <p>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, mockProfessionals.length)}{" "}
                of {mockProfessionals.length} entries
              </p>
              <div className='flex items-center gap-1'>
                <button
                  className='px-2 py-1 border rounded disabled:opacity-50'
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-purple-700 text-white"
                        : "bg-white border"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className='px-2 py-1 border rounded'
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>

          {/* Modal */}
          {selectedProfessional && (
            <ExternalProfessionalProfile
              professional={selectedProfessional}
              onClose={() => setSelectedProfessional(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ExternalProfessional;
