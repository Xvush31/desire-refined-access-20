
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ghostMode } from "@/services/ghostMode";

const AgeVerification = () => {
  const [verified, setVerified] = useState(false);
  const { toast } = useToast();

  // Vérifier si l'utilisateur est déjà vérifié
  useEffect(() => {
    const isVerified = ghostMode.isEnabled() 
      ? ghostMode.get("age-verified") === "true"
      : localStorage.getItem("age-verified") === "true";
    
    setVerified(isVerified);
  }, []);

  const handleAgeConfirmation = (isAdult: boolean) => {
    if (isAdult) {
      setVerified(true);
      
      // Stocker la vérification selon le mode de navigation
      if (ghostMode.isEnabled()) {
        ghostMode.set("age-verified", "true");
      } else {
        localStorage.setItem("age-verified", "true");
      }
      
      toast({
        title: "Accès confirmé",
        description: "Bienvenue sur Xvush",
      });
    } else {
      toast({
        title: "Accès refusé",
        description: "Vous devez avoir 18 ans ou plus",
        variant: "destructive",
      });
      
      // Rediriger vers une page de sortie ou fermer l'application
      window.location.href = "https://www.google.com";
    }
  };

  if (verified) {
    return null; // Ne pas afficher si déjà vérifié
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md p-6 bg-secondary rounded-xl shadow-xl border border-white/10">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-medium">Vérification d'âge</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm text-center">
            Ce site contient du contenu pour adultes avec des restrictions d'âge, y compris 
            de la nudité et des représentations explicites. En continuant, vous affirmez 
            avoir au moins 18 ans ou l'âge légal dans votre juridiction.
          </p>
          
          <div className="flex flex-col space-y-4">
            <Button 
              variant="default" 
              className="w-full bg-brand-accent hover:bg-brand-accent/90"
              onClick={() => handleAgeConfirmation(true)}
            >
              J'ai 18 ans ou plus - Entrer
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => handleAgeConfirmation(false)}
            >
              J'ai moins de 18 ans - Sortir
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            Notre page sur le contrôle parental explique comment vous pouvez facilement bloquer l'accès à ce site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
