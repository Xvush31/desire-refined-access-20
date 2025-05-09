
import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { checkSubscription, formatExpiryDate, SubscriptionDetails } from "@/utils/subscriptionUtils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SubscriptionConfirmation: React.FC = () => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionDetails | null>(null);
  
  useEffect(() => {
    async function verifySubscription() {
      try {
        // Check if the user has an active subscription
        const details = await checkSubscription();
        setSubscriptionInfo(details);
      } catch (error) {
        console.error("Error verifying subscription:", error);
      } finally {
        setLoading(false);
      }
    }
    
    verifySubscription();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-accent mb-4" />
        <h2 className="text-xl font-medium">Vérification de votre abonnement...</h2>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CheckCircle2 className="text-green-600 w-16 h-16 mx-auto mb-3" />
          <CardTitle className="text-2xl">{t("subscription.confirm")}</CardTitle>
        </CardHeader>
        <CardContent>
          {subscriptionInfo?.active ? (
            <div className="space-y-4">
              <div className="p-4 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900">
                <p className="text-center">
                  {t("subscription.active_until")}{" "}
                  <span className="font-bold">
                    {formatExpiryDate(subscriptionInfo.expiresAt || '')}
                  </span>
                </p>
              </div>
              <p className="text-center">
                {t("subscription.tier")}: <span className="font-semibold">{subscriptionInfo.tier?.name}</span>
              </p>
            </div>
          ) : (
            <p className="text-center text-amber-600 dark:text-amber-400">
              {t("subscription.processing")}
            </p>
          )}
          
          <p className="text-center text-muted-foreground mt-4">
            {t("subscription.thanks")}<br />
            {t("subscription.support")}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/">{t("subscription.back")}</Link>
          </Button>
          <Button asChild>
            <Link to="/subscription">{t("subscription.manage")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionConfirmation;
