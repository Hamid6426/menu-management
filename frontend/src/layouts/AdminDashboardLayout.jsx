import React from "react";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AdminDashboardLayout() {
  return (
    <div className="flex w-full">
      <AdminSidebar />
      <main className="flex-1">
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}
