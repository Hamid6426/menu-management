import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const ManageAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (username) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/users/${username}`);
      setUsers((prev) => prev.filter((u) => u.username !== username));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete user.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage All Users</h2>
        <Link
          to="/dashboard/manage-users/add-user"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium"
        >
          Add New User
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded shadow mb-4">
          {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="bg-yellow-100 text-yellow-700 px-4 py-3 rounded shadow mb-4">
          No users found.
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full text-sm text-gray-700 table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                {["#", "Name", "Username", "Email", "Role", "Allergies", "Created At", "Actions"].map((label, idx) => (
                  <th key={idx} className="px-4 py-2 text-center font-semibold whitespace-nowrap">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t even:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{user.name}</td>
                  <td className="px-4 py-2 text-center">{user.username}</td>
                  <td className="px-4 py-2 text-center">{user.email}</td>
                  <td className="px-4 py-2 text-center capitalize">{user.role}</td>
                  <td className="px-4 py-2 text-center">Allergies</td>
                  <td className="px-4 py-2 text-center">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        to={`/dashboard/manage-dishes/${user.username}`}
                        className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Dishes
                      </Link>
                      <Link
                        to={`/dashboard/manage-users/${user.username}/update`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.username)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAllUsers;
