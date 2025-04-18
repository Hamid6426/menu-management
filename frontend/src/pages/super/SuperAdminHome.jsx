import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function SuperAdminHome() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900 text-white flex flex-col justify-center items-center gap-6 min-h-screen w-full">
      <h2 className="text-3xl font-semibold text-center">
        {t("WELCOME TO ADMIN PANEL OF MENU MANAGEMENT")}
      </h2>
      <Link
        to={"/login"}
        className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg text-xl transition-transform transform hover:scale-105"
      >
        {t("LOGIN")}
      </Link>
    </div>
  );
}
