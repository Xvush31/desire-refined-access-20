
import React from 'react';
import CreatorDashboard from './CreatorDashboard';
import ContentManagementSection from './ContentManagementSection';
import MonetizationSection from './MonetizationSection';

const CreatorDashboardPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto">
        <CreatorDashboard />
        <div className="my-8 border-t border-border opacity-30" />
        <ContentManagementSection />
        <div className="my-8 border-t border-border opacity-30" />
        <MonetizationSection />
      </div>
    </div>
  );
};

export default CreatorDashboardPage;
