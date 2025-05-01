
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <Button asChild variant="outline" size="sm">
          <Link to="/creaverse-app/">Retour à l'accueil</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="creaverse-glass-card">
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Vue d'ensemble de vos statistiques</p>
          </CardContent>
        </Card>
        
        <Card className="creaverse-glass-card">
          <CardHeader>
            <CardTitle>Contenu</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gérez votre contenu</p>
          </CardContent>
        </Card>
        
        <Card className="creaverse-glass-card">
          <CardHeader>
            <CardTitle>Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Suivez vos revenus</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
