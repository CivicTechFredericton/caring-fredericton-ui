import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    whitelist: ['en'],
    ns: 'common',
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: false,
    },
    cache: {
      enabled: true,
      expirationTime: 24 * 60 * 60 * 1000,
    },
  });

export const getCurrentLanguage = () => {
  return i18n.language;
};

export const changeLanguage = (lang) => {
  return i18n.changeLanguage(lang);
};

export default i18n;
