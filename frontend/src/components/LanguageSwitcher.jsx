import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // Optional: persist language
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="position-relative">
      <button
        type="button"
        className="nav-link d-flex flex-column align-items-center justify-content-center"
        style={{ color: "#333", transition: "all 0.3s", marginTop: "2px", background: "none", border: "none" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
        onClick={toggleDropdown}
      >
        <MdLanguage style={{ fontSize: "1.25rem", height: "1.38rem" }} />
        <small>{t("languageSwitcher.selectLanguage")}</small>
      </button>

      {isDropdownOpen && (
        <ul
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: 1000,
            display: "block",
            minWidth: "8rem",
            padding: "0.5rem 0",
            margin: "0.25rem 0 0",
            fontSize: "1rem",
            color: "#212529",
            textAlign: "left",
            listStyle: "none",
            backgroundColor: "#fff",
            backgroundClip: "padding-box",
            border: "1px solid rgba(0,0,0,.15)",
            borderRadius: "0.25rem"
          }}
        >
          <li><button className="dropdown-item w-100 text-start" onClick={() => changeLanguage("en")}>{t("languageSwitcher.english")}</button></li>
          <li><button className="dropdown-item w-100 text-start" onClick={() => changeLanguage("it")}>{t("languageSwitcher.italian")}</button></li>
          <li><button className="dropdown-item w-100 text-start" onClick={() => changeLanguage("ar")}>{t("languageSwitcher.arabic")}</button></li>
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
