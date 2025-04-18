import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const AllergyFilter = ({ availableAllergens, selectedAllergens, setSelectedAllergens }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  // On mount, if the user is logged in, decode the token and auto-check the user's allergies.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && (!selectedAllergens || selectedAllergens.length === 0)) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.allergies && Array.isArray(decoded.allergies)) {
          setSelectedAllergens(decoded.allergies);
        }
      } catch (error) {
        console.error("Error decoding token for allergies:", error);
      }
    }
  }, [selectedAllergens, setSelectedAllergens]);

  const handleCheckboxChange = (allergen) => {
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(selectedAllergens.filter((item) => item !== allergen));
    } else {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  // Filter allergens by search input
  const filteredAllergens = (availableAllergens || []).filter((allergen) =>
    allergen?.toLowerCase().includes(search?.toLowerCase() || "")
  );

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2 relative">
        {/* <input
          type="text"
          className="form-input w-full px-3 py-2 rounded border border-gray-300"
          placeholder={t("allergyFilter.searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <button
          className="btn btn-secondary ml-2 px-8 py-2 rounded w-full bg-gray-300 hover:bg-gray-400"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? t("allergyFilter.hide") : t("allergyFilter.show")}
        </button>
      </div>
      {isVisible && (
        <div className="absolute w-64 bg-white shadow-lg z-10 border border-gray-300 rounded mt-2">
          {filteredAllergens.map((allergen) => (
            <div
              className="flex items-center px-4 py-2 border-b border-gray-200"
              key={allergen}
            >
              <input
                type="checkbox"
                id={allergen}
                checked={selectedAllergens.includes(allergen)}
                onChange={() => handleCheckboxChange(allergen)}
                className="mr-2"
              />
              <label htmlFor={allergen} className="text-sm text-gray-800">
                {t(`allergens.${allergen}`, allergen.charAt(0).toUpperCase() + allergen.slice(1))}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllergyFilter;
