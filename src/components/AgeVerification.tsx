
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AgeVerification = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [birthDate, setBirthDate] = useState("");
  const [idSubmitted, setIdSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const { toast } = useToast();

  // Check if user is already verified in local storage
  useEffect(() => {
    const isVerified = localStorage.getItem("age-verified");
    if (isVerified === "true") {
      setVerified(true);
    }
  }, []);

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client-side age verification (18+ check)
    const inputDate = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - inputDate.getFullYear();
    const monthDiff = today.getMonth() - inputDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < inputDate.getDate())) {
      age--;
    }
    
    if (age >= 18) {
      setStep(2);
      toast({
        title: "Étape 1 complétée",
        description: "Veuillez compléter la deuxième étape de vérification",
      });
    } else {
      toast({
        title: "Âge insuffisant",
        description: "Vous devez avoir 18 ans ou plus pour accéder à ce contenu",
        variant: "destructive",
      });
    }
  };

  const handleIDSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate ID verification process
    setIdSubmitted(true);
    
    // In a real implementation, we would send the ID document to Supabase storage
    // and then verify it using a secure backend process
    setTimeout(() => {
      setVerified(true);
      localStorage.setItem("age-verified", "true");
      
      toast({
        title: "Vérification complétée",
        description: "Votre âge a été vérifié avec succès",
      });

      // In a real implementation, we would store a token in Supabase
      // that proves the user has been verified
    }, 2000);
  };

  if (verified) {
    return null; // Don't show anything if already verified
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md p-6 bg-secondary rounded-xl shadow-xl border border-white/10">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-medium">Vérification d'âge</h2>
        </div>
        
        {step === 1 ? (
          <form onSubmit={handleDateSubmit} className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Pour accéder à ce contenu, vous devez vérifier que vous avez l'âge légal (18 ans ou plus).
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="birthdate">Date de naissance</Label>
              <Input 
                id="birthdate" 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required 
                className="bg-background/50"
              />
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <p className="text-xs text-muted-foreground">
                <Lock className="inline h-3 w-3 mr-1" /> 
                Vos informations sont chiffrées et sécurisées
              </p>
              <Button type="submit">Continuer</Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleIDSubmit} className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Dernière étape : Veuillez télécharger une pièce d'identité pour vérification.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="id-document">Document d'identité</Label>
              <Input 
                id="id-document" 
                type="file" 
                accept="image/*" 
                disabled={idSubmitted}
                required 
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Document accepté : passeport, permis de conduire, carte d'identité
              </p>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <p className="text-xs text-muted-foreground">
                <Lock className="inline h-3 w-3 mr-1" /> 
                Tokenisation sécurisée, aucune copie n'est conservée
              </p>
              
              {idSubmitted ? (
                <Button disabled>
                  Vérification en cours...
                </Button>
              ) : (
                <Button type="submit">Vérifier</Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AgeVerification;
