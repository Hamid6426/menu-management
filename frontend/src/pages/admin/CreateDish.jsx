import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const CreateDish = () => {
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
    startTime: "", // "HH:mm" format
    endTime: "", // "HH:mm" format
    allergens: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleChange = (e, field, lang = null) => {
    const { name, value, type, checked, files } = e.target;

    // For multi-language fields (name, description, category)
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else if (type === "checkbox" && name === "allergens") {
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

    // Validate required multi-language fields (ensure English version is provided)
    if (!formData.name.en || !formData.description.en || !formData.category || !formData.price || !restaurantSlug) {
      setError("English name, description, category, price, and restaurant slug are required.");
      return;
    }

    setLoading(true);
    try {
      const availability = {
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      const data = new FormData();
      // Append multi-language objects as JSON strings if your backend expects JSON
      data.append("name", JSON.stringify(formData.name));
      data.append("description", JSON.stringify(formData.description));
      data.append("category", JSON.stringify(formData.category));
      data.append("price", formData.price);
      if (formData.kilocalories) {
        data.append("kilocalories", formData.kilocalories);
      }
      data.append("isEnabled", formData.isEnabled);
      data.append("availability", JSON.stringify(availability));
      formData.allergens.forEach((allergen) => {
        data.append("allergens", allergen);
      });
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await axiosInstance.post(`/dishes/${restaurantSlug}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
      // Reset form or redirect
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
      setError(err.response?.data?.message || "Error creating dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid my-2 px-3">
      <h2 className="mb-4">Create Dish</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        {/* Multi-language fields */}
        <div className="mb-3">
          <label className="form-label">Dish Name</label>
          {["en", "it", "ar"].map((lang) => (
            <div key={lang}>
              <input
                type="text"
                className="form-control mb-1"
                placeholder={`Name (${lang.toUpperCase()})`}
                value={formData.name[lang]}
                onChange={(e) => handleChange(e, "name", lang)}
                required={lang === "en"}
              />
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          {["en", "it", "ar"].map((lang) => (
            <div key={lang}>
              <textarea
                className="form-control mb-1"
                placeholder={`Description (${lang.toUpperCase()})`}
                value={formData.description[lang]}
                onChange={(e) => handleChange(e, "description", lang)}
                rows="2"
                required={lang === "en"}
              ></textarea>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select mb-1"
            value={formData.category}
            onChange={(e) => handleChange(e, "category")} 
            required
          >
            <option value="">Select Category</option>
            {["Starter", "Main Course", "Dessert", "Beverage", "Side Dish", "Special"].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Other fields */}
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
          <label htmlFor="kilocalories" className="form-label">
            Kilocalories (optional)
          </label>
          <input
            type="number"
            className="form-control"
            id="kilocalories"
            name="kilocalories"
            value={formData.kilocalories}
            onChange={handleChange}
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
