
import React from "react";
import { DollarSign, Euro } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Ajout d'USDT + icônes
const currencyOptions = [
  { code: "EUR", label: "€ Euro", icon: <Euro className="w-4 h-4 text-pink-500" /> },
  { code: "USD", label: "$ Dollar US", icon: <DollarSign className="w-4 h-4 text-pink-500" /> },
  { code: "USDT", label: "₮ USDT", icon: <DollarSign className="w-4 h-4 text-pink-500" /> },
  { code: "GBP", label: "£ Livre", icon: <DollarSign className="w-4 h-4 text-pink-500" /> },
];

interface CurrencySelectorProps {
  currency: string;
  onChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, onChange }) => {
  const selectedOption = currencyOptions.find(opt => opt.code === currency);

  return (
    <div>
      <Select value={currency} onValueChange={onChange}>
        <SelectTrigger 
          className="w-[140px] bg-white/80 backdrop-blur-sm border border-pink-200 hover:bg-pink-50 hover:border-pink-300 text-gray-800 flex items-center gap-2 transition-colors"
        >
          {selectedOption?.icon}
          <SelectValue placeholder="Devise" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-pink-200 text-gray-800">
          {currencyOptions.map((option) => (
            <SelectItem 
              key={option.code} 
              value={option.code}
              className="hover:bg-pink-50 focus:bg-pink-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
