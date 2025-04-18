import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      if (!decoded.userId) {
        throw new Error("Invalid token structure");
      }
    } catch (error) {
      console.error("Token decoding error:", error);
      setError("Invalid token. Please log in again.");
      localStorage.removeItem("token");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const username = decoded.username;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    ); // Show error before redirecting
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Welcome, {username}!
        </h2>
      </div>
    </div>
  );
}
