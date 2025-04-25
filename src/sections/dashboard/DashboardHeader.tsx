
import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import Logo from '@/components/Logo';

const DashboardHeader = () => {
  const { t, lang } = useLocale();
  
  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-8">
          <Logo />
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
        </div>
        <NotificationCenter />
      </div>
      <p className="text-muted-foreground">
        {lang === 'fr' ? 'Bienvenue sur votre espace de gestion premium' : 'Welcome to your premium management space'}
      </p>
    </header>
  );
};

export default DashboardHeader;
