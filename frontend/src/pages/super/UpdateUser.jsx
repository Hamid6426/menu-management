import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // If using React Router
import axiosInstance from "../../utils/axiosInstance";

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
    <div className="container mx-auto mt-8">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h4 className="text-2xl font-semibold text-center mb-4">Update User</h4>
        {message && <div className="alert alert-info bg-blue-500 text-white p-3 mb-4 rounded">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Password (Hashed)</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Allergies */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Allergies</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy", "eggs", "fish",
                "wheat", "sesame", "mustard", "celery", "lupin", "molluscs", "sulphites", "corn",
                "latex", "kiwi", "banana", "avocado", "crustaceans", "peach", "plum", "apples",
                "cherries", "almonds", "cashews", "pine nuts", "coconut", "poppy seeds",
                "sesame seeds", "papaya", "mango",
              ].map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <input
                    className="form-checkbox text-blue-600"
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
                  <label className="text-sm">{allergy}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
