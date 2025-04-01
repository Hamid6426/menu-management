import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Restaurants", href: "/restaurants" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Login", href: "/login" },
];

const Navbar = () => {
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
        <ul className="navbar-nav align-items-center">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item mx-2">
              <Link className="nav-link text-dark fw-medium py-2 rounded hover-bg-light" to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}

          {/* Get Started Button */}
          <li className="nav-item ms-3">
            <a href="/login-as" className="btn btn-primary px-3 py-2 fw-semibold shadow-sm">
              GET STARTED
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
