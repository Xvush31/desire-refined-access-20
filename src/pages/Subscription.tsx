
import React from "react";
import NowPaymentsSubscriptionButton from "@/components/NowPaymentsSubscriptionButton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const Subscription: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <Card className="border-border/40 bg-card/80 backdrop-blur">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Abonnement Premium</h1>
          <p className="text-muted-foreground">
            Accédez à toutes les fonctionnalités exclusives dès maintenant grâce au paiement par crypto avec NOWPayments.
          </p>
        </CardHeader>
        <CardContent>
          <NowPaymentsSubscriptionButton />
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Paiement 100% sécurisé via NOWPayments. La gestion et l'état de l'abonnement seront disponibles ici prochainement.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Subscription;
