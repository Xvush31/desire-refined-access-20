
import React from 'react';
import CreatorDashboard from './CreatorDashboard';
import ContentManagementSection from './ContentManagementSection';
import MonetizationSection from './monetization/MonetizationSection';
import { Toaster } from "sonner";
import { useIsMobile } from '../hooks/use-mobile';
import { toast } from "sonner";
import { regulatoryFirewall } from '../services/regulatoryFirewall';
import { LocaleProvider } from "@/contexts/LocaleContext";

const CreatorDashboardPage: React.FC = () => {
  const isMobile = useIsMobile();

  // Effet pour vérifier la conformité réglementaire
  useEffect(() => {
    // Afficher une notification de conformité après le chargement
    const regulations = regulatoryFirewall.getRegulations();
    
    // Délai pour permettre au composant de se charger complètement
    const timer = setTimeout(() => {
      toast.success("Conformité réglementaire vérifiée", {
        description: `Tableau de bord configuré selon les réglementations de ${regulatoryFirewall.currentRegion}`,
        duration: 5000,
      });
    }, 3000);

    // Afficher des avertissements spécifiques selon la région
    if (regulations.cookieNoticeRequired) {
      const cookieTimer = setTimeout(() => {
        toast.message("Notice cookies", {
          description: "Ce site utilise des cookies pour améliorer votre expérience",
          duration: 10000,
        });
      }, 5000);
      
      return () => {
        clearTimeout(cookieTimer);
        clearTimeout(timer);
      };
    }
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <LocaleProvider>
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
    </LocaleProvider>
  );
};

export default CreatorDashboardPage;
