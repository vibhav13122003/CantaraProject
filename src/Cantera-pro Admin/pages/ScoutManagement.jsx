import React, { useState } from "react";
import { FaEye, FaEdit, FaFilter } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import SavedFiltersModal from "../Components/SaveandFilter"; 
import ScoutProfileModal from "../Components/ScoutProfileModal";
const scoutFilters = {
  "Michael Thompson": [
    {
      playerType: "Club Player",
      country: "England",
      category: "U17",
      club: "Manchester United",
      ageRange: "16-17",
      foot: "Right",
      gender: "Male",
      date: "05 May 2025",
    },
    {
      playerType: "External Player",
      country: "France",
      category: "U15",
      ageRange: "14-15",
      foot: "Left",
      gender: "Male",
      date: "03 May 2025",
    },
  ],
};
const scoutData = [
    {
      name: "Michael Thompson",
      email: "michael.thompson@gmail.com",
      phone: "+44 7700 900123",
      description:
        "Experienced scout with 8+ years specializing in youth talent identification across Europe. Former...",
    },
    {
      name: "Sophie Martinez",
      email: "sophie.martinez@outlook.com",
      phone: "+34 612 345 678",
      description:
        "Spanish scout focused on La Liga youth systems. Previously worked with Barcelona’s academy. Strong...",
    },

  ];
  

const ScoutManagement = () => {
  const [activeTab, setActiveTab] = useState("Active Scouts");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modalScout, setModalScout] = useState(null);
  const [selectedScout, setSelectedScout] = useState(null);

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header title='Scout Management' route='Home / Scout Management' />

        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          {/* Tabs */}
          <div className='flex border-b border-gray-300 mb-4'>
            {["Active Scouts", "Pending Scouts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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

          {/* Scout Cards */}
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {scoutData.map((scout, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-sm p-4 text-sm text-gray-700 flex flex-col justify-between'
              >
                <div>
                  <p className='font-semibold'>{scout.name}</p>
                  <p className='text-gray-600'>{scout.email}</p>
                  <p className='text-gray-600'>{scout.phone}</p>
                  <p className='mt-2 text-gray-500'>{scout.description}</p>
                </div>
                <div className='flex justify-end mt-4 gap-3 text-purple-700'>
                  <FaEye
                    className='cursor-pointer'
                    onClick={() => setSelectedScout(scout)}
                  />
                  <FaEdit className='cursor-pointer' />
                  <FaFilter
                    className='cursor-pointer'
                    onClick={() =>
                      scoutFilters[scout.name] && setModalScout(scout.name)
                    }
                  />
                </div>
              </div>
            ))}
            {selectedScout && (
              <ScoutProfileModal
                scout={selectedScout}
                onClose={() => setSelectedScout(null)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {modalScout && (
        <SavedFiltersModal
          scoutName={modalScout}
          filters={scoutFilters[modalScout]}
          onClose={() => setModalScout(null)}
        />
      )}
    </div>
  );
};

export default ScoutManagement;
