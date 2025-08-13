import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import AddCountryModal from "../Components/Addcountry";
import ConfirmModal from "../Components/ConfirmModa"; // Import the new ConfirmModal

const CountryManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCountry, setNewCountry] = useState({ name: "", category: "" });

  const itemsPerPage = 8;

  const [allCountries, setAllCountries] = useState([
    { id: 1, name: "Spain", category: "La Liga", clubs: 42 },
    { id: 2, name: "England", category: "Premier League", clubs: 38 },
    { id: 3, name: "Germany", category: "Bundesliga", clubs: 36 },
    { id: 4, name: "Italy", category: "Serie A", clubs: 34 },
    { id: 5, name: "France", category: "Ligue 1", clubs: 30 },
    { id: 6, name: "Netherlands", category: "Eredivisie", clubs: 22 },
    { id: 7, name: "Portugal", category: "Primeira Liga", clubs: 18 },
    { id: 8, name: "Belgium", category: "Pro League", clubs: 16 },
    { id: 9, name: "Brazil", category: "Brasileirão", clubs: 12 },
    { id: 10, name: "Argentina", category: "Primera División", clubs: 10 },
    { id: 11, name: "USA", category: "MLS", clubs: 25 },
    { id: 12, name: "Japan", category: "J League", clubs: 18 },
    { id: 13, name: "South Korea", category: "K League", clubs: 14 },
  ]);

  const handleOpenAddModal = () => {
    setNewCountry({ name: "", category: "" });
    setIsAddModalOpen(true);
  };

  const handleEdit = (country) => {
    setSelectedCountry(country);
    setIsEditModalOpen(true);
  };

  const handleUpdateCountry = (updatedCountry) => {
    setAllCountries(
      allCountries.map((country) =>
        country.id === updatedCountry.id ? updatedCountry : country
      )
    );
    setIsEditModalOpen(false);
    setSelectedCountry(null);
  };

  const handleDelete = (country) => {
    setSelectedCountry(country);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setAllCountries(allCountries.filter((c) => c.id !== selectedCountry.id));
    setShowDeleteConfirm(false);
    setSelectedCountry(null);
  };

  const handleSaveCountry = () => {
    const newId =
      allCountries.length > 0
        ? Math.max(...allCountries.map((c) => c.id)) + 1
        : 1;
    const newCountryWithId = { ...newCountry, id: newId, clubs: 0 };
    setAllCountries([...allCountries, newCountryWithId]);
    setIsAddModalOpen(false);
    setNewCountry({ name: "", category: "" });
  };

  const filteredCountries = allCountries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const paginatedCountries = filteredCountries.slice(
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
        <div className='flex justify-between items-center'>
          <Header
            title='Country Management'
            route='Home / Country Management'
          />
          <button
            className='bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary_400 h-11 mr-5'
            onClick={handleOpenAddModal}
          >
            + Add Country
          </button>
        </div>
        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold text-gray-800'>Countries</h2>
              <div className='mb-4 relative'>
                <input
                  type='text'
                  placeholder='Search countries...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
                />
                <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm' />
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50 '>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Country Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Linked Category Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Number of Clubs
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider pr-16'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {paginatedCountries.map((country) => (
                    <tr key={country.id}>
                      <td className='px-6 py-4 whitespace-nowrap flex items-center gap-2'>
                        <img src='/flag.png' alt='' className='w-4 h-4' />
                        <span className='text-sm font-medium text-gray-800'>
                          {country.name}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {country.category}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {country.clubs}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3 pr-16'>
                        <button
                          className='text-blue-600 hover:text-blue-900'
                          onClick={() => handleEdit(country)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className='text-red-600 hover:text-red-900'
                          onClick={() => handleDelete(country)}
                        >
                          <FaTrash />
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
                {Math.min(currentPage * itemsPerPage, filteredCountries.length)}{" "}
                of {filteredCountries.length} countries
              </p>
              <div className='flex items-center space-x-1'>
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm rounded-md border  ${
                    currentPage === 1
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded-md border ${
                      currentPage === i + 1
                        ? "bg-purple-700 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next Button */}
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

        {/* Add Country Modal */}
        <AddCountryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveCountry}
          country={newCountry}
          setCountry={setNewCountry}
          isEdit={false}
        />

        {/* Edit Country Modal */}
        <AddCountryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateCountry}
          country={selectedCountry}
          setCountry={setSelectedCountry}
          isEdit={true}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          title='Confirm Removal'
          message={`Are you sure you want to remove ${selectedCountry?.name}? This action cannot be undone.`}
          confirmText='Remove'
        />
      </div>
    </div>
  );
};

export default CountryManagement;
