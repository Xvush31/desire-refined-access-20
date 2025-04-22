
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgeVerification from "./components/AgeVerification";
import { regulatoryFirewall } from "./services/regulatoryFirewall";
import { ghostMode } from "./services/ghostMode";
import Community from "./pages/Community";
import Invite from "./pages/Invite";
import XTease from "./pages/XTease";
import CreatorDashboardPage from "./sections/CreatorDashboardPage"; // Ajout de l'import

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);

  // Initialisation des services
  useEffect(() => {
    const initServices = async () => {
      // Initialisation du firewall réglementaire
      await regulatoryFirewall.init();
      
      // Vérification de l'âge via localStorage
      const isVerified = ghostMode.isEnabled() 
        ? ghostMode.get("age-verified") === "true"
        : localStorage.getItem("age-verified") === "true";
      
      setAgeVerified(isVerified);
      setLoading(false);
    };

    initServices();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {!ageVerified && <AgeVerification />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/community" element={<Community />} />
              <Route path="/invite/:code" element={<Invite />} />
              <Route path="/xtease" element={<XTease />} />
              <Route path="/creator-dashboard" element={<CreatorDashboardPage />} /> {/* Nouvelle route */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

