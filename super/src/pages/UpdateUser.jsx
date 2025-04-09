import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // If using React Router
import axiosInstance from "../utils/axiosInstance";

const UpdateUser = () => {
  const { username } = useParams(); // Or accept as prop
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "", // Optional in update
    role: "user",
    restaurants: [],
    allergies: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res.data.user); // Ensure backend returns same structure
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load user data");
      }
    };
    fetchUser();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { password, ...payload } = form;
      // Send password only if it's updated
      if (password) payload.password = password;

      const res = await axiosInstance.put(`/users/update-user/${username}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating user");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card bg-dark text-white shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Update User</h4>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            {/* Same form fields as before with value binding */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control bg-dark text-white border-secondary"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control bg-dark text-white border-secondary"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control bg-dark text-white border-secondary"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password (Hashed)</label>
              <input
                type="password"
                name="password"
                className="form-control bg-dark text-white border-secondary"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select bg-dark text-white border-secondary"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label text-white">Allergies</label>
              <div className="row">
                {[
                  "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy", "eggs", "fish",
                  "wheat", "sesame", "mustard", "celery", "lupin", "molluscs", "sulphites", "corn",
                  "latex", "kiwi", "banana", "avocado", "crustaceans", "peach", "plum", "apples",
                  "cherries", "almonds", "cashews", "pine nuts", "coconut", "poppy seeds",
                  "sesame seeds", "papaya", "mango",
                ].map((allergy) => (
                  <div className="col-6 col-md-4" key={allergy}>
                    <div className="form-check text-white">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`allergy-${allergy}`}
                        value={allergy}
                        checked={form.allergies.includes(allergy)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...form.allergies, allergy]
                            : form.allergies.filter((item) => item !== allergy);
                          setForm((prev) => ({ ...prev, allergies: updated }));
                        }}
                      />
                      <label className="form-check-label" htmlFor={`allergy-${allergy}`}>
                        {allergy}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
