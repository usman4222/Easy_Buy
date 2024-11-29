import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, updateUser } from "../../actions/UserAction";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";

const AllUsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState(""); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, users, error, totalUsersCount } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(getAllUsers(currentPage, rowsPerPage)); 
  }, [dispatch, currentPage]);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId); 
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(userIdToDelete))
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); 
  };

  const handleEdit = (userId, currentRole) => {
    setSelectedUserId(userId);
    setNewRole(currentRole);
    setIsModalOpen(true); 
  };

  const handleRoleUpdate = () => {
    const userData = { role: newRole };
    dispatch(updateUser(selectedUserId, userData));
    setIsModalOpen(false); 
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalUsersCount / rowsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="h-[100vh] overflow-x-auto">
      <table className="w-full table-auto bg-[#F8FAFC] rounded-[12px]">
        <thead>
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-4 w-20">
                  <img
                    src={user.profileImage}
                    alt="user profile"
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(user._id, user.role)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of{" "}
          {totalUsersCount ? Math.ceil(totalUsersCount / rowsPerPage) : 1}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(totalUsersCount / rowsPerPage)}
        >
          Next
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={confirmDelete} 
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex z-20 justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update User Role</h2>
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter new role"
            />
            <div className="flex justify-between">
              <button
                onClick={handleRoleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update Role
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersTable;
