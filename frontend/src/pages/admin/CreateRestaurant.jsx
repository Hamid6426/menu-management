import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const CreateRestaurant = () => {
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
    const { name, value, type, checked, files, dataset } = e.target;

    setFormData((prev) => {
      if (dataset.language) {
        return {
          ...prev,
          [name]: { ...prev[name], [dataset.language]: value },
        };
      }

      if (name === "languages") {
        const updated = checked
          ? [...prev.languages, value]
          : prev.languages.filter((lang) => lang !== value);
        return { ...prev, languages: updated };
      }

      if (["primary", "secondary", "tertiary"].includes(name)) {
        return {
          ...prev,
          brandColors: { ...prev.brandColors, [name]: value },
        };
      }

      return prev;
    });

    if (name === "image" && files[0]) handleImageUpload(files[0]);
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
    if (
      !formData.brandColors.primary ||
      !formData.brandColors.secondary ||
      !formData.brandColors.tertiary
    ) {
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

      const response = await axiosInstance.post(
        `/restaurants/${username}/create-restaurant`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-tomatoRose-700">Create New Restaurant</h2>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Name fields */}
        <div>
          <label className="block font-medium mb-1">Restaurant Name</label>
          {availableLanguages.map((lang) => (
            <input
              key={lang}
              type="text"
              name="name"
              data-language={lang}
              className="w-full mt-2 mb-2 p-2 border rounded shadow-sm"
              placeholder={`Name in ${lang.toUpperCase()}`}
              value={formData.name[lang]}
              onChange={handleChange}
              required={lang === "en"}
            />
          ))}
        </div>

        {/* Location fields */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          {availableLanguages.map((lang) => (
            <input
              key={lang}
              type="text"
              name="location"
              data-language={lang}
              className="w-full mt-2 mb-2 p-2 border rounded shadow-sm"
              placeholder={`Location in ${lang.toUpperCase()}`}
              value={formData.location[lang]}
              onChange={handleChange}
              required={lang === "en"}
            />
          ))}
        </div>

        {/* Brand Colors */}
        <div>
          <label className="block font-medium mb-2">Brand Colors</label>
          <div className="flex flex-wrap gap-4">
            {["primary", "secondary", "tertiary"].map((color) => (
              <div key={color} className="flex items-center gap-2">
                <label className="capitalize">{color}</label>
                <input
                  type="color"
                  name={color}
                  className="h-10 w-10 p-0 border rounded"
                  value={formData.brandColors[color]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Language Checkboxes */}
        <div>
          <label className="block font-medium mb-1">Languages</label>
          <div className="flex flex-wrap gap-4">
            {availableLanguages.map((lang) => (
              <label key={lang} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="languages"
                  value={lang}
                  checked={formData.languages.includes(lang)}
                  onChange={handleChange}
                  className="accent-tomatoRose-600"
                />
                <span>{lang.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Restaurant Logo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-tomatoRose-600 file:text-black hover:file:bg-tomatoRose-700"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 rounded shadow max-w-[200px]"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-tomatoRose-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
