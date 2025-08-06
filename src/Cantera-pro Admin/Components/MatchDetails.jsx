import React from "react";
import { LiaSaveSolid } from "react-icons/lia";
import { PiFootprints } from "react-icons/pi";
import { MdOutlineDirectionsRun } from "react-icons/md";
import { MdFlightTakeoff } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";

const playersStarting = [
  {
    id: 1,
    first: "Alejandro",
    last: "Mendoza",
    shots: 0,
    goals: 0,
    assists: 0,
    directKicks: 0,
    cornerKicks: 0,
    penaltyKicks: 0,
    fouls: 0,
    offsides: 0,
    yellowCards: 0,
    redCards: 0,
    defensive: 5,
  },
  {
    id: 2,
    first: "Carlos",
    last: "Jimenez",
    shots: 0,
    goals: 1,
    assists: 2,
    directKicks: 0,
    cornerKicks: 0,
    penaltyKicks: 0,
    fouls: 0,
    offsides: 0,
    yellowCards: 0,
    redCards: 0,
    defensive: 3,
  },
  {
    id: 3,
    first: "Miguel",
    last: "Palacios",
    shots: 0,
    goals: 0,
    assists: 0,
    directKicks: 0,
    cornerKicks: 0,
    penaltyKicks: 0,
    fouls: 0,
    offsides: 0,
    yellowCards: 0,
    redCards: 0,
    defensive: 4,
  },
  // Add the rest similarly...
];

const playersSubs = [
  {
    id: 12,
    first: "Martin",
    last: "Rojas",
    shots: 0,
    goals: 0,
    assists: 0,
    directKicks: 0,
    cornerKicks: 0,
    penaltyKicks: 0,
    fouls: 0,
    offsides: 0,
    yellowCards: 0,
    redCards: 0,
    defensive: 0,
  },
  {
    id: 13,
    first: "Santiago",
    last: "Pérez",
    shots: 1,
    goals: 0,
    assists: 0,
    directKicks: 0,
    cornerKicks: 0,
    penaltyKicks: 0,
    fouls: 1,
    offsides: 0,
    yellowCards: 0,
    redCards: 0,
    defensive: 0,
  },
  // Add others...
];

const goalkeeperStats = {
  starting: {
    name: "Alejandro Mendoza",
    saves: 6,
    clearances: 3,
    sweep: 4,
    foot: 0,
    ownGoals: 0,
  },
  sub: {
    name: "Martín Rojas",
    saves: 0,
    clearances: 0,
    sweep: 0,
    foot: 0,
    ownGoals: 0,
  },
};

