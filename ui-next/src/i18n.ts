import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';


i18n
  .use(Backend)
  .use(initReactI18next) 
  .init({
    lng: "en", // текущий язык
    fallbackLng: "en", // язык по умолчанию
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false // для React не нужно экранировать
    },
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
    },

  });

export default i18n;
