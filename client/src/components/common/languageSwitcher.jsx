import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/languageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switcher">
      <button
        className={`language-button ${i18n.language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
      <button
        className={`language-button ${i18n.language === "es" ? "active" : ""}`}
        onClick={() => changeLanguage("es")}
      >
        Español
      </button>
    </div>
  );
}

export default LanguageSwitcher;
