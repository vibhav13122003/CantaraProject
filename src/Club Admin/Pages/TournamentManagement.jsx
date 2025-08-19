import React, { useState, useMemo } from "react";
import Sidebar from "../Components/SideBar"; // Assuming path is correct
import Header from "../Components/Header"; // Assuming path is correct

// --- EXPANDED MOCK DATA ---
const mockTournaments = [
  {
    id: 1,
    name: "La Liga Youth Cup",
    category: "U18",
    startDate: "2025-04-01",
    endDate: "2025-06-15",
    matches: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Copa del Rey Youth",
    category: "U16",
    startDate: "2025-04-10",
    endDate: "2025-05-25",
    matches: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Madrid Regional Championship",
    category: "U14",
    startDate: "2025-05-05",
    endDate: "2025-07-10",
    matches: 10,
    status: "Active",
  },
];

let mockMatches = [
  {
    id: 1,
    tournamentName: "La Liga Youth Cup",
    matchName: "Cantera FC vs Riverside United",
    category: "U15",
    opponentName: "Riverside United",
    matchType: "Home",
    location: "Cantera Stadium, Greater Noida",
    dateTime: "2025-05-31T15:00:00",
    formation: "4-3-3",
    status: "Scheduled",
    score: null,
    coachStrategy:
      "Focus on maintaining possession and using wing-backs for wide attacks. Press high on defense.",
    teams: {
      home: {
        name: "Cantera FC",
        formation: "4-3-3",
        players: Array.from({ length: 11 }, (_, i) => ({
          number: i + 1,
          name: `Player ${String.fromCharCode(65 + i)}`,
        })),
        substitutes: Array.from({ length: 5 }, (_, i) => ({
          number: i + 12,
          name: `Sub ${i + 1}`,
        })),
      },
      away: {
        name: "Riverside United",
        formation: "4-4-2",
        players: Array.from({ length: 11 }, (_, i) => ({
          number: i + 1,
          name: `Opponent ${String.fromCharCode(65 + i)}`,
        })),
        substitutes: Array.from({ length: 5 }, (_, i) => ({
          number: i + 12,
          name: `Opponent Sub ${i + 1}`,
        })),
      },
    },
  },
  {
    id: 2,
    tournamentName: "Copa del Rey Youth",
    matchName: "Cantera FC vs Metro Academy",
    category: "U17",
    opponentName: "Metro Academy",
    matchType: "Away",
    location: "Metro Stadium, Delhi",
    dateTime: "2025-06-05T17:30:00",
    formation: "4-4-2",
    status: "Scheduled",
    score: null,
    coachStrategy:
      "Counter-attack strategy. Absorb pressure and use the speed of our forwards to break quickly.",
    teams: {
      home: {
        name: "Metro Academy",
        formation: "4-3-3",
        players: Array.from({ length: 11 }, (_, i) => ({
          number: i + 1,
          name: `Opponent ${String.fromCharCode(65 + i)}`,
        })),
        substitutes: Array.from({ length: 5 }, (_, i) => ({
          number: i + 12,
          name: `Opponent Sub ${i + 1}`,
        })),
      },
      away: {
        name: "Cantera FC",
        formation: "4-4-2",
        players: Array.from({ length: 11 }, (_, i) => ({
          number: i + 1,
          name: `Player ${String.fromCharCode(65 + i)}`,
        })),
        substitutes: Array.from({ length: 5 }, (_, i) => ({
          number: i + 12,
          name: `Sub ${i + 1}`,
        })),
      },
    },
  },
  {
    id: 3,
    tournamentName: "La Liga Youth Cup",
    matchName: "Cantera FC vs Westside FC",
    category: "U13",
    opponentName: "Westside FC",
    matchType: "Home",
    location: "Cantera Stadium, Greater Noida",
    dateTime: "2025-04-28T14:00:00",
    formation: "4-3-3",
    status: "Completed",
    score: "2 - 1",
    coachStrategy:
      "A well-executed game plan focusing on midfield dominance led to our victory.",
    teams: {
      home: {
        name: "Cantera FC",
        formation: "4-3-3",
        players: [
          { number: 1, name: "Marc-André ter Stegen" },
          { number: 2, name: "Jules Koundé" },
          { number: 4, name: "Ronald Araújo" },
          { number: 15, name: "Andreas Christensen" },
          { number: 17, name: "Marcos Alonso" },
          { number: 5, name: "Sergio Busquets" },
          { number: 8, name: "Pedri González" },
          { number: 6, name: "Gavi" },
          { number: 7, name: "Ousmane Dembélé" },
          { number: 9, name: "Robert Lewandowski" },
          { number: 10, name: "Ansu Fati" },
        ],
        substitutes: [{ number: 13, name: "Iñaki Peña" }],
      },
      away: {
        name: "Westside FC",
        formation: "4-5-1",
        players: Array.from({ length: 11 }, (_, i) => ({
          number: i + 1,
          name: `Opponent ${String.fromCharCode(65 + i)}`,
        })),
        substitutes: Array.from({ length: 5 }, (_, i) => ({
          number: i + 12,
          name: `Opponent Sub ${i + 1}`,
        })),
      },
    },
  },
];

