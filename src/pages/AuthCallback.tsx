
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const role = params.get("role");
    const uid = params.get("uid") || "";
    
    // Get the return URL if available
    const returnTo = sessionStorage.getItem('returnTo') || "/creaverse";
    console.log("Auth callback with return path:", returnTo);

    if (token && role) {
      login(token, role, uid);
      console.log("Authentication callback successful, redirecting based on role:", role);
      
      // Remove the stored return path
      sessionStorage.removeItem('returnTo');
      
      // Always redirect to CreaVerse after successful authentication
      navigate(returnTo);
      toast.success("Connexion réussie! Bienvenue sur CreaVerse");
    } else {
      console.error("Authentication callback failed: missing token or role");
      toast.error("Échec de l'authentification");
      navigate("/login");
    }
  }, [location, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="mb-2 text-foreground">Redirection en cours...</p>
        <div className="w-12 h-12 border-2 border-t-brand-red rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;
