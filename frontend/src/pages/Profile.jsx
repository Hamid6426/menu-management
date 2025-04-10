import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axiosInstance.get("/users/profile");
        setUser(response.data.user);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="text-center py-5">Loading profile...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!user) return null;

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>User Profile</h2>
        <Link
          to="/add-allergies"
          className="nav-link d-flex flex-column align-items-center px-3 py-2 justify-content-center"
          style={{ backgroundColor: "#ff6600", color:"#fff", transition: "all 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF")}
        >
          Update Allergies
        </Link>
      </div>
      <div className="card shadow-sm p-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        {user.restaurants?.length > 0 && (
          <div className="mb-3">
            <strong>Restaurants:</strong>
            <ul className="mb-0">
              {user.restaurants.map((res, index) => (
                <li key={index}>{res}</li>
              ))}
            </ul>
          </div>
        )}

        {user.allergies?.length > 0 && (
          <div>
            <strong>Allergies:</strong>
            <ul className="mb-0">
              {user.allergies.map((allergy, index) => (
                <li key={index}>{allergy}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