// --- HELPER COMPONENTS AND FUNCTIONS ---

const formatDateTime = (isoString, type) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  if (type === "date") return date.toLocaleDateString("en-CA"); // YYYY-MM-DD for input
  if (type === "time") return date.toLocaleTimeString("en-GB", timeOptions);
  return `${date.toLocaleDateString(
    "en-US",
    dateOptions
  )} - ${date.toLocaleTimeString("en-GB", timeOptions)}`;
};

const EditIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4 text-gray-500 hover:text-purple-600'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z'
    />
  </svg>
);
const DeleteIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-4 w-4 text-gray-500 hover:text-red-600'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    />
  </svg>
);
const BackIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5 mr-2'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
      clipRule='evenodd'
    />
  </svg>
);

// --- MODALS ---

const AddTournamentModal = ({ isOpen, onClose, onAdd }) => {
  const initialState = {
    name: "",
    category: "",
    startDate: "",
    endDate: "",
    matches: "",
  };
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !form.name ||
      !form.category ||
      !form.startDate ||
      !form.endDate ||
      !form.matches
    ) {
      setError("All fields are required.");
      return;
    }
    if (form.matches < 3) {
      setError("Minimum of 3 matches is required.");
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date cannot be before the start date.");
      return;
    }

    // Call the onAdd function passed from the parent
    onAdd(form);
    setError("");
    setForm(initialState); // Reset form
    onClose(); // Close modal
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
        <div className='p-5 border-b flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Add Tournament
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
                Tournament Name
              </label>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tournament Category
              </label>
              <select
                name='category'
                value={form.category}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              >
                <option value='' disabled>
                  Select a category
                </option>
                <option>U13</option>
                <option>U14</option>
                <option>U15</option>
                <option>U16</option>
                <option>U18</option>
              </select>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Start Date
                </label>
                <input
                  type='date'
                  name='startDate'
                  value={form.startDate}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  End Date
                </label>
                <input
                  type='date'
                  name='endDate'
                  value={form.endDate}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Number of Matches
              </label>
              <input
                type='number'
                name='matches'
                min='0'
                value={form.matches}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
              <p className='text-xs text-gray-500 mt-1'>
                Minimum 3 matches required
              </p>
            </div>
            {error && (
              <p className='text-xs text-red-600 bg-red-50 p-2 rounded-md'>
                {error}
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
              className='px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-purple-300'
            >
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditTournamentModal = ({ tournament, isOpen, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    name: tournament?.name || "",
    category: tournament?.category || "",
    startDate: tournament?.startDate || "",
    endDate: tournament?.endDate || "",
    matches: tournament?.matches || "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.category ||
      !form.startDate ||
      !form.endDate ||
      !form.matches
    ) {
      setError("All fields are required.");
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date cannot be before the start date.");
      return;
    }
    onUpdate({ ...tournament, ...form });
    setError("");
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
        <div className='p-5 border-b flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Edit Tournament
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
            {/* Form fields are the same as AddTournamentModal, but pre-filled */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tournament Name
              </label>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tournament Category
              </label>
              <select
                name='category'
                value={form.category}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              >
                <option>U13</option>
                <option>U14</option>
                <option>U15</option>
                <option>U16</option>
                <option>U18</option>
              </select>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Start Date
                </label>
                <input
                  type='date'
                  name='startDate'
                  value={form.startDate}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  End Date
                </label>
                <input
                  type='date'
                  name='endDate'
                  value={form.endDate}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Number of Matches
              </label>
              <input
                type='number'
                name='matches'
                min='0'
                value={form.matches}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>
            {error && (
              <p className='text-xs text-red-600 bg-red-50 p-2 rounded-md'>
                {error}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-sm'>
        <div className='p-5'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Confirm Deletion
          </h3>
          <p className='text-gray-600 my-4'>
            Are you sure you want to delete the tournament:{" "}
            <span className='font-bold'>{name}</span>? This action cannot be
            undone.
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

const MatchDetailsModal = ({ match, onClose }) => (
  <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60] p-4'>
    <div className='bg-gray-50 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col'>
      <div className='p-4 border-b flex items-center bg-white rounded-t-lg'>
        <button
          onClick={onClose}
          className='text-gray-600 hover:text-black mr-4'
        >
          <BackIcon />
        </button>
        <h3 className='text-xl font-bold text-gray-800'>{match.matchName}</h3>
        <span className='ml-4 px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full'>
          {match.category}
        </span>
      </div>
      <div className='p-6 overflow-auto flex-grow space-y-6'>
        <div className='bg-white p-4 rounded-lg shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
          <div>
            <div className='text-gray-500 font-semibold'>Date & Time</div>
            <div>{formatDateTime(match.dateTime)}</div>
          </div>
          <div>
            <div className='text-gray-500 font-semibold'>Location</div>
            <div>{match.location}</div>
          </div>
          <div>
            <div className='text-gray-500 font-semibold'>Match Type</div>
            <div>{match.matchType}</div>
          </div>
          <div>
            <div className='text-gray-500 font-semibold'>Final Score</div>
            <div className='flex items-center gap-2'>
              {match.score || "N/A"}{" "}
              {match.status === "Completed" && (
                <span className='px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800'>
                  {match.status}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <h4 className='font-bold text-lg mb-2'>Coach Strategy</h4>
          <p className='text-gray-600 text-sm'>{match.coachStrategy}</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <h4 className='font-bold text-lg mb-3'>Team Formations</h4>
          <div className='space-y-4'>
            {Object.values(match.teams).map((team) => (
              <div key={team.name}>
                <div className='flex justify-between items-center bg-gray-100 p-3 rounded-t-md'>
                  <h5 className='font-semibold'>{team.name}</h5>
                  <span className='text-xs font-semibold text-gray-600'>
                    Formation: {team.formation}
                  </span>
                </div>
                <div className='p-3 border rounded-b-md'>
                  <h6 className='font-semibold text-xs uppercase text-gray-500 mb-2'>
                    Starting Players
                  </h6>
                  <ul className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-sm'>
                    {team.players.map((p) => (
                      <li key={p.number} className='flex items-center'>
                        <span className='font-bold text-gray-500 w-6'>
                          {p.number}
                        </span>{" "}
                        {p.name}
                      </li>
                    ))}
                  </ul>
                  {team.substitutes.length > 0 && (
                    <>
                      <h6 className='font-semibold text-xs uppercase text-gray-500 mt-4 mb-2'>
                        Substitutes
                      </h6>
                      <ul className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-sm'>
                        {team.substitutes.map((p) => (
                          <li key={p.number} className='flex items-center'>
                            <span className='font-bold text-gray-500 w-6'>
                              {p.number}
                            </span>{" "}
                            {p.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AddMatchModal = ({ tournament, onAddMatch, onClose }) => {
  const [newMatch, setNewMatch] = useState({
    tournamentName: tournament.name,
    category: "",
    opponentName: "",
    matchType: "",
    stadiumName: "",
    state: "",
    city: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMatch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const dateTime = `${newMatch.date}T${newMatch.time || "00:00:00"}`;
    const location = `${newMatch.stadiumName}, ${newMatch.city}, ${newMatch.state}`;
    const matchData = {
      id: Date.now(),
      tournamentName: newMatch.tournamentName,
      matchName: `Cantera FC vs ${newMatch.opponentName}`,
      category: newMatch.category,
      opponentName: newMatch.opponentName,
      matchType: newMatch.matchType,
      location: location,
      dateTime: dateTime,
      formation: "TBD",
      status: "Scheduled",
      score: null,
      coachStrategy: "To be defined.",
      teams: {
        home: {
          name: "Cantera FC",
          formation: "TBD",
          players: [],
          substitutes: [],
        },
        away: {
          name: newMatch.opponentName,
          formation: "TBD",
          players: [],
          substitutes: [],
        },
      },
    };
    onAddMatch(matchData);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60] p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-lg'>
        <div className='p-4 border-b flex justify-between items-center'>
          <h3 className='text-xl font-semibold'>Add Match</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-800 text-2xl font-bold'
          >
            &times;
          </button>
        </div>
        <div className='p-6 space-y-4'>
          <div>
            <label className='text-sm font-medium'>Tournament</label>
            <input
              type='text'
              value={newMatch.tournamentName}
              readOnly
              className='w-full border rounded px-3 py-2 bg-gray-100'
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Category</label>
            <select
              name='category'
              value={newMatch.category}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value=''>Select Category</option>
              <option>U13</option>
              <option>U15</option>
              <option>U17</option>
              <option>U19</option>
            </select>
          </div>
          <div>
            <label className='text-sm font-medium'>Opponent Team Name</label>
            <input
              name='opponentName'
              value={newMatch.opponentName}
              onChange={handleChange}
              type='text'
              placeholder='Enter opponent team name'
              className='w-full border rounded px-3 py-2'
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Match Type</label>
            <select
              name='matchType'
              value={newMatch.matchType}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value=''>Select Match Type</option>
              <option>Home</option>
              <option>Away</option>
            </select>
          </div>
          <div>
            <label className='text-sm font-medium'>Stadium Name</label>
            <input
              name='stadiumName'
              value={newMatch.stadiumName}
              onChange={handleChange}
              type='text'
              placeholder='Enter stadium name'
              className='w-full border rounded px-3 py-2'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium'>State</label>
              <input
                name='state'
                value={newMatch.state}
                onChange={handleChange}
                type='text'
                placeholder='Enter state'
                className='w-full border rounded px-3 py-2'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>City</label>
              <input
                name='city'
                value={newMatch.city}
                onChange={handleChange}
                type='text'
                placeholder='Enter city'
                className='w-full border rounded px-3 py-2'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium'>Date</label>
              <input
                name='date'
                value={newMatch.date}
                onChange={handleChange}
                type='date'
                className='w-full border rounded px-3 py-2'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Time</label>
              <input
                name='time'
                value={newMatch.time}
                onChange={handleChange}
                type='time'
                className='w-full border rounded px-3 py-2'
              />
            </div>
          </div>
        </div>
        <div className='p-4 bg-gray-50 rounded-b-lg flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'
          >
            Add Match
          </button>
        </div>
      </div>
    </div>
  );
};

const MatchScheduleModal = ({
  tournament,
  allMatches,
  onMatchesUpdate,
  onClose,
}) => {
  const [showAddMatchModal, setShowAddMatchModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [matchForDetails, setMatchForDetails] = useState(null);

  const [filters, setFilters] = useState({
    category: "All",
    status: "All",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddMatch = (newMatch) => {
    const updatedMatches = [...allMatches, newMatch];
    onMatchesUpdate(updatedMatches);
  };

  const handleDeleteMatch = (matchId) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      const updatedMatches = allMatches.filter((m) => m.id !== matchId);
      onMatchesUpdate(updatedMatches);
    }
  };

  const tournamentMatches = useMemo(() => {
    return allMatches
      .filter((match) => match.tournamentName === tournament.name)
      .filter(
        (match) =>
          filters.category === "All" || match.category === filters.category
      )
      .filter(
        (match) => filters.status === "All" || match.status === filters.status
      )
      .filter(
        (match) =>
          !filters.startDate ||
          new Date(match.dateTime) >= new Date(filters.startDate)
      )
      .filter(
        (match) =>
          !filters.endDate ||
          new Date(match.dateTime) <= new Date(filters.endDate)
      );
  }, [allMatches, tournament.name, filters]);

  const getStatusClass = (status) => {
    return status === "Scheduled"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";
  };

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4'>
        <div className='bg-gray-50 rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col'>
          <div className='p-4 border-b flex justify-between items-center bg-white rounded-t-lg'>
            <h3 className='text-xl font-semibold text-gray-800'>
              Match Schedule:{" "}
              <span className='text-purple-600'>{tournament.name}</span>
            </h3>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => setShowAddMatchModal(true)}
                className='bg-purple-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-purple-700 transition'
              >
                + Add Match
              </button>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-800 text-2xl font-bold'
              >
                &times;
              </button>
            </div>
          </div>
          <div className='p-6 flex-grow overflow-auto'>
            <div className='bg-white p-4 rounded-lg shadow mb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end'>
                <div className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-600 mb-1'>
                    Category
                  </label>
                  <select
                    name='category'
                    onChange={handleFilterChange}
                    className='border border-gray-300 rounded-md p-2 text-sm'
                  >
                    <option>All</option>
                    <option>U13</option>
                    <option>U15</option>
                    <option>U17</option>
                    <option>U19</option>
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-600 mb-1'>
                    Match Status
                  </label>
                  <select
                    name='status'
                    onChange={handleFilterChange}
                    className='border border-gray-300 rounded-md p-2 text-sm'
                  >
                    <option>All</option>
                    <option>Scheduled</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className='flex flex-col col-span-2'>
                  <label className='text-xs font-semibold text-gray-600 mb-1'>
                    Date Range
                  </label>
                  <div className='flex items-center gap-2'>
                    <input
                      type='date'
                      name='startDate'
                      onChange={handleFilterChange}
                      className='border border-gray-300 rounded-md p-2 text-sm w-full'
                    />
                    <span className='text-gray-500'>to</span>
                    <input
                      type='date'
                      name='endDate'
                      onChange={handleFilterChange}
                      className='border border-gray-300 rounded-md p-2 text-sm w-full'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
              <table className='min-w-full text-sm text-left text-gray-700'>
                <thead className='bg-gray-100 text-xs font-semibold uppercase'>
                  <tr>
                    <th className='px-6 py-3'>Match Name</th>
                    <th className='px-6 py-3'>Category</th>
                    <th className='px-6 py-3'>Match Type</th>
                    <th className='px-6 py-3'>Date & Time</th>
                    <th className='px-6 py-3'>Status</th>
                    <th className='px-6 py-3'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {tournamentMatches.map((match) => (
                    <tr
                      key={match.id}
                      onClick={() => {
                        setMatchForDetails(match);
                        setShowDetailsModal(true);
                      }}
                      className='hover:bg-gray-100 cursor-pointer'
                    >
                      <td className='px-6 py-4 font-medium'>
                        {match.matchName}
                      </td>
                      <td className='px-6 py-4'>{match.category}</td>
                      <td className='px-6 py-4'>{match.matchType}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {formatDateTime(match.dateTime)}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusClass(
                            match.status
                          )}`}
                        >
                          {match.status}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div
                          className='flex items-center gap-3'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            title='Edit'
                            onClick={() =>
                              alert("Edit functionality to be implemented.")
                            }
                          >
                            <EditIcon />
                          </button>
                          <button
                            title='Delete'
                            onClick={() => handleDeleteMatch(match.id)}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {tournamentMatches.length === 0 && (
                    <tr>
                      <td
                        colSpan='6'
                        className='text-center py-10 text-gray-500'
                      >
                        No matches found for the selected criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showAddMatchModal && (
        <AddMatchModal
          tournament={tournament}
          onAddMatch={handleAddMatch}
          onClose={() => setShowAddMatchModal(false)}
        />
      )}
      {showDetailsModal && (
        <MatchDetailsModal
          match={matchForDetails}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function TournamentManagement() {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [matches, setMatches] = useState(mockMatches);

  const [showMatchModal, setShowMatchModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  // State for modals
  const [isAddTournamentModalOpen, setIsAddTournamentModalOpen] =
    useState(false);
  const [isEditTournamentModalOpen, setIsEditTournamentModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tournamentToEdit, setTournamentToEdit] = useState(null);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);

  const handleViewMatchesClick = (tournament) => {
    setSelectedTournament(tournament);
    setShowMatchModal(true);
  };

  // --- CRUD Operations ---
  const handleAddTournament = (tournamentData) => {
    const newTournament = {
      id: Date.now(),
      ...tournamentData,
      status: "Active",
    };
    setTournaments((prev) => [...prev, newTournament]);
  };

  const handleUpdateTournament = (updatedTournament) => {
    setTournaments((prev) =>
      prev.map((t) => (t.id === updatedTournament.id ? updatedTournament : t))
    );
  };

  const handleDeleteTournament = () => {
    setTournaments((prev) =>
      prev.filter((t) => t.id !== tournamentToDelete.id)
    );
    setIsDeleteModalOpen(false);
    setTournamentToDelete(null);
  };

  // --- Modal Triggers ---
  const openEditModal = (tournament) => {
    setTournamentToEdit(tournament);
    setIsEditTournamentModalOpen(true);
  };

  const openDeleteModal = (tournament) => {
    setTournamentToDelete(tournament);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header title='Tournament Management' />
        <div className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>Tournament Management</h2>
            <button
              className='bg-purple-600 text-white px-4 py-2 rounded'
              onClick={() => setIsAddTournamentModalOpen(true)}
            >
              + Add Tournament
            </button>
          </div>
          <div className='bg-white shadow rounded-lg overflow-x-auto'>
            <table className='min-w-full text-sm text-gray-700'>
              <thead className='bg-gray-100 text-left text-xs font-semibold uppercase'>
                <tr>
                  <th className='px-6 py-3'>Tournament Name</th>
                  <th className='px-6 py-3'>Category</th>
                  <th className='px-6 py-3'>Start Date</th>
                  <th className='px-6 py-3'>End Date</th>
                  <th className='px-6 py-3'>Matches</th>
                  <th className='px-6 py-3'>Status</th>
                  <th className='px-6 py-3 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((t) => (
                  <tr key={t.id} className='border-t'>
                    <td className='px-6 py-4 font-medium'>{t.name}</td>
                    <td className='px-6 py-4'>{t.category}</td>
                    <td className='px-6 py-4'>
                      {new Date(t.startDate).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4'>
                      {new Date(t.endDate).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-center'>{t.matches}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          t.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-4'>
                        <button
                          onClick={() => handleViewMatchesClick(t)}
                          className='text-purple-600 border border-purple-500 px-3 py-1 rounded text-xs hover:bg-purple-50 transition-colors'
                        >
                          View Matches
                        </button>
                        <button
                          title='Edit Tournament'
                          onClick={() => openEditModal(t)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          title='Delete Tournament'
                          onClick={() => openDeleteModal(t)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Render Modals --- */}
        {showMatchModal && (
          <MatchScheduleModal
            tournament={selectedTournament}
            allMatches={matches}
            onMatchesUpdate={setMatches}
            onClose={() => setShowMatchModal(false)}
          />
        )}

        <AddTournamentModal
          isOpen={isAddTournamentModalOpen}
          onClose={() => setIsAddTournamentModalOpen(false)}
          onAdd={handleAddTournament}
        />

        {isEditTournamentModalOpen && (
          <EditTournamentModal
            tournament={tournamentToEdit}
            isOpen={isEditTournamentModalOpen}
            onClose={() => setIsEditTournamentModalOpen(false)}
            onUpdate={handleUpdateTournament}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteTournament}
            name={tournamentToDelete?.name}
          />
        )}
      </div>
    </div>
  );
}
