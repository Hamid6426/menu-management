import React from "react";
import { useTranslation } from "react-i18next";  // Import useTranslation hook

const NotFoundPage = () => {
  const { t } = useTranslation();  // Initialize useTranslation

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-4">{t("notFoundPage.title")}</h1>
        <p className="lead mb-4">
          {t("notFoundPage.message")}{" "}
          <a href="/" className="text-decoration-underline">
            {t("notFoundPage.home")}
          </a>.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
