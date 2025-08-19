import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import DataAnalystTable from "../Components/DataAnalystTable";
import AddDataAnalystModal from "../Components/AddAnalystModal";
// --- Import the new modals ---
import EditAnalystModal from "../Components/EditModal";
import DeleteConfirmationModal from "../Components/DeleteModal";

const mockData = [
  // ... your mock data remains the same
  {
    initials: "RB",
    name: "Rebecca Bennett",
    role: "Lead Analyst",
    email: "rebecca.bennett@canterapro.com",
    categories: ["U13", "U15", "U17"],
    status: "Active",
  },
  {
    initials: "AK",
    name: "Alexander Kumar",
    role: "Performance Analyst",
    email: "alexander.kumar@canterapro.com",
    categories: ["U19", "Senior"],
    status: "Active",
  },
  {
    initials: "SN",
    name: "Sophia Nakamura",
    role: "Technical Analyst",
    email: "sophia.nakamura@canterapro.com",
    categories: ["U15", "U17"],
    status: "Pending",
  },
  {
    initials: "JC",
    name: "Julian Carter",
    role: "Video Analyst",
    email: "julian.carter@canterapro.com",
    categories: ["U13", "Academy"],
    status: "Active",
  },
  {
    initials: "EM",
    name: "Elena Martinez",
    role: "Tactical Analyst",
    email: "elena.martinez@canterapro.com",
    categories: ["U17", "U19"],
    status: "Pending",
  },
];

const DataAnalystManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [analysts, setAnalysts] = useState(mockData);

  // --- State for Edit and Delete ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAnalyst, setCurrentAnalyst] = useState(null);

  // --- Handlers for Add ---
  const handleAddAnalyst = (form) => {
    const initials = form.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const newAnalyst = {
      initials,
      name: form.name,
      // You might want to get these from the form as well
      role: "New Analyst",
      email: `${form.name.toLowerCase().replace(" ", ".")}@canterapro.com`,
      categories: form.categories,
      status: "Pending",
    };
    setAnalysts([...analysts, newAnalyst]);
  };

  // --- Handlers for Edit ---
  const handleEditClick = (analyst) => {
    setCurrentAnalyst(analyst);
    setShowEditModal(true);
  };

  const handleUpdateAnalyst = (updatedForm) => {
    const initials = updatedForm.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    setAnalysts(
      analysts.map((a) =>
        a.email === currentAnalyst.email
          ? { ...a, ...updatedForm, initials }
          : a
      )
    );
    setCurrentAnalyst(null);
  };

  // --- Handlers for Delete ---
  const handleDeleteClick = (analyst) => {
    setCurrentAnalyst(analyst);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setAnalysts(analysts.filter((a) => a.email !== currentAnalyst.email));
    setShowDeleteModal(false);
    setCurrentAnalyst(null);
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0 mt-10 lg:mt-0'>
        <Header title='Data Analyst Management' route='Home / Data Analyst Management' />
        <div className='p-6'>
          <div className='flex justify-end mb-4'>
            <button
              onClick={() => setShowAddModal(true)}
              className='bg-purple-700 text-white px-4 py-2 rounded text-sm'
            >
              + Add Data Analyst
            </button>
          </div>
          {/* Pass the handlers to the table component */}
          <DataAnalystTable
            analysts={analysts}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {/* --- Render Modals --- */}
      <AddDataAnalystModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddAnalyst}
      />
      <EditAnalystModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdateAnalyst}
        analystData={currentAnalyst}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        analystName={currentAnalyst?.name}
      />
    </div>
  );
};

export default DataAnalystManagement;
