
import React from "react";
import SubscriptionTier, { SubscriptionTierData } from "./SubscriptionTier";

interface SubscriptionPanelProps {
  performerId: number;
  onSubscribe: (tierId: string) => void;
  className?: string;
}

const SubscriptionPanel: React.FC<SubscriptionPanelProps> = ({
  performerId,
  onSubscribe,
  className = ""
}) => {
  // Données pour les trois niveaux d'abonnement
  const subscriptionTiers: SubscriptionTierData[] = [
    {
      id: `${performerId}-fan`,
      name: "Fan",
      price: 7,
      period: "month",
      description: "L'essentiel pour débuter",
      color: "from-blue-500 to-cyan-500",
      features: [
        { text: "Accès à tout le contenu standard", icon: "check" },
        { text: "Messages privés (réponse sous 48h)", icon: "message" },
        { text: "Contenu exclusif hebdomadaire", icon: "video" },
        { text: "1 demande de contenu personnalisé / mois", icon: "star" }
      ],
      trial: {
        days: 7,
        price: 1
      }
    },
    {
      id: `${performerId}-superfan`,
      name: "Super-Fan",
      price: 19,
      period: "month",
      description: "Notre offre la plus populaire",
      color: "from-pink-500 to-purple-500",
      popular: true,
      features: [
        { text: "Tout ce qu'inclut Fan +", icon: "check", highlight: true },
        { text: "Sessions live hebdomadaires", icon: "video", highlight: true },
        { text: "Réponses prioritaires (sous 24h)", icon: "message" },
        { text: "Contenus en avant-première", icon: "calendar" },
        { text: "3 demandes de contenu personnalisé / mois", icon: "star" }
      ],
      discount: {
        period: 3,
        percentage: 15
      }
    },
    {
      id: `${performerId}-vip`,
      name: "VIP",
      price: 49,
      period: "month",
      description: "L'expérience ultime sans compromis",
      color: "from-amber-500 to-yellow-500",
      features: [
        { text: "Tout ce qu'inclut Super-Fan +", icon: "check", highlight: true },
        { text: "Contenu sur demande mensuel", icon: "video", highlight: true },
        { text: "Réponses garanties sous 6h", icon: "message", highlight: true },
        { text: "Accès à l'archive complète", icon: "download" },
        { text: "Appels privés bi-mensuels", icon: "users" },
        { text: "Cadeaux personnalisés trimestriels", icon: "star" }
      ],
      discount: {
        period: 12,
        percentage: 25
      }
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-xl font-bold mb-2">Abonnements disponibles</h2>
        <p className="text-sm text-muted-foreground">
          Choisissez l'expérience qui vous convient et accédez à du contenu exclusif
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionTiers.map((tier) => (
          <SubscriptionTier
            key={tier.id}
            tier={tier}
            onSubscribe={onSubscribe}
          />
        ))}
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-2">
        Tous les abonnements sont sans engagement. Annulez à tout moment.
      </p>
    </div>
  );
};

export default SubscriptionPanel;
