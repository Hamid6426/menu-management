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

const AdminSidebar = () => {
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
    {
      to: "/admin/dashboard",
      icon: <FaTachometerAlt />,
      title: t("dashboardNavbar.dashboard"),
    },
    {
      to: "/admin/manage-restaurants",
      icon: <FaUtensils />,
      title: t("dashboardNavbar.manageRestaurants"),
    },
    {
      to: "/profile",
      icon: <FaUserCircle />,
      title: t("dashboardNavbar.profile"),
    },
  ];

  return (
    <div
      className="flex h-screen flex-col items-center bg-gray-100 py-3"
      style={{ width: "3rem" }}
    >
      {links.map(({ to, icon, title }, index) => (
        <Link
          key={index}
          to={to}
          className="mb-6 text-xl text-gray-700 hover:text-red-500"
          title={title}
        >
          {icon}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="mt-auto rounded-full p-2 text-xl text-gray-700 transition duration-200 ease-in-out  hover:text-red-500"
        title={t("dashboardNavbar.logout")}
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default AdminSidebar;
