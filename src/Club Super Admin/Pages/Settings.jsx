import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Assuming path is correct
import Header from "../Components/Header"; // Assuming path is correct

// --- MOCK DATA ---
const clubLicenseDetails = {
  clubName: "FC Barcelona Academy",
  country: "Spain",
  stateRegion: "Catalonia",
  licenseStatus: "Active",
  startDate: "January 15, 2025",
  endDate: "January 14, 2026",
};

const licenseLimits = [
  { label: "Club Admins", current: 3, max: 5 },
  { label: "Coaches", current: 14, max: 20 },
  { label: "Players", current: 78, max: 100 },
  { label: "Data Analysts", current: 2, max: 2 },
];

// --- HELPER COMPONENTS ---

const DetailItem = ({ label, value, status = false }) => (
  <div>
    <div className='text-sm font-semibold text-gray-500'>{label}</div>
    <div className='text-base text-gray-800 font-medium flex items-center'>
      {status && (
        <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
      )}
      {value}
    </div>
  </div>
);

const ProgressBar = ({ label, current, max }) => {
  const percentage = (current / max) * 100;
  const isMaxedOut = current === max;
  return (
    <div>
      <div className='flex justify-between items-center mb-1'>
        <div className='text-sm font-semibold text-gray-500'>{label}</div>
        <div
          className={`text-sm font-bold ${
            isMaxedOut ? "text-red-600" : "text-gray-800"
          }`}
        >
          {current} / {max}
        </div>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-2'>
        <div
          className={`${
            isMaxedOut ? "bg-red-500" : "bg-purple-600"
          } h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Settings() {
  const [fullName, setFullName] = useState("Michael Rodriguez");

  return (
    <div className='flex bg-gray-100'>
      <Sidebar />
      <div className='flex-1 bg-gray-50 h-screen overflow-y-auto'>
        <Header title='Settings' route='Home / Settings' />

        <div className='p-8'>
          <div className='max-w-4xl mx-auto space-y-8'>
            {/* Profile Information Section */}
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h2 className='text-xl font-bold text-gray-800 mb-6'>
                Profile Information
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className='w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500'
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
                    value='michael.rodriguez@fcbarcelona.com'
                    readOnly
                    className='w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed'
                  />
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <button className='px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors'>
                  Change Password
                </button>
                <button className='px-5 py-2 bg-purple-600 text-white font-semibold rounded-md shadow hover:bg-purple-700 transition-colors'>
                  Update Profile
                </button>
              </div>
            </div>
            
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h2 className='text-xl font-bold text-gray-800 mb-6'>
                Club License Details
              </h2>
              <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
                <DetailItem
                  label='Club Name'
                  value={clubLicenseDetails.clubName}
                />
                <DetailItem
                  label='Country'
                  value={clubLicenseDetails.country}
                />
                <DetailItem
                  label='State/Region'
                  value={clubLicenseDetails.stateRegion}
                />
                <DetailItem
                  label='License Status'
                  value={clubLicenseDetails.licenseStatus}
                  status={true}
                />
                <DetailItem
                  label='License Start Date'
                  value={clubLicenseDetails.startDate}
                />
                <DetailItem
                  label='License End Date'
                  value={clubLicenseDetails.endDate}
                />
              </div>
            </div>

            {/* License Limits Section */}
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h2 className='text-xl font-bold text-gray-800 mb-6'>
                License Limits
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                {licenseLimits.map((limit) => (
                  <ProgressBar
                    key={limit.label}
                    label={limit.label}
                    current={limit.current}
                    max={limit.max}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
