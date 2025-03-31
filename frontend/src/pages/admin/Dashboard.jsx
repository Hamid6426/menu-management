import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState(null);
  const { username } = useParams();
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

  if (error) {
    return <div>{error}</div>; // Show error before redirecting
  }

  return (
    <div>
      <h2>Welcome, {username}!</h2>
    </div>
  );
}
