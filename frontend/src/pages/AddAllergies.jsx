import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const AddAllergies = () => {
  const { t } = useTranslation();
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const allowedAllergies = [
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
    "peach",
    "plum",
    "apples",
    "cherries",
    "almonds",
    "cashews",
    "pine nuts",
    "coconut",
    "poppy seeds",
    "sesame seeds",
    "papaya",
    "mango",
  ];

  // Fetch user profile & set allergies
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert(t("addAllergies.sessionExpired"));
          return navigate("/login");
        }

        const response = await axiosInstance.get("/users/profile");

        setSelectedAllergies(response.data.user.allergies || []);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError(t("addAllergies.fetchError"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, t]);

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedAllergies((prev) => (checked ? [...prev, value] : prev.filter((allergy) => allergy !== value)));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        "/users/profile/allergies",
        { allergies: selectedAllergies },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert(t("addAllergies.updateSuccess"));
        navigate("/");
      } else {
        alert(t("addAllergies.updateFailure"));
      }
    } catch (error) {
      console.error("Error updating allergies:", error);
      setError(t("addAllergies.submitError"));
    }
  };

  if (loading)
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">{t("addAllergies.title")}</h2>

      {/* Error Message */}
      {error && <div className="alert alert-danger text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allowedAllergies.map((allergy) => (
            <div className="flex items-center" key={allergy}>
              <input
                type="checkbox"
                id={allergy}
                value={allergy}
                checked={selectedAllergies.includes(allergy)}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-orange-600"
              />
              <label className="ml-2 text-sm text-gray-700" htmlFor={allergy}>
                {t(`allergies.${allergy}`) || allergy}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="w-1/2 bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-700 transition duration-200"
          >
            {t("addAllergies.saveButton")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/restaurants")}
            className="w-1/2 bg-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            {t("addAllergies.skipButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAllergies;
