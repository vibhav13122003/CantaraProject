import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { HiDownload } from "react-icons/hi";

const ScoutProfileModal = ({ scout, onClose }) => {
  if (!scout) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg'>
        {/* Header */}
        <div className='flex flex-col gap-4 items-center mb-6'>
          <img
            src='https://via.placeholder.com/100'
            alt='Scout Profile'
            className='w-24 h-24 rounded-full object-cover'
          />
          <div className='text-center'>
            <h2 className='text-xl font-semibold'>{scout.name}</h2>
            <span className='text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium mt-1 inline-block'>
              Pending Approval
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-6'>
          <div className='flex gap-3'>
            <MdOutlineEmail className='text-xl text-gray-500 mt-1' />
            <div>
              <p className='text-gray-500 text-xs mb-1'>Email Address</p>
              <p className='text-sm font-medium'>{scout.email}</p>
            </div>
          </div>
          <div className='flex gap-3'>
            <MdMyLocation className='text-sm text-gray-500 mt-1.5' />{" "}
            <div>
              <p className='text-gray-500 text-xs mb-1'>Organisation</p>
              <p className='text-sm font-medium'>
                Youth Development, Midfielders
              </p>
            </div>
          </div>
          <div className='flex gap-3'>
            <FaPhoneAlt className='text-sm text-gray-500 mt-1.5' />
            <div>
              <p className='text-gray-500 text-xs mb-1'>Phone Number</p>
              <p className='text-sm font-medium'>{scout.phone}</p>
            </div>
          </div>

          <div className='flex gap-3'>
            <IoLocationOutline className='text-lg text-gray-500 mt-1' />
            <div>
              <p className='text-gray-500 text-xs mb-1'>Country</p>
              <p className='text-sm font-medium'>United Kingdom</p>
            </div>
          </div>
          <div className='flex gap-3'>
            <IoLocationOutline className='text-lg text-gray-500 mt-1' />
            <div>
              <p className='text-gray-500 text-xs mb-1'>State/Region</p>
              <p className='text-sm font-medium'>Manchester</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className='mb-6'>
          <p className='text-sm font-medium mb-2'>Purpose of Use/Bio</p>
          <div className='bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed'>
            I’ve been working in football scouting for 8 years, specializing in
            identifying young talent with a focus on technical midfielders. My
            background as a former academy player gives me unique insights into
            player development pathways.
            <br />
            <br />
            Previously worked with Manchester City’s youth development program
            for 3 years, followed by 5 years as an independent scout covering
            matches across Europe. I have a strong network of contacts in Spain,
            Portugal and the UK.
            <br />
            <br />I hold a UEFA B coaching license and have completed the FA’s
            Talent Identification program. My approach combines traditional
            scouting methods with data analytics to provide comprehensive player
            assessments.
          </div>
        </div>

        {/* Document Section */}
        <div className='mb-6'>
          <p className='text-sm font-medium mb-2'>Credentials & Documents</p>
          <div className='border rounded-lg p-4 flex justify-between items-center bg-white'>
            <div>
              <p className='text-sm font-semibold'>Identity Proof</p>
              <p className='text-xs text-gray-500'>
                PDF Document • Uploaded on Apr 20, 2025
              </p>
            </div>
            <a href='#' className='text-purple-700 text-2xl'>
              <HiDownload />
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='bg-gray-200 px-4 py-2 rounded-md text-sm font-medium'
          >
            Close
          </button>
          <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm font-medium'>
            Reject Application
          </button>
          <button className='bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium'>
            Approve Scout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoutProfileModal;
