
import React, { useEffect, useState } from "react";
import NowPaymentsSubscriptionButton from "@/components/NowPaymentsSubscriptionButton";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Shield, Star, Zap, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { checkSubscription, formatExpiryDate, SubscriptionDetails } from "@/utils/subscriptionUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Subscription: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionDetails | null>(null);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubscriptionDetails() {
      try {
        const details = await checkSubscription();
        setSubscriptionInfo(details);
        
        // Also load available subscription tiers
        const { data: tiers } = await supabase
          .from("subscription_tiers")
          .select("*")
          .eq("is_active", true)
          .order("price_usdt");
          
        if (tiers && tiers.length > 0) {
          setSelectedTierId(tiers[0].id);
        }
      } catch (err) {
        console.error("Error loading subscription:", err);
        toast.error("Impossible de charger les informations d'abonnement");
      } finally {
        setLoading(false);
      }
    }
    
    loadSubscriptionDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full border-border/40 bg-gradient-to-br from-[#1A1F2C] to-[#2D3748] backdrop-blur-xl shadow-xl">
          <CardHeader className="space-y-4">
            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user has an active subscription
  if (subscriptionInfo?.active) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full border-border/40 bg-gradient-to-br from-[#1A1F2C] to-[#2D3748] backdrop-blur-xl shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white p-3 rounded-full w-fit">
              <Check size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] bg-clip-text text-transparent">
              Abonnement Actif
            </h1>
            <p className="text-gray-300 text-lg">
              Vous êtes abonné{" "}
              <span className="font-bold">{subscriptionInfo.tier?.name || "Premium"}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-opacity-20 bg-green-900 border border-green-700">
              <p className="text-center">
                Votre abonnement expire le{" "}
                <span className="font-bold">
                  {subscriptionInfo.expiresAt ? formatExpiryDate(subscriptionInfo.expiresAt) : "N/A"}
                </span>
              </p>
            </div>
            
            <div className="space-y-4">
              {subscriptionInfo.tier?.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-200">
                  <Check className="text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-400 justify-center flex-col space-y-2">
            <p>Profitez de votre accès premium!</p>
            <p className="text-xs">L'abonnement se renouvelle automatiquement.</p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Default view for non-subscribed users
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full border-border/40 bg-gradient-to-br from-[#1A1F2C] to-[#2D3748] backdrop-blur-xl shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto bg-gradient-to-r from-[#e91e63] to-[#ff9800] text-white p-3 rounded-full w-fit">
            <Star size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#e91e63] to-[#ff9800] bg-clip-text text-transparent">
            Abonnement Premium
          </h1>
          <p className="text-gray-300 text-lg">
            Accédez à toutes les fonctionnalités exclusives dès maintenant
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-200">
              <Zap className="text-[#e91e63]" />
              <span>Accès illimité au contenu premium</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <Star className="text-[#ff9800]" />
              <span>Support prioritaire 24/7</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <Shield className="text-[#e91e63]" />
              <span>Paiement 100% sécurisé via NOWPayments</span>
            </div>
          </div>
          <NowPaymentsSubscriptionButton 
            productName="Abonnement Premium"
            amount={9.99}
            tierId={selectedTierId || undefined}
          />
        </CardContent>
        <CardFooter className="text-xs text-gray-400 justify-center">
          La gestion et l'état de l'abonnement seront disponibles ici après votre souscription.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Subscription;
