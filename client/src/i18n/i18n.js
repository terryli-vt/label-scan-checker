import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translations (we'll create them in the next step)
import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      es: {
        translation: translationES,
      },
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
      escapeValue: false, // not needed for React
    },
  });

export default i18n;
