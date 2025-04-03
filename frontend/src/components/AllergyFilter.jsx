import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from 'react-i18next';

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
      <div className="d-flex mb-1 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder={t('allergyFilter.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ height: "40px" }}
        />
        <button 
          className="btn btn-secondary ms-2" 
          style={{ height: "40px" }} 
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? t('allergyFilter.hide') : t('allergyFilter.show')}
        </button>
      </div>
      {isVisible && (
        <div
          className="d-flex position-absolute w-25 z-3 bg-white flex-column"
          style={{
            gap: "-1px",
            border: "solid #ddd 1px",
          }}
        >
          {filteredAllergens.map((allergen) => (
            <div
              className="d-flex align-items-center"
              key={allergen}
              style={{
                padding: "0.25rem 0.5rem",
                minWidth: "fit-content",
              }}
            >
              <input
                type="checkbox"
                id={allergen}
                checked={selectedAllergens.includes(allergen)}
                onChange={() => handleCheckboxChange(allergen)}
              />
              <label htmlFor={allergen} className="ms-2">
                {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllergyFilter;
