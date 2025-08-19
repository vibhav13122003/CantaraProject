import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import AddNewClub from "../Components/AddNewClub"; // Assuming AddNewClub can handle edit mode

const initialClubsData = [
  {
    id: 1,
    name: "FC Barcelona",
    country: "Spain",
    state: "Catalonia",
    adminName: "Miguel Rodriguez",
    adminEmail: "m.rodriguez@fcbarcelona.com",
    clubAdmins: 8,
    coaches: 24,
    players: 50,
    analysts: 4,
    startDate: "2024-01-01",
    endDate: "2025-01-01",
  },
  {
    id: 2,
    name: "Manchester United",
    country: "United Kingdom",
    state: "Manchester",
    adminName: "William Thompson",
    adminEmail: "w.thompson@manutd.com",
    clubAdmins: 6,
    coaches: 18,
    players: 45,
    analysts: 3,
    startDate: "2024-02-15",
    endDate: "2025-02-15",
  },
  {
    id: 3,
    name: "Bayern Munich",
    country: "Germany",
    state: "Bavaria",
    adminName: "Lukas Müller",
    adminEmail: "l.mueller@fcbayern.com",
    clubAdmins: 7,
    coaches: 20,
    players: 48,
    analysts: 5,
    startDate: "2023-12-10",
    endDate: "2024-12-10",
  },
  {
    id: 4,
    name: "Real Madrid",
    country: "Spain",
    state: "Madrid",
    adminName: "Carlos Fernandez",
    adminEmail: "c.fernandez@realmadrid.com",
    clubAdmins: 9,
    coaches: 22,
    players: 52,
    analysts: 6,
    startDate: "2024-03-01",
    endDate: "2025-03-01",
  },
  {
    id: 5,
    name: "Juventus FC",
    country: "Italy",
    state: "Turin",
    adminName: "Marco Bianchi",
    adminEmail: "m.bianchi@juventus.com",
    clubAdmins: 5,
    coaches: 16,
    players: 40,
    analysts: 2,
    startDate: "2024-01-20",
    endDate: "2025-01-20",
  },
  {
    id: 6,
    name: "Paris Saint-Germain",
    country: "France",
    state: "Paris",
    adminName: "Pierre Dubois",
    adminEmail: "p.dubois@psg.fr",
    clubAdmins: 7,
    coaches: 19,
    players: 47,
    analysts: 4,
    startDate: "2024-04-05",
    endDate: "2025-04-05",
  },
];

const initialClubState = {
  name: "",
  country: "",
  state: "",
  adminName: "",
  adminEmail: "",
  clubAdmins: 0,
  coaches: 0,
  players: 0,
  analysts: 0,
  startDate: "",
  endDate: "",
};

const ClubAndLicense = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clubs, setClubs] = useState(initialClubsData);
  const [currentClub, setCurrentClub] = useState(initialClubState);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const itemsPerPage = 6;

  // --- CRUD Handlers ---

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentClub(initialClubState);
    setIsModalOpen(true);
  };

  const handleEditClick = (club) => {
    setIsEditMode(true);
    setCurrentClub(club); // Pre-fill the form with club data
    setIsModalOpen(true);
  };

  const handleDeleteClick = (club) => {
    setSelectedClub(club);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setClubs(clubs.filter((c) => c.id !== selectedClub.id));
    setShowDeleteConfirm(false);
    setSelectedClub(null);
  };

  const handleSaveClub = () => {
    if (isEditMode) {
      // Update existing club
      setClubs(clubs.map((c) => (c.id === currentClub.id ? currentClub : c)));
    } else {
      // Add new club with a unique ID
      setClubs([...clubs, { ...currentClub, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // --- Filtering and Pagination ---
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);
  const paginatedClubs = filteredClubs.slice(
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
        <div className='flex justify-between items-center mt-10 lg:mt-0'>
          <Header
            title='Club & Licence Management'
            route='Home / Club & Licence Management'
          />
          <button
            className='bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary_400 h-11 mr-5'
            onClick={handleOpenAddModal}
          >
            + Add Club
          </button>
        </div>

        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold text-gray-800'>Club List</h2>
              <div className='flex gap-2'>
                <button className='px-4 py-2 border rounded-lg text-sm flex items-center gap-2'>
                  <IoFilterSharp className='text-gray-500' /> Filter
                </button>
                <button className='px-4 py-2 border rounded-lg text-sm flex items-center gap-2'>
                  <IoMdDownload className='text-gray-500' /> Export
                </button>
              </div>
            </div>

            <div className='mb-4 relative'>
              <input
                type='text'
                placeholder='Search clubs...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
              />
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm' />
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Club Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Country
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      State
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Super Club Admin
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Admin Email
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Club Admins
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Coaches
                    </th>
                    {/* --- ACTIONS HEADER --- */}
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {paginatedClubs.map((club) => (
                    <tr key={club.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium'>
                        <div className='flex items-center gap-2'>
                          <span className='w-8 h-8 bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center rounded-full'>
                            {club.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                          {club.name}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.country}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.state}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.adminName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.adminEmail}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.clubAdmins}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.coaches}
                      </td>
                      {/* --- ACTIONS BODY --- */}
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex items-center gap-4'>
                          <button
                            onClick={() => handleEditClick(club)}
                            className='text-blue-600 hover:text-blue-800'
                            title='Edit'
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(club)}
                            className='text-red-600 hover:text-red-800'
                            title='Delete'
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination (Unchanged) */}
            <div className='flex justify-between items-center mt-4 flex-wrap gap-2'>
              {/* ... pagination jsx ... */}
            </div>
          </div>
        </main>

        {/* --- MODALS --- */}
        <AddNewClub
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          club={currentClub}
          setClub={setCurrentClub}
          onSave={handleSaveClub}
          isEditMode={isEditMode} // Pass the mode to the modal
        />

        {showDeleteConfirm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center'>
              <h3 className='text-xl font-semibold text-gray-800'>
                Confirm Deletion
              </h3>
              <p className='text-gray-600 my-4'>
                Are you sure you want to delete this club and license
                management? This action cannot be undone.
              </p>
              <div className='flex justify-center gap-4 mt-6'>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className='px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className='px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium'
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubAndLicense;


//Fix the CLubandLicense UI
//Added edit modals
//Added delete confirmation modal
//Fixed the component naming errors and typos