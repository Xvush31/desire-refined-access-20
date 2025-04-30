
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Ce composant est maintenant remplacé par CreaVerse
 * Il redirige automatiquement vers le nouveau système
 */
const PerformerProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirection vers CreaVerse
    navigate(`/performer/${performerId || '1'}`, { replace: true });
  }, [performerId, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirection vers CreaVerse...</p>
    </div>
  );
};

export default PerformerProfile;
