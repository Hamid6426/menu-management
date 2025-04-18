import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const NotFoundPage = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-orange-600">
          {t("notFoundPage.title")}
        </h1>
        <p className="text-lg mb-4">
          {t("notFoundPage.message")}{" "}
          <a
            href="/"
            className="underline text-orange-600 hover:text-orange-800"
          >
            {t("notFoundPage.home")}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
