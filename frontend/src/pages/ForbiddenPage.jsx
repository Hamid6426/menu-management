import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="text-center px-3">
      <h1 className="display-4 fw-bold mb-4" style={{ color: '#ff6600' }}>
        {t('forbiddenPage.title')}
      </h1>
  
      <p className="lead mb-4">
        {t('forbiddenPage.message')}{' '}
        <Link
          to="/login"
          className="text-decoration-underline"
          style={{ color: '#ff6600' }}
        >
          {t('forbiddenPage.loginLink')}
        </Link>{' '}
        {t('forbiddenPage.assistance')}{' '}
        <Link
          to="/contact"
          className="text-decoration-underline"
          style={{ color: '#ff6600' }}
        >
          {t('forbiddenPage.contactLink')}
        </Link>{' '}
        {t('forbiddenPage.assistance')}
      </p>
    </div>
  </div>
  
  );
};

export default ForbiddenPage;
