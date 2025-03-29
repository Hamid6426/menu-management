import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token and validate its expiration
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/login" />;
    }

    // Parse stored user data and check for allowed roles if provided
    const parsedUser = JSON.parse(user);
    if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  // Token exists, is valid, and user role is authorized—render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
