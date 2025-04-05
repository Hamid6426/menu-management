import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const CreateDish = () => {
  const { t } = useTranslation();
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

    // Validate required multi-language fields (English version required)
    if (!formData.name.en || !formData.description.en || !formData.category || !formData.price || !restaurantSlug) {
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
      // Append multi-language objects as JSON strings
      data.append("name", JSON.stringify(formData.name));
      data.append("description", JSON.stringify(formData.description));
      // Category is a plain string so no need to stringify it
      data.append("category", formData.category);
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
      // Reset form fields
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
      setError(err.response?.data?.message || t("createDish.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid my-2 px-3">
      <h2 className="mb-4">{t("createDish.title")}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        {/* Multi-language fields for Dish Name */}
        <div className="mb-3">
          <label className="form-label">{t("createDish.dishName")}</label>
          {["en", "it", "ar"].map((lang) => (
            <div key={lang}>
              <input
                type="text"
                className="form-control mb-1"
                placeholder={`${t("createDish.namePlaceholder")} (${lang.toUpperCase()})`}
                value={formData.name[lang]}
                onChange={(e) => handleChange(e, "name", lang)}
                required={lang === "en"}
              />
            </div>
          ))}
        </div>

        {/* Multi-language fields for Description */}
        <div className="mb-3">
          <label className="form-label">{t("createDish.description")}</label>
          {["en", "it", "ar"].map((lang) => (
            <div key={lang}>
              <textarea
                className="form-control mb-1"
                placeholder={`${t("createDish.descriptionPlaceholder")} (${lang.toUpperCase()})`}
                value={formData.description[lang]}
                onChange={(e) => handleChange(e, "description", lang)}
                rows="2"
                required={lang === "en"}
              ></textarea>
            </div>
          ))}
        </div>

        {/* Category Field */}
        <select className="form-select mb-1" name="category" value={formData.category} onChange={handleChange} required>
          <option value="">{t("createDish.selectCategory")}</option>
          {["starter", "mainCourse", "dessert", "beverage", "sideDish", "special"].map((key) => (
            <option key={key} value={key}>
              {t(`categories.${key}`)}
            </option>
          ))}
        </select>

        {/* Price Field */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            {t("createDish.price")}
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

        {/* Kilocalories Field */}
        <div className="mb-3">
          <label htmlFor="kilocalories" className="form-label">
            {t("createDish.kilocalories")}
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

        {/* Availability Fields */}
        <div className="mb-3">
          <label className="form-label">{t("createDish.availability")}</label>
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
          <small className="form-text text-muted">{t("createDish.availabilityHelp")}</small>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            {t("createDish.image")}
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

        {/* Allergens Checkboxes */}
        <div className="mb-3">
          <label className="form-label">{t("createDish.allergens")}</label>
          <div className="form-check">
            {Object.keys(t("allergens", { returnObjects: true })).map((allergenKey) => (
              <div key={allergenKey}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`allergen-${allergenKey}`}
                  name="allergens"
                  value={allergenKey}
                  checked={formData.allergens.includes(allergenKey)}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={`allergen-${allergenKey}`}>
                  {t(`allergens.${allergenKey}`)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              &nbsp; {t("createDish.creating")}
            </>
          ) : (
            t("createDish.createButton")
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateDish;
