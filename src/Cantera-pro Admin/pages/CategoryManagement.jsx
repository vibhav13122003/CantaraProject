import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import AddCountryModal from "../Components/AddCategory";
import EditCategoryModal from "../Components/EditCategory"; // <-- Import the new Edit Modal

// Initial data outside the component
const initialCountriesData = [
  {
    id: 1,
    name: "Spain",
    category: "Youth Divisions",
    categoryItems: ["U13", "U15", "U17", "U19"],
  },
  {
    id: 2,
    name: "England",
    category: "Academy Levels",
    categoryItems: ["U14", "U16", "U18", "U21"],
  },
  {
    id: 3,
    name: "Germany",
    category: "Junior Leagues",
    categoryItems: ["U12", "U15", "U17", "U19"],
  },
  {
    id: 4,
    name: "France",
    category: "Formation Categories",
    categoryItems: ["U13", "U16", "U18"],
  },
  {
    id: 5,
    name: "Italy",
    category: "Youth Sectors",
    categoryItems: ["U14", "U16", "U18", "Primavera"],
  },
  {
    id: 6,
    name: "Netherlands",
    category: "Development Groups",
    categoryItems: ["U13", "U15", "U17", "U19", "U21"],
  },
  {
    id: 7,
    name: "Portugal",
    category: "Training Divisions",
    categoryItems: ["U14", "U16", "U19", "U23"],
  },
];

const CategoryManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState(initialCountriesData); // <-- Data is now in state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // <-- State for edit modal
  const [newCountry, setNewCountry] = useState({ name: "", category: "" });

  const itemsPerPage = 8;

  // --- CRUD Handlers ---

  // CREATE: Adds a new country category row
  const handleSaveCountry = () => {
    const countryToAdd = {
      id: Date.now(), // Use a simple unique ID
      ...newCountry,
      categoryItems: [], // Start with no items
    };
    setCountries([...countries, countryToAdd]);
    setIsAddModalOpen(false);
    setNewCountry({ name: "", category: "" });
  };

  // UPDATE: Opens the edit modal
  const handleEdit = (country) => {
    setSelectedCountry(country);
    setIsEditModalOpen(true);
  };

  // UPDATE: Saves the changes from the edit modal
  const handleUpdateCategories = (updatedCountry) => {
    setCountries(
      countries.map((c) => (c.id === updatedCountry.id ? updatedCountry : c))
    );
    setIsEditModalOpen(false);
    setSelectedCountry(null);
  };

  // DELETE: Opens the delete confirmation
  const handleDelete = (country) => {
    setSelectedCountry(country);
    setShowDeleteConfirm(true);
  };

  // DELETE: Confirms and executes the deletion
  const confirmDelete = () => {
    setCountries(countries.filter((c) => c.id !== selectedCountry.id));
    setShowDeleteConfirm(false);
    setSelectedCountry(null);
  };

  // --- Filtering and Pagination ---
  const filteredCountries = countries.filter((c) =>
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
            title='Category Management'
            route='Home / Category Management'
          />
          <button
            className='bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary_400 h-11 mr-5'
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Category
          </button>
        </div>
        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
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
                      Category Items
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {paginatedCountries.map((country) => (
                    <tr key={country.id}>
                      <td className='px-6 py-4 whitespace-nowrap flex items-center gap-2'>
                        <img src='/WhiteFlag.png' alt='' className='w-4 h-4' />
                        <span className='text-sm font-medium text-gray-800'>
                          {country.name}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {country.category}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        <div className='flex flex-wrap gap-2 max-w-sm'>
                          {country.categoryItems?.map((item, idx) => (
                            <span
                              key={idx}
                              className='px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-800 font-medium'
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      {/* --- NEW ACTION BUTTONS --- */}
                      <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                        <div className='flex justify-center items-center gap-4'>
                          <button
                            onClick={() => handleEdit(country)}
                            className='text-blue-600 hover:text-blue-800'
                            title='Edit'
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(country)}
                            className='text-red-600 hover:text-red-800'
                            title='Delete'
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
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
                of {filteredCountries.length} entries
              </p>
              <div className='flex items-center space-x-1'>
                {/* Pagination Buttons (unchanged) */}
              </div>
            </div>
          </div>
        </main>

        {/* --- MODALS --- */}
        <AddCountryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveCountry}
          country={newCountry}
          setCountry={setNewCountry}
        />

        {/* Pass state to the new Edit Modal */}
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateCategories}
          country={selectedCountry}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-sm'>
              <h3 className='text-lg font-semibold text-gray-800'>
                Confirm Deletion
              </h3>
              <p className='text-gray-600 mt-2'>
                Are you sure you want to delete the category for{" "}
                <span className='font-bold'>{selectedCountry?.name}</span>? This
                action cannot be undone.
              </p>
              <div className='flex justify-end gap-4 mt-6'>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className='px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300'
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className='px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
