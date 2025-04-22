
import React from 'react';
import KeyMetrics from './dashboard/KeyMetrics';
import DashboardCharts from './dashboard/DashboardCharts';
import SubscriberSegments from './dashboard/SubscriberSegments';
import PrivateMessages from './dashboard/PrivateMessages';
import ContentProtection from './dashboard/ContentProtection';

const CreatorDashboard: React.FC = () => {
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
      
      <KeyMetrics />
      <DashboardCharts />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PrivateMessages />
        <SubscriberSegments />
      </div>
      
      {/* Composant de protection du contenu */}
      <ContentProtection />
    </div>
  );
};

export default CreatorDashboard;
