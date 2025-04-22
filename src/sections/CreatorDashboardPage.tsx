
import React from 'react';
import CreatorDashboard from './CreatorDashboard';
import ContentManagementSection from './ContentManagementSection';
import MonetizationSection from './monetization/MonetizationSection';
import { Toaster } from "sonner";
import { useIsMobile } from '../hooks/use-mobile';

const CreatorDashboardPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <CreatorDashboard />
        <div className="my-4 md:my-8 border-t border-border opacity-30" />
        <ContentManagementSection />
        <div className="my-4 md:my-8 border-t border-border opacity-30" />
        <MonetizationSection />
        <Toaster 
          position={isMobile ? "bottom-center" : "top-center"}
          toastOptions={{
            duration: 3000,
            className: "micro-animation-pop",
            style: {
              fontSize: isMobile ? '0.9rem' : '1rem'
            }
          }}
        />
      </div>
    </div>
  );
};

export default CreatorDashboardPage;
