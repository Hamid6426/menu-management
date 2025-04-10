import { jwtDecode } from "jwt-decode";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaTachometerAlt,
  FaUtensils,
  FaUsersCog,
  FaCogs,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardSidebar = () => {
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

  const links = [
    { to: "/admin/dashboard", icon: <FaTachometerAlt />, title: t("dashboardNavbar.dashboard") },
    { to: "/admin/manage-restaurants", icon: <FaUtensils />, title: t("dashboardNavbar.manageRestaurants") },
    { to: "/admin/manage-staff", icon: <FaUsersCog />, title: t("dashboardNavbar.manageStaff") },
    { to: "/admin/settings", icon: <FaCogs />, title: t("dashboardNavbar.settings") },
    { to: "/admin/profile", icon: <FaUserCircle />, title: t("dashboardNavbar.profile") },
  ];

  return (
    <div className="d-flex flex-column align-items-center vh-100 py-3" style={{ width: "3rem", backgroundColor:"#eee", }}>
      {links.map(({ to, icon, title }, index) => (
        <Link
          key={index}
          to={to}
          className="mb-3 text-primary"
          title={title}
          style={{ textDecoration: "none" }}
        >
          {icon}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="btn btn-sm btn-outline-danger mt-auto"
        title={t("dashboardNavbar.logout")}
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default DashboardSidebar;
