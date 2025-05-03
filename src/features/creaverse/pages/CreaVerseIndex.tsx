
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CreaVerseIndex = () => {
  return (
    <div className="py-8">
      <div className="creaverse-logo-container">
        <img 
          src="/placeholder.svg" 
          alt="CreaVerse Logo" 
          className="creaverse-logo mx-auto" 
        />
      </div>
      
      <h1 className="text-3xl font-bold mt-6 mb-4">Bienvenue à CreaVerse</h1>
      <p className="text-muted-foreground mb-8">L'univers des créateurs de XVush</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="default" className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
          <Link to="/creaverse-app/performer/1">Mon profil</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/creaverse-app/dashboard">Mon tableau de bord</Link>
        </Button>
      </div>
      
      <div className="creaverse-card mt-12">
        <h2 className="text-2xl font-semibold mb-4">Explorez CreaVerse</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-medium mb-2">Créateurs</h3>
            <p className="text-sm text-muted-foreground mb-4">Découvrez les créateurs populaires</p>
            <Button asChild variant="secondary" size="sm">
              <Link to="/creaverse-app/performer/1">Explorer</Link>
            </Button>
          </div>
          <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-medium mb-2">Calendrier</h3>
            <p className="text-sm text-muted-foreground mb-4">Planifiez vos événements</p>
            <Button asChild variant="secondary" size="sm">
              <Link to="/creaverse-app/calendar">Consulter</Link>
            </Button>
          </div>
          <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-medium mb-2">Abonnés</h3>
            <p className="text-sm text-muted-foreground mb-4">Gérez vos abonnés</p>
            <Button asChild variant="secondary" size="sm">
              <Link to="/creaverse-app/subscribers">Gérer</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <p className="creaverse-read-the-docs mt-12">
        Cliquez sur les liens pour naviguer dans CreaVerse
      </p>
    </div>
  );
};

export default CreaVerseIndex;
