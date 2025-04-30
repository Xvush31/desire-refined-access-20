
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { HomeIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Show toast with helpful message
    toast.error("Page non trouvée", {
      description: "La page que vous recherchez n'existe pas.",
      duration: 5000
    });
    
  }, [location.pathname]);

  // Check if this might be a creator profile route
  const mightBeCreatorProfile = location.pathname.includes('/performer') || location.pathname.includes('/performers');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! La page que vous recherchez n'existe pas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link to="/">
              <HomeIcon size={18} />
              Retourner à l'accueil
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/creators">
              <UsersIcon size={18} />
              Voir les créateurs
            </Link>
          </Button>
          
          {mightBeCreatorProfile && (
            <Button asChild variant="secondary" className="flex items-center gap-2">
              <Link to="/creaverse">
                Accéder à CreaVerse
              </Link>
            </Button>
          )}
        </div>
        
        {mightBeCreatorProfile && (
          <p className="mt-6 text-sm text-muted-foreground">
            Vous recherchiez peut-être un profil de créateur? Tous les profils sont maintenant dans CreaVerse.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotFound;
