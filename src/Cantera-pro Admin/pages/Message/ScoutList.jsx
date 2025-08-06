import React from "react";

const ScoutList = ({ scouts, onSelect, selectedScout }) => {
  return (
    <div className='w-80 border-r bg-white overflow-y-auto'>
      <div className='p-4'>
        <input
          type='text'
          placeholder='Search scouts...'
          className='w-full px-3 py-2 border rounded bg-gray-100'
        />
      </div>
      {scouts.map((scout) => (
        <div
          key={scout.id}
          onClick={() => onSelect(scout)}
          className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-100 ${
            scout.id === selectedScout?.id ? "bg-purple-100" : ""
          }`}
        >
          <div className='flex justify-between items-center'>
            <span className='font-medium truncate w-56'>{scout.name}</span>
            <span className='text-xs text-gray-500'>{scout.timestamp}</span>
          </div>
          <p className='text-sm text-gray-600 truncate'>{scout.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ScoutList;
