
import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';

const DashboardHeader = () => {
  const { t, lang } = useLocale();
  
  return (
    <header className="mb-8 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">
        {lang === 'fr' ? (
          <>
            Tableau de Bord <span className="text-brand-red">C</span>réateur
          </>
        ) : (
          <>
            <span className="text-brand-red">C</span>reator Dashboard
          </>
        )}
      </h1>
      <p className="text-muted-foreground mt-2">
        {lang === 'fr' ? 'Bienvenue sur votre espace de gestion premium' : 'Welcome to your premium management space'}
      </p>
    </header>
  );
};

export default DashboardHeader;
