import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    restaurants: [],
    allergies: [],
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/users/add-user", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding user");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-center mb-6">Add New User</h4>

      {message && (
        <div className="mb-4 px-4 py-2 rounded text-white bg-blue-500 text-sm text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Role</label>
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-md border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.role}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Allergies</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto border p-2 rounded-md border-gray-300">
            {[
              "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy", "eggs", "fish",
              "wheat", "sesame", "mustard", "celery", "lupin", "molluscs", "sulphites", "corn", "latex",
              "kiwi", "banana", "avocado", "crustaceans", "peach", "plum", "apples", "cherries", "almonds",
              "cashews", "pine nuts", "coconut", "poppy seeds", "sesame seeds", "papaya", "mango",
            ].map((allergy) => (
              <label key={allergy} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  value={allergy}
                  checked={form.allergies.includes(allergy)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...form.allergies, allergy]
                      : form.allergies.filter((item) => item !== allergy);
                    setForm((prev) => ({ ...prev, allergies: updated }));
                  }}
                />
                {allergy}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
