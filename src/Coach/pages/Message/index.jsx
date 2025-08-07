import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import ScoutList from "./ScoutList";
import ChatWindow from "./chatWindow";

const mockScouts = [
  {
    id: 1,
    name: "Diego Alonso",
    message: "I've found an exceptional talent at the U17 tournament...",
    timestamp: "10:32 AM",
    avatar: "🟠",
    isOnline: true,
  },
 
];

const ScoutMessageCenter = () => {
  const [selectedScout, setSelectedScout] = useState(mockScouts[0]);

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header
          title='Scout Message Center'
          route='Home / Scout Message Center'
        />
        <div className='flex flex-1'>
          <ScoutList
            scouts={mockScouts}
            onSelect={setSelectedScout}
            selectedScout={selectedScout}
          />
          <ChatWindow scout={selectedScout} />
        </div>
      </div>
    </div>
  );
};

export default ScoutMessageCenter;
