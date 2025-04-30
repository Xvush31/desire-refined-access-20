
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
import { LocaleProvider } from "@/contexts/LocaleContext";
import Creators from "./pages/Creators";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Trending from "./pages/Trending";
import Performers from "./pages/Performers";
import Recent from "./pages/Recent";
import Favorites from "./pages/Favorites";
import CreatorsPopular from "./pages/CreatorsPopular";
import CreatorsRecent from "./pages/CreatorsRecent";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import History from "./pages/History";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleVideo from "./pages/SingleVideo";
import VideoList from "./components/VideoList";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import AccessDenied from "./pages/AccessDenied";
import AuthCallback from "./pages/AuthCallback";
import { useTheme } from "./hooks/use-theme";
import { useAuth, AuthProvider } from "./contexts/AuthContext";

// Import CreaVerse
import CreaVerse from "./features/creaverse";

const queryClient = new QueryClient();

// Composant PrivateRoute pour protéger les routes et vérifier le rôle
const PrivateRoute: React.FC<{
  children: JSX.Element;
  creatorOnly?: boolean;
}> = ({ children, creatorOnly = false }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (creatorOnly && currentUser.role !== "creator") {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    const initServices = async () => {
      try {
        await regulatoryFirewall.init();
        const isVerified = ghostMode.isEnabled()
          ? ghostMode.get("age-verified") === "true"
          : localStorage.getItem("age-verified") === "true";
        setAgeVerified(isVerified);
      } catch (error) {
        console.error("Erreur lors de l'initialisation des services:", error);
      } finally {
        setLoading(false);
      }
    };
    initServices();
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
    <React.StrictMode>
      <GoogleOAuthProvider clientId="271258165744-b90qmo9lug92qvcqe00uaid1hjr2dt9a.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <LocaleProvider>
            <AuthProvider>
              <TooltipProvider>
                <div className="min-h-screen overflow-x-hidden">
                  <Toaster />
                  <Sonner />
                  {!ageVerified && (
                    <AgeVerification onVerification={handleAgeVerification} />
                  )}
                  <CookieConsentBanner />
                  <PWAInstallPrompt />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/video/:videoId" element={<SingleVideo />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/invite/:code" element={<Invite />} />
                      <Route path="/xtease" element={<XTease />} />
                      <Route
                        path="/creator-dashboard"
                        element={
                          <PrivateRoute creatorOnly={true}>
                            <CreatorDashboardPage />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/creator-dashboard/xtease-security"
                        element={
                          <PrivateRoute creatorOnly={true}>
                            <XTeaseSecurity />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/subscription"
                        element={
                          <React.Suspense fallback={null}>
                            <Subscription />
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="/subscription-confirmation"
                        element={<SubscriptionConfirmationPage />}
                      />
                      <Route path="/creators" element={<Creators />} />
                      <Route
                        path="/creators/popular"
                        element={<CreatorsPopular />}
                      />
                      <Route
                        path="/creators/recent"
                        element={<CreatorsRecent />}
                      />
                      <Route path="/categories" element={<Categories />} />
                      <Route
                        path="/categories/:categoryId"
                        element={<CategoryPage />}
                      />
                      <Route path="/trending" element={<Trending />} />
                      <Route path="/performers" element={<Performers />} />
                      
                      {/* Remplacer la route performer par CreaVerse */}
                      <Route path="/performer/*" element={<CreaVerse />} />
                      
                      <Route path="/recent" element={<Recent />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/upload" element={<Upload />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/videos" element={<VideoList />} />
                      <Route path="/access-denied" element={<AccessDenied />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </div>
              </TooltipProvider>
            </AuthProvider>
          </LocaleProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
};

export default App;
