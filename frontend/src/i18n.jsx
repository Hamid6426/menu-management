import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import en from './locales/en.json';
import it from './locales/it.json';
import ar from './locales/ar.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
    ar: { translation: ar },
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language when the chosen language translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
