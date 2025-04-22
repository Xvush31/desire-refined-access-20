
import React from 'react';
import KeyMetrics from './dashboard/KeyMetrics';
import DashboardCharts from './dashboard/DashboardCharts';
import SubscriberSegments from './dashboard/SubscriberSegments';
import PrivateMessages from './dashboard/PrivateMessages';
import ContentProtection from './dashboard/ContentProtection';
import ContentSuggestions from './dashboard/ContentSuggestions';
import RevenueForecast from './dashboard/RevenueForecast';
import CommunityBadges from '../features/community/CommunityBadges';
import { useEngagementSequences } from '../hooks/useEngagementSequences';
import MobileEditorActions from './dashboard/MobileEditorActions';
import { useIsMobile } from '../hooks/use-mobile';

const CreatorDashboard: React.FC = () => {
  useEngagementSequences();
  const isMobile = useIsMobile();

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
      
      {isMobile && <MobileEditorActions />}
      
      <KeyMetrics />
      <DashboardCharts />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ContentSuggestions />
        <RevenueForecast />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PrivateMessages />
        <SubscriberSegments />
      </div>
      
      <CommunityBadges />
      <ContentProtection />
    </div>
  );
};

export default CreatorDashboard;
