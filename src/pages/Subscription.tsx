
import React from "react";
import NowPaymentsSubscriptionButton from "@/components/NowPaymentsSubscriptionButton";
import SubscriptionPromoBanner from "@/components/SubscriptionPromoBanner";

const Subscription: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <SubscriptionPromoBanner tier="premium" />
      <h1 className="text-2xl font-semibold mb-4">Abonnement Premium</h1>
      <p className="text-muted-foreground mb-4">
        Accédez à toutes les fonctionnalités exclusives dès maintenant grâce au paiement par crypto avec NOWPayments.
      </p>
      <NowPaymentsSubscriptionButton />
      <div className="text-xs text-muted-foreground mt-6">
        Paiement 100% sécurisé via NOWPayments. La gestion et l’état de l’abonnement seront disponibles ici prochainement.
      </div>
    </div>
  );
};

export default Subscription;
