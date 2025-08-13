import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaDownload,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

// --- NEW PROFILE MODAL COMPONENT ---
const mockReservations = [
  {
    id: 1,
    player: "James Rodriguez",
    club: "FC Barcelona",
    service: "Performance Coaching",
    duration: "60 min",
    date: "Apr 25, 2025",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: 2,
    player: "Marcus Davies",
    club: "Manchester United",
    service: "Initial Consultation",
    duration: "45 min",
    date: "Apr 24, 2025",
    time: "2:30 PM",
    status: "In Progress",
  },
  {
    id: 3,
    player: "Luka Modric",
    club: "Real Madrid",
    service: "Crisis Intervention",
    duration: "30 min",
    date: "Apr 23, 2025",
    time: "4:15 PM",
    status: "Completed",
  },
  {
    id: 4,
    player: "Kylian Mbappé",
    club: "Paris Saint-Germain",
    service: "Performance Coaching",
    duration: "45 min",
    date: "Apr 22, 2025",
    time: "11:00 AM",
    status: "Cancelled",
  },
  {
    id: 5,
    player: "Erling Martinez",
    club: "Manchester City",
    service: "Initial Consultation",
    duration: "60 min",
    date: "Apr 21, 2025",
    time: "3:00 PM",
    status: "Completed",
  },
  {
    id: 6,
    player: "Sophie Turner",
    club: "Chelsea",
    service: "Ongoing Support",
    duration: "30 min",
    date: "Apr 28, 2025",
    time: "9:00 AM",
    status: "Upcoming",
  },
];

