import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="bg-dark text-white d-flex flex-column justify-content-center align-items-center gap-3 min-vh-100 w-100">
      <h2>WELCOME TO ADMIN PANEL OF MENU MANAGEMENT</h2>
      <Link to={"/login"} className="btn btn-success fw-bold" style={{ fontSize: "1.5rem" }}>LOGIN</Link>
    </div>
  );
}
