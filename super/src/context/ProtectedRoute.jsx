import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token and validate its expiration
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    // Parse stored user data and check for allowed roles if provided
    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  // Token exists, is valid, and user role is authorized—render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
