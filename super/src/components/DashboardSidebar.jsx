import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State to determine if the screen width is less than 768px
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to update the isMobile state based on window width
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    // If token is not present, redirect to login
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Attach resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!token) return null;

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
    { name: "Profile", path: "/dashboard/profile", allowedRoles: ["super-admin"] },
  ];

  const filteredLinks = links.filter((link) => link.allowedRoles.includes(role));

  return (
    <div>
      {/* Top Navbar always visible */}
      <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-dark text-white shadow-sm position-fixed w-100">
        <button className="btn btn-outline-light" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>

      {/* Sidebar visible only on screens wider than 768px */}
      {!isMobile && (
        <div
          className="text-light p-3 bg-dark position-fixed top-0"
          style={{
            width: "15rem",
            minHeight: "100vh",
            left: 0,
            zIndex: "1050",
          }}
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
        </div>
      )}
      {isMobile && sidebarOpen && (
        <div>
          <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-dark text-white shadow-sm position-fixed w-100">
            <button className="btn btn-outline-light" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
          <ul className="nav flex-column mb-auto pt-5 position-absolute bg-dark z-3 w-100 h-100" style={{ top: "3.4rem"}}>
            {filteredLinks.map((link, index) => (
              <li className="nav-item mb-2 w-50 mx-auto" key={index}>
                <Link
                  to={link.path}
                  className="nav-link text-light fw-semibold rounded bg-success px-3 py-2"
                  style={{ textDecoration: "none" }}
                  onClick={() => setSidebarOpen(false)} // close sidebar on link click (mobile UX)
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

export default AdminSidebar;
