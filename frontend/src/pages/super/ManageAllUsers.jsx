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
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/users", {});
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
    <div className="container mx-auto mt-8">
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-3xl font-semibold">Manage All Users</h2>
        <Link
          to="/dashboard/manage-users/add-user"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          Add New User
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin border-4 border-t-4 border-blue-600 rounded-full w-12 h-12"></div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-red-500">{error}</div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-info text-yellow-500">No users found.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto border-separate border-spacing-0.5">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 text-center">#</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Username</th>
                <th className="p-2 text-center">Email</th>
                <th className="p-2 text-center">Role</th>
                <th className="p-2 text-center">Allergies</th>
                <th className="p-2 text-center">Created At</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{user.name}</td>
                  <td className="p-2 text-center">{user.username}</td>
                  <td className="p-2 text-center">{user.email}</td>
                  <td className="p-2 text-center text-capitalize">{user.role}</td>
                  <td className="p-2 text-center">Allergies</td>
                  <td className="p-2 text-center">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/dashboard/manage-dishes/${user.username}`}
                        className="bg-teal-500 text-white py-1 px-4 rounded-md hover:bg-teal-600"
                      >
                        Dishes
                      </Link>
                      <Link
                        to={`/dashboard/manage-users/${user.username}/update`}
                        className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.username)}
                        className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
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
