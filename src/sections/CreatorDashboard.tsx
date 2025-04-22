
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ArrowUp, ArrowDown, DollarSign, Users, Heart, Star, Eye } from "lucide-react";
import { toast } from "sonner";

// Données factices pour les graphiques
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Fév", revenue: 4500 },
  { name: "Mar", revenue: 5000 },
  { name: "Avr", revenue: 4700 },
  { name: "Mai", revenue: 6000 },
  { name: "Juin", revenue: 5500 },
  { name: "Juil", revenue: 7000 },
];

const engagementData = [
  { name: "Lun", engagement: 85 },
  { name: "Mar", engagement: 70 },
  { name: "Mer", engagement: 90 },
  { name: "Jeu", engagement: 65 },
  { name: "Ven", engagement: 75 },
  { name: "Sam", engagement: 95 },
  { name: "Dim", engagement: 100 },
];

const subscriberSegments = [
  { segment: "Nouveaux", count: 240, growth: 12.5 },
  { segment: "Fidèles", count: 380, growth: 5.2 },
  { segment: "Super-fans", count: 120, growth: 8.7 },
  { segment: "Inactifs", count: 75, growth: -2.3 },
  { segment: "À risque", count: 45, growth: -6.8 },
];

const CreatorDashboard: React.FC = () => {
  const [analyzeSegment, setAnalyzeSegment] = useState<string | null>(null);
  
  const handleAnalyzeSegment = (segment: string) => {
    setAnalyzeSegment(segment);
    toast.success(`Analyse du segment ${segment} lancée`, {
      description: "Les résultats seront disponibles dans quelques secondes"
    });
    
    // Reset after animation
    setTimeout(() => setAnalyzeSegment(null), 2000);
  };
  
  return (
    <div className="bg-black min-h-screen text-white p-6">
      <header className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">
          Tableau de Bord <span className="text-brand-red">C</span>réateur
        </h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue sur votre espace de gestion premium
        </p>
      </header>
      
      {/* Zone 1: Métriques critiques (80% des actions quotidiennes) */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Métriques Clés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenus du Mois
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-brand-red" />
                  <span className="text-2xl font-bold">7,245€</span>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">12.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Nouveaux Abonnés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 text-brand-red" />
                  <span className="text-2xl font-bold">128</span>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">8.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="mr-2 text-brand-red" />
                  <span className="text-2xl font-bold">94%</span>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">3.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vues Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="mr-2 text-brand-red" />
                  <span className="text-2xl font-bold">24.5k</span>
                </div>
                <div className="flex items-center text-red-500">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="text-sm">1.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Zone 1: Graphiques de revenus et engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-card border-border card-hover">
          <CardHeader>
            <CardTitle>Revenus sur 7 mois</CardTitle>
            <CardDescription className="text-muted-foreground">
              Évolution mensuelle de vos revenus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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
                  <BarChart data={revenueData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}€`}
                    />
                    <Bar
                      dataKey="revenue"
                      name="revenue"
                      fill="var(--color-revenue)"
                      radius={[4, 4, 0, 0]}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="name"
                          labelKey="Revenue"
                        />
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border card-hover">
          <CardHeader>
            <CardTitle>Engagement Hebdomadaire</CardTitle>
            <CardDescription className="text-muted-foreground">
              Taux d'engagement par jour de la semaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  engagement: {
                    label: "Engagement",
                    theme: {
                      light: "#D2C7BA",
                      dark: "#D2C7BA",
                    },
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Bar
                      dataKey="engagement"
                      name="engagement"
                      fill="var(--color-engagement)"
                      radius={[4, 4, 0, 0]}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="name"
                          labelKey="Engagement"
                        />
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone 2: Segmentation des abonnés */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Segmentation des Abonnés</h2>
        <Card className="bg-card border-border card-hover">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="data-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Croissance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriberSegments.map((segment) => (
                    <TableRow key={segment.segment} className={analyzeSegment === segment.segment ? 'micro-animation-success' : ''}>
                      <TableCell className="font-medium">{segment.segment}</TableCell>
                      <TableCell>{segment.count}</TableCell>
                      <TableCell>
                        <div className={`flex items-center ${segment.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {segment.growth >= 0 ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(segment.growth)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <button 
                          className="text-brand-red hover:underline text-sm micro-animation-pop"
                          onClick={() => handleAnalyzeSegment(segment.segment)}
                        >
                          Analyser
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Zone 3: Options avancées */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Monétisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm">
                <a href="#" className="hover:text-brand-red transition-colors micro-animation-pop">
                  Configurer les niveaux d'abonnement
                </a>
              </li>
              <li className="text-sm">
                <a href="#" className="hover:text-brand-red transition-colors micro-animation-pop">
                  Tarification dynamique
                </a>
              </li>
              <li className="text-sm">
                <a href="#" className="hover:text-brand-red transition-colors micro-animation-pop">
                  Paramètres de pourboires
                </a>
              </li>
              <li className="text-sm">
                <a href="#" className="hover:text-brand-red transition-colors micro-animation-pop">
                  Contenu premium à l'unité
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card border-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Revenus Projetés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">9,850€</div>
              <p className="text-muted-foreground text-sm mb-1">
                Projection sur 30 prochains jours
              </p>
              <div className="flex items-center justify-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+18.3% vs dernier mois</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Super-Fans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Marie K.</span>
                <span className="text-brand-red">1,250€</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Thomas B.</span>
                <span className="text-brand-red">875€</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sophie M.</span>
                <span className="text-brand-red">720€</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <a href="#" className="text-xs text-muted-foreground hover:text-brand-red transition-colors micro-animation-pop">
                  Voir tous les super-fans →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CreatorDashboard;
