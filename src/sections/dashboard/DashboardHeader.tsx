
import React from 'react';

const DashboardHeader = () => {
  return (
    <header className="mb-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">
        Tableau de Bord <span className="text-brand-red">C</span>réateur
      </h1>
      <p className="text-muted-foreground mt-2">
        Bienvenue sur votre espace de gestion premium
      </p>
    </header>
  );
};

export default DashboardHeader;
