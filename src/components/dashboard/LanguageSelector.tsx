
import React, { useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { Globe } from "lucide-react";

const LanguageSelector: React.FC = () => {
  const { lang, setLang } = useLocale();

  return (
    <div className="relative flex items-center bg-[#221F26] rounded-lg px-3 py-2 border border-[#403E43] hover:border-[#8B5CF6] transition-colors group">
      <Globe className="w-4 h-4 mr-1 text-[#8B5CF6]" />
      <select
        className="bg-transparent text-white pl-1 pr-5 py-1 appearance-none outline-none cursor-pointer border-0 focus:ring-0 focus:outline-none"
        value={lang}
        onChange={e => setLang(e.target.value as "fr" | "en")}
        aria-label="Choix de la langue"
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
      {/* Chevron */}
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8B5CF6]">
        ▼
      </span>
    </div>
  );
};

export default LanguageSelector;
