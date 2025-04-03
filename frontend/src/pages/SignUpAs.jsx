import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SignUpAs() {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{t('signUpAs.title')}</h2>
      <div className="row">
        {/* Admin Sign Up Card */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">{t('signUpAs.admin.title')}</h5>
              <p className="card-text">
                {t('signUpAs.admin.description')}
              </p>
              <Link to={"/admin-register"} className="btn btn-primary mt-auto">
                {t('signUpAs.admin.button')}
              </Link>
            </div>
          </div>
        </div>
        {/* User Sign Up Card */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">{t('signUpAs.user.title')}</h5>
              <p className="card-text">
                {t('signUpAs.user.description')}
              </p>
              <Link to={"/user-register"} className="btn btn-success mt-auto">
                {t('signUpAs.user.button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
