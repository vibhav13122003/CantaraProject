import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import DataAnalystTable from "../Components/DataAnalystTable";
import AddDataAnalystModal from "../Components/AddAnalystModal";

const mockData = [
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
  const [showModal, setShowModal] = useState(false);
  const [analysts, setAnalysts] = useState(mockData);

  const handleAddAnalyst = (form) => {
    const initials = form.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const newAnalyst = {
      initials,
      name: form.name,
      role: "New Analyst",
      email: "example@canterapro.com",
      categories: form.categories,
      status: "Pending",
    };
    setAnalysts([...analysts, newAnalyst]);
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-y-auto'>
        <Header title='Data Analyst Management' />
        <div className='p-6'>
          <div className='flex justify-end mb-4'>
            <button
              onClick={() => setShowModal(true)}
              className='bg-purple-700 text-white px-4 py-2 rounded text-sm'
            >
              + Add Data Analyst
            </button>
          </div>
          <DataAnalystTable analysts={analysts} />
        </div>
      </div>
      <AddDataAnalystModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddAnalyst}
      />
    </div>
  );
};

export default DataAnalystManagement;
