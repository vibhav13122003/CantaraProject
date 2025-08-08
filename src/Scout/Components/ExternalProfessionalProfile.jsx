import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const ExternalProfessionals = () => {
  const professionals = [
    {
      fullName: "Lukas Podolski",
      email: "lukas.podolski@example.com",
      phone: "+49 176 9876 5432",
      category: "Coach",
      idProof: "https://via.placeholder.com/60x40",
      connection: "Not Connected",
    },
    {
      fullName: "Thomas Müller",
      email: "thomas.muller@example.com",
      phone: "+49 123 456 7890",
      category: "Coach",
      idProof: "https://via.placeholder.com/60x40",
      connection: "Connected",
    },
    {
      fullName: "Elena Rodriguez",
      email: "elena.rodriguez@example.com",
      phone: "+34 611 223 344",
      category: "Nutritionist",
      idProof: "https://via.placeholder.com/60x40",
      connection: "Connected",
    },
    // Add more as needed...
  ];

  return (
    <div className='p-6'>
      {/* Page Title */}
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
        External Professionals
      </h2>

      {/* Filters */}
      <div className='flex flex-wrap items-center gap-4 mb-4'>
        <input
          type='text'
          placeholder='Search professionals...'
          className='px-3 py-2 border rounded w-64'
        />
        <select className='px-3 py-2 border rounded text-sm'>
          <option>All Categories</option>
        </select>
        <select className='px-3 py-2 border rounded text-sm'>
          <option>All Verification Status</option>
        </select>
        <select className='px-3 py-2 border rounded text-sm'>
          <option>All Stripe Status</option>
        </select>
        <button className='bg-purple-700 text-white px-4 py-2 rounded text-sm'>
          Apply Filters
        </button>
        <div className='ml-auto flex gap-2'>
          <select className='px-3 py-2 border rounded text-sm'>
            <option>Bulk Actions</option>
          </select>
          <button className='bg-gray-800 text-white px-4 py-2 rounded text-sm'>
            Apply
          </button>
          <button className='bg-purple-700 text-white px-4 py-2 rounded text-sm'>
            + Add New
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='mb-4'>
        <ul className='flex border-b text-sm font-medium'>
          <li className='-mb-px mr-6'>
            <button className='border-b-2 border-purple-700 text-purple-700 px-1 pb-2'>
              Active
            </button>
          </li>
          <li className='mr-6'>
            <button className='text-gray-500 hover:text-purple-700 px-1 pb-2'>
              Pending Verification
            </button>
          </li>
        </ul>
      </div>

      {/* Table */}
      <div className='overflow-x-auto border rounded-lg'>
        <table className='min-w-full text-sm text-left'>
          <thead className='bg-gray-100 text-gray-600'>
            <tr>
              <th className='px-4 py-2'>
                <input type='checkbox' />
              </th>
              <th className='px-4 py-2'>Full Name</th>
              <th className='px-4 py-2'>Email Address</th>
              <th className='px-4 py-2'>Phone Number</th>
              <th className='px-4 py-2'>Professional Category</th>
              <th className='px-4 py-2'>ID Proof Document</th>
              <th className='px-4 py-2'>Signature</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {professionals.map((pro, index) => (
              <tr key={index} className='border-t'>
                <td className='px-4 py-2'>
                  <input type='checkbox' />
                </td>
                <td className='px-4 py-2'>{pro.fullName}</td>
                <td className='px-4 py-2'>{pro.email}</td>
                <td className='px-4 py-2'>{pro.phone}</td>
                <td className='px-4 py-2'>{pro.category}</td>
                <td className='px-4 py-2'>
                  <img src={pro.idProof} alt='ID Proof' className='w-16' />
                </td>
                <td className='px-4 py-2'>
                  {pro.connection === "Not Connected" ? (
                    <span className='text-red-600 text-xs bg-red-100 px-2 py-1 rounded-full'>
                      • Not Connected
                    </span>
                  ) : (
                    <span className='text-gray-600 text-xs'>Signature</span>
                  )}
                </td>
                <td className='px-4 py-2 flex items-center gap-3 text-purple-700'>
                  <FaEye className='cursor-pointer hover:text-purple-900' />
                  <FaEdit className='cursor-pointer hover:text-purple-900' />
                  <FaTrash className='cursor-pointer hover:text-red-600' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExternalProfessionals;
