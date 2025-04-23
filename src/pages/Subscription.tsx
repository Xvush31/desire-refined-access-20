
import React from "react";
import NowPaymentsSubscriptionButton from "@/components/NowPaymentsSubscriptionButton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Shield, Star, Zap } from "lucide-react";

const Subscription: React.FC = () => {
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
          <NowPaymentsSubscriptionButton />
        </CardContent>
        <CardFooter className="text-xs text-gray-400 justify-center">
          La gestion et l'état de l'abonnement seront disponibles ici prochainement.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Subscription;
