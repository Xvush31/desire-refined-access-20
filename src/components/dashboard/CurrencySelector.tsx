
import React from "react";
import { useLocale } from "@/contexts/LocaleContext";

const currencyOptions = [
  { code: "EUR", label: "€ Euro" },
  { code: "USD", label: "$ Dollar US" },
  { code: "GBP", label: "£ Pound" },
];

interface CurrencySelectorProps {
  currency: string;
  onChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, onChange }) => {
  const { t } = useLocale();

  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-muted-foreground text-sm">{t("dashboard.currency")}:</label>
      <select
        className="bg-card text-white rounded border px-2 py-1 outline-none"
        value={currency}
        onChange={e => onChange(e.target.value)}
      >
        {currencyOptions.map((option) => (
          <option key={option.code} value={option.code}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
