import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatorDashboard from "./CreatorDashboard";
import ContentManagementSection from "./ContentManagementSection";
import MonetizationSection from "./monetization/MonetizationSection";
import { Toaster, toast } from "sonner";
import { useIsMobile } from "../hooks/use-mobile";
import { regulatoryFirewall } from "../services/regulatoryFirewall";
import { useLocale } from "@/contexts/LocaleContext";
import { useTheme } from "@/hooks/use-theme";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const CreatorDashboardPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { lang } = useLocale();
  const { theme } = useTheme();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [regulationsInitialized, setRegulationsInitialized] = useState(false);

  const creatorId = currentUser?.uid || "creator5";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [loading, currentUser, navigate]);

  // Initialize regulatoryFirewall and show toasts
  useEffect(() => {
    if (!currentUser || loading) return;

    const initializeRegulations = async () => {
      try {
        await regulatoryFirewall.init();
        setRegulationsInitialized(true);

        const timer = setTimeout(() => {
          toast.success(
            lang === "fr"
              ? "Conformité réglementaire vérifiée"
              : "Regulatory compliance verified",
            {
              description:
                lang === "fr"
                  ? `Tableau de bord configuré selon les réglementations de ${regulatoryFirewall.currentRegion}`
                  : `Dashboard configured according to ${regulatoryFirewall.currentRegion} regulations`,
              duration: 5000,
            }
          );
        }, 3000);

        const regulations = regulatoryFirewall.getRegulations();
        if (regulations.cookieNoticeRequired) {
          const cookieTimer = setTimeout(() => {
            toast.message(lang === "fr" ? "Notice cookies" : "Cookie notice", {
              description:
                lang === "fr"
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
      } catch (error) {
        console.error("Error initializing regulations:", error);
      }
    };

    initializeRegulations();
  }, [lang, currentUser, loading]);

  // Show a loading screen while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        {lang === "fr" ? "Chargement..." : "Loading..."}
      </div>
    );
  }

  // Don't render anything if not authenticated (redirect will handle)
  if (!currentUser) {
    return null;
  }

  return (
    <div
      className={
        theme === "light"
          ? "sexy-gradient-bg min-h-screen"
          : "bg-black min-h-screen"
      }
    >
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex justify-between items-center mb-4">
          <Link to="/videos" className="text-brand-red font-bold">
            {lang === "fr" ? "Voir les Vidéos" : "View Videos"}
          </Link>
          <ThemeToggle />
        </div>
        <CreatorDashboard creatorId={creatorId} />
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
              fontSize: isMobile ? "0.9rem" : "1rem",
            },
          }}
        />
      </div>
    </div>
  );
};

export default CreatorDashboardPage;