const MatchDetail = () => {
  return (
    <div className='p-6 font-sans bg-gray-50 min-h-screen'>
      {/* Match Header */}
      <div className='bg-white p-4 rounded-lg shadow-sm mb-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <div className='flex-col sm:grid-cols-2 text-sm text-gray-700 gap-y-1'>
            <strong>Tournament Information:</strong>
            <div>
              <p>Copa Libertadores U15</p>
            </div>
            <div>April 25, 2025 - 15:30</div>
            <div>U15</div>
            <div>Estadio Metropolitano, Barranquilla</div>
          </div>
          <div className='mt-4 flex justify-between items-center text-lg font-semibold'>
            <span>
              Deflines FC - 15{" "}
              <span className='text-sm font-normal text-gray-500'>(4-4-2)</span>
            </span>
            <span className='text-purple-700 text-2xl font-bold'>2 - 1</span>
            <span>
              Valledupar FC - 15{" "}
              <span className='text-sm font-normal text-gray-500'>(4-3-3)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Starting 11 */}
      <div className='bg-white shadow-md'>
        <div className='overflow-x-auto bg-white rounded-lg shadow-sm'>
          <h3
            className='text-lg 
          font-semibold mb-2 ml-6 text-primary_400 '
          >
            Deflines FC - 15{" "}
            <span className='ml-2 text-xs bg-purple-100 text-primary px-2 py-1 rounded-full'>
              CanteraPro Team
            </span>
          </h3>
          <h3 className='mt-6 mb-2 text-lg font-semibold'>Starting 11</h3>
          <table className='min-w-full text-xs text-gray-700 divide-y'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-3 py-2'>#</th>
                <th className='px-3 py-2'>First Name</th>
                <th className='px-3 py-2'>Last Name</th>
                <th className='px-3 py-2'>Shots</th>
                <th className='px-3 py-2'>Goals</th>
                <th className='px-3 py-2'>Assists</th>
                <th className='px-3 py-2'>Direct Kicks</th>
                <th className='px-3 py-2'>Corner Kicks</th>
                <th className='px-3 py-2'>Penalty Kicks</th>
                <th className='px-3 py-2'>Fouls</th>
                <th className='px-3 py-2'>Offsides</th>
                <th className='px-3 py-2'>Yellow Cards</th>
                <th className='px-3 py-2'>Red Cards</th>
                <th className='px-3 py-2'>Defensive Actions</th>
              </tr>
            </thead>
            <tbody>
              {playersStarting.map((p) => (
                <tr key={p.id} className='text-center border-t'>
                  <td className='px-3 py-1'>{p.id}</td>
                  <td className='px-3 py-1'>{p.first}</td>
                  <td className='px-3 py-1'>{p.last}</td>
                  <td>{p.shots}</td>
                  <td>{p.goals}</td>
                  <td>{p.assists}</td>
                  <td>{p.directKicks}</td>
                  <td>{p.cornerKicks}</td>
                  <td>{p.penaltyKicks}</td>
                  <td>{p.fouls}</td>
                  <td>{p.offsides}</td>
                  <td>{p.yellowCards}</td>
                  <td>{p.redCards}</td>
                  <td>{p.defensive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Substitutes */}

        <div className='overflow-x-auto bg-white rounded-lg shadow-sm'>
          <h3 className='mt-6 mb-2 text-lg font-semibold'>Substitutes</h3>
          <table className='min-w-full text-xs text-gray-700 divide-y'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-3 py-2'>#</th>
                <th className='px-3 py-2'>First Name</th>
                <th className='px-3 py-2'>Last Name</th>
                <th className='px-3 py-2'>Shots</th>
                <th className='px-3 py-2'>Goals</th>
                <th className='px-3 py-2'>Assists</th>
                <th className='px-3 py-2'>Direct Kicks</th>
                <th className='px-3 py-2'>Corner Kicks</th>
                <th className='px-3 py-2'>Penalty Kicks</th>
                <th className='px-3 py-2'>Fouls</th>
                <th className='px-3 py-2'>Offsides</th>
                <th className='px-3 py-2'>Yellow Cards</th>
                <th className='px-3 py-2'>Red Cards</th>
                <th className='px-3 py-2'>Defensive Actions</th>
              </tr>
            </thead>
            <tbody>
              {playersSubs.map((p) => (
                <tr key={p.id} className='text-center border-t'>
                  <td className='px-3 py-1'>{p.id}</td>
                  <td>{p.first}</td>
                  <td>{p.last}</td>
                  <td>{p.shots}</td>
                  <td>{p.goals}</td>
                  <td>{p.assists}</td>
                  <td>{p.directKicks}</td>
                  <td>{p.cornerKicks}</td>
                  <td>{p.penaltyKicks}</td>
                  <td>{p.fouls}</td>
                  <td>{p.offsides}</td>
                  <td>{p.yellowCards}</td>
                  <td>{p.redCards}</td>
                  <td>{p.defensive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Goalkeeper Metrics */}
        {/* Goalkeeper Metrics */}
        {/* Goalkeeper Metrics */}
        <h3 className='mt-6 mb-2 text-lg font-semibold'>Goalkeeper Metrics</h3>
        <div className='grid md:grid-cols-2 gap-6 text-sm text-black'>
          {/* GK Card */}
          {[goalkeeperStats.starting, goalkeeperStats.sub].map((gk, index) => (
            <div key={index} className='bg-gray-100 rounded-lg shadow-sm p-4'>
              <h4 className='font-semibold mb-4'>
                {index === 0
                  ? `Starting Goalkeeper (${gk.name})`
                  : `Substitute Goalkeeper (${gk.name})`}
              </h4>

              <div className='grid grid-cols-2 gap-y-4 gap-x-6 text-sm'>
                <div className='flex items-center gap-2'>
                  <LiaSaveSolid className='text-primary_400 text-lg' />
                  <span>
                    Saves <strong>{gk.saves}</strong>
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <MdFlightTakeoff className='text-primary_400 text-lg' />
                  <span>
                    Aerial Clearances <strong>{gk.clearances}</strong>
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <PiFootprints className='  text-lg' />
                  <span>
                    Clearances with Foot <strong>{gk.foot}</strong>
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <BsExclamationCircle className='text-primary_400 text-lg' />
                  <span>
                    Own Goals <strong>{gk.ownGoals}</strong>
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <MdOutlineDirectionsRun className='text-primary_400 text-lg' />
                  <span>
                    Sweeper Interventions <strong>{gk.sweep}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
