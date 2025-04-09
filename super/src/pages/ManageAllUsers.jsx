import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
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

  return (
    <div className="container-fluid mt-5">
      <div className="d-flex gap-4 align-items-center">
        <h2>Manage All Users</h2>
        <Link to="/dashboard/manage-users/add-user" className="btn btn-primary">
          Add New User
        </Link>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="table-responsive mt-3">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th className="">#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Allergies</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td className="text-capitalize">{user.role}</td>
                  <td>Allergies</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2 flex-nowrap">
                      <Link
                        to={`/dashboard/manage-dishes/${user.username}`}
                        className="btn btn-sm btn-info text-white"
                      >
                        Dishes
                      </Link>
                      <Link
                        to={`/dashboard/manage-users/${user.username}/update`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(user.username)} className="btn btn-sm btn-danger">
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
