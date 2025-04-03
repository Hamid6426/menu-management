import { jwtDecode } from "jwt-decode";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DashboardNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return null;
  }

  const decoded = jwtDecode(token);
  const username = decoded.username;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-1">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto gap-2">
          <li className="nav-item">
            <Link className="nav-link fw-semibold text-primary border border-primary rounded px-3 py-1" to="/admin/dashboard">
              {t('dashboardNavbar.dashboard')}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold text-primary border border-primary rounded px-3 py-1" to="/admin/manage-restaurants">
              {t('dashboardNavbar.manageRestaurants')}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold text-primary border border-primary rounded px-3 py-1" to="/admin/manage-staff">
              {t('dashboardNavbar.manageStaff')}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold text-primary border border-primary rounded px-3 py-1" to="/admin/settings">
              {t('dashboardNavbar.settings')}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold text-primary border border-primary rounded px-3 py-1" to="/admin/profile">
              {t('dashboardNavbar.profile')}
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
          {t('dashboardNavbar.logout')}
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
