import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-full pt-5">
        <Outlet />
      </div>
    </div>
  );
}
