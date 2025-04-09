import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const NotFoundPage = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center px-3">
        <h1 className="display-4 fw-bold mb-4" style={{ color: "#ff6600" }}>
          {t("notFoundPage.title")}
        </h1>
        <p className="lead mb-4">
          {t("notFoundPage.message")}{" "}
          <a href="/" className="text-decoration-underline" style={{ color: "#ff6600" }}>
            {t("notFoundPage.home")}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
