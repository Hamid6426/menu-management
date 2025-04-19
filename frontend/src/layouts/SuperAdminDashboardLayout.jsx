import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../components/sidebars/SuperAdminSidebar";

export default function SuperAdminDashboardLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Function to update the isMobile state based on window width
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Attach resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-vh-100">
      {!isMobile ? (
        <div style={{ width: "15rem" }}>
          <SuperAdminSidebar />
        </div>
      ) : (
        <div>
          <SuperAdminSidebar />
        </div>
      )}

      {!isMobile ? (
        <div className="min-vh-100" style={{ marginLeft: "16rem" }}>
          <Outlet />
        </div>
      ) : (
        <div className="min-vh-100">
          <Outlet />
        </div>
      )}
    </div>
  );
}
