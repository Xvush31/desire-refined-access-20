
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import IntimateHeader from "@/features/intimate/components/IntimateHeader";
import IntimateHeroSection from "@/features/intimate/components/IntimateHeroSection";
import IntimateCreatorGrid from "@/features/intimate/components/IntimateCreatorGrid";
import IntimateFeaturesList from "@/features/intimate/components/IntimateFeaturesList";
import IntimateNavigation from "@/features/intimate/components/IntimateNavigation";
import IntimateFooter from "@/features/intimate/components/IntimateFooter";
import IntimateExploreSection from "@/features/intimate/components/IntimateExploreSection";
import IntimateProtectionDemo from "@/features/intimate/components/IntimateProtectionDemo";
import IntimateVerificationBadge from "@/features/intimate/components/IntimateVerificationBadge";
import { useImmersiveMode } from "@/hooks/useImmersiveMode";

// Import the ThemeProvider to inject the purple theme
import { IntimateThemeProvider } from "@/features/intimate/contexts/IntimateThemeContext";

const Intimate = () => {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentUser, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<string>("home");
  const { isImmersive, toggleImmersive } = useImmersiveMode();

  // Set the active section based on the route parameter
  useEffect(() => {
    if (section) {
      setActiveSection(section);
    } else {
      setActiveSection("home");
    }
  }, [section]);

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveSection(value);
    navigate(`/intimate/${value}`);
  };

  return (
    <IntimateThemeProvider>
      <div className="min-h-screen bg-[#1A1F2C] text-white">
        {/* Non-immersive mode structure */}
        {!isImmersive && (
          <>
            <IntimateHeader />
            
            <main className="container mx-auto px-4 py-6">
              <IntimateNavigation 
                activeSection={activeSection} 
                onSectionChange={handleTabChange} 
                onToggleImmersive={toggleImmersive}
              />

              <ScrollArea className="h-[calc(100vh-180px)]">
                <AnimatePresence mode="wait">
                  {activeSection === "home" && (
                    <div className="space-y-10 py-6">
                      <IntimateHeroSection onToggleImmersive={toggleImmersive} />
                      <IntimateFeaturesList />
                      <IntimateExploreSection />
                    </div>
                  )}

                  {activeSection === "creators" && (
                    <IntimateCreatorGrid />
                  )}

                  {activeSection === "protection" && (
                    <IntimateProtectionDemo />
                  )}

                  {/* Add other sections here */}
                </AnimatePresence>
              </ScrollArea>
            </main>

            <IntimateFooter />
          </>
        )}

        {/* Immersive mode structure would be added here, similar to XTease immersive */}
        {isImmersive && (
          <div className="immersive-intimate">
            {/* Immersive content will be implemented later */}
            <button 
              className="fixed top-4 right-4 z-50 bg-black/50 p-2 rounded-full"
              onClick={toggleImmersive}
            >
              Exit
            </button>
            
            <div className="flex items-center justify-center h-screen">
              <h2 className="text-2xl font-bold">Immersive Mode</h2>
              <p>Coming soon</p>
            </div>
          </div>
        )}
      </div>
    </IntimateThemeProvider>
  );
};

export default Intimate;
