import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function DashboardLayout() {
  return (
    <div className="w-100 d-flex">
      <DashboardSidebar />
      <main className="w-100">
        <Breadcrumbs/>
        <Outlet />
      </main>
    </div>
  );
}
