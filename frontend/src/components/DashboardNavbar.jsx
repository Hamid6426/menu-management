import React from "react";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.userId;

  return (
    <>
      <style>{`
        .dashboard-navbar {
          display: flex;
          flex-wrap: nowrap;
          align-items: center; /* Added missing semicolon */
        }
        .dashboard-navbar .nav-link {
          font-weight: 600;
          color: #90f;
          background-color: #fff;
          border: 1px solid #90f;
          border-radius: 8px;
          transition: background-color 0.2s ease-in-out;
          margin-right: 0.5rem;
          width: fit-content;
          text-wrap: nowrap;
        }
        .dashboard-navbar .nav-link:hover {
          background-color: #fff;
          color: #f0f;
          text-decoration: none;
        }
        /* Container for horizontal scrolling on small screens */
        .wrapper {
          overflow-x: auto;
        }
        @media (min-width: 800px) {
          .wrapper {
            overflow-x: visible;
          }
        }
      `}</style>

      <nav className="dashboard-navbar wrapper nav bg-light border-bottom container-fluid p-3">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link" to={`/dashboard/${userId}/restaurants`}>
          Manage Restaurants
        </Link>
        <Link className="nav-link" to="/dashboard/add-manager">
          Manage Users
        </Link>
        <Link className="nav-link" to="/dashboard/settings">
          Settings
        </Link>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
        <button className="btn btn-outline-danger">Logout</button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
