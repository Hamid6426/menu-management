import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  // State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // persist language
    setIsDropdownOpen(false); // Close the dropdown after selecting a language
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav-item d-flex align-items-center justify-content-center">
      <button
        type="button"
        className="nav-link d-flex flex-column align-items-center justify-content-center"
        style={{ color: "#333", transition: "all 0.3s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
        onClick={toggleDropdown} // Toggle dropdown on button click
      >
        <MdLanguage style={{ fontSize: "1.25rem" }} />
        <small>{t("languageSwitcher.selectLanguage")}</small>
      </button>
      {/* Show dropdown if isDropdownOpen is true */}
      {isDropdownOpen && (
        <div>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button className="dropdown-item" onClick={() => changeLanguage("en")}>
                {t("languageSwitcher.english")}
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => changeLanguage("it")}>
                {t("languageSwitcher.italian")}
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => changeLanguage("ar")}>
                {t("languageSwitcher.arabic")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
