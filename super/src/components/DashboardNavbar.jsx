import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return null;
  }

  const decoded = jwtDecode(token);
  const { role } = decoded;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", path: "/dashboard", allowedRoles: ["super-admin"] },
    { name: "Manage Users", path: "/dashboard/manage-users", allowedRoles: ["super-admin"] },
    { name: "Manage Restaurants", path: "/dashboard/manage-restaurants", allowedRoles: ["super-admin"] },
    { name: "Manage Dishes", path: "/dashboard/manage-dishes", allowedRoles: ["super-admin"] },
    { name: "Add User", path: "/dashboard/manage-users/add-user", allowedRoles: ["super-admin"] },
    { name: "Add Restaurant", path: "/dashboard/manage-restaurants/add-restaurant", allowedRoles: ["super-admin"] },
    { name: "Add Dish", path: "/dashboard/manage-dishes/add-dish", allowedRoles: ["super-admin"] },
    { name: "Profile", path: "/dashboard/profile", allowedRoles: ["super-admin"] },
  ];

  const filteredLinks = links.filter((link) => link.allowedRoles.includes(role));

  return (
    <div
      className="d-flex flex-column bg-dark text-light p-3"
      style={{ width: "240px", minHeight: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      <h4 className="mb-4 text-center text-white">Dashboard</h4>

      <ul className="nav flex-column mb-auto">
        {filteredLinks.map((link, index) => (
          <li className="nav-item mb-2" key={index}>
            <Link
              to={link.path}
              className="nav-link text-light fw-semibold rounded bg-success px-3 py-2"
              style={{ textDecoration: "none" }}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "auto" }}>
        <button onClick={handleLogout} className="btn btn-outline-danger w-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
