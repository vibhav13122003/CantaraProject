import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaEye, FaEyeSlash } from "react-icons/fa";

// --- Reusable Input Field Components ---
const FormInput = ({ label, id, type = "text", value, readOnly = false }) => (
  <div>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700 mb-1'
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      defaultValue={value}
      readOnly={readOnly}
      className={`w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
        readOnly ? "bg-gray-100" : ""
      }`}
    />
  </div>
);

const PasswordInput = ({ label, id, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-gray-700 mb-1'
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500'
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

// --- The main content area of the Settings page ---
const SettingsContent = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.id]: e.target.value });

  return (
    <div className='space-y-8'>
      {/* Top Section: Profile Picture and Details */}
      <div className='bg-white rounded-xl shadow-sm p-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column: Profile Picture */}
          <div className='flex flex-col items-center text-center border-r-0 lg:border-r lg:pr-8'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4 self-start'>
              Profile Picture
            </h3>
            <img
              src='https://placehold.co/150x150/E2E8F0/4A5568?text=MJ'
              alt='Profile'
              className='w-36 h-36 rounded-full object-cover mb-4'
            />
            <button className='bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-300'>
              Upload New Image
            </button>
            <p className='text-xs text-gray-500 mt-2'>
              Supported formats: JPG, PNG
            </p>
            <p className='text-xs text-gray-500'>Max size: 5MB</p>
          </div>

          {/* Right Column: Club and Profile Info */}
          <div className='lg:col-span-2 space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                Club Details
              </h3>
              <div className='flex items-center gap-4 mb-6'>
                <img
                  src='https://placehold.co/40x40/E2E8F0/4A5568?text=MU'
                  alt='Club Logo'
                  className='w-10 h-10 rounded-full'
                />
                <div>
                  <p className='font-bold'>Manchester United Academy</p>
                  <p className='text-sm text-gray-500'>
                    Premier League Youth Division
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <FormInput
                  label='Club Administrator'
                  id='clubAdmin'
                  value='James Robertson'
                  readOnly
                />
                <FormInput
                  label='Administrator Email'
                  id='adminEmail'
                  value='j.robertson@manutd.academy.com'
                  readOnly
                />
                <FormInput
                  label='Club Location'
                  id='clubLocation'
                  value='Manchester, United Kingdom'
                  readOnly
                />
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                Profile Information
              </h3>
              <div className='space-y-4'>
                <FormInput
                  label='Full Name'
                  id='fullName'
                  value='Alexander Mitchell'
                />
                <FormInput
                  label='Email Address'
                  id='email'
                  value='alex.mitchell@canterapro.com'
                />
                <FormInput
                  label='Assigned Club'
                  id='assignedClub'
                  value='Manchester United Academy'
                  readOnly
                />
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Assigned Categories
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    <span className='bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full'>
                      U13
                    </span>
                    <span className='bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full'>
                      U17
                    </span>
                    <span className='bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full'>
                      U21
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className='bg-white rounded-xl shadow-sm p-8'>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>
          Change Password
        </h2>
        <div className='space-y-6 max-w-sm'>
          <PasswordInput
            label='Current Password'
            id='current'
            value={passwords.current}
            onChange={handlePasswordChange}
          />
          <PasswordInput
            label='New Password'
            id='new'
            value={passwords.new}
            onChange={handlePasswordChange}
          />
          <PasswordInput
            label='Confirm New Password'
            id='confirm'
            value={passwords.confirm}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='mt-8'>
          <button className='bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700'>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const DataAnalystSettings = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex h-screen bg-gray-100 font-sans'>
      <Sidebar onLogout={handleLogout} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header
          title='Settings'
          breadcrumbs='Home / Settings'
          userName='Michael Johnson'
          userRole='Data Analyst'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <SettingsContent />
        </main>
      </div>
    </div>
  );
};

export default DataAnalystSettings;
