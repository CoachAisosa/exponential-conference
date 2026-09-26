import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Load saved language from localStorage, default to English
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("preferredLanguage");
    return saved === "fr" ? "fr" : "en";
  });

  // Persist to localStorage whenever lang changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", lang);
  }, [lang]);

  // Simple translation function: t("home") → "Accueil" (in French)
  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  // Get the OTHER language (for the toggle button)
  const otherLang = lang === "en" ? "fr" : "en";

  const toggleLanguage = () => setLang(otherLang);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, toggleLanguage, otherLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}