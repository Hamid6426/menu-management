import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
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
    "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy", "eggs", "fish",
    "wheat", "sesame", "mustard", "celery", "lupin", "molluscs", "sulphites", "corn",
    "latex", "kiwi", "banana", "avocado", "crustaceans",
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
        : (newAllergens = newAllergens.filter((item) => item !== value));
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
      const availability = {
        startTime: formData.startTime,
        endTime: formData.endTime,
      };
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
    <div className="max-w-3xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <div className="bg-white border-t-4 border-orange-500 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Add New Dish</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Dish Name</label>
            {["en", "it", "ar"].map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Name (${lang.toUpperCase()})`}
                value={formData.name[lang]}
                onChange={(e) => handleChange(e, "name", lang)}
                required={lang === "en"}
                className="w-full border border-orange-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            ))}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            {["en", "it", "ar"].map((lang) => (
              <textarea
                key={lang}
                rows="2"
                placeholder={`Description (${lang.toUpperCase()})`}
                value={formData.description[lang]}
                onChange={(e) => handleChange(e, "description", lang)}
                required={lang === "en"}
                className="w-full border border-orange-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            ))}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Category</option>
              <option value="starter">Starter</option>
              <option value="mainCourse">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="beverage">Beverage</option>
              <option value="sideDish">Side Dish</option>
              <option value="special">Special</option>
            </select>
          </div>

          {/* Price & Kilocalories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Kilocalories</label>
              <input
                type="number"
                name="kilocalories"
                value={formData.kilocalories}
                onChange={handleChange}
                className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block font-medium mb-1">Availability Time</label>
            <div className="flex gap-4">
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="flex-1 border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="flex-1 border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium mb-1">Dish Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-orange-300 rounded px-3 py-2 bg-white"
            />
          </div>

          {/* Allergens */}
          <div>
            <label className="block font-medium mb-2">Allergens</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allergensList.map((a) => (
                <label key={a} className="inline-flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="allergens"
                    value={a}
                    checked={formData.allergens.includes(a)}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            {loading ? "Creating..." : "Create Dish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDish;
