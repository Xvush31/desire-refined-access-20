
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavigationFooter from "./components/NavigationFooter";
import { toast } from "sonner";

/**
 * CreaVerse - L'univers des créateurs de XVush
 * Une expérience immersive pour les créateurs et leurs fans
 */
const CreaVerse: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  console.log("CreaVerse rendering, auth state:", { currentUser, loading, path: location.pathname });
  
  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Chargement de l'authentification...</p>
      </div>
    );
  }
  
  // Check if the path is for a performer profile
  const isPerformerProfilePath = location.pathname.includes('/creaverse/performer/');
  
  // Only redirect non-authenticated users if they're not trying to view a performer profile
  if (!currentUser && !isPerformerProfilePath) {
    console.log("User not authenticated, but not on a performer profile page, redirecting to login");
    
    // Only show toast if not accessing a performer profile
    if (!location.pathname.includes('/performer/')) {
      toast.error("Veuillez vous connecter pour accéder à CreaVerse");
    }
    
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // If user is on main creaverse page and not authenticated, show limited view
  const isMainCreaversePage = location.pathname === "/creaverse";
  const showLimitedView = isMainCreaversePage && !currentUser;
  
  useEffect(() => {
    // Log successful access for debugging
    if (currentUser) {
      console.log("Successfully accessed CreaVerse with user:", currentUser.uid);
    } else if (isPerformerProfilePath) {
      console.log("Visitor accessing performer profile without authentication");
    }
  }, [currentUser, isPerformerProfilePath]);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      {isMainCreaversePage && (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Bienvenue à CreaVerse</h1>
          <p className="mb-6">L'univers des créateurs de XVush</p>
          
          {showLimitedView ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
                <Link to="/login">Se connecter</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/">Retourner à l'accueil</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
                <Link to={`/creaverse/performer/${currentUser.uid}`}>Mon profil</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={`/creaverse/creator/${currentUser.uid}/dashboard`}>Mon tableau de bord</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/">Retourner à l'accueil</Link>
              </Button>
            </div>
          )}
        </div>
      )}
      <Outlet />
      <NavigationFooter 
        performerId={currentUser?.uid || "visitor"} 
        performerImage="/placeholder.svg"
        performerName={currentUser?.uid || "Visiteur"}
      />
    </div>
  );
};

export default CreaVerse;
