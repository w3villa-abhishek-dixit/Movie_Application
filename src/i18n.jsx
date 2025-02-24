import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./Context/translations"; // Import translations.js

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translations.en },
    es: { translation: translations.es },
    fr: { translation: translations.fr }
  },
  lng: localStorage.getItem("lang") || "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;