import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Assuming path is correct
import Header from "../Components/Header"; // Assuming path is correct

// --- MOCK DATA for Scout Inquiries ---
const mockInquiries = [
  {
    id: 1,
    scout: { name: "Javier Ribeiro", club: "FC Porto", initials: "JR" },
    player: { name: "Rafael Martinez", position: "Forward, U-19" },
    message:
      "I was impressed by Rafael's performance in the recent tournament. Would like to discuss his availability.",
    date: "April 24, 2025",
    status: "Pending",
  },
  {
    id: 2,
    scout: { name: "Laura Müller", club: "Bayern Munich", initials: "LM" },
    player: { name: "Diego Garcia", position: "Midfielder, U-17" },
    message:
      "Diego's technical ability and vision are exceptional for his age. I'd like to arrange a meeting to discuss his potential.",
    date: "April 22, 2025",
    status: "Replied",
  },
  {
    id: 3,
    scout: { name: "Alessandro Pirlo", club: "Juventus FC", initials: "AP" },
    player: { name: "Isabella Sánchez", position: "Defender, U-21" },
    message:
      "Isabella has shown remarkable leadership qualities and defensive awareness. We're interested in her progress.",
    date: "April 20, 2025",
    status: "Pending",
  },
  {
    id: 4,
    scout: { name: "Thomas Hughes", club: "Manchester United", initials: "TH" },
    player: { name: "Carlos Vega", position: "Goalkeeper, U-19" },
    message:
      "Carlos's reflexes and distribution skills are impressive. We're looking to strengthen our youth goalkeeper options.",
    date: "April 18, 2025",
    status: "Archived",
  },
  {
    id: 5,
    scout: { name: "Marco Silva", club: "Benfica", initials: "MS" },
    player: { name: "Alejandro Torres", position: "Winger, U-21" },
    message:
      "Alejandro's pace and dribbling ability caught our attention during the youth tournament. We'd like to follow up.",
    date: "April 15, 2025",
    status: "Replied",
  },
];

// --- HELPER COMPONENTS & FUNCTIONS ---

// A simple hashing function to get a consistent color for avatars
const getAvatarColor = (initials) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-purple-500",
  ];
  const charCodeSum = initials
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

const Avatar = ({ initials }) => (
  <div
    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(
      initials
    )}`}
  >
    {initials}
  </div>
);

const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Replied":
      return "bg-green-100 text-green-800";
    case "Archived":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// SVG Icons for Actions
const ReplyIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'
    />
  </svg>
);
const ArchiveIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
    />
  </svg>
);
const DeleteIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    />
  </svg>
);

// --- MAIN PAGE COMPONENT ---
export default function ScoutInquiries() {
  const [inquiries, setInquiries] = useState(mockInquiries);

  return (
    <div className='flex bg-gray-100'>
      <Sidebar />
      <div className='flex-1 bg-gray-50 min-h-screen'>
        <Header title='Scout Inquiries' route='Home / Scout Inquiries' />
        
        <div className='p-6'>
          <div className='bg-white shadow-md rounded-lg'>
            {/* Table Header */}
            <div className='px-6 py-3 text-xs font-semibold text-gray-500 uppercase border-b'>
              <div className='flex items-center'>
                <div className='w-2/6'>Scout</div>
                <div className='w-1/6'>Player</div>
                <div className='w-2/6'>Message</div>
                <div className='w-1/6'>Date</div>
                <div className='w-1/6'>Status</div>
                <div className='w-1/6 text-right'>Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className='divide-y divide-gray-200'>
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className='px-6 py-4'>
                  <div className='flex items-center text-sm'>
                    {/* Scout Cell */}
                    <div className='w-2/6 flex items-center'>
                      <Avatar initials={inquiry.scout.initials} />
                      <div className='ml-4'>
                        <div className='font-semibold text-gray-800'>
                          {inquiry.scout.name}
                        </div>
                        <div className='text-gray-500'>
                          {inquiry.scout.club}
                        </div>
                      </div>
                    </div>
                    {/* Player Cell */}
                    <div className='w-1/6'>
                      <div className='font-semibold text-gray-800'>
                        {inquiry.player.name}
                      </div>
                      <div className='text-gray-500'>
                        {inquiry.player.position}
                      </div>
                    </div>
                    {/* Message Cell */}
                    <div className='w-2/6 text-gray-600 pr-4'>
                      {inquiry.message}
                    </div>
                    {/* Date Cell */}
                    <div className='w-1/6 text-gray-500'>{inquiry.date}</div>
                    {/* Status Cell */}
                    <div className='w-1/6'>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClass(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    {/* Actions Cell */}
                    <div className='w-1/6 flex justify-end items-center gap-2'>
                      <button
                        className='p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200'
                        title='Reply'
                      >
                        <ReplyIcon />
                      </button>
                      <button
                        className='p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200'
                        title='Archive'
                      >
                        <ArchiveIcon />
                      </button>
                      <button
                        className='p-2 text-gray-400 hover:text-red-600 rounded-lg'
                        title='Delete'
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
