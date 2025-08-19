import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";

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

// --- MODAL FOR CHANGING PASSWORD ---
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (passwords.newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    // --- In a real app, you would make an API call here ---
    console.log("Password change submitted:", passwords);
    setSuccess("Password updated successfully!");

    // Reset form after a short delay
    setTimeout(() => {
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      onClose();
    }, 1500);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
        <div className='p-5 border-b flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Change Password
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 text-2xl'
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='p-5 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Current Password
              </label>
              <input
                type='password'
                name='currentPassword'
                value={passwords.currentPassword}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                New Password
              </label>
              <input
                type='password'
                name='newPassword'
                value={passwords.newPassword}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Confirm New Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={passwords.confirmPassword}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            {error && (
              <p className='text-xs text-red-600 bg-red-50 p-2 rounded-md'>
                {error}
              </p>
            )}
            {success && (
              <p className='text-xs text-green-600 bg-green-50 p-2 rounded-md'>
                {success}
              </p>
            )}
          </div>
          <div className='p-5 bg-gray-50 rounded-b-lg flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700'
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Settings() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: "Michael",
    lastName: "Rodriguez",
  });
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = () => {
    // In a real app, you would make an API call here.
    console.log("Profile updated:", profile);
    setProfileUpdateSuccess(true);
    // Hide the success message after 3 seconds
    setTimeout(() => setProfileUpdateSuccess(false), 3000);
  };

  return (
    <div className='flex bg-gray-100'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
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
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    className='w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500'
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={profile.lastName}
                    onChange={handleProfileChange}
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
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className='px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors'
                >
                  Change Password
                </button>
                <button
                  onClick={handleProfileUpdate}
                  className='px-5 py-2 bg-purple-600 text-white font-semibold rounded-md shadow hover:bg-purple-700 transition-colors'
                >
                  Update Profile
                </button>
                {profileUpdateSuccess && (
                  <div className='text-sm text-green-600 font-semibold'>
                    Profile updated successfully!
                  </div>
                )}
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
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
