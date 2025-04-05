import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-4">{t("forbiddenPage.title")}</h1>
        <p className="lead mb-4">
          {t("forbiddenPage.message")}
          <Link to={"/login"} className="text-decoration-underline">
            {t("forbiddenPage.loginLink")}
          </Link>{" "}
          {t("forbiddenPage.assistance")}{" "}
          <Link to={"/contact"} className="text-decoration-underline">
            {t("forbiddenPage.contactLink")}
          </Link>{" "}
          {t("forbiddenPage.assistance")}
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
