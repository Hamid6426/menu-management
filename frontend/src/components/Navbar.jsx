import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt, FaUtensils, FaPhone, FaSignInAlt } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import LanguageSwitcher from "./LanguageSwitcher";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const notLoggedNavItems = [
    {
      labelKey: "navbar.restaurants",
      href: "/restaurants",
      icon: <FaUtensils className="text-xl" />,
    },
    {
      labelKey: "navbar.contact",
      href: "/contact",
      icon: <FaPhone className="text-xl" />,
    },
    {
      labelKey: "navbar.login",
      href: "/login",
      icon: <FaSignInAlt className="text-xl" />,
    },
  ];

  const loggedNavItems = [
    {
      labelKey: "navbar.contact",
      href: "/contact",
      icon: <FaPhone className="text-xl" />,
    },
    {
      labelKey: "navbar.restaurants",
      href: "/restaurants",
      icon: <FaUtensils className="text-xl" />,
    },
    {
      labelKey: "navbar.dashboard",
      href: "/admin/dashboard",
      icon: <MdDashboard className="text-xl" />,
    },
    {
      labelKey: "navbar.profile",
      href: "/profile",
      icon: <RiAccountCircleFill className="text-xl" />,
    },
    {
      labelKey: "navbar.logout",
      action: handleLogout,
      icon: <FaSignOutAlt className="text-xl" />,
    },
  ];

  const navItems = token ? loggedNavItems : notLoggedNavItems;

  return (
    <nav className="w-full flex justify-between items-center border-b rounded-b-lg bg-white px-6 py-3 shadow-sm">
      {/* Logo */}
      <button
        className="text-2xl font-bold text-orange-600 hover:text-orange-700 focus:outline-none"
        onClick={() => navigate("/")}
      >
        MENU MANAGEMENT
      </button>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          className="text-orange-600 hover:text-orange-700 focus:outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navbar Links */}
      <div className="hidden lg:flex items-center space-x-6" id="navbarNav">
        <LanguageSwitcher />

        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => item.href ? navigate(item.href) : item.action?.()}
            className="flex flex-col items-center text-gray-800 hover:text-orange-600 transition-colors duration-300"
          >
            <div>{item.icon}</div>
            <span className="text-xs">{t(item.labelKey)}</span>
          </button>
        ))}
      </div>

      {/* Mobile Menu Content - would need JavaScript to handle collapse */}
      <div className="lg:hidden fixed inset-0 bg-white z-50 hidden" id="mobileMenu">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <LanguageSwitcher />
          
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.href) navigate(item.href);
                if (item.action) item.action();
                // Close mobile menu here
              }}
              className="flex flex-col items-center text-gray-800 hover:text-orange-600 transition-colors duration-300"
            >
              <div>{item.icon}</div>
              <span className="text-sm">{t(item.labelKey)}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;