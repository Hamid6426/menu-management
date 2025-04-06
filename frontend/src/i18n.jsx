import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import it from './locales/it.json';
import ar from './locales/ar.json';

// Read language from localStorage or fall back to 'en'
const savedLang = localStorage.getItem('i18nextLng') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
    ar: { translation: ar },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
