
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";
import SubscriptionTiersTable from './SubscriptionTiersTable';
import OptimizationSuggestion from './OptimizationSuggestion';
import RevenueChart from './RevenueChart';
import ActionCard from './ActionCard';

const subscriptionTiers = [
  { 
    name: "Basic", 
    price: 9.99, 
    subscribers: 280, 
    growth: 4.5,
    revenue: 2797.20,
    color: "#555555" 
  },
  { 
    name: "Premium", 
    price: 19.99, 
    subscribers: 145, 
    growth: 7.2,
    revenue: 2898.55,
    color: "#999999" 
  },
  { 
    name: "VIP", 
    price: 29.99, 
    subscribers: 78, 
    growth: 12.8,
    revenue: 2339.22,
    color: "#D2C7BA" 
  },
  { 
    name: "Elite", 
    price: 49.99, 
    subscribers: 32, 
    growth: 15.4,
    revenue: 1599.68,
    color: "#e91e63" 
  },
];

const revenueBySource = [
  { name: "Abonnements", value: 9634.65 },
  { name: "Contenus Premium", value: 2450.00 },
  { name: "Messages Privés", value: 1850.25 },
  { name: "Pourboires", value: 3240.75 },
  { name: "Ventes Spéciales", value: 1520.00 },
];

const MonetizationSection: React.FC = () => {
  const [appliedSuggestion, setAppliedSuggestion] = useState<boolean>(false);
  
  const handleApplySuggestion = () => {
    setAppliedSuggestion(true);
    toast.success("Suggestion appliquée avec succès", {
      description: "Le contenu exclusif a été ajouté au niveau Elite"
    });
    setTimeout(() => setAppliedSuggestion(false), 2000);
  };
  
  return (
    <section className="bg-black text-white p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Monétisation <span className="text-brand-red">A</span>vancée
        </h2>
        <p className="text-muted-foreground mt-1">
          Optimisez vos revenus et découvrez de nouvelles opportunités
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-full hover-card">
            <CardHeader>
              <CardTitle className="tracking-tight">Niveaux d'Abonnement</CardTitle>
              <CardDescription>Performance par niveau et suggestions d'optimisation</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionTiersTable tiers={subscriptionTiers} />
              <OptimizationSuggestion 
                isApplied={appliedSuggestion}
                onApply={handleApplySuggestion}
              />
            </CardContent>
          </Card>
        </div>

        <RevenueChart data={revenueBySource} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionCard 
          title="Tarification Dynamique" 
          actionLabel="Activer l'ajustement auto"
          onAction={() => {}}
        >
          <p className="text-sm text-muted-foreground mb-3">
            Le système suggère d'augmenter le prix du niveau VIP de 9% basé sur l'engagement actuel.
          </p>
        </ActionCard>

        <ActionCard 
          title="Pourboires" 
          actionLabel="Personnaliser les badges"
          onAction={() => {}}
        >
          <div className="text-2xl font-bold mb-1 flex items-center">
            <DollarSign className="h-5 w-5 text-brand-red" />
            3,240.75€
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            +18.5% vs mois précédent
          </p>
        </ActionCard>

        <ActionCard 
          title="Contenu à la Carte" 
          actionLabel="Gérer le catalogue"
          onAction={() => {}}
        >
          <div className="text-sm mb-3">
            <div className="flex items-center mb-1">
              <span className="font-medium">Acheteurs uniques:</span>
              <span className="ml-auto">187</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Prix moyen:</span>
              <span className="ml-auto">14.25€</span>
            </div>
          </div>
        </ActionCard>

        <ActionCard 
          title="Revenus Passifs" 
          actionLabel="Optimiser l'archive"
          onAction={() => {}}
        >
          <p className="text-sm text-muted-foreground mb-3">
            52% de vos revenus proviennent de contenu publié il y a plus de 30 jours.
          </p>
        </ActionCard>
      </div>
    </section>
  );
};

export default MonetizationSection;
