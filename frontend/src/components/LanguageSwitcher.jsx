import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown">
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        {t('languageSwitcher.selectLanguage')} {/* Using t() for translated button text */}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>{t('languageSwitcher.english')}</button></li>
        <li><button className="dropdown-item" onClick={() => changeLanguage('it')}>{t('languageSwitcher.italian')}</button></li>
        <li><button className="dropdown-item" onClick={() => changeLanguage('ar')}>{t('languageSwitcher.arabic')}</button></li>
      </ul>
    </div>
  );
}

export default LanguageSwitcher;
