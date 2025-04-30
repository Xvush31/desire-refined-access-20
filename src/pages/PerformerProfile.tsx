
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * Ce composant est maintenant remplacé par CreaVerse
 * Il redirige automatiquement vers le nouveau système
 */
const PerformerProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("PerformerProfile: Redirecting to CreaVerse", performerId);
    
    // Ensure performerId is valid, default to "1" if not
    const targetId = performerId || "1";
    
    // Redirection vers CreaVerse avec remplacement pour éviter de pouvoir revenir en arrière
    navigate(`/creaverse/performer/${targetId}`, { replace: true });
    toast.info("Redirection vers le profil du créateur...");
  }, [performerId, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="mb-2">Redirection vers CreaVerse...</p>
        <div className="w-12 h-12 border-2 border-t-brand-red rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default PerformerProfile;
