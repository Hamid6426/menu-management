import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SignUpAs() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-8">
        {t("signUpAs.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admin Sign Up Card */}
        <div className="bg-white rounded-lg shadow-md border-t-4 border-b-4 border-red-500 flex flex-col p-6 text-center">
          <h5 className="text-xl font-semibold text-red-600 mb-2">
            {t("signUpAs.admin.title")}
          </h5>
          <p className="text-sm text-gray-700 mb-4">{t("signUpAs.admin.description")}</p>
          <Link
            to="/admin-register"
            className="mt-auto bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition"
          >
            {t("signUpAs.admin.button")}
          </Link>
        </div>

        {/* User Sign Up Card */}
        <div className="bg-white rounded-lg shadow-md border-t-4 border-b-4 border-red-500 flex flex-col p-6 text-center">
          <h5 className="text-xl font-semibold text-red-600 mb-2">
            {t("signUpAs.user.title")}
          </h5>
          <p className="text-sm text-gray-700 mb-4">{t("signUpAs.user.description")}</p>
          <Link
            to="/user-register"
            className="mt-auto bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition"
          >
            {t("signUpAs.user.button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
