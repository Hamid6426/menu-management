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
    <div className="container mt-4">
      <h2 className="mb-3">{t("addAllergies.title")}</h2>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          {allowedAllergies.map((allergy) => (
            <div className="col-md-4" key={allergy}>
              <div className="form-check">
                <input
                  type="checkbox"
                  id={allergy}
                  value={allergy}
                  checked={selectedAllergies.includes(allergy)}
                  onChange={handleCheckboxChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor={allergy}>
                  {t(`allergies.${allergy}`) || allergy}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-2">
            {t("addAllergies.saveButton")}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/restaurants")}>
            {t("addAllergies.skipButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAllergies;
