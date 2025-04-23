
import React from "react";
import { useLocale } from "@/contexts/LocaleContext";

const LanguageSelector: React.FC = () => {
  const { lang, setLang, t } = useLocale();

  return (
    <div className="flex items-center gap-2">
      <label className="text-muted-foreground text-sm">{t("dashboard.language")}:</label>
      <select
        className="bg-card text-white border rounded px-2 py-1"
        value={lang}
        onChange={e => setLang(e.target.value as "fr" | "en")}
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
