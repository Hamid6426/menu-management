import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        className="flex flex-col items-center justify-center text-gray-800 hover:text-orange-600 transition-colors duration-300 bg-transparent border-none mt-0.5"
        onClick={toggleDropdown}
      >
        <MdLanguage className="text-xl h-5" />
        <small className="text-xs">{t("languageSwitcher.selectLanguage")}</small>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <li>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-orange-600"
              onClick={() => changeLanguage("en")}
            >
              {t("languageSwitcher.english")}
            </button>
          </li>
          <li>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-orange-600"
              onClick={() => changeLanguage("it")}
            >
              {t("languageSwitcher.italian")}
            </button>
          </li>
          <li>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-orange-600"
              onClick={() => changeLanguage("ar")}
            >
              {t("languageSwitcher.arabic")}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;