
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";

const SubscriptionConfirmation: React.FC = () => {
  const { t } = useLocale();
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
      <CheckCircle2 className="text-green-600 w-16 h-16 mb-3" />
      <h1 className="text-2xl font-semibold mb-2">{t("subscription.confirm")}</h1>
      <p className="text-muted-foreground mb-6">
        {t("subscription.thanks")}<br />
        {t("subscription.support")}
      </p>
      <Link to="/" className="text-brand-accent underline">{t("subscription.back")}</Link>
    </div>
  );
};

export default SubscriptionConfirmation;
