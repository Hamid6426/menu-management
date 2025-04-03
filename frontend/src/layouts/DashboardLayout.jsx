import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function DashboardLayout() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center">
      <DashboardNavbar />
      <main className="px-3">
        <Breadcrumbs/>
        <Outlet />
      </main>
    </div>
  );
}
