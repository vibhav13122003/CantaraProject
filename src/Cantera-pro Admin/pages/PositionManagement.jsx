import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
// --- SVG ICONS (Replaced react-icons) ---
const FaEdit = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z'
    />
  </svg>
);

const FaTrash = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    />
  </svg>
);

const FaPlus = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
  </svg>
);


// --- MODAL COMPONENTS ---

const AddEditPositionModal = ({ isOpen, onClose, onSave, position }) => {
  const [name, setName] = useState(position ? position.name : "");
  const [initials, setInitials] = useState(position ? position.initials : "");
  const isEditMode = position !== null;

  React.useEffect(() => {
    setName(position ? position.name : "");
    setInitials(position ? position.initials : "");
  }, [position]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Replaced alert with a more robust check for production environments
    if (!name || !initials) {
      console.error("Validation failed: Both fields are required.");
      return;
    }
    onSave({
      id: isEditMode ? position.id : Date.now(),
      name,
      initials,
    });
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
        <div className='p-5 border-b flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-800'>
            {isEditMode ? "Edit Position" : "Add Position"}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 text-2xl'
          >
            &times;
          </button>
        </div>
        <div className='p-5 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Position Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              placeholder='e.g., Center Back'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Initials
            </label>
            <input
              type='text'
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase())}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              placeholder='e.g., CB'
              maxLength={3}
            />
          </div>
        </div>
        <div className='p-5 bg-gray-50 rounded-b-lg flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700'
          >
            {isEditMode ? "Save Changes" : "Add Position"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  positionName,
}) => {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-sm'>
        <div className='p-5'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Confirm Deletion
          </h3>
          <p className='text-gray-600 my-4'>
            Are you sure you want to delete the position:{" "}
            <span className='font-bold'>{positionName}</span>? This action
            cannot be undone.
          </p>
        </div>
        <div className='p-4 bg-gray-50 rounded-b-lg flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- INITIAL DATA ---
const initialPositions = [
  { id: 1, name: "Goalkeeper", initials: "GK" },
  { id: 2, name: "Center Back", initials: "CB" },
  { id: 3, name: "Left Back", initials: "LB" },
  { id: 4, name: "Right Back", initials: "RB" },
  { id: 5, name: "Defensive Midfielder", initials: "DM" },
  { id: 6, name: "Central Midfielder", initials: "CM" },
  { id: 7, name: "Attacking Midfielder", initials: "AM" },
  { id: 8, name: "Left Winger", initials: "LW" },
];

// --- MAIN PAGE COMPONENT ---
export default function PositionManagement() {
  const [positions, setPositions] = useState(initialPositions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  // --- CRUD Handlers ---
  const handleAddPosition = () => {
    setSelectedPosition(null);
    setIsModalOpen(true);
  };

  const handleEditPosition = (position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleDeletePosition = (position) => {
    setSelectedPosition(position);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setPositions(positions.filter((p) => p.id !== selectedPosition.id));
    setIsDeleteModalOpen(false);
    setSelectedPosition(null);
  };

  const handleSavePosition = (positionData) => {
    const isEditing = positions.some((p) => p.id === positionData.id);
    if (isEditing) {
      setPositions(
        positions.map((p) => (p.id === positionData.id ? positionData : p))
      );
    } else {
      setPositions([...positions, positionData]);
    }
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className=' flex flex-col overflow-hidden  ml-16 sm:ml-16 md:ml-16 lg:ml-0 mt-10 lg:mt-0 w-full'>
        <div className='flex justify-between items-center mt-10 lg:mt-0'>
          <Header
            title='Position Management'
            route='Home / Position Management'
          />
          <button
            onClick={handleAddPosition}
            className='bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary_400 h-11 mr-5'
          >
            <FaPlus />
            Add Position
          </button>
        </div>
        <main className='flex-1 overflow-y-auto p-4 sm:p-6 w-full'>
          <div className='flex justify-between items-center mb-6'></div>

          <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
            <table className='min-w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Position Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Initials
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {positions.map((pos) => (
                  <tr key={pos.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {pos.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                      {pos.initials}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center gap-4'>
                        <button
                          onClick={() => handleEditPosition(pos)}
                          className='flex items-center gap-2 text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-xs font-semibold'
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePosition(pos)}
                          className='flex items-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-xs font-semibold'
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* --- Modals --- */}
      <AddEditPositionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePosition}
        position={selectedPosition}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        positionName={selectedPosition?.name}
      />
    </div>
  );
}
