import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { labelKey: "navbar.restaurants", href: "/restaurants" },
  { labelKey: "navbar.contact", href: "/contact" },
  { labelKey: "navbar.about", href: "/about" },
  { labelKey: "navbar.login", href: "/login", authOnly: false }, // Login shown only when no token
];

const Navbar = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

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
          {navItems.map((item, index) => {
            // Skip login if token exists
            if (item.href === "/login" && token) return null;

            return (
              <li key={index} className="nav-item ">
                <Link className="nav-link text-dark fw-medium py-2 rounded hover-bg-light mx-2" to={item.href}>
                  {t(item.labelKey)}
                </Link>
              </li>
            );
          })}

          {/* Auth Buttons */}
          <li className="nav-item">
            {token ? (
              <Link to={"/admin/dashboard"} className="btn btn-primary px-3 py-2 fw-semibold shadow-sm">
                Dashboard
              </Link>
            ) : (
              <Link to={"/signup-as"} className="nav-link text-dark fw-medium py-2 rounded hover-bg-light mx-2">
                {t("navbar.getStarted")}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
