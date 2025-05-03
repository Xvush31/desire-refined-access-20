
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SubscribersManagement = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des abonnés</h1>
        <Button asChild variant="outline" size="sm">
          <Link to="/creaverse-app/">Retour à l'accueil</Link>
        </Button>
      </div>
      
      <Card className="creaverse-glass-card mb-6">
        <CardHeader>
          <CardTitle>Statistiques d'abonnement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">157</div>
              <div className="text-sm text-muted-foreground">Total abonnés</div>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Nouveaux ce mois</div>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Taux de rétention</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="creaverse-glass-card">
        <CardHeader>
          <CardTitle>Liste des abonnés</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interface de gestion des abonnés</p>
          
          <div className="mt-4 creaverse-progress-bar">
            <div className="creaverse-progress-fill bg-gradient-to-r from-[#FF91A4] to-[#FF6B8B]" style={{ width: '75%' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscribersManagement;
