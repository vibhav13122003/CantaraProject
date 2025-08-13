import React, { useState } from "react";

// A simple icon component for the upload area
const UploadIcon = () => (
  <svg
    className='w-12 h-12 mx-auto text-gray-400'
    stroke='currentColor'
    fill='none'
    viewBox='0 0 48 48'
    aria-hidden='true'
  >
    <path
      d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// Main component for the registration page
const ScoutRegistration = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    country: "",
    stateRegion: "",
    phone: "",
    bio: "",
    agreedToTerms: false,
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!"); // In a real app, use a proper modal/toast notification
      return;
    }
    if (!formData.agreedToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    console.log("Form Submitted", formData);
    // Here you would typically send the data to your backend API
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans'>
      {/* Main container for the form */}
      <div className='max-w-4xl w-full bg-white p-8 md:p-12 rounded-xl shadow-lg'>
        <div className='text-center mb-10'>
          {/* Logo - assuming you have a logo file in your public folder */}
          <h1 className='text-4xl font-bold text-gray-800'>CanteraPro</h1>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mt-6'>
            Become a Cantera Pro Scout
          </h2>
          <p className='text-gray-500 mt-2'>
            Apply to access player data and tracking tools
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Full Name */}
            <div>
              <label
                htmlFor='fullName'
                className='block text-sm font-medium text-gray-700'
              >
                Full Name
              </label>
              <input
                type='text'
                name='fullName'
                id='fullName'
                required
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                required
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                required
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* Organization / Club */}
            <div className='md:col-span-2'>
              <label
                htmlFor='organization'
                className='block text-sm font-medium text-gray-700'
              >
                Organization / Club (Optional)
              </label>
              <input
                type='text'
                name='organization'
                id='organization'
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor='country'
                className='block text-sm font-medium text-gray-700'
              >
                Country
              </label>
              <select
                id='country'
                name='country'
                required
                className='mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              >
                <option value=''>Select your country</option>
                <option value='USA'>United States</option>
                <option value='CAN'>Canada</option>
                <option value='MEX'>Mexico</option>
                {/* Add other countries as needed */}
              </select>
            </div>

            {/* State / Region */}
            <div>
              <label
                htmlFor='stateRegion'
                className='block text-sm font-medium text-gray-700'
              >
                State / Region
              </label>
              <input
                type='text'
                name='stateRegion'
                id='stateRegion'
                required
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* Phone Number */}
            <div className='md:col-span-2'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'
              >
                Phone Number (Optional)
              </label>
              <input
                type='tel'
                name='phone'
                id='phone'
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* Purpose of Use / Bio */}
            <div className='md:col-span-2'>
              <label
                htmlFor='bio'
                className='block text-sm font-medium text-gray-700'
              >
                Purpose of Use / Bio
              </label>
              <textarea
                id='bio'
                name='bio'
                rows={4}
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={handleChange}
              />
            </div>

            {/* File Upload */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Upload ID or Accreditation Proof
              </label>
              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                <div className='space-y-1 text-center'>
                  <UploadIcon />
                  <div className='flex text-sm text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                    >
                      <span>Upload a file</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs text-gray-500'>
                    Accepted: JPG, PNG, PDF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className='flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='agreedToTerms'
                name='agreedToTerms'
                type='checkbox'
                required
                className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                onChange={handleChange}
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                htmlFor='agreedToTerms'
                className='font-medium text-gray-700'
              >
                I agree to the{" "}
                <a href='#' className='text-indigo-600 hover:text-indigo-500'>
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href='#' className='text-indigo-600 hover:text-indigo-500'>
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition'
              style={{ backgroundColor: "#4A00E0" }} // Matching the purple from the image
            >
              Submit Application
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className='text-center mt-6'>
          <p className='text-sm text-gray-600'>
            Already Registered?{" "}
            <a
              href='#'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className='text-center mt-8'>
        <p className='text-sm text-gray-500'>
          &copy; 2025 Cantera Pro. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// To use this component, you would render it in your App.js or another router view.
// For example:
//
// import React from 'react';
// import ScoutRegistration from './ScoutRegistration';
//
// function App() {
//   return (
//     <div>
//       <ScoutRegistration />
//     </div>
//   );
// }
//
// export default App;

export default ScoutRegistration;


//Work done
// Created Landing page for Scout Registration
//Created the Sign in page for Scout Registration