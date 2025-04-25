
import React from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { Globe } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface LanguageSelectorProps {
  compact?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { lang, setLang } = useLocale();

  return (
    <div className={`${compact ? 'scale-90' : ''}`}>
      <Select value={lang} onValueChange={(value) => setLang(value as "fr" | "en")}>
        <SelectTrigger 
          className={`w-[110px] bg-white/80 backdrop-blur-sm border border-pink-200 hover:bg-pink-50 hover:border-pink-300 text-gray-800 flex items-center gap-2 transition-colors ${
            compact ? 'h-8 text-sm' : 'h-10'
          }`}
        >
          <Globe className="w-4 h-4 text-pink-500" />
          <SelectValue placeholder="Langue" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-pink-200 text-gray-800">
          <SelectItem value="fr" className="hover:bg-pink-50 focus:bg-pink-50 cursor-pointer">
            FR
          </SelectItem>
          <SelectItem value="en" className="hover:bg-pink-50 focus:bg-pink-50 cursor-pointer">
            EN
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
