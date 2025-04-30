import React from "react";
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
  
  // If user is not authenticated, redirect to login page with return URL
  if (!currentUser) {
    console.log("User not authenticated, redirecting to login with return URL:", location.pathname);
    toast.error("Veuillez vous connecter pour accéder à CreaVerse");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Otherwise, render the child routes with a fallback for direct /creaverse access
  return (
    <div className="min-h-screen bg-background pb-16">
      {location.pathname === "/creaverse" && (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Bienvenue à CreaVerse</h1>
          <p className="mb-6">L'univers des créateurs de XVush</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <Link to={`/creaverse/performer/${currentUser.uid}`}>Mon profil</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/creaverse/creator/${currentUser.uid}/dashboard`}>Mon tableau de bord</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/">Retourner à l'accueil</Link>
            </Button>
          </div>
        </div>
      )}
      <Outlet />
      {currentUser && (
        <NavigationFooter 
          performerId={currentUser.uid} 
          performerImage="/placeholder.svg"
          performerName={currentUser.displayName || currentUser.uid}
        />
      )}
    </div>
  );
};

export default CreaVerse;
