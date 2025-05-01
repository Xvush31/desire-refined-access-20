
import React, { Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Trending from "./pages/Trending";
import Recent from "./pages/Recent";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Creators from "./pages/Creators";
import CreatorsPopular from "./pages/CreatorsPopular";
import CreatorsRecent from "./pages/CreatorsRecent";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Performers from "./pages/Performers";
import SingleVideo from "./pages/SingleVideo";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Invite from "./pages/Invite";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import XTease from "./pages/XTease";
import SubscriptionConfirmation from "./pages/SubscriptionConfirmation";
import Subscription from "./pages/Subscription";
import AuthCallback from "./pages/AuthCallback";
import AccessDenied from "./pages/AccessDenied";
import CreaVerse from "./features/creaverse";
import CreatorProfile from "./features/creaverse/pages/CreatorProfile";
import CreatorDashboard from "./features/creaverse/pages/CreatorDashboard";
import CreatorSettings from "./features/creaverse/pages/CreatorSettings";
import { useAuth } from "./contexts/AuthContext";
import PerformerProfile from "./pages/PerformerProfile";

// Simple layout component to wrap routes that handles auth loading state
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading authentication...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

// Redirect component for legacy routes
const PerformerRedirect: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  console.log("Redirecting from legacy performer route to:", `/creaverse/performer/${performerId}`);
  return <Navigate to={`/creaverse/performer/${performerId}`} replace />;
};

const CreatorDashboardRedirect: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  console.log("Redirecting from legacy creator dashboard to:", `/creaverse/creator/${performerId}/dashboard`);
  return <Navigate to={`/creaverse/creator/${performerId}/dashboard`} replace />;
};

const CreatorSettingsRedirect: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  console.log("Redirecting from legacy creator settings to:", `/creaverse/creator/${performerId}/settings`);
  return <Navigate to={`/creaverse/creator/${performerId}/settings`} replace />;
};

function App() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug logging
  console.log("App rendering, auth state:", { currentUser, loading, path: location.pathname });
  
  // Add a direct link to CreaVerse on the console for debugging
  console.log("Try accessing CreaVerse directly at:", window.location.origin + "/creaverse");
  
  // Track access to legacy URLs
  useEffect(() => {
    // Log when routes like /performers/:id are accessed
    if (location.pathname.includes('/performers/')) {
      console.log("Detected access to legacy performers route:", location.pathname);
    }
  }, [location.pathname]);
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/trending" element={<Layout><Trending /></Layout>} />
        <Route path="/recent" element={<Layout><Recent /></Layout>} />
        <Route path="/categories" element={<Layout><Categories /></Layout>} />
        <Route path="/category/:categoryId" element={<Layout><CategoryPage /></Layout>} />
        <Route path="/creators" element={<Layout><Creators /></Layout>} />
        <Route path="/creators/popular" element={<Layout><CreatorsPopular /></Layout>} />
        <Route path="/creators/recent" element={<Layout><CreatorsRecent /></Layout>} />
        <Route path="/community" element={<Layout><Community /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/performers" element={<Layout><Performers /></Layout>} />
        <Route path="/video/:videoId" element={<Layout><SingleVideo /></Layout>} />
        <Route path="/upload" element={<Layout><Upload /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/invite" element={<Layout><Invite /></Layout>} />
        <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
        <Route path="/history" element={<Layout><History /></Layout>} />
        <Route path="/xtease" element={<Layout><XTease /></Layout>} />
        <Route path="/subscription" element={<Layout><Subscription /></Layout>} />
        <Route path="/subscription/confirmation" element={<Layout><SubscriptionConfirmation /></Layout>} />
        <Route path="/auth/callback" element={<Layout><AuthCallback /></Layout>} />
        <Route path="/access-denied" element={<Layout><AccessDenied /></Layout>} />

        {/* CreaVerse Routes - CreaVerse utilise sa propre instance de RevolutionaryNavigation */}
        <Route path="/creaverse" element={<CreaVerse />}>
          <Route index element={<div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Bienvenue à CreaVerse</h1>
            <p className="mb-6">L'univers des créateurs de XVush</p>
          </div>} />
          <Route path="performer/:performerId" element={<CreatorProfile />} />
          <Route path="creator/:performerId/dashboard" element={<CreatorDashboard />} />
          <Route path="creator/:performerId/settings" element={<CreatorSettings />} />
        </Route>

        {/* Legacy performer routes - now properly handled */}
        <Route path="/performer/:performerId" element={<PerformerProfile />} />
        <Route path="/performers/:performerId" element={<PerformerProfile />} />

        {/* Legacy creator routes - redirect to CreaVerse routes */}
        <Route path="/creator/:performerId/dashboard" element={<CreatorDashboardRedirect />} />
        <Route path="/creator/:performerId/settings" element={<CreatorSettingsRedirect />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
