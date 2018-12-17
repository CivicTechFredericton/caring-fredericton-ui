import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';

// this registers all files in the translations folder
// and make them available in the build. this does NOT
// actually import files, just a reference to the path
require.context('../../translations', true, /\.json/);

export const getCurrentLanguage = () => {
  return i18next.language;
};

export const changeLanguage = nextLang => {
  return i18next.changeLanguage(nextLang);
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
export default i18next.use(i18nextXHRBackend).init({
  lng: 'en',
  whitelist: ['en'],
  ns: 'common',
  backend: {
    loadPath: 'translations/{{lng}}/{{ns}}.json',
    addPath: 'translations/{{lng}}/{{ns}}.json',
  },
});
