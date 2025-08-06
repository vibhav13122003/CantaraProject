import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import { FaTrash, FaEnvelope } from "react-icons/fa";

const ClubAdminManagement = () => {
  const [admins, setAdmins] = useState([
    {
      name: "James Rodriguez",
      email: "james.rodriguez@cantera.com",
      status: "Active",
      date: "Jan 15, 2025",
    },
    {
      name: "Emma Thompson",
      email: "emma.thompson@cantera.com",
      status: "Active",
      date: "Feb 3, 2025",
    },
    {
      name: "Michael Chen",
      email: "michael.chen@cantera.com",
      status: "Pending",
      date: "Apr 10, 2025",
    },
    {
      name: "Sofia Garcia",
      email: "sofia.garcia@cantera.com",
      status: "Active",
      date: "Mar 22, 2025",
    },
    {
      name: "David Wilson",
      email: "david.wilson@cantera.com",
      status: "Active",
      date: "Feb 18, 2025",
    },
    {
      name: "Olivia Martinez",
      email: "olivia.martinez@cantera.com",
      status: "Pending",
      date: "Apr 20, 2025",
    },
    {
      name: "Alexander Kim",
      email: "alexander.kim@cantera.com",
      status: "Active",
      date: "Jan 30, 2025",
    },
    {
      name: "Isabella Johnson",
      email: "isabella.johnson@cantera.com",
      status: "Active",
      date: "Mar 5, 2025",
    },
  ]);

  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [adminToRemove, setAdminToRemove] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleRemoveClick = (admin) => {
    setAdminToRemove(admin);
    setConfirmModalOpen(true);
  };

  const confirmRemove = () => {
    setAdmins(admins.filter((a) => a.email !== adminToRemove.email));
    setConfirmModalOpen(false);
    setAdminToRemove(null);
  };

  const handleInvite = () => {
    if (form.name && form.email) {
      setAdmins([
        ...admins,
        {
          name: form.name,
          email: form.email,
          status: "Pending",
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
      ]);
      setInviteModalOpen(false);
      setForm({ name: "", email: "" });
    }
  };

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header
          title='Club Admins Management'
          route='Home / Club Admins Management'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Club Admins Management</h3>
              <button
                onClick={() => setInviteModalOpen(true)}
                className='bg-purple-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2'
              >
                <FaEnvelope /> Invite Club Admin
              </button>
            </div>

            <div className='text-sm text-gray-600 mb-3'>
              📢 You currently have <strong>{admins.length}</strong> active
              admins out of <strong>10</strong> allowed in your license.
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left'>
                <thead className='bg-gray-100 text-gray-700'>
                  <tr className='border-b'>
                    <th className='px-4 py-2'>Full Name</th>
                    <th className='px-4 py-2'>Email Address</th>
                    <th className='px-4 py-2'>Status</th>
                    <th className='px-4 py-2'>Date Invited</th>
                    <th className='px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={index} className='border-b'>
                      <td className='px-4 py-2'>{admin.name}</td>
                      <td className='px-4 py-2'>{admin.email}</td>
                      <td className='px-4 py-2'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            admin.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {admin.status === "Active"
                            ? "Active"
                            : "Pending Activation"}
                        </span>
                      </td>
                      <td className='px-4 py-2'>{admin.date}</td>
                      <td className='px-4 py-2 space-x-3 text-red-600'>
                        {admin.status === "Pending" && (
                          <button className='text-sm text-purple-600'>
                            Resend Invite
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveClick(admin)}
                          className='text-sm'
                        >
                          <FaTrash className='inline mr-1' /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='text-sm text-gray-600 mt-4'>
              Showing 1 to {admins.length} of {admins.length} results
            </div>
          </div>
        </main>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-xl w-96 shadow-md'>
            <h3 className='text-lg font-semibold mb-4'>
              Invite New Club Admin
            </h3>
            <input
              type='text'
              placeholder='Full Name'
              className='w-full border px-4 py-2 rounded-md mb-3 text-sm'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type='email'
              placeholder='Email Address'
              className='w-full border px-4 py-2 rounded-md mb-4 text-sm'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setInviteModalOpen(false)}
                className='px-4 py-2 rounded-md border text-sm'
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className='px-4 py-2 rounded-md bg-purple-700 text-white text-sm'
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Removal Modal */}
      {isConfirmModalOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-xl w-[90%] max-w-md text-center'>
            <h3 className='text-lg font-semibold mb-4'>Confirm Removal</h3>
            <p className='text-sm mb-6'>
              Are you sure you want to remove{" "}
              <strong>{adminToRemove?.name}</strong> from Club Admins?
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => setConfirmModalOpen(false)}
                className='px-4 py-2 rounded-md border text-sm'
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className='px-4 py-2 bg-red-600 text-white rounded-md text-sm'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubAdminManagement;
