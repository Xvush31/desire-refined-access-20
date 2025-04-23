
import React from "react";
import { DollarSign, Euro } from "lucide-react";

// Ajout d'USDT + icônes
const currencyOptions = [
  { code: "EUR", label: "€ Euro", icon: <Euro className="w-4 h-4 mr-1 text-[#8B5CF6]" /> },
  { code: "USD", label: "$ Dollar US", icon: <DollarSign className="w-4 h-4 mr-1 text-[#8B5CF6]" /> },
  { code: "USDT", label: "₮ USDT", icon: <DollarSign className="w-4 h-4 mr-1 text-[#8B5CF6]" /> }, // USDT utilise le $
];

interface CurrencySelectorProps {
  currency: string;
  onChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, onChange }) => {
  // On n'utilise plus de traduction ici

  return (
    <div className="relative flex items-center bg-[#221F26] rounded-lg px-3 py-2 border border-[#403E43] hover:border-[#8B5CF6] transition-colors group">
      {/* Icône de la devise sélectionnée */}
      {currencyOptions.find(opt => opt.code === currency)?.icon}
      <select
        className="bg-transparent text-white pl-1 pr-5 py-1 appearance-none outline-none cursor-pointer border-0 focus:ring-0 focus:outline-none"
        value={currency}
        onChange={e => onChange(e.target.value)}
        aria-label="Choix de la devise"
      >
        {currencyOptions.map((option) => (
          <option 
            key={option.code} 
            value={option.code}
          >
            {option.label}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8B5CF6]">
        ▼
      </span>
    </div>
  );
};

export default CurrencySelector;

