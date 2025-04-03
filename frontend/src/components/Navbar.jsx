import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { labelKey: "navbar.restaurants", href: "/restaurants" },
  { labelKey: "navbar.contact", href: "/contact" },
  { labelKey: "navbar.pricing", href: "/pricing" },
  { labelKey: "navbar.login", href: "/login" },
];

const Navbar = () => {
  const { t } = useTranslation();  // Initialize useTranslation

  return (
    <nav className="container-Fluid px-3 d-flex justify-content-between align-items-center navbar navbar-expand-lg bg-white shadow-sm border-bottom rounded-bottom">
      {/* Logo */}
      <Link className="navbar-brand fw-bold text-primary fs-4" to={"/"}>
        MENU MANAGEMENT
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <LanguageSwitcher />
        <ul className="navbar-nav align-items-center">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item mx-2">
              <Link className="nav-link text-dark fw-medium py-2 rounded hover-bg-light" to={item.href}>
                {t(item.labelKey)}  {/* Using t() to get translated text */}
              </Link>
            </li>
          ))}

          {/* Get Started Button */}
          <li className="nav-item ms-3">
            <Link to={"/signup-as"} className="btn btn-primary px-3 py-2 fw-semibold shadow-sm">
              {t("navbar.getStarted")}  {/* Using t() to get translated text */}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
