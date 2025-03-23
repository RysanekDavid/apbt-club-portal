import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import csTranslations from "./langs/cs";
import enTranslations from "./langs/en";

i18n.use(initReactI18next).init({
  resources: {
    cs: { translation: csTranslations },
    en: { translation: enTranslations },
  },
  lng: "cs",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
