import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          {t('forbiddenPage.title')}
        </h1>

        <p className="text-lg mb-4">
          {t('forbiddenPage.message')}{' '}
          <Link
            to="/login"
            className="underline text-red-600 hover:text-red-800"
          >
            {t('forbiddenPage.loginLink')}
          </Link>{' '}
          {t('forbiddenPage.assistance')}{' '}
          <Link
            to="/contact"
            className="underline text-red-600 hover:text-red-800"
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
