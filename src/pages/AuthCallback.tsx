
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

    if (token && role) {
      login(token, role, uid);
      console.log("Authentication callback successful, redirecting based on role:", role);
      
      if (role === "creator") {
        navigate("/creaverse");
        toast.success("Connexion réussie! Bienvenue sur CreaVerse");
      } else {
        navigate("/");
        toast.success("Connexion réussie!");
      }
    } else {
      console.error("Authentication callback failed: missing token or role");
      toast.error("Échec de l'authentification");
      navigate("/login");
    }
  }, [location, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-foreground">Redirection en cours...</p>
    </div>
  );
};

export default AuthCallback;
