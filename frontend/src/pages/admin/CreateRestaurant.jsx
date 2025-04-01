import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const CreateRestaurant = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const username = decoded?.username;

  // Initial state for form fields.
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    brandColors: "",
    languages: "", // comma-separated values
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle changes for each input field.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // On form submission, send a POST request to create a new restaurant.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Convert languages from comma-separated string into array
    const languagesArray = formData.languages
      .split(",")
      .map((lang) => lang.trim())
      .filter(Boolean);

    try {
      const payload = {
        ...formData,
        languages: languagesArray,
      };

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const username = decoded?.username;
      // POST to /restaurants/:username/create-restaurant
      const response = await axiosInstance.post(
        `/restaurants/${username}/create-restaurant`,
        payload
      );
      setSuccess(response.data.message || "Restaurant created successfully");
      setFormData({
        name: "",
        location: "",
        brandColors: "",
        languages: "",
      });
      // Optionally, redirect to a different page after creation
      navigate(`/${username}/manage-restaurants`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error creating restaurant. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2>Create New Restaurant</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Restaurant Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand Colors</label>
          <input
            type="text"
            name="brandColors"
            className="form-control"
            value={formData.brandColors}
            onChange={handleChange}
            placeholder="Enter brand colors (e.g., #000, #fff)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Languages</label>
          <input
            type="text"
            name="languages"
            className="form-control"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Enter languages separated by commas"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
