import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt, FaUtensils, FaPhone, FaSignInAlt } from "react-icons/fa"; // Additional icons for nav items
import { RiAccountCircleFill } from "react-icons/ri"; // Profile icon
import LanguageSwitcher from "./LanguageSwitcher";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Logout handler function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const notLoggedNavItems = [
    { labelKey: "navbar.restaurants", href: "/restaurants", icon: <FaUtensils style={{ fontSize: "1.25rem" }} /> },
    { labelKey: "navbar.contact", href: "/contact", icon: <FaPhone style={{ fontSize: "1.25rem" }} /> },
    { labelKey: "navbar.login", href: "/login", icon: <FaSignInAlt style={{ fontSize: "1.25rem" }} /> },
  ];
  const loggedNavItems = [
    { labelKey: "navbar.contact", href: "/contact", icon: <FaPhone style={{ fontSize: "1.25rem" }} /> },
    { labelKey: "navbar.restaurants", href: "/restaurants", icon: <FaUtensils style={{ fontSize: "1.25rem" }} /> },
    { labelKey: "navbar.dashboard", href: "/admin/dashboard", icon: <MdDashboard style={{ fontSize: "1.25rem" }} /> },
    { labelKey: "navbar.profile", href: "/profile", icon: <RiAccountCircleFill style={{ fontSize: "1.25rem" }} /> },
  ];

  // Select the appropriate nav items based on token
  const navItems = token ? loggedNavItems : notLoggedNavItems;

  return (
    <nav className="container-fluid px-3 d-flex justify-content-between align-items-center navbar navbar-expand-lg bg-white shadow-sm border-bottom rounded-bottom">
      {/* Logo */}
      <button className="navbar-brand fw-bold fs-4 border-0" onClick={() => navigate("/")} style={{ color: "#ff6600" }}>
        MENU MANAGEMENT
      </button>

      {/* Mobile Menu Button */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ color: "#ff6600" }}
      >
        <span className="navbar-toggler-icon" style={{ backgroundColor: "white" }}></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center">
          <LanguageSwitcher />

          {navItems.map((item, index) => (
            <li key={index} className="nav-item d-flex align-items-center justify-content-center">
              <button
                onClick={() => navigate(item.href)}
                className="nav-link d-flex flex-column align-items-center  justify-content-center"
                style={{ color: "#333", transition: "all 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <div>{item.icon}</div>
                <small>{t(item.labelKey)}</small>
              </button>

              {/* Special Logout Button */}
              {item.labelKey === "navbar.logout" && (
                <button
                  onClick={handleLogout}
                  className="nav-link d-flex flex-column align-items-center  justify-content-center"
                  style={{ color: "#333", transition: "all 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
                >
                  <FaSignOutAlt style={{ fontSize: "1.25rem" }} />
                  <small>{t("navbar.logout")}</small>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
