
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, Users, Heart, Eye } from "lucide-react";

const KeyMetrics = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">Métriques Clés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border card-hover hover-card micro-pop">
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

        <Card className="bg-card border-border card-hover hover-card micro-pop">
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

        <Card className="bg-card border-border card-hover hover-card micro-pop">
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

        <Card className="bg-card border-border card-hover hover-card micro-pop">
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
  );
};

export default KeyMetrics;