const ExternalProfessionalProfileModal = ({ professional, onClose }) => {
  const [reservationTab, setReservationTab] = useState("Upcoming");

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Upcoming":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col'>
        <header className='p-4 border-b flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-800'
            >
              <FaArrowLeft size={20} />
            </button>
            <div>
              <h2 className='text-xl font-bold text-gray-800'>
                Dr. Michael Anderson
              </h2>
              <p className='text-sm text-gray-500'>Sports Psychologist</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full'>
              Pending Verification
            </span>
            <span className='text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full'>
              Stripe Connected
            </span>
          </div>
        </header>

        <main className='flex-1 overflow-y-auto p-6'>
          {/* Professional Info */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
            <div className='md:col-span-2'>
              <h3 className='font-semibold text-gray-800 mb-4'>
                Contact Information
              </h3>
              <div className='space-y-3 text-sm'>
                <p className='flex items-center gap-3 text-gray-600'>
                  <strong>Email:</strong> michael.anderson@example.com
                </p>
                <p className='flex items-center gap-3 text-gray-600'>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>

              <h3 className='font-semibold text-gray-800 mt-6 mb-4'>
                Professional Details
              </h3>
              <div className='space-y-3 text-sm'>
                <p className='flex items-center gap-3 text-gray-600'>
                  <strong>Category:</strong> Sports Psychologist
                </p>
                <p className='flex items-center gap-3 text-gray-600'>
                  <strong>Joined:</strong> April 15, 2025
                </p>
              </div>
            </div>

            <div>
              <h3 className='font-semibold text-gray-800 mb-4'>Documents</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div>
                    <p className='font-medium'>ID Proof</p>
                    <p className='text-gray-500'>Passport.pdf</p>
                  </div>
                  <button className='text-gray-500 hover:text-purple-700'>
                    <FaDownload />
                  </button>
                </div>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div>
                    <p className='font-medium'>Signature</p>
                    <p className='text-gray-500'>signature.png</p>
                  </div>
                  <button className='text-gray-500 hover:text-purple-700'>
                    <FaEye />
                  </button>
                </div>
              </div>

              <h3 className='font-semibold text-gray-800 mt-6 mb-4'>
                Verification Actions
              </h3>
              <div className='flex gap-3'>
                <button className='flex-1 flex items-center justify-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800'>
                  <FaCheck /> Approve
                </button>
                <button className='flex-1 flex items-center justify-center gap-2 bg-white border text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50'>
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          </div>

          {/* Reservations */}
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              Reservation
            </h3>
            <div className='flex border-b mb-4'>
              {["Upcoming", "Ongoing", "Complete", "Cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setReservationTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    reservationTab === tab
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-purple-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left'>
                <thead className='text-gray-600 bg-gray-50'>
                  <tr>
                    {[
                      "Player",
                      "Service",
                      "Date & Time",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th key={h} className='px-4 py-2 font-semibold'>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockReservations
                    .filter((r) =>
                      reservationTab
                        .toLowerCase()
                        .includes(r.status.toLowerCase().replace(" ", ""))
                    )
                    .map((res) => (
                      <tr key={res.id} className='border-b'>
                        <td className='px-4 py-3 flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600'>
                            {res.player.charAt(0)}
                          </div>
                          <div>
                            <p className='font-medium'>{res.player}</p>
                            <p className='text-gray-500'>{res.club}</p>
                          </div>
                        </td>
                        <td className='px-4 py-3'>
                          <div>
                            <p className='font-medium'>{res.service}</p>
                            <p className='text-gray-500'>{res.duration}</p>
                          </div>
                        </td>
                        <td className='px-4 py-3'>
                          <div>
                            <p className='font-medium'>{res.date}</p>
                            <p className='text-gray-500'>{res.time}</p>
                          </div>
                        </td>
                        <td className='px-4 py-3'>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              res.status
                            )}`}
                          >
                            {res.status}
                          </span>
                        </td>
                        <td className='px-4 py-3 text-gray-500'>...</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <footer className='p-4 border-t flex justify-between items-center text-sm text-gray-600'>
          <p>Showing 1-5 of 24 appointments</p>
          <div className='flex items-center gap-1'>
            <button className='px-2 py-1 border rounded disabled:opacity-50'>
              &lt;
            </button>
            <button className='px-3 py-1 rounded font-medium bg-purple-700 text-white'>
              1
            </button>
            <button className='px-3 py-1 rounded font-medium bg-white border text-gray-700 hover:bg-gray-100'>
              2
            </button>
            <button className='px-3 py-1 rounded font-medium bg-white border text-gray-700 hover:bg-gray-100'>
              3
            </button>
            <button className='px-2 py-1 border rounded disabled:opacity-50'>
              &gt;
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
const DeleteConfirmationModal = ({ professional, onClose, onConfirm }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-2xl w-full max-w-md'>
        <header className='p-4'>
          <h2 className='text-xl font-bold text-gray-800'>Confirm Deletion</h2>
        </header>
        <main className='p-6'>
          <p>
            Are you sure you want to delete the profile for{" "}
            <span className='font-semibold'>{professional.name}</span>? This
            action cannot be undone.
          </p>
        </main>
        <footer className='p-4 bg-gray-50 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(professional.id)}
            className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700'
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
};
const EditProfessionalModal = ({ professional, onClose, onUpdate }) => {
  // Use local state to manage form data, initialized with the professional's props
  const [formData, setFormData] = useState(professional);

  // A generic handler to update the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When the form is submitted, call the onUpdate prop with the new data
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const allCategories = [
    "Coach",
    "Nutritionist",
    "Therapist",
    "Psychologist",
    "Fitness Trainer",
  ];

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-2xl w-full max-w-lg'>
        <header className='p-4 border-b'>
          <h2 className='text-xl font-bold text-gray-800'>
            Edit Profile: {professional.name}
          </h2>
        </header>
        <form onSubmit={handleSubmit}>
          <main className='p-6 space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full border rounded-md px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full border rounded-md px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Phone Number
              </label>
              <input
                type='text'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full border rounded-md px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Professional Category
              </label>
              <select
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full border rounded-md px-3 py-2 text-sm focus:ring-purple-500 focus:border-purple-500 bg-white'
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </main>
          <footer className='p-4 bg-gray-50 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700'
            >
              Save Changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

// Mock data for PENDING professionals
const pendingProfessionals = [
  {
    id: 101,
    name: "Thomas Müller",
    email: "thomas.muller@example.com",
    phone: "+49 123 456 78...",
    category: "Coach",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signatureUrl: "https://placehold.co/100x40/E2E8F0/4A5568?text=Signature",
  },
  {
    id: 102,
    name: "Elena Rodriguez",
    email: "elena.rodriguez@example.com",
    phone: "+34 611 2...",
    category: "Nutritionist",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signatureUrl: "https://placehold.co/100x40/E2E8F0/4A5568?text=Signature",
  },
];

// Mock data for ACTIVE professionals
const initialActiveProfessionals = [
  {
    id: 1,
    name: "Lukas Podolski",
    email: "lukas.podolski@example.com",
    phone: "+49 176 9876 54...",
    category: "Coach",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Not Connected",
  },
  {
    id: 2,
    name: "Thomas Müller",
    email: "thomas.muller@example.com",
    phone: "+49 123 456 78...",
    category: "Coach",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.rodriguez@example.com",
    phone: "+34 611 2...",
    category: "Nutritionist",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    email: "marcus.johnson@example.com",
    phone: "+1 555 123 4567",
    category: "Therapist",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    email: "sophie.laurent@example.com",
    phone: "+33 6 12 34 56 78",
    category: "Psychologist",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 6,
    name: "Hiroshi Tanaka",
    email: "hiroshi.tanaka@example.com",
    phone: "+81 90 1234 56...",
    category: "Fitness Trainer",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 7,
    name: "Isabella Rossi",
    email: "isabella.rossi@example.com",
    phone: "+39 333 123 45...",
    category: "Nutritionist",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 8,
    name: "Maria Silva",
    email: "maria.silva@example.com",
    phone: "+55 11 98765 43...",
    category: "Therapist",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 9,
    name: "David Williams",
    email: "david.williams@example.com",
    phone: "+44 7700 9...",
    category: "Psychologist",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
  {
    id: 10,
    name: "Olivia Thompson",
    email: "olivia.thompson@example.com",
    phone: "+1 604 555 1234",
    category: "Fitness Trainer",
    idProofUrl: "https://placehold.co/100x60/E2E8F0/4A5568?text=ID",
    signature: "Signature",
  },
];

const ExternalProfessionals = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Active");
  const [activeProfessionals, setActiveProfessionals] = useState(
    initialActiveProfessionals
  );
  const [selectedProfessionals, setSelectedProfessionals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // State for modals
  const [viewingProfessional, setViewingProfessional] = useState(null);
  const [editingProfessional, setEditingProfessional] = useState(null);
  const [deletingProfessional, setDeletingProfessional] = useState(null);

  // Pagination logic for Active tab
  const totalPages = Math.ceil(activeProfessionals.length / itemsPerPage);
  const paginatedActiveProfessionals = activeProfessionals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // The list of professionals currently visible on the page
  const currentListOnPage =
    activeTab === "Active"
      ? paginatedActiveProfessionals
      : pendingProfessionals;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = currentListOnPage.map((p) => p.id);
      setSelectedProfessionals(allIds);
    } else {
      setSelectedProfessionals([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedProfessionals.includes(id)) {
      setSelectedProfessionals(selectedProfessionals.filter((i) => i !== id));
    } else {
      setSelectedProfessionals([...selectedProfessionals, id]);
    }
  };

  const handleUpdateProfessional = (updatedProfessional) => {
    setActiveProfessionals((prev) =>
      prev.map((p) =>
        p.id === updatedProfessional.id ? updatedProfessional : p
      )
    );
    setEditingProfessional(null);
  };

  const handleConfirmDelete = (id) => {
    setActiveProfessionals((prev) => prev.filter((p) => p.id !== id));
    setDeletingProfessional(null);
  };

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className=' flex flex-col overflow-hidden  ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header
          title='External Professionals'
          route='Home / External Professionals'
        />
        <main className='flex-1 p-6 bg-gray-50 overflow-y-auto'>
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            {/* Top Filter Bar */}
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-4'>
              <div className='relative md:col-span-2'>
                <FaSearch className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search professionals...'
                  className='w-full border rounded-md pl-10 pr-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
              <select className='border rounded-md px-4 py-2 text-sm bg-gray-50'>
                <option>All Categories</option>
                <option>Coach</option>
                <option>Nutritionist</option>
              </select>
              <select className='border rounded-md px-4 py-2 text-sm bg-gray-50'>
                <option>All Verification Status</option>
              </select>
              <button className='flex items-center justify-center gap-2 text-sm bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md shadow'>
                <FaFilter /> Apply Filters
              </button>
            </div>

            {/* Bulk Actions Bar */}
            <div className='flex flex-col md:flex-row items-center justify-between border-t border-b py-3 mb-4 gap-4'>
              <div className='flex items-center gap-3'>
                <input
                  type='checkbox'
                  onChange={handleSelectAll}
                  checked={
                    currentListOnPage.length > 0 &&
                    selectedProfessionals.length === currentListOnPage.length
                  }
                  className='rounded'
                />
                <label className='text-sm'>Select All</label>
              </div>
              <div className='flex items-center gap-3'>
                <select className='border rounded-md px-4 py-2 text-sm bg-gray-50'>
                  <option>Bulk Actions</option>
                  <option>Approve Selected</option>
                  <option>Reject Selected</option>
                </select>
                <button className='text-sm bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow'>
                  Apply
                </button>
                <button className='text-sm bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md shadow'>
                  + Add New
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className='flex border-b border-gray-300 mb-4'>
              {["Active", "Pending Verification"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedProfessionals([]);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                    activeTab === tab
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-purple-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              {activeTab === "Active" && (
                <table className='w-full text-sm text-left'>
                  <thead className='text-gray-700 bg-gray-100 text-xs uppercase'>
                    <tr>
                      <th className='p-4'>
                        <input
                          type='checkbox'
                          className='rounded'
                          onChange={handleSelectAll}
                          checked={
                            currentListOnPage.length > 0 &&
                            selectedProfessionals.length ===
                              currentListOnPage.length
                          }
                        />
                      </th>
                      {[
                        "Full Name",
                        "Email Address",
                        "Phone Number",
                        "Professional Category",
                        "ID Proof Document",
                        "Signature",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className='px-4 py-3 font-medium whitespace-nowrap'
                        >
                          <div className='flex items-center gap-1'>
                            {header} <TbArrowsSort className='text-gray-400' />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedActiveProfessionals.map((prof) => (
                      <tr key={prof.id} className='border-b hover:bg-gray-50'>
                        <td className='p-4'>
                          <input
                            type='checkbox'
                            className='rounded'
                            checked={selectedProfessionals.includes(prof.id)}
                            onChange={() => handleSelectOne(prof.id)}
                          />
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap font-medium text-gray-900'>
                          {prof.name}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-gray-600'>
                          {prof.email}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-gray-600'>
                          {prof.phone}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-gray-600'>
                          {prof.category}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <img
                            src={prof.idProofUrl}
                            alt='ID Proof'
                            className='h-8 rounded-sm border'
                          />
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          {prof.signature === "Not Connected" ? (
                            <span className='text-red-500 font-semibold'>
                              {prof.signature}
                            </span>
                          ) : (
                            <span>{prof.signature}</span>
                          )}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <div className='flex gap-3 text-gray-600 text-base'>
                            <FaEye
                              className='cursor-pointer hover:text-purple-700'
                              onClick={() => setViewingProfessional(prof)}
                            />
                            <FaEdit
                              className='cursor-pointer hover:text-purple-700'
                              onClick={() => setEditingProfessional(prof)}
                            />
                            <FaTrash
                              className='cursor-pointer hover:text-red-600'
                              onClick={() => setDeletingProfessional(prof)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "Pending Verification" && (
                <table className='w-full text-sm text-left'>
                  <thead className='text-gray-700 bg-gray-100 text-xs uppercase'>
                    <tr>
                      <th className='p-4'>
                        <input
                          type='checkbox'
                          className='rounded'
                          onChange={handleSelectAll}
                          checked={
                            currentListOnPage.length > 0 &&
                            selectedProfessionals.length ===
                              currentListOnPage.length
                          }
                        />
                      </th>
                      {[
                        "Full Name",
                        "Email Address",
                        "Phone Number",
                        "Professional Category",
                        "ID Proof Document",
                        "Signature",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className='px-4 py-3 font-medium whitespace-nowrap'
                        >
                          <div className='flex items-center gap-1'>
                            {header} <TbArrowsSort className='text-gray-400' />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pendingProfessionals.map((prof) => (
                      <tr key={prof.id} className='border-b hover:bg-gray-50'>
                        <td className='p-4'>
                          <input
                            type='checkbox'
                            className='rounded'
                            checked={selectedProfessionals.includes(prof.id)}
                            onChange={() => handleSelectOne(prof.id)}
                          />
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap font-medium text-gray-900'>
                          {prof.name}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-gray-600'>
                          {prof.email}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-gray-600'>
                          {prof.phone}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-gray-600'>
                          {prof.category}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <img
                            src={prof.idProofUrl}
                            alt='ID Proof'
                            className='h-8 rounded-sm border'
                          />
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <img
                            src={prof.signatureUrl}
                            alt='Signature'
                            className='h-8'
                          />
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <div className='flex gap-2'>
                            <button className='bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-md hover:bg-green-200'>
                              Approve
                            </button>
                            <button className='bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-md hover:bg-red-200'>
                              Reject
                            </button>
                            <button className='bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-md hover:bg-yellow-200'>
                              Need more info
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination for Active Tab */}
            {activeTab === "Active" && (
              <div className='mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4'>
                <p>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    activeProfessionals.length
                  )}{" "}
                  of {activeProfessionals.length} results
                </p>
                <div className='flex items-center gap-2'>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className='border rounded-md px-2 py-1 text-sm bg-gray-50'
                  >
                    <option value='10'>10 per page</option>
                    <option value='20'>20 per page</option>
                    <option value='50'>50 per page</option>
                  </select>
                  <div className='flex items-center gap-1'>
                    <button
                      className='px-2 py-1 border rounded disabled:opacity-50'
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        className={`px-3 py-1 rounded font-medium ${
                          currentPage === i + 1
                            ? "bg-purple-700 text-white"
                            : "bg-white border text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      className='px-2 py-1 border rounded disabled:opacity-50'
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Conditionally render the modals */}
      {viewingProfessional && (
        <ExternalProfessionalProfileModal
          professional={viewingProfessional}
          onClose={() => setViewingProfessional(null)}
        />
      )}
      {editingProfessional && (
        <EditProfessionalModal
          professional={editingProfessional}
          onClose={() => setEditingProfessional(null)}
          onUpdate={handleUpdateProfessional}
        />
      )}
      {deletingProfessional && (
        <DeleteConfirmationModal
          professional={deletingProfessional}
          onClose={() => setDeletingProfessional(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ExternalProfessionals;