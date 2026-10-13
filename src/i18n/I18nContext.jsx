import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages, rtlLanguages } from "./locales";

const Context = createContext(null);
const STORAGE_KEY = "seamoon-language";
const warnedMissingKeys = new Set();

export const I18nProvider = ({ children }) => {
  // English is intentional on a first visit; browser language is never consulted.
  const [language, setLanguage] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved && messages[saved] ? saved : "en";
    } catch { return "en"; }
  });

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = rtlLanguages.has(language) ? "rtl" : "ltr";
    html.dataset.language = language;
    const fontFamilies = {
      ur: "Noto+Nastaliq+Urdu:wght@400;500;700",
      ar: "Noto+Naskh+Arabic:wght@400;500;700",
      zh: "Noto+Sans+SC:wght@400;500;700",
      ja: "Noto+Sans+JP:wght@400;500;700",
      ko: "Noto+Sans+KR:wght@400;500;700",
      hi: "Noto+Sans+Devanagari:wght@400;500;700",
      ru: "Noto+Sans:wght@400;500;700",
    };
    const fontLinkId = "seamoon-locale-font";
    let fontLink = document.getElementById(fontLinkId);
    if (fontFamilies[language]) {
      if (!fontLink) {
        fontLink = document.createElement("link");
        fontLink.id = fontLinkId;
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
      }
      fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamilies[language]}&display=swap`;
    } else {
      fontLink?.remove();
    }
    try { window.localStorage.setItem(STORAGE_KEY, language); } catch { /* Storage may be disabled. */ }
  }, [language]);

  const localeByLanguage = {
    en: "en-US", ur: "ur-PK", de: "de-DE", fr: "fr-FR", es: "es-419", pt: "pt-BR",
    it: "it-IT", ar: "ar", tr: "tr-TR", ru: "ru-RU", zh: "zh-CN", ja: "ja-JP",
    ko: "ko-KR", hi: "hi-IN", pl: "pl-PL", nl: "nl-NL",
  };
  const locale = localeByLanguage[language] || "en-US";
  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key) => {
      const translated = messages[language]?.[key];
      if (translated != null && String(translated).length > 0) return translated;
      if (import.meta.env.DEV && !warnedMissingKeys.has(`${language}:${key}`)) {
        warnedMissingKeys.add(`${language}:${key}`);
        console.warn(`[i18n] Missing "${key}" in ${language}; showing English fallback.`);
      }
      return messages.en[key] ?? key;
    },
    formatNumber: (number, options) => new Intl.NumberFormat(locale, options).format(number),
    formatDate: (date, options) => new Intl.DateTimeFormat(locale, options).format(date),
    formatCurrency: (amount, currency = "USD", options = {}) => new Intl.NumberFormat(locale, {
      style: "currency", currency, ...options,
    }).format(amount),
  }), [language, locale]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useI18n = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
};

