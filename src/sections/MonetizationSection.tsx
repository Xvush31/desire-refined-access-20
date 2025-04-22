
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Star, Users, ArrowUp, ArrowRight, Check } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts";
import { toast } from "sonner";

// Données factices pour les niveaux d'abonnement
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

// Données pour les revenus par source
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
    
    // Reset after animation completes
    setTimeout(() => setAppliedSuggestion(false), 2000);
  };
  
  return (
    <section className="bg-black text-white p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">
          Monétisation <span className="text-brand-red">A</span>vancée
        </h2>
        <p className="text-muted-foreground mt-1">
          Optimisez vos revenus et découvrez de nouvelles opportunités
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-full card-hover">
            <CardHeader>
              <CardTitle>Niveaux d'Abonnement</CardTitle>
              <CardDescription className="text-muted-foreground">
                Performance par niveau et suggestions d'optimisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Niveau</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Abonnés</TableHead>
                      <TableHead>Croissance</TableHead>
                      <TableHead>Revenus</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptionTiers.map((tier) => (
                      <TableRow key={tier.name}>
                        <TableCell>
                          <div className="flex items-center">
                            <div 
                              className="h-3 w-3 rounded-full mr-2"
                              style={{ backgroundColor: tier.color }}
                            />
                            {tier.name}
                          </div>
                        </TableCell>
                        <TableCell>{tier.price.toFixed(2)}€/mois</TableCell>
                        <TableCell>{tier.subscribers}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-green-500">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            {tier.growth}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {tier.revenue.toFixed(2)}€
                          </div>
                        </TableCell>
                        <TableCell>
                          <button className="text-brand-red hover:underline text-sm micro-animation-pop">
                            Modifier
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className={`mt-4 p-4 bg-muted rounded-lg transition-all ${appliedSuggestion ? 'micro-animation-success' : ''}`}>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-1 text-brand-red" />
                  Suggestion d'Optimisation
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Nos analyses suggèrent d'ajouter un contenu exclusif par semaine au niveau Elite pour augmenter les conversions de 24%.
                </p>
                <button 
                  className="text-xs flex items-center text-brand-red hover:underline micro-animation-pop"
                  onClick={handleApplySuggestion}
                >
                  {appliedSuggestion ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Suggestion appliquée
                    </>
                  ) : (
                    <>
                      Appliquer cette suggestion <ArrowRight className="h-3 w-3 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border card-hover">
          <CardHeader>
            <CardTitle>Distribution des Revenus</CardTitle>
            <CardDescription className="text-muted-foreground">
              Répartition par source de revenus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenus",
                    theme: {
                      light: "#e91e63",
                      dark: "#e91e63",
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={revenueBySource} 
                    layout="vertical"
                    margin={{ top: 0, right: 0, bottom: 0, left: 70 }}
                  >
                    <XAxis 
                      type="number" 
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value / 1000}k€`}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Bar 
                      dataKey="value" 
                      name="revenue" 
                      radius={[0, 4, 4, 0]}
                    >
                      {revenueBySource.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 0 ? "#e91e63" : "#D2C7BA"} 
                        />
                      ))}
                    </Bar>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="name"
                          labelKey="revenue"
                        />
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Potentiel de Croissance</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Contenus Premium</span>
                    <span className="text-brand-red">+42% potentiel</span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-red h-full rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Messages Privés</span>
                    <span className="text-brand-red">+28% potentiel</span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-red h-full rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tarification Dynamique</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Le système suggère d'augmenter le prix du niveau VIP de 9% basé sur l'engagement actuel.
            </p>
            <button className="w-full py-1.5 bg-muted text-white text-sm rounded hover:bg-muted/80 transition-colors micro-animation-pop">
              Activer l'ajustement auto
            </button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Pourboires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1 flex items-center">
              <DollarSign className="h-5 w-5 text-brand-red" />
              3,240.75€
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              +18.5% vs mois précédent
            </p>
            <button className="w-full py-1.5 bg-muted text-white text-sm rounded hover:bg-muted/80 transition-colors micro-animation-pop">
              Personnaliser les badges
            </button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Contenu à la Carte</CardTitle>
          </CardHeader>
          <CardContent>
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
            <button className="w-full py-1.5 bg-muted text-white text-sm rounded hover:bg-muted/80 transition-colors micro-animation-pop">
              Gérer le catalogue
            </button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Revenus Passifs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              52% de vos revenus proviennent de contenu publié il y a plus de 30 jours.
            </p>
            <button className="w-full py-1.5 bg-muted text-white text-sm rounded hover:bg-muted/80 transition-colors micro-animation-pop">
              Optimiser l'archive
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MonetizationSection;
