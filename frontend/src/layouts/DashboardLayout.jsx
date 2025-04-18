import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function DashboardLayout() {
  return (
    <div className="flex w-full">
      <DashboardSidebar />
      <main className="flex-1">
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}
