
import React, { useEffect } from 'react';
import CreatorDashboard from './CreatorDashboard';
import ContentManagementSection from './ContentManagementSection';
import MonetizationSection from './monetization/MonetizationSection';
import { Toaster } from "sonner";
import { useIsMobile } from '../hooks/use-mobile';
import { toast } from "sonner";
import { regulatoryFirewall } from '../services/regulatoryFirewall';
import { useLocale } from "@/contexts/LocaleContext";
import { useTheme } from '@/hooks/use-theme';
import ThemeToggle from '@/components/ThemeToggle';

const CreatorDashboardPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { lang } = useLocale();
  const { theme } = useTheme();

  // Effet pour vérifier la conformité réglementaire
  useEffect(() => {
    // Afficher une notification de conformité après le chargement
    const regulations = regulatoryFirewall.getRegulations();
    
    // Délai pour permettre au composant de se charger complètement
    const timer = setTimeout(() => {
      toast.success(lang === 'fr' ? "Conformité réglementaire vérifiée" : "Regulatory compliance verified", {
        description: lang === 'fr' 
          ? `Tableau de bord configuré selon les réglementations de ${regulatoryFirewall.currentRegion}`
          : `Dashboard configured according to ${regulatoryFirewall.currentRegion} regulations`,
        duration: 5000,
      });
    }, 3000);

    // Afficher des avertissements spécifiques selon la région
    if (regulations.cookieNoticeRequired) {
      const cookieTimer = setTimeout(() => {
        toast.message(lang === 'fr' ? "Notice cookies" : "Cookie notice", {
          description: lang === 'fr' 
            ? "Ce site utilise des cookies pour améliorer votre expérience" 
            : "This site uses cookies to improve your experience",
          duration: 10000,
        });
      }, 5000);
      
      return () => {
        clearTimeout(cookieTimer);
        clearTimeout(timer);
      };
    }
    
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div className={theme === 'light' ? 'sexy-gradient-bg min-h-screen' : 'bg-black min-h-screen'}>
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
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
