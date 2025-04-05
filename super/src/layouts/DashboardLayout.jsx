import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <div style={{ width: "240px" }}>
        <DashboardNavbar />
      </div>
      <div className="p-4 flex-grow-1" style={{ overflowX: "auto", backgroundColor: "#333"  }}>
        <main className="py-3 px-4 bg-dark border-1 rounded-4 min-vh-100 text-white" style={{ }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
