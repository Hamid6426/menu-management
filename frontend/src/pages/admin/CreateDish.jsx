import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const CreateDish = () => {
  const { restaurantSlug, menuSlug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isEnabled: true,
    image: null,
    startTime: "", // in "HH:mm" format
    endTime: "", // in "HH:mm" format
    menuSlug: menuSlug,
    allergens: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const username = decoded.username;

  const allergensList = [
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
  ];

  // Helper to convert time string ("HH:mm") to minutes since midnight
  const timeStringToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "allergens") {
      let newAllergens = [...formData.allergens];
      if (checked) {
        newAllergens.push(value);
      } else {
        newAllergens = newAllergens.filter((item) => item !== value);
      }
      setFormData({ ...formData, allergens: newAllergens });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.price) {
      setError("Dish name and price are required.");
      return;
    }

    setLoading(true);
    try {
      // Convert times to minutes
      const startMinutes = timeStringToMinutes(formData.startTime);
      const endMinutes = timeStringToMinutes(formData.endTime);

      // Prepare form data for multipart upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("isEnabled", formData.isEnabled);
      data.append("menuSlug", formData.menuSlug);
      data.append("availability", JSON.stringify({ startTime: startMinutes, endTime: endMinutes }));

      // Append each allergen individually
      formData.allergens.forEach((allergen) => {
        data.append("allergens", allergen);
      });

      if (formData.image) {
        data.append("image", formData.image);
      }

      // POST endpoint for creating a dish
      const response = await axiosInstance.post(`/dishes/${menuSlug}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(response.data.message);
      setFormData({
        name: "",
        description: "",
        price: "",
        isEnabled: true,
        image: null,
        startTime: "",
        endTime: "",
        menuSlug: menuSlug,
        allergens: [],
      });
      navigate(`/${username}/manage-restaurants/${restaurantSlug}/${menuSlug}/dishes`);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Create Dish</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Dish Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Availability</label>
          <div className="row">
            <div className="col">
              <input
                type="time"
                className="form-control"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="time"
                className="form-control"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <small className="form-text text-muted">Select start and end times for dish availability.</small>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Allergens</label>
          <div className="form-check">
            {allergensList.map((allergen) => (
              <div key={allergen}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`allergen-${allergen}`}
                  name="allergens"
                  value={allergen}
                  checked={formData.allergens.includes(allergen)}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={`allergen-${allergen}`}>
                  {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              &nbsp; Creating...
            </>
          ) : (
            "Create Dish"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateDish;
