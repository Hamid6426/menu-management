import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AddDish = () => {
  const { restaurantSlug } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { username } = jwtDecode(token);

  const [formData, setFormData] = useState({
    name: { en: "", it: "", ar: "" },
    description: { en: "", it: "", ar: "" },
    category: "",
    price: "",
    kilocalories: "",
    isEnabled: true,
    image: null,
    startTime: "",
    endTime: "",
    allergens: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const allergensList = [
    "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy", "eggs",
    "fish", "wheat", "sesame", "mustard", "celery", "lupin", "molluscs", "sulphites",
    "corn", "latex", "kiwi", "banana", "avocado", "crustaceans"
  ];

  const handleChange = (e, field, lang = null) => {
    const { name, value, type, checked, files } = e.target;

    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else if (type === "checkbox" && name === "allergens") {
      let newAllergens = [...formData.allergens];
      checked
        ? newAllergens.push(value)
        : newAllergens = newAllergens.filter((item) => item !== value);
      setFormData((prev) => ({ ...prev, allergens: newAllergens }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.en || !formData.description.en || !formData.category || !formData.price || !restaurantSlug) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const availability = { startTime: formData.startTime, endTime: formData.endTime };
      const data = new FormData();
      data.append("name", JSON.stringify(formData.name));
      data.append("description", JSON.stringify(formData.description));
      data.append("category", formData.category);
      data.append("price", formData.price);
      if (formData.kilocalories) data.append("kilocalories", formData.kilocalories);
      data.append("isEnabled", formData.isEnabled);
      data.append("availability", JSON.stringify(availability));
      formData.allergens.forEach((a) => data.append("allergens", a));
      if (formData.image) data.append("image", formData.image);

      const response = await axiosInstance.post(`/dishes/${restaurantSlug}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message || "Dish created successfully.");
      setFormData({
        name: { en: "", it: "", ar: "" },
        description: { en: "", it: "", ar: "" },
        category: "",
        price: "",
        kilocalories: "",
        isEnabled: true,
        image: null,
        startTime: "",
        endTime: "",
        allergens: [],
      });
      navigate(`/admin/manage-restaurants/${restaurantSlug}/dishes`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create dish.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid my-2 px-3">
      <h2>Create Dish</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Dish Name */}
        <div className="mb-3">
          <label>Dish Name</label>
          {["en", "it", "ar"].map((lang) => (
            <input
              key={lang}
              type="text"
              className="form-control mb-1"
              placeholder={`Name (${lang.toUpperCase()})`}
              value={formData.name[lang]}
              onChange={(e) => handleChange(e, "name", lang)}
              required={lang === "en"}
            />
          ))}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Description</label>
          {["en", "it", "ar"].map((lang) => (
            <textarea
              key={lang}
              className="form-control mb-1"
              placeholder={`Description (${lang.toUpperCase()})`}
              value={formData.description[lang]}
              onChange={(e) => handleChange(e, "description", lang)}
              rows="2"
              required={lang === "en"}
            ></textarea>
          ))}
        </div>

        {/* Category */}
        <select
          className="form-select mb-3"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="starter">Starter</option>
          <option value="mainCourse">Main Course</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
          <option value="sideDish">Side Dish</option>
          <option value="special">Special</option>
        </select>

        {/* Price */}
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* Kilocalories */}
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Kilocalories"
          name="kilocalories"
          value={formData.kilocalories}
          onChange={handleChange}
        />

        {/* Availability */}
        <div className="mb-3">
          <label>Availability</label>
          <div className="d-flex gap-2">
            <input type="time" name="startTime" className="form-control" value={formData.startTime} onChange={handleChange} required />
            <input type="time" name="endTime" className="form-control" value={formData.endTime} onChange={handleChange} required />
          </div>
        </div>

        {/* Image */}
        <input
          type="file"
          className="form-control mb-3"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        {/* Allergens */}
        <div className="mb-3">
          <label>Allergens</label>
          {allergensList.map((a) => (
            <div key={a} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`allergen-${a}`}
                name="allergens"
                value={a}
                checked={formData.allergens.includes(a)}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`allergen-${a}`}>
                {a}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Dish"}
        </button>
      </form>
    </div>
  );
};

export default AddDish;
