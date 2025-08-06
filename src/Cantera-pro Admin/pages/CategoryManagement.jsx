import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import AddCountryModal from "../Components/AddCategory";

const CountryManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCountry, setNewCountry] = useState({ name: "", category: "" });

  const itemsPerPage = 8;

  const allCountries = [
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
  

  const handleSaveCountry = () => {
    // You can push to allCountries or call API here
    console.log("Saved:", newCountry);
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

  const handleDelete = (country) => {
    setSelectedCountry(country);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    // You can call API or update state here
  };

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
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Country
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
                      Category Name
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
                        <img src='/WhiteFlag.png' alt='' className='w-4 h-4' />
                        <span className='text-sm font-medium text-gray-800'>
                          {country.name}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {country.category}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        <div className='flex flex-wrap gap-2'>
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
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3 pr-16 text-primary_400 cursor-pointer'>
                        +Add Items
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
                  className={`px-3 py-1 text-sm rounded-md border  ${
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
        <AddCountryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveCountry}
          country={newCountry}
          setCountry={setNewCountry}
        />
        
      </div>
    </div>
  );
};

export default CountryManagement;
 