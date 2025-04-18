import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const UpdateDish = () => {
  const { t } = useTranslation();
  const { restaurantSlug, dishSlug } = useParams();
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
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const allergensKeys = Object.keys(t("allergens", { returnObjects: true }));

  // Fetch dish by slug
  useEffect(() => {
    const fetchDish = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/dishes/${restaurantSlug}/${dishSlug}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const d = data.dish;

        // image buffer → base64
        if (d.dishImage?.data) {
          const bytes = new Uint8Array(d.dishImage.data);
          let bin = "";
          bytes.forEach((b) => (bin += String.fromCharCode(b)));
          const b64 = window.btoa(bin);
          setImagePreview(`data:${d.dishImage.contentType};base64,${b64}`);
        }

        setFormData({
          name: d.name,
          description: d.description,
          category: d.category,
          price: d.price,
          kilocalories: d.kilocalories || "",
          isEnabled: d.isEnabled,
          image: null,
          startTime: d.availability?.startTime || "",
          endTime: d.availability?.endTime || "",
          allergens: d.allergens || [],
        });
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "error fetching dish");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [dishSlug, restaurantSlug, token, t]);

  const handleChange = (e, field, lang = null) => {
    const { name, value, type, checked, files } = e.target;
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else if (type === "checkbox" && name === "allergens") {
      setFormData((prev) => ({
        ...prev,
        allergens: checked
          ? [...prev.allergens, value]
          : prev.allergens.filter((a) => a !== value),
      }));
    } else if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name.en.trim() ||
      !formData.description.en.trim() ||
      !formData.category ||
      !formData.price
    ) {
      setError(t("createDish.validationError"));
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
      if (formData.kilocalories)
        data.append("kilocalories", formData.kilocalories);
      data.append("isEnabled", formData.isEnabled);
      data.append("availability", JSON.stringify(availability));
      formData.allergens.forEach((a) => data.append("allergens", a));
      if (formData.image) data.append("image", formData.image);

      const response = await axiosInstance.put(`/dishes/${dishSlug}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
      navigate(`/admin/manage-restaurants/${restaurantSlug}/dishes`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t("createDish.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-12 max-w-3xl rounded bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        {t("updateDish.title")}
      </h2>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-2 text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("createDish.dishName")}
          </label>
          <div className="space-y-2">
            {["en", "it", "ar"].map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`${t("createDish.namePlaceholder")} (${lang.toUpperCase()})`}
                value={formData.name[lang]}
                onChange={(e) => handleChange(e, "name", lang)}
                required={lang === "en"}
                className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("createDish.description")}
          </label>
          <div className="space-y-2">
            {["en", "it", "ar"].map((lang) => (
              <textarea
                key={lang}
                placeholder={`${t("createDish.descriptionPlaceholder")} (${lang.toUpperCase()})`}
                value={formData.description[lang]}
                onChange={(e) => handleChange(e, "description", lang)}
                rows={2}
                required={lang === "en"}
                className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("createDish.selectCategory")}
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="">{t("createDish.selectCategory")}</option>
            {[
              "starter",
              "mainCourse",
              "dessert",
              "beverage",
              "sideDish",
              "special",
            ].map((key) => (
              <option key={key} value={key}>
                {t(`categories.${key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Calories */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("createDish.price")}
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("createDish.kilocalories")}
            </label>
            <input
              type="number"
              name="kilocalories"
              value={formData.kilocalories}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("createDish.availability")}
          </label>
          <div className="flex space-x-4">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="block w-1/2 rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="block w-1/2 rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {t("createDish.availabilityHelp")}
          </p>
        </div>

        {/* Image */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("createDish.image")}
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full cursor-pointer text-gray-700"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 w-32 rounded object-cover"
            />
          )}
        </div>

        {/* Allergens */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("createDish.allergens")}
          </label>
          <div className="flex flex-wrap gap-4">
            {allergensKeys.map((key) => (
              <label key={key} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="allergens"
                  value={key}
                  checked={formData.allergens.includes(key)}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-red-600"
                />
                <span className="text-gray-700">{t(`allergens.${key}`)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            {loading && (
              <svg
                className="mr-2 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {loading ? t("createDish.creating") : t("updateDish.updateButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDish;
