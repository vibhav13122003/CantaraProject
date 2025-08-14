import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
const badgeClass = (status) =>
  status === "Active"
    ? "text-green-600 bg-green-100"
    : "text-yellow-600 bg-yellow-100";


const DataAnalystTable = ({ analysts, onEdit, onDelete }) => {
  return (
    <div className='overflow-x-auto mt-4 bg-white rounded-xl shadow p-4'>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Search data analysts...'
          className='border px-3 py-2 rounded-md w-64'
        />
        <select className='border px-3 py-2 rounded-md text-sm'>
          <option>All Data Analysts</option>
          <option>Active</option>
          <option>Pending</option>
        </select>
      </div>

      <table className='w-full text-sm'>
        <thead className='text-gray-500 text-left border-b'>
          <tr>
            <th className='p-2'>Name</th>
            <th>Email Address</th>
            <th>Assigned Categories</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {analysts.map((analyst, i) => (
            <tr key={i} className='border-b hover:bg-gray-50'>
              <td className='py-3 px-2 flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm font-bold text-purple-800'>
                  {analyst.initials}
                </div>
                <div>
                  <div className='font-medium'>{analyst.name}</div>
                  <div className='text-xs text-gray-500'>{analyst.role}</div>
                </div>
              </td>
              <td>{analyst.email}</td>
              <td>
                <div className='flex flex-wrap gap-1'>
                  {analyst.categories.map((c) => (
                    <span
                      key={c}
                      className='bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded'
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${badgeClass(
                    analyst.status
                  )}`}
                >
                  {analyst.status}
                </span>
              </td>
              {/* === ACTION BUTTONS MODIFIED === */}
              <td className='px-2'>
                <div className='flex gap-4 text-gray-500 text-base items-center'>
                  <button
                    onClick={() => onEdit(analyst)}
                    className='cursor-pointer hover:text-purple-600 transition-colors'
                    title='Edit Analyst'
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => onDelete(analyst)}
                    className='cursor-pointer hover:text-red-600 transition-colors'
                    title='Delete Analyst'
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
        <div>Showing 5 of 10 data analysts</div>
        <div className='flex gap-1 items-center'>
          <button className='px-2 py-1 border rounded'>&lt;</button>
          <button className='px-2 py-1 border rounded bg-purple-600 text-white'>
            1
          </button>
          <button className='px-2 py-1 border rounded'>2</button>
          <button className='px-2 py-1 border rounded'>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default DataAnalystTable;
