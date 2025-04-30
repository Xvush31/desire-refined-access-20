import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ghostMode } from "@/services/ghostMode";

const Invite = () => {
  const { code } = useParams();
  const [isValidCode, setIsValidCode] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateInviteCode = async () => {
      setIsLoading(true);
      
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Récupérer les liens privés depuis le stockage
      const privateLinks = ghostMode.isEnabled() 
        ? ghostMode.get("private-links") || []
        : JSON.parse(localStorage.getItem("private-links") || "[]");
      
      // Rechercher le lien correspondant au code
      const link = privateLinks.find(link => link.code === code);
      
      if (link) {
        // Vérifier si le lien est actif et pas expiré
        const now = new Date();
        const expiresAt = new Date(link.expiresAt);
        
        if (link.isActive && now < expiresAt && link.usages < link.maxUsages) {
          setIsValidCode(true);
          
          // Activer l'accès premium pour 7 jours
          const premiumExpiry = new Date();
          premiumExpiry.setDate(premiumExpiry.getDate() + 7);
          
          if (ghostMode.isEnabled()) {
            ghostMode.set("premium-access", true);
            ghostMode.set("premium-expiry", premiumExpiry.toISOString());
          } else {
            localStorage.setItem("premium-access", "true");
            localStorage.setItem("premium-expiry", premiumExpiry.toISOString());
          }
          
          toast.success("Accès Premium activé!", {
            description: "Vous avez maintenant un accès premium pour 7 jours. Profitez-en!",
          });
          
          // Marquer le lien comme utilisé
          const updatedLinks = privateLinks.map(l => {
            if (l.code === code) {
              return { ...l, usages: l.usages + 1 };
            }
            return l;
          });
          
          if (ghostMode.isEnabled()) {
            ghostMode.set("private-links", updatedLinks);
          } else {
            localStorage.setItem("private-links", JSON.stringify(updatedLinks));
          }
        } else {
          setIsValidCode(false);
          
          if (now >= expiresAt) {
            toast.error("Invitation expirée", {
              description: "Ce lien d'invitation n'est plus valide.",
            });
          } else if (link.usages >= link.maxUsages) {
            toast.error("Invitation déjà utilisée", {
              description: "Ce lien d'invitation a déjà été utilisé.",
            });
          } else {
            toast.error("Invitation non valide", {
              description: "Ce lien d'invitation n'est pas actif.",
            });
          }
        }
      } else {
        setIsValidCode(false);
        toast.error("Code non reconnu", {
          description: "Le code d'invitation n'est pas valide.",
        });
      }
      
      setIsLoading(false);
    };
    
    if (code) {
      validateInviteCode();
    } else {
      setIsValidCode(false);
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto bg-card rounded-2xl p-8 text-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D2C7BA] mb-4"></div>
              <p className="text-lg">Vérification de votre invitation...</p>
            </div>
          ) : isValidCode ? (
            <div className="flex flex-col items-center">
              <div className="bg-[#D2C7BA] text-black p-4 rounded-full mb-6">
                <Gift size={48} />
              </div>
              <h1 className="text-2xl font-bold mb-2">Félicitations!</h1>
              <p className="text-muted-foreground mb-6">
                Votre accès premium a été activé pour les 7 prochains jours. Profitez de tous les avantages de l'offre premium!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
                <div className="bg-secondary/30 p-4 rounded-xl">
                  <p className="font-medium mb-1">Accès illimité</p>
                  <p className="text-sm text-muted-foreground">À tout le contenu premium</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-xl">
                  <p className="font-medium mb-1">Téléchargements</p>
                  <p className="text-sm text-muted-foreground">Sans restrictions</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-xl">
                  <p className="font-medium mb-1">Qualité HD</p>
                  <p className="text-sm text-muted-foreground">Streaming haute définition</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-xl">
                  <p className="font-medium mb-1">Sans publicité</p>
                  <p className="text-sm text-muted-foreground">Expérience sans interruption</p>
                </div>
              </div>
              <Button className="w-full bg-[#D2C7BA] hover:bg-[#B8AEA2] text-black">
                Explorer le contenu premium
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-muted p-4 rounded-full mb-6">
                <Gift size={48} className="text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Invitation non valide</h1>
              <p className="text-muted-foreground mb-6">
                Ce lien d'invitation n'est pas valide ou a déjà été utilisé. Veuillez demander un nouveau lien à la personne qui vous a invité.
              </p>
              <Button className="w-full bg-[#D2C7BA] hover:bg-[#B8AEA2] text-black" onClick={() => window.location.href = "/"}>
                Retour à l'accueil
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invite;
