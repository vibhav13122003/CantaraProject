import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialCategories = [
  {
    id: 1,
    name: "Coach",
    count: 124,
    date: "April 15, 2025",
    status: "Active",
  },
  
  {
    id: 2,
    name: "Therapist",
    count: 87,
    date: "March 28, 2025",
    status: "Active",
  },
  {
    id: 3,
    name: "Nutritionist",
    count: 56,
    date: "February 12, 2025",
    status: "Active",
  },
  {
    id: 4,
    name: "Psychologist",
    count: 92,
    date: "January 05, 2025",
    status: "Active",
  },
  {
    id: 5,
    name: "Physical Trainer",
    count: 103,
    date: "March 17, 2025",
    status: "Active",
  },
  {
    id: 6,
    name: "Sports Medicine",
    count: 41,
    date: "April 02, 2025",
    status: "Pending",
  },
];

// --- MODAL FOR ADDING/EDITING A CATEGORY ---
const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const isEditing = category && category.id;

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setName(category.name);
        setStatus(category.status);
      } else {
        setName("");
        setStatus("Active");
      }
    }
  }, [isOpen, category, isEditing]);

  const handleSave = () => {
    if (!name.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
    onSave({ ...category, name, status });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          {isEditing ? "Edit Category" : "Add New Category"}
        </h3>
        <div className='space-y-4'>
          <input
            type='text'
            className='w-full border px-4 py-2 rounded-md'
            placeholder='Enter category name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className='w-full border px-4 py-2 rounded-md bg-white'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='Active'>Active</option>
            <option value='Pending'>Pending</option>
          </select>
        </div>
        <div className='flex justify-end gap-3 mt-6'>
          <button onClick={onClose} className='px-4 py-2 rounded-md border'>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 rounded-md bg-purple-700 text-white'
          >
            {isEditing ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MODAL FOR DELETING A CATEGORY ---
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
        <h3 className='text-lg font-semibold mb-2'>Confirm Deletion</h3>
        <p className='mb-4'>
          Are you sure you want to delete the category "
          <span className='font-bold'>{categoryName}</span>"?
        </p>
        <div className='flex justify-end gap-3'>
          <button onClick={onClose} className='px-4 py-2 rounded-md border'>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 rounded-md bg-red-600 text-white'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfessionalCategoriesManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [categories, setCategories] = useState(initialCategories);

  // State for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- HANDLER FUNCTIONS ---
  const handleOpenAddModal = () => {
    setEditingCategory(null); // Ensure we are in "add" mode
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCategory = (categoryData) => {
    if (categoryData.id) {
      // --- Edit Logic ---
      setCategories(
        categories.map((cat) =>
          cat.id === categoryData.id ? categoryData : cat
        )
      );
    } else {
      // --- Add Logic ---
      const newCategory = {
        ...categoryData,
        id: Date.now(), // Generate a unique ID
        count: 0, // New categories start with 0 professionals
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
      };
      setCategories([newCategory, ...categories]);
    }
  };

  const handleDeleteCategory = () => {
    setCategories(categories.filter((cat) => cat.id !== deletingCategoryId));
    setIsDeleteModalOpen(false);
    setDeletingCategoryId(null);
    // Optional: Adjust page if the last item on it was deleted
    if (paginatedCategories.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className='flex-1 flex flex-col overflow-hidden ml-16 sm:ml-16 md:ml-16 lg:ml-0'>
        <Header
          title='Professional Categories Management'
          route='Home / Professional Categories Management'
        />
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>
                Professional Categories List
              </h3>
              <button
                onClick={handleOpenAddModal}
                className='bg-purple-700 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-800'
              >
                + Add Category
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left'>
                <thead className='text-gray-700 bg-gray-100'>
                  <tr className='border-b'>
                    <th className='px-4 py-2'>Category Name</th>
                    <th className='px-4 py-2'>Professionals</th>
                    <th className='px-4 py-2'>Created Date</th>
                    <th className='px-4 py-2'>Status</th>
                    <th className='px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.map((cat) => (
                    <tr key={cat.id} className='border-b'>
                      <td className='px-4 py-2 font-semibold'>{cat.name}</td>
                      <td className='px-4 py-2'>{cat.count}</td>
                      <td className='px-4 py-2'>{cat.date}</td>
                      <td className='px-4 py-2'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            cat.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {cat.status}
                        </span>
                      </td>
                      <td className='px-4 py-2 flex gap-4 text-gray-500 text-base'>
                        <FaEdit
                          className='cursor-pointer hover:text-purple-700'
                          onClick={() => handleOpenEditModal(cat)}
                        />
                        <FaTrash
                          className='cursor-pointer hover:text-red-600'
                          onClick={() => handleOpenDeleteModal(cat.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, categories.length)} of{" "}
                {categories.length} entries
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 rounded-md border ${
                      currentPage === i + 1
                        ? "bg-purple-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
        categoryName={
          deletingCategoryId
            ? categories.find((c) => c.id === deletingCategoryId)?.name
            : ""
        }
      />
    </div>
  );
};

export default ProfessionalCategoriesManagement;
