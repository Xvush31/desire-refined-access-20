
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/graphql/client';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgeVerification from "./components/AgeVerification";
import { regulatoryFirewall } from "./services/regulatoryFirewall";
import { ghostMode } from "./services/ghostMode";
import Community from "./pages/Community";
import Invite from "./pages/Invite";
import XTease from "./pages/XTease";
import CreatorDashboardPage from "./sections/CreatorDashboardPage";
import XTeaseSecurity from "./sections/dashboard/XTeaseSecurity";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import Subscription from "./pages/Subscription";
import SubscriptionConfirmationPage from "./pages/SubscriptionConfirmation";

// Create query client outside component to avoid re-creation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [servicesInitialized, setServicesInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initServices = async () => {
      try {
        // Initialize services sequentially to avoid race conditions
        await regulatoryFirewall.init();
        
        if (isMounted) {
          setServicesInitialized(true);
        }
      } catch (error) {
        console.error("Error initializing services:", error);
      } finally {
        if (isMounted) {
          const isVerified = ghostMode.isEnabled() 
            ? ghostMode.get("age-verified") === "true"
            : localStorage.getItem("age-verified") === "true";
          
          setAgeVerified(isVerified);
          setLoading(false);
        }
      }
    };

    initServices();
    
    return () => { 
      isMounted = false; 
    };
  }, []);

  const handleAgeVerification = (isVerified: boolean) => {
    setAgeVerified(isVerified);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background overflow-x-hidden">
            <Toaster />
            <Sonner />
            {!ageVerified && <AgeVerification onVerification={handleAgeVerification} />}
            <CookieConsentBanner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/community" element={<Community />} />
                <Route path="/invite/:code" element={<Invite />} />
                <Route path="/xtease" element={<XTease />} />
                <Route path="/creator-dashboard" element={<CreatorDashboardPage />} />
                <Route path="/creator-dashboard/xtease-security" element={<XTeaseSecurity />} />
                <Route path="/subscription" element={<React.Suspense fallback={null}><Subscription /></React.Suspense>} />
                <Route path="/subscription-confirmation" element={<SubscriptionConfirmationPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
