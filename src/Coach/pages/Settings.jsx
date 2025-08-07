import React, { useState, useCallback } from "react";
import Sidebar from "../Components/Sidebar"; // Adjust path if needed
import Header from "../Components/Header"; // Adjust path if needed
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { FaEye, FaEyeSlash } from "react-icons/fa";

// --- Reusable Input Field Component ---
const FormInput = ({
  label,
  id,
  type = "text",
  value,
  readOnly = false,
  note,
}) => (
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
      value={value}
      readOnly={readOnly}
      className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
    {note && <p className='text-xs text-gray-500 mt-1'>{note}</p>}
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
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
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
  const [profile, setProfile] = useState({
    fullName: "Michael Thompson",
    email: "michael.thompson@canterapro.com",
    associatedClub: "FC Barcelona Youth Academy",
    clubAdminName: "James Rodriguez",
    clubAdminEmail: "j.rodriguez@fcbarcelona.com",
    assignedCategories: ["U-18 Boys", "Senior Team", "Goalkeeper Training"],
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  return (
    <div className='space-y-10'>
      {/* Profile Information Section */}
      <div className='bg-white rounded-xl shadow p-6 md:p-8'>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>
          Profile Information
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormInput
            label='Full Name'
            id='fullName'
            value={profile.fullName}
            readOnly
          />
          <FormInput
            label='Email Address'
            id='email'
            value={profile.email}
            readOnly
            note='Contact support to change your email address'
          />
          <FormInput
            label='Associated Club'
            id='associatedClub'
            value={profile.associatedClub}
            readOnly
          />
        </div>
        <div className='mt-6'>
          <h3 className='text-md font-semibold text-gray-800 mb-4'>
            Club Administration
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormInput
              label='Club Admin Name'
              id='clubAdminName'
              value={profile.clubAdminName}
              readOnly
            />
            <FormInput
              label='Admin Email'
              id='clubAdminEmail'
              value={profile.clubAdminEmail}
              readOnly
            />
          </div>
        </div>
        <div className='mt-6'>
          <h3 className='text-md font-semibold text-gray-800 mb-2'>
            Assigned Categories
          </h3>
          <div className='flex flex-wrap gap-2'>
            {profile.assignedCategories.map((cat) => (
              <span
                key={cat}
                className='bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full'
              >
                {cat}
              </span>
            ))}
          </div>
          <p className='text-xs text-gray-500 mt-2'>
            Categories are assigned by administrators
          </p>
        </div>
        <div className='mt-8'>
          <button className='bg-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-700'>
            Save Changes
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className='bg-white rounded-xl shadow p-6 md:p-8'>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>
          Change Password
        </h2>
        <div className='space-y-6 max-w-md'>
          <PasswordInput
            label='Current Password'
            id='current'
            value={passwords.current}
            onChange={handlePasswordChange}
          />
          <div>
            <PasswordInput
              label='New Password'
              id='new'
              value={passwords.new}
              onChange={handlePasswordChange}
            />
            <ul className='text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside'>
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
            </ul>
          </div>
          <PasswordInput
            label='Confirm New Password'
            id='confirm'
            value={passwords.confirm}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='mt-8'>
          <button className='bg-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-700'>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

// --- The main page component that assembles the layout ---
const Settings = () => {
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
          userName='Michael Johnson' // This would be dynamic
          userRole='Head Coach'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <SettingsContent />
        </main>
      </div>
    </div>
  );
};

export default Settings;
