import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#333" }}>
      <Outlet />
    </div>
  );
}
