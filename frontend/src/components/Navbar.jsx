import React from "react";

const navItems = [
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Login", href: "/login" },
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm border-bottom rounded-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-primary fs-4" href="/">
          MyBrand
        </a>

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
                <a className="nav-link text-dark fw-medium py-2 rounded hover-bg-light" href={item.href}>
                  {item.label}
                </a>
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
      </div>
    </nav>
  );
};

export default Navbar;
