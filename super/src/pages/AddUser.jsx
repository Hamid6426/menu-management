import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

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
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Add New User</h4>

          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control     border-secondary"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control     border-secondary"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control     border-secondary"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control     border-secondary"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Role</label>
              <select name="role" className="form-select     border-secondary" onChange={handleChange}>
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label   ">Allergies</label>
              <div className="row">
                {[
                  "gluten",
                  "dairy",
                  "nuts",
                  "peanuts",
                  "tree nuts",
                  "shellfish",
                  "soy",
                  "eggs",
                  "fish",
                  "wheat",
                  "sesame",
                  "mustard",
                  "celery",
                  "lupin",
                  "molluscs",
                  "sulphites",
                  "corn",
                  "latex",
                  "kiwi",
                  "banana",
                  "avocado",
                  "crustaceans",
                  "peach",
                  "plum",
                  "apples",
                  "cherries",
                  "almonds",
                  "cashews",
                  "pine nuts",
                  "coconut",
                  "poppy seeds",
                  "sesame seeds",
                  "papaya",
                  "mango",
                ].map((allergy) => (
                  <div className="col-6 col-md-4" key={allergy}>
                    <div className="form-check   ">
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
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
