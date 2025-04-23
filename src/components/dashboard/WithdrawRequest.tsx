
import React from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";

const WithdrawRequest: React.FC = () => {
  const { t } = useLocale();

  const handleWithdraw = () => {
    toast.success(t("dashboard.withdraw_confirm"), {
      description: t("dashboard.withdraw_description")
    });
  };

  return (
    <Button 
      variant="default" 
      size="lg" 
      className="w-full md:w-auto flex items-center gap-2 bg-gradient-to-r from-[#ff8ba7] to-[#ffc6c7] hover:opacity-90 transition-all duration-300"
      onClick={handleWithdraw}
    >
      <DollarSign className="h-5 w-5" />
      {t("dashboard.withdraw")}
    </Button>
  );
};

export default WithdrawRequest;
