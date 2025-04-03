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

  // Handle multi-language inputs and brand color updates
  const handleChange = (e) => {
    const { name, value, type, checked, files, dataset } = e.target;

    setFormData((prevState) => {
      if (dataset.language) {
        // Handle multi-language fields (name, location)
        return {
          ...prevState,
          [name]: {
            ...prevState[name],
            [dataset.language]: value,
          },
        };
      }

      if (name === "languages") {
        // Handle language checkboxes
        const updatedLanguages = checked
          ? [...prevState.languages, value]
          : prevState.languages.filter((lang) => lang !== value);
        return { ...prevState, languages: updatedLanguages };
      }

      if (["primary", "secondary", "tertiary"].includes(name)) {
        // Handle brand colors
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

  // Handle image file selection and preview
  const handleImageUpload = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Validate form fields before submission
  const validateForm = () => {
    if (!formData.name.en.trim()) return "Restaurant name in English is required.";
    if (!formData.location.en.trim()) return "Location in English is required.";
    if (!formData.languages.length) return "Please select at least one language.";
    if (!formData.brandColors.primary || !formData.brandColors.secondary || !formData.brandColors.tertiary) {
      return "All brand colors (primary, secondary, tertiary) are required.";
    }
    return null;
  };

  // Handle form submission
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

  // Reset form fields after submission
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
    <div className="container my-4">
      <h2>Create New Restaurant</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Restaurant Name */}
        <div className="mb-3">
          <label className="form-label">Restaurant Name</label>
          {availableLanguages.map((lang) => (
            <input
              key={lang}
              type="text"
              name="name"
              data-language={lang}
              className="form-control mt-2"
              value={formData.name[lang]}
              onChange={handleChange}
              placeholder={`Enter restaurant name in ${lang.toUpperCase()}`}
              required={lang === "en"}
            />
          ))}
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label">Restaurant Location</label>
          {availableLanguages.map((lang) => (
            <input
              key={lang}
              type="text"
              name="location"
              data-language={lang}
              className="form-control mt-2"
              value={formData.location[lang]}
              onChange={handleChange}
              placeholder={`Enter location in ${lang.toUpperCase()}`}
              required={lang === "en"}
            />
          ))}
        </div>

        {/* Brand Colors */}
        <div className="mb-3">
          <label className="form-label">Brand Colors</label>
          <div className="d-flex gap-3">
            {["primary", "secondary", "tertiary"].map((color) => (
              <div key={color} className="d-flex align-items-center gap-2">
                <label>{color.charAt(0).toUpperCase() + color.slice(1)}</label>
                <input
                  type="color"
                  name={color}
                  className="form-control form-control-color"
                  value={formData.brandColors[color]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-3">
          <label className="form-label">Languages</label>
          {availableLanguages.map((lang) => (
            <div key={lang} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`language-${lang}`}
                name="languages"
                value={lang}
                checked={formData.languages.includes(lang)}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`language-${lang}`}>
                {lang.toUpperCase()}
              </label>
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Restaurant Image</label>
          <input type="file" className="form-control" name="image" accept="image/*" onChange={handleChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ maxWidth: "200px" }} />}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
