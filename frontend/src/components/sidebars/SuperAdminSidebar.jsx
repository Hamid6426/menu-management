import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SuperAdminSidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  const decoded = jwtDecode(token);
  const { role } = decoded;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", path: "/super", allowedRoles: ["super-admin"] },
    { name: "Manage Users", path: "/super/manage-users", allowedRoles: ["super-admin"] },
    { name: "Manage Restaurants", path: "/super/manage-restaurants", allowedRoles: ["super-admin"] },
    { name: "Manage Dishes", path: "/super/manage-dishes", allowedRoles: ["super-admin"] },
    { name: "Profile", path: "/super/profile", allowedRoles: ["super-admin"] },
  ];

  const filteredLinks = links.filter((link) => link.allowedRoles.includes(role));

  return (
    <div>
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900 text-white shadow fixed w-full z-50 md:hidden">
        <button
          className="text-white border border-white px-3 py-1 rounded hover:bg-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <button
          onClick={handleLogout}
          className="text-white border border-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <div className="hidden md:block bg-gray-900 text-white p-4 fixed top-0 left-0 w-60 h-full z-40">
        <h4 className="text-center text-xl font-semibold mb-6">DIGIMENU PANEL</h4>
        <ul className="space-y-3">
          {filteredLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="block bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-medium text-white"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar (Mobile) */}
      {sidebarOpen && (
        <div className="block md:hidden">
          <ul className="flex flex-col bg-gray-900 text-white pt-20 fixed top-0 left-0 w-full h-full z-40 space-y-4">
            {filteredLinks.map((link, index) => (
              <li key={index} className="w-3/4 mx-auto">
                <Link
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className="block bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 text-center font-medium"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuperAdminSidebar;
