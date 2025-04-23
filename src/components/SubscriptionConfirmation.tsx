
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const SubscriptionConfirmation: React.FC = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
    <CheckCircle2 className="text-green-600 w-16 h-16 mb-3" />
    <h1 className="text-2xl font-semibold mb-2">Abonnement validé !</h1>
    <p className="text-muted-foreground mb-6">
      Merci pour votre paiement. Votre abonnement sera activé après confirmation par NOWPayments.<br />
      N'hésitez pas à contacter le support si vous ne voyez pas l'activation sous 15 minutes.
    </p>
    <Link to="/" className="text-brand-accent underline">Retour à l’accueil</Link>
  </div>
);

export default SubscriptionConfirmation;
