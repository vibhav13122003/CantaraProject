import React from "react";
import { IoMdClose } from "react-icons/io";

const PlayerProfileModal = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6 relative'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl'
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        {/* Header */}
        <div className='flex justify-between items-center border-b pb-4 mb-4'>
          <div>
            <h2 className='text-lg font-semibold mb-1'>{player.name}</h2>
            <p className='text-sm text-gray-500'>
              {player.email} • Jersey #{player.jersey}
            </p>
            <div className='flex gap-2 mt-2 flex-wrap'>
              {(player.categories ?? []).map((cat, i) => (
                <span
                  key={i}
                  className='bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full'
                >
                  {cat}
                </span>
              ))}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  player.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {player.status}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
          {[
            { label: "Matches Played", value: 37 },
            { label: "Goals", value: 18 },
            { label: "Assists", value: 24 },
            { label: "Total Shots", value: 72 },
            { label: "Crosses", value: 42 },
            { label: "Penalty Kicks", value: 12 },
            { label: "Fouls", value: 23 },
            { label: "Offsides", value: 7 },
            { label: "Yellow Cards", value: 5 },
            { label: "Red Cards", value: 1 },
            { label: "Defensive Actions", value: 64 },
          ].map((stat, i) => (
            <div key={i} className='bg-gray-50 p-3 rounded-lg text-center'>
              <p className='text-xl font-semibold'>{stat.value}</p>
              <p className='text-xs text-gray-500'>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Performance Trend */}
        <div className='mb-6'>
          <h3 className='font-medium mb-2'>Performance Trend</h3>
          <div className='h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400'>
            [Trend Chart Placeholder]
          </div>
        </div>

        {/* Match History */}
        <div className='mb-6'>
          <h3 className='font-medium mb-2'>Match History</h3>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm text-left'>
              <thead className='bg-gray-100 text-gray-700'>
                <tr>
                  <th className='px-3 py-2'>Match Date</th>
                  <th className='px-3 py-2'>Opponent</th>
                  <th className='px-3 py-2'>Category</th>
                  <th className='px-3 py-2'>Result</th>
                  <th className='px-3 py-2'>Stats</th>
                  <th className='px-3 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(player.matches ?? []).map((match, i) => (
                  <tr key={i} className='border-b'>
                    <td className='px-3 py-2'>{match.date}</td>
                    <td className='px-3 py-2'>{match.opponent}</td>
                    <td className='px-3 py-2'>{match.category}</td>
                    <td className='px-3 py-2'>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          match.result === "Win"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {match.result}
                      </span>
                    </td>
                    <td className='px-3 py-2'>{match.stats}</td>
                    <td className='px-3 py-2 text-purple-700 text-sm cursor-pointer'>
                      View Details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Uploaded Videos */}
        <div className='mb-6'>
          <h3 className='font-medium mb-2'>Uploaded Videos</h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {(player.videos ?? []).map((vid, i) => (
              <div
                key={i}
                className='rounded-lg overflow-hidden shadow-sm border'
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className='w-full h-32 object-cover'
                />
                <div className='p-3 text-sm'>
                  <p className='font-medium'>{vid.title}</p>
                  <p className='text-xs text-gray-500'>{vid.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Activity */}
        <div>
          <h3 className='font-medium mb-2'>Wellness Activity</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {(player.wellness ?? []).map((activity, i) => (
              <div key={i} className='bg-gray-50 p-3 rounded-md text-sm'>
                <p className='font-medium'>{activity.title}</p>
                <p className='text-xs text-gray-500'>
                  {activity.lastCompleted}
                </p>
                <div className='w-full bg-gray-200 h-2 rounded-full mt-2'>
                  <div
                    className='h-2 bg-purple-600 rounded-full'
                    style={{ width: `${activity.progress}%` }}
                  ></div>
                </div>
                <p className='text-right text-xs text-gray-600 mt-1'>
                  {activity.progress}% completed
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileModal;
