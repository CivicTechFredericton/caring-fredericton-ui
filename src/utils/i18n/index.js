// import i18next from 'i18next';
// import i18nextXHRBackend from 'i18next-xhr-backend';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

// this registers all files in the translations folder
// and make them available in the build. this does NOT
// actually import files, just a reference to the path
require.context('../../../public/translations/', true, /\.json/);

export const getCurrentLanguage = () => {
  return i18n.language;
};

export const changeLanguage = nextLang => {
  return i18n.changeLanguage(nextLang);
};

/**
  Here you can define your i18n configuration.
  Right now it makes two assumptions:
  1. The only allowed language is en (this is easy to change)
  2. Your translations existing at the root of the project in the translations/
     folder and are named following the convention /language-code/namespace.json
  If those two conditions are met, you only need to ensure that you define
  the correct namespaces along with your containers and you should be good
  to go.
**/

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    whitelist: ['en'],
    ns: 'common',
    backend: {
      loadPath: '../translations/{{lng}}/{{ns}}.json',
      addPath: '../translations/{{lng}}/{{ns}}.json',
    },
    react: {
      // **** BROWSER WARNING *******
      // the wait option throws browser warning
      // -> "warning: Did not expect server HTML to contain a <div> in <div>."
      // it causes the screen to flash when the page is refreshed / loading
      wait: process && !process.release,
      bindI18n: false,
      bindStore: false,
      nsMode: 'default',
      useSuspense: false,
    },
    // if react { } is commented out and replaced by initImmediate,
    // the browser warning disappears. However, the browser
    // shows translation missing before it initialises
    // initImmediate: !(process && !process.release),

    cache: {
      enabled: true,
      expirationTime: 24 * 60 * 60 * 1000,
    },
  });

export default i18n;
