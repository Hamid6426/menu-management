import React from "react";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AdminDashboardLayout() {
  return (
    <div className="flex w-full">
      <div className="fixed">
      <AdminSidebar />
      </div>
      <main className="flex-1 ml-12">
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}
