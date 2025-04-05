import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const UpdateRestaurant = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    logo: "",
    brandColors: "",
    languages: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/restaurants/${restaurantId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch restaurant");

        setFormData({
          name: data.restaurant.name,
          location: data.restaurant.location || "",
          logo: data.restaurant.logo || "",
          brandColors: data.restaurant.brandColors || "",
          languages: data.restaurant.languages || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) fetchRestaurant();
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguagesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      languages: e.target.value.split(",").map((lang) => lang.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axiosInstance.put(`/api/restaurants/${restaurantId}`, {
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update restaurant");

      setSuccess("Restaurant updated successfully!");
      setTimeout(() => navigate(`/restaurant/${restaurantId}`), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Update Restaurant</h2>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Success Message */}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {!loading && (
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Restaurant Name */}
          <div className="col-md-6">
            <label className="form-label">Restaurant Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Restaurant Name" 
              required 
            />
          </div>

          {/* Location */}
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Location" 
            />
          </div>

          {/* Logo URL */}
          <div className="col-md-6">
            <label className="form-label">Logo URL</label>
            <input 
              type="text" 
              name="logo" 
              value={formData.logo} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Logo URL" 
            />
          </div>

          {/* Brand Colors */}
          <div className="col-md-6">
            <label className="form-label">Brand Colors</label>
            <input 
              type="text" 
              name="brandColors" 
              value={formData.brandColors} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Brand Colors" 
            />
          </div>

          {/* Languages */}
          <div className="col-md-12">
            <label className="form-label">Languages</label>
            <input 
              type="text" 
              name="languages" 
              value={formData.languages.join(", ")} 
              onChange={handleLanguagesChange} 
              className="form-control" 
              placeholder="Languages (comma separated)" 
              required 
            />
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Updating..." : "Update Restaurant"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateRestaurant;
