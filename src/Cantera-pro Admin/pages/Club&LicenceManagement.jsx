import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import AddNewClub from "../Components/AddNewClub";

const ClubAndLicense = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
      const [newCountry, setNewCountry] = useState({ name: "", category: "" });
      const [newClub, setNewClub] = useState({
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
      });

  const [showModal, setShowModal] = useState(false);      

  const itemsPerPage = 6;

  const allClubs = [
    {
      id: 1,
      name: "FC Barcelona",
      country: "Spain",
      state: "Catalonia",
      admin: "Miguel Rodriguez",
      email: "m.rodriguez@fcbarcelona.com",
      clubAdmins: 8,
      coaches: 24,
    },
    {
      id: 2,
      name: "Manchester United",
      country: "United Kingdom",
      state: "Manchester",
      admin: "William Thompson",
      email: "w.thompson@manutd.com",
      clubAdmins: 6,
      coaches: 18,
    },
    {
      id: 3,
      name: "Bayern Munich",
      country: "Germany",
      state: "Bavaria",
      admin: "Lukas Müller",
      email: "l.mueller@fcbayern.com",
      clubAdmins: 7,
      coaches: 20,
    },
    {
      id: 4,
      name: "Real Madrid",
      country: "Spain",
      state: "Madrid",
      admin: "Carlos Fernandez",
      email: "c.fernandez@realmadrid.com",
      clubAdmins: 9,
      coaches: 22,
    },
    {
      id: 5,
      name: "Juventus FC",
      country: "Italy",
      state: "Turin",
      admin: "Marco Bianchi",
      email: "m.bianchi@juventus.com",
      clubAdmins: 5,
      coaches: 16,
    },
    {
      id: 6,
      name: "Paris Saint-Germain",
      country: "France",
      state: "Paris",
      admin: "Pierre Dubois",
      email: "p.dubois@psg.fr",
      clubAdmins: 7,
      coaches: 19,
    },
    {
      id: 7,
      name: "Liverpool FC",
      country: "United Kingdom",
      state: "Liverpool",
      admin: "James Wilson",
      email: "j.wilson@liverpoolfc.com",
      clubAdmins: 6,
      coaches: 17,
    },
    {
      id: 8,
      name: "AC Milan",
      country: "Italy",
      state: "Milan",
      admin: "Alessandro Rossi",
      email: "a.rossi@acmilan.com",
      clubAdmins: 5,
      coaches: 15,
    },
  ];

  const handleSaveCountry = () => {
    // You can push to allCountries or call API here
    console.log("Saved:", newCountry);
    setIsAddModalOpen(false);
    setNewCountry({ name: "", category: "" });
  };

  const filteredClubs = allClubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);
  const paginatedClubs = filteredClubs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSaveClub = () => {
    console.log("Saved club:", newClub);
    setIsAddModalOpen(false);
    setNewClub({
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
    });
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
                        {club.admin}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.email}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.clubAdmins}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                        {club.coaches}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='flex justify-between items-center mt-4 flex-wrap gap-2'>
              <p className='text-sm text-gray-600'>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredClubs.length)} of{" "}
                {filteredClubs.length} entries
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
        <AddNewClub
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          club={newClub}
          setClub={setNewClub}
          onSave={handleSaveClub}
        />
      </div>
    </div>
  );
};

export default ClubAndLicense;
