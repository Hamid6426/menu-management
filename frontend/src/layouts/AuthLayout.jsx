import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  return (
    <div className="d-flex flex-column w-100 vh-100">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center h-100 pt-5">
      <Outlet />
      </div>
    </div>
  );
}
