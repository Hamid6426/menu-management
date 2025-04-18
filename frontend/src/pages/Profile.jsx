import React, { useEffect, useState } from "react";
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-red-600">User Profile</h2>
        <Link
          to="/add-allergies"
          className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-red-700"
        >
          Update Allergies
        </Link>
      </div>

      <div className="card bg-white shadow-lg p-6 rounded-lg">
        <p className="text-lg font-medium mb-2">
          <strong className="text-gray-700">Name:</strong> {user.name}
        </p>
        <p className="text-lg font-medium mb-2">
          <strong className="text-gray-700">Username:</strong> {user.username}
        </p>
        <p className="text-lg font-medium mb-2">
          <strong className="text-gray-700">Email:</strong> {user.email}
        </p>
        <p className="text-lg font-medium mb-4">
          <strong className="text-gray-700">Role:</strong> {user.role}
        </p>

        {user.restaurants?.length > 0 && (
          <div className="mb-4">
            <strong className="text-lg text-gray-700">Restaurants:</strong>
            <ul className="list-disc pl-6">
              {user.restaurants.map((res, index) => (
                <li key={index} className="text-gray-600">{res}</li>
              ))}
            </ul>
          </div>
        )}

        {user.allergies?.length > 0 && (
          <div>
            <strong className="text-lg text-gray-700">Allergies:</strong>
            <ul className="list-disc pl-6">
              {user.allergies.map((allergy, index) => (
                <li key={index} className="text-gray-600">{allergy}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
