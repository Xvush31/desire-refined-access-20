
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CREAVERSE_DOMAIN } from "../utils/creaverseLinks";
import { toast } from "sonner";

interface CreaVerseRedirectProps {
  pathPrefix?: string;
}

/**
 * Component to redirect users to the external CreaVerse domain
 */
const CreaVerseRedirect: React.FC<CreaVerseRedirectProps> = ({ pathPrefix = "" }) => {
  const params = useParams<Record<string, string>>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Build the path with any URL parameters
    const buildPath = () => {
      const paramsInPath = Object.entries(params)
        .map(([key, value]) => ({key, value}))
        .filter(({value}) => value !== undefined);
        
      if (paramsInPath.length === 0) {
        return pathPrefix;
      }
      
      return `${pathPrefix}/${paramsInPath.map(({value}) => value).join('/')}`;
    };
    
    const targetPath = buildPath();
    const targetUrl = `${CREAVERSE_DOMAIN}${targetPath ? `/${targetPath}` : ''}`;
    
    // Show toast notification
    toast.info("Redirection vers CreaVerse...", {
      description: "Vous allez être redirigé vers la nouvelle plateforme CreaVerse"
    });
    
    console.log(`Redirecting to CreaVerse: ${targetUrl}`);
    
    // Set a timeout to make sure the user sees the toast
    const redirectTimeout = setTimeout(() => {
      window.location.href = targetUrl;
    }, 1500);
    
    return () => clearTimeout(redirectTimeout);
  }, [params, pathPrefix, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-bold mb-2">Redirection en cours...</h2>
        <p className="mb-4">Nous vous redirigeons vers CreaVerse</p>
        <div className="w-12 h-12 border-2 border-t-brand-red rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default CreaVerseRedirect;
