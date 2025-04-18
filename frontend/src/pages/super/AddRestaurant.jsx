import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: { en: "", it: "", ar: "" },
    location: { en: "", it: "", ar: "" },
    brandColors: { primary: "", secondary: "", tertiary: "" },
    languages: [],
  });

  const availableLanguages = ["en", "it", "ar"];
  const token = localStorage.getItem("token");
  const username = jwtDecode(token)?.username;

  const handleChange = (e) => {
    const { name, value, checked, files, dataset } = e.target;

    setFormData((prevState) => {
      if (dataset.language) {
        return {
          ...prevState,
          [name]: {
            ...prevState[name],
            [dataset.language]: value,
          },
        };
      }

      if (name === "languages") {
        const updatedLanguages = checked
          ? [...prevState.languages, value]
          : prevState.languages.filter((lang) => lang !== value);
        return { ...prevState, languages: updatedLanguages };
      }

      if (["primary", "secondary", "tertiary"].includes(name)) {
        return {
          ...prevState,
          brandColors: {
            ...prevState.brandColors,
            [name]: value,
          },
        };
      }

      return prevState;
    });

    if (name === "image" && files[0]) {
      handleImageUpload(files[0]);
    }
  };

  const handleImageUpload = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!formData.name.en.trim()) return "Restaurant name in English is required.";
    if (!formData.location.en.trim()) return "Location in English is required.";
    if (!formData.languages.length) return "Please select at least one language.";
    if (!formData.brandColors.primary || !formData.brandColors.secondary || !formData.brandColors.tertiary) {
      return "All brand colors (primary, secondary, tertiary) are required.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData.name).forEach(([lang, val]) => payload.append(`name[${lang}]`, val));
      Object.entries(formData.location).forEach(([lang, val]) => payload.append(`location[${lang}]`, val));
      payload.append("brandColors", JSON.stringify(formData.brandColors));
      payload.append("languages", JSON.stringify(formData.languages));
      if (imageFile) payload.append("image", imageFile);

      const response = await axiosInstance.post(`/restaurants/${username}/create-restaurant`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(response.data.message || "Restaurant created successfully");
      resetForm();
      navigate(`/admin/manage-restaurants`);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: { en: "", it: "", ar: "" },
      location: { en: "", it: "", ar: "" },
      brandColors: { primary: "", secondary: "", tertiary: "" },
      languages: [],
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create New Restaurant</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Restaurant Name */}
          <div>
            <label className="block font-medium mb-1">Restaurant Name</label>
            {availableLanguages.map((lang) => (
              <input
                key={lang}
                type="text"
                name="name"
                data-language={lang}
                className="w-full mb-2 px-3 py-2 border rounded text-sm"
                value={formData.name[lang]}
                onChange={handleChange}
                placeholder={`Name (${lang.toUpperCase()})`}
                required={lang === "en"}
              />
            ))}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            {availableLanguages.map((lang) => (
              <input
                key={lang}
                type="text"
                name="location"
                data-language={lang}
                className="w-full mb-2 px-3 py-2 border rounded text-sm"
                value={formData.location[lang]}
                onChange={handleChange}
                placeholder={`Location (${lang.toUpperCase()})`}
                required={lang === "en"}
              />
            ))}
          </div>

          {/* Brand Colors */}
          <div>
            <label className="block font-medium mb-1">Brand Colors</label>
            <div className="flex gap-4">
              {["primary", "secondary", "tertiary"].map((color) => (
                <div key={color} className="flex items-center gap-2">
                  <label className="text-sm capitalize w-20">{color}</label>
                  <input
                    type="color"
                    name={color}
                    className="w-10 h-10 p-1 border rounded"
                    value={formData.brandColors[color]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block font-medium mb-1">Languages</label>
            <div className="flex gap-6">
              {availableLanguages.map((lang) => (
                <label key={lang} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="languages"
                    value={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  {lang.toUpperCase()}
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Restaurant Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded px-3 py-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-48 h-auto border rounded shadow"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
