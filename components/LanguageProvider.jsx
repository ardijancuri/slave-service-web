"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../lib/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("mk");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("slave-language");
    const timer = window.setTimeout(() => {
      if (savedLanguage === "en") setLanguage("en");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("slave-language", language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t: translations[language] }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
