import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function DashboardLayout() {
  return (
    <div className="d-flex flex-column justify-content-center">
      <DashboardNavbar />
      <main>
        <Breadcrumbs/>
        <Outlet />
      </main>
    </div>
  );
}
