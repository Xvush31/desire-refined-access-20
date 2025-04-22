
import React from 'react';
import { useEngagementSequences } from '../hooks/useEngagementSequences';
import { useIsMobile } from '../hooks/use-mobile';
import DashboardHeader from './dashboard/DashboardHeader';
import MetricsSection from './dashboard/MetricsSection';
import InsightsSection from './dashboard/InsightsSection';
import CommunicationSection from './dashboard/CommunicationSection';
import SecuritySection from './dashboard/SecuritySection';
import CommunityBadges from '../features/community/CommunityBadges';
import CreatorSupport from './dashboard/CreatorSupport';
import MobileEditorActions from './dashboard/MobileEditorActions';

const CreatorDashboard: React.FC = () => {
  useEngagementSequences();
  const isMobile = useIsMobile();

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <DashboardHeader />
      
      {isMobile && <MobileEditorActions />}
      
      <MetricsSection />
      <InsightsSection />
      <CommunicationSection />
      <CommunityBadges />
      <SecuritySection />
      <CreatorSupport />
    </div>
  );
};

export default CreatorDashboard;
