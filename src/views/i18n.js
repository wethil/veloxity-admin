import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LngDetector from 'i18next-browser-languagedetector';


import en from '../../i18n/en.json';
import tr from '../../i18n/tr.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LngDetector)
  .init({
    resources: {
      en: {
        translation: en
      },
      tr: {
        translation: tr
      }
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
