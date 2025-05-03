
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * Ce composant gère la redirection des anciennes URLs vers la page d'accueil
 * Il redirige automatiquement vers le nouveau système
 */
const PerformerProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("PerformerProfile: Redirecting legacy URL to Home", performerId);
    
    // Ensure performerId is valid, default to "1" if not
    const targetId = performerId || "1";
    
    // Affichage d'un toast pour informer l'utilisateur
    toast.info("Redirection vers la page d'accueil...");
    
    // Redirection vers la page d'accueil avec remplacement pour éviter de pouvoir revenir en arrière
    navigate(`/`, { replace: true });
  }, [performerId, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-bold mb-2">Redirection en cours...</h2>
        <p className="mb-4">Nous vous redirigeons vers la page d'accueil</p>
        <div className="w-12 h-12 border-2 border-t-brand-red rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default PerformerProfile;
