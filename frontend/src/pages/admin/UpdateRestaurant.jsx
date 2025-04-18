import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Buffer } from "buffer";

const UpdateRestaurant = () => {
  const { restaurantSlug } = useParams();
  const navigate = useNavigate();
  const availableLanguages = ["en", "it", "ar"];

  const [formData, setFormData] = useState({
    name: { en: "", it: "", ar: "" },
    location: { en: "", it: "", ar: "" },
    brandColors: { primary: "", secondary: "", tertiary: "" },
    languages: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ▶︎ 1. Bring back the effect to fetch on mount
  useEffect(() => {
    if (restaurantSlug) fetchRestaurant();
  }, [restaurantSlug]);

  const fetchRestaurant = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/restaurants/${restaurantSlug}/get`,
      );
      const r = data.restaurant;

      // normalize multilingual fields
      const nameObj =
        typeof r.name === "object"
          ? r.name
          : { en: r.name, it: r.name, ar: r.name };
      const locationObj =
        typeof r.location === "object"
          ? r.location
          : { en: r.location, it: r.location, ar: r.location };

      setFormData({
        name: nameObj,
        location: locationObj,
        brandColors: r.brandColors || {
          primary: "",
          secondary: "",
          tertiary: "",
        },
        languages: r.languages || [],
      });

      // correct logo field
      if (r.restaurantLogo?.data && r.restaurantLogo?.contentType) {
        const base64String = Buffer.from(r.restaurantLogo.data).toString("base64");
        const imageUrl = `data:${r.restaurantLogo.contentType};base64,${base64String}`;
        setImagePreview(imageUrl);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch restaurant");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, files, dataset } = e.target;
    setFormData((prev) => {
      // multilingual fields
      if (dataset.language) {
        return {
          ...prev,
          [name]: { ...prev[name], [dataset.language]: value },
        };
      }
      // languages checkboxes
      if (name === "languages") {
        return {
          ...prev,
          languages: checked
            ? [...prev.languages, value]
            : prev.languages.filter((l) => l !== value),
        };
      }
      // brand color pickers
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
    if (!formData.name.en.trim()) return "Name (EN) required.";
    if (!formData.location.en.trim()) return "Location (EN) required.";
    if (!formData.languages.length) return "Pick at least one language.";
    if (
      !formData.brandColors.primary ||
      !formData.brandColors.secondary ||
      !formData.brandColors.tertiary
    ) {
      return "All three brand colors are required.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const errMsg = validateForm();
    if (errMsg) {
      setError(errMsg);
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(formData.name).forEach(([lang, v]) =>
        payload.append(`name[${lang}]`, v),
      );
      Object.entries(formData.location).forEach(([lang, v]) =>
        payload.append(`location[${lang}]`, v),
      );
      payload.append("brandColors", JSON.stringify(formData.brandColors));
      payload.append("languages", JSON.stringify(formData.languages));
      if (imageFile) payload.append("image", imageFile);

      await axiosInstance.put(`/restaurants/${restaurantSlug}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Restaurant updated successfully!");
      // ▶︎ 2. Use slug in navigation
      setTimeout(() => navigate(`/admin/manage-restaurants/${restaurantSlug}`), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update restaurant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-tomatoRose-700 mb-4 text-2xl font-bold">
        Update Restaurant
      </h2>

      {error && (
        <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-700">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div>
          <label className="mb-1 block font-medium">Restaurant Name</label>
          {availableLanguages.map((lang) => (
            <input
              key={lang}
              type="text"
              name="name"
              data-language={lang}
              className="mt-2 mb-2 w-full rounded border p-2 shadow-sm"
              placeholder={`Name in ${lang.toUpperCase()}`}
              value={formData.name[lang]}
              onChange={handleChange}
              required={lang === "en"}
            />
          ))}
        </div>

        <div>
          <label className="mb-1 block font-medium">Location</label>
          {availableLanguages.map((lang) => (
            <input
              key={lang}
              type="text"
              name="location"
              data-language={lang}
              className="mt-2 mb-2 w-full rounded border p-2 shadow-sm"
              placeholder={`Location in ${lang.toUpperCase()}`}
              value={formData.location[lang]}
              onChange={handleChange}
              required={lang === "en"}
            />
          ))}
        </div>

        <div>
          <label className="mb-2 block font-medium">Brand Colors</label>
          <div className="flex flex-wrap gap-4">
            {["primary", "secondary", "tertiary"].map((color) => (
              <div key={color} className="flex items-center gap-2">
                <label className="capitalize">{color}</label>
                <input
                  type="color"
                  name={color}
                  value={formData.brandColors[color]}
                  onChange={handleChange}
                  className="h-10 w-10 rounded border"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block font-medium">Languages</label>
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

        <div>
          <label className="mb-1 block font-medium">Restaurant Logo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hover:file:bg-tomatoRose-700 block w-full text-sm file:mr-4 file:cursor-pointer file:rounded file:border-0 file:bg-rose-600 file:px-4 file:py-2 file:text-white"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 max-w-[200px] rounded shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="hover:bg-rose-700 rounded bg-rose-600 px-6 py-2 text-white transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
