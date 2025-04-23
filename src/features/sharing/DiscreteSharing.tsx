
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Share, Link, Gift } from "lucide-react";
import { ghostMode } from "@/services/ghostMode";

export type PrivateLink = {
  id: string;
  code: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  usages: number;
  maxUsages: number;
};

const DiscreteSharing = () => {
  const { toast } = useToast();
  const [generatedLinks, setGeneratedLinks] = useState<PrivateLink[]>([]);

  const createPrivateLink = () => {
    // Générer un code unique
    const linkCode = Math.random().toString(36).substring(2, 10);
    
    // Créer un lien expirant dans 7 jours
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(now.getDate() + 7);
    
    const newLink: PrivateLink = {
      id: `link_${Date.now()}`,
      code: linkCode,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      isActive: true,
      usages: 0,
      maxUsages: 1
    };
    
    // Sauvegarder en utilisant ghostMode ou localStorage
    const previousLinks = ghostMode.isEnabled() 
      ? ghostMode.get("private-links") || []
      : JSON.parse(localStorage.getItem("private-links") || "[]");
    
    const updatedLinks = [...previousLinks, newLink];
    
    if (ghostMode.isEnabled()) {
      ghostMode.set("private-links", updatedLinks);
    } else {
      localStorage.setItem("private-links", JSON.stringify(updatedLinks));
    }
    
    // Mettre à jour l'état
    setGeneratedLinks([...generatedLinks, newLink]);
    
    // Construire le lien complet
    const fullLink = `${window.location.origin}/invite/${linkCode}`;
    
    // Copier dans le presse-papier
    navigator.clipboard.writeText(fullLink).then(
      () => {
        toast({
          title: "Lien privé généré!",
          description: "Le lien a été copié dans votre presse-papier. Il expire dans 7 jours.",
        });
      },
      (err) => {
        toast({
          title: "Lien créé mais non copié",
          description: "Voici votre lien: " + fullLink,
        });
      }
    );
  };

  // Fonction utilitaire sécurisée pour formater les dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date inconnue";
    
    try {
      const date = new Date(dateString);
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) {
        return "Date invalide";
      }
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error("Erreur lors du formatage de la date:", error);
      return "Date invalide";
    }
  };

  return (
    <div className="bg-secondary/30 rounded-2xl p-6 my-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Partage Discret</h2>
          <p className="text-muted-foreground mb-4">
            Partagez du contenu en toute discrétion avec un accès premium temporaire de 7 jours.
          </p>
        </div>
        
        <Button 
          onClick={createPrivateLink}
          className="bg-[#D2C7BA] hover:bg-[#B8AEA2] text-black"
        >
          <Gift size={18} className="mr-1" />
          Générer un lien privé
        </Button>
      </div>
      
      {generatedLinks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-muted">
                <th className="pb-2 text-sm text-muted-foreground">Lien</th>
                <th className="pb-2 text-sm text-muted-foreground">Créé le</th>
                <th className="pb-2 text-sm text-muted-foreground">Expire le</th>
                <th className="pb-2 text-sm text-muted-foreground">Statut</th>
                <th className="pb-2 text-sm text-muted-foreground">Utilisations</th>
              </tr>
            </thead>
            <tbody>
              {generatedLinks.map((link) => (
                <tr key={link.id} className="border-b border-muted/50">
                  <td className="py-3 pr-4">
                    <div className="flex items-center">
                      <Link size={16} className="mr-2" />
                      <span className="text-sm truncate max-w-[120px]">
                        {link.code}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 h-7 w-7 p-0" 
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/invite/${link.code}`);
                          toast({
                            title: "Copié!",
                            description: "Le lien a été copié dans votre presse-papier.",
                          });
                        }}
                      >
                        <Share size={14} />
                      </Button>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm">{formatDate(link.createdAt)}</td>
                  <td className="py-3 pr-4 text-sm">{formatDate(link.expiresAt)}</td>
                  <td className="py-3 pr-4">
                    <Badge 
                      variant={link.isActive ? "default" : "outline"}
                      className={link.isActive ? "bg-[#D2C7BA] text-black" : ""}
                    >
                      {link.isActive ? "Actif" : "Expiré"}
                    </Badge>
                  </td>
                  <td className="py-3 text-sm">
                    {link.usages}/{link.maxUsages}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Link size={36} className="mx-auto mb-3 opacity-50" />
          <p>Vous n'avez pas encore généré de liens privés.</p>
        </div>
      )}
      
      <div className="mt-6 p-4 border border-muted rounded-xl bg-card/50">
        <h3 className="text-lg font-medium mb-2">Comment ça fonctionne</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Générez un lien privé pour partager du contenu exclusif</li>
          <li>Le lien offre un accès premium de 7 jours à la personne qui le reçoit</li>
          <li>Parfait pour partager discrètement avec vos proches</li>
          <li>Chaque lien ne peut être utilisé qu'une seule fois</li>
        </ul>
      </div>
    </div>
  );
};

export default DiscreteSharing;
