import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt, FaUtensils, FaPhone, FaSignInAlt } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import LanguageSwitcher from "./LanguageSwitcher";
import { MdClose, MdDashboard } from "react-icons/md";

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

  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex w-full items-center justify-between bg-white px-6 py-3 shadow-sm">
      {/* Logo */}
      <button
        className="text-2xl font-bold text-red-600 hover:text-red-700 focus:outline-none"
        onClick={() => navigate("/")}
      >
        DIGIMENU
      </button>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 md:hidden">
        <LanguageSwitcher />
        <button
          className="flex cursor-pointer flex-col items-center hover:text-red-700 focus:outline-none"
          type="button"
          onClick={toggleMobileMenu} // Use the toggle function here
        >
          <svg
            className="h-6 w-6"
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
          <small className="text-xs">Menu</small>
        </button>
      </div>

      {/* Navbar Links */}
      <div className="hidden items-center space-x-6 md:flex" id="navbarNav">
        <LanguageSwitcher />

        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => (item.href ? navigate(item.href) : item.action?.())}
            className="flex flex-col items-center text-gray-800 transition-colors duration-300 hover:text-red-600"
          >
            <div>{item.icon}</div>
            <span className="text-xs">{t(item.labelKey)}</span>
          </button>
        ))}
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`fixed inset-0 z-50 bg-white md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobileMenu"
      >
        <button
          className="mt-3 mr-4 ml-auto flex cursor-pointer flex-col items-center hover:text-red-700 focus:outline-none"
          type="button"
          onClick={toggleMobileMenu} // Use the toggle function here
        >
          <MdClose className="text-lg" />
          <small className="text-xs">Menu</small>
        </button>
        <div className="flex h-full flex-col items-center justify-start mt-2 pt-6 border-t border-rose-200 space-y-3">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.href) navigate(item.href);
                if (item.action) item.action();
                setIsMobileMenuOpen(false); // Close mobile menu after an item is clicked
              }}
              className="flex w-60 cursor-pointer items-center justify-start gap-3 rounded-md border border-red-400 px-4 py-2 text-gray-800 transition-colors duration-300 hover:text-red-600"
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
