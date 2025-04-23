
import React from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { toast } from "sonner";

const WithdrawRequest: React.FC = () => {
  const { t } = useLocale();

  const handleWithdraw = () => {
    toast.success(t("dashboard.withdraw_confirm"));
  };

  return (
    <button
      onClick={handleWithdraw}
      className="mt-3 bg-brand-red text-white rounded px-3 py-2 hover:bg-brand-red/90 transition-colors micro-animation-pop w-full md:w-auto"
    >
      {t("dashboard.withdraw")}
    </button>
  );
};

export default WithdrawRequest;
