
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Lang = "fr" | "en";

interface LocaleContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    "dashboard.currency": "Devise d'affichage",
    "dashboard.withdraw": "Demander un retrait",
    "dashboard.withdraw_confirm": "Votre demande de retrait a été prise en compte.",
    "dashboard.revenue": "Revenus",
    "dashboard.select_currency": "Sélectionnez la devise",
    "dashboard.language": "Langue",
    "dashboard.withdraw_description": "Votre demande de retrait sera traitée sous 48h.",
  },
  en: {
    "dashboard.currency": "Display currency",
    "dashboard.withdraw": "Request withdrawal",
    "dashboard.withdraw_confirm": "Your withdrawal request has been registered.",
    "dashboard.revenue": "Revenue",
    "dashboard.select_currency": "Select currency",
    "dashboard.language": "Language",
    "dashboard.withdraw_description": "Your withdrawal request will be processed within 48 hours.",
  }
};

const LocaleContext = createContext<LocaleContextProps>({
  lang: "fr",
  setLang: () => {},
  t: (key) => key,
});

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  const t = (key: string) => translations[lang][key] || key;
  return (
    <LocaleContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
