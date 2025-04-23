
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionTiers = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Standard",
      price: "9,99 €",
      description: "L'essentiel pour commencer.",
      features: [
        "Vidéos en HD",
        "Sans publicités",
        "Téléchargements limités",
        "1 appareil à la fois"
      ],
      className: "tier-standard",
      buttonVariant: "outline" as const,
      isPaid: true
    },
    {
      name: "Premium",
      price: "14,99 €",
      description: "Notre offre la plus populaire.",
      features: [
        "Vidéos en 4K",
        "Sans publicités",
        "Téléchargements illimités",
        "3 appareils simultanés",
        "Contenu exclusif"
      ],
      className: "tier-premium",
      buttonVariant: "default" as const,
      recommended: true,
      isPaid: true
    },
    {
      name: "Elite",
      price: "24,99 €",
      description: "L'expérience ultime sans compromis.",
      features: [
        "Vidéos en 8K",
        "Sans publicités",
        "Téléchargements illimités",
        "5 appareils simultanés",
        "Contenu exclusif",
        "Avant-premières",
        "Support prioritaire"
      ],
      className: "tier-enterprise",
      buttonVariant: "outline" as const,
      isPaid: true
    }
  ];

  const handleSubscribe = (tier: typeof tiers[number]) => {
    if (tier.isPaid) {
      navigate("/subscription");
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12 animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Choisissez votre expérience</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Des offres adaptées à vos besoins avec un excellent rapport qualité-prix. Annulez à tout moment.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {tiers.map((tier, index) => (
          <div 
            key={tier.name}
            className={`tier-card ${tier.className} ${tier.recommended ? 'ring-2 ring-brand-accent' : ''}`}
            onClick={() => handleSubscribe(tier)}
          >
            {tier.recommended && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent text-white absolute -top-3 left-1/2 transform -translate-x-1/2">
                Recommandé
              </span>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-sm text-muted-foreground mb-1">/mois</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-brand-accent shrink-0 mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              variant={tier.buttonVariant} 
              className="w-full"
              {...(tier.recommended ? { className: "bg-brand-accent hover:bg-brand-accent/90 text-white w-full" } : {})}
              onClick={() => handleSubscribe(tier)}
            >
              {tier.recommended ? "Commencer maintenant" : "S'abonner"}
            </Button>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8 text-sm text-muted-foreground">
        Tous les abonnements sont sans engagement. Annulez à tout moment.
      </div>
    </div>
  );
};

export default SubscriptionTiers;
