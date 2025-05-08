
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { XDOSE_DOMAIN } from "../utils/creaverseLinks";

/**
 * Ce composant gère la redirection des anciennes URLs vers CreaVerse
 * Il redirige automatiquement vers le nouveau système
 */
const PerformerProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("PerformerProfile: Redirecting legacy URL to XDose");
    
    // Affichage d'un toast pour informer l'utilisateur
    toast.info("Redirection vers le profil du créateur...");
    
    // Construct the external URL with the exact required format
    const externalUrl = XDOSE_DOMAIN;
    
    // Log the URL for debugging
    console.log("Redirecting to:", externalUrl);
    
    // Short timeout to ensure the toast is displayed
    const redirectTimeout = setTimeout(() => {
      window.location.href = externalUrl;
    }, 1500);
    
    return () => clearTimeout(redirectTimeout);
  }, [performerId, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-bold mb-2">Redirection en cours...</h2>
        <p className="mb-4">Nous vous redirigeons vers le profil du créateur</p>
        <div className="w-12 h-12 border-2 border-t-brand-red rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default PerformerProfile;
