
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Share, Users } from "lucide-react";
import { ghostMode } from "@/services/ghostMode";

export type AffiliateStats = {
  referrals: number;
  earnings: number;
  pendingEarnings: number;
  conversionRate: number;
  currentTier: "bronze" | "silver" | "gold" | "platinum";
};

const mockAffiliateStats: AffiliateStats = {
  referrals: 12,
  earnings: 120,
  pendingEarnings: 45,
  conversionRate: 0.15,
  currentTier: "silver",
};

export const AffiliateProgram = () => {
  const { toast } = useToast();
  
  const generateAffiliateLink = () => {
    const baseUrl = window.location.origin;
    const affiliateCode = `ref_${Math.random().toString(36).substring(2, 10)}`;
    
    // Store the code in localStorage or ghostMode
    const previousCodes = ghostMode.isEnabled() 
      ? ghostMode.get("affiliate-codes") || []
      : JSON.parse(localStorage.getItem("affiliate-codes") || "[]");
    
    const newCodes = [...previousCodes, affiliateCode];
    
    if (ghostMode.isEnabled()) {
      ghostMode.set("affiliate-codes", newCodes);
    } else {
      localStorage.setItem("affiliate-codes", JSON.stringify(newCodes));
    }
    
    const affiliateLink = `${baseUrl}?ref=${affiliateCode}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(affiliateLink).then(
      () => {
        toast({
          title: "Lien d'affiliation copié!",
          description: "Partagez-le avec vos amis pour gagner des commissions.",
        });
      },
      (err) => {
        toast({
          title: "Erreur lors de la copie",
          description: "Veuillez copier manuellement: " + affiliateLink,
          variant: "destructive",
        });
      }
    );
    
    return affiliateLink;
  };

  return (
    <div className="bg-secondary/30 rounded-2xl p-6 my-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Programme d'Affiliation</h2>
          <p className="text-muted-foreground mb-4">
            Partagez et gagnez! Recevez des commissions pour chaque nouvel abonné.
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <Badge variant="default" className="bg-[#D2C7BA] hover:bg-[#B8AEA2] text-black mr-3 py-1.5">
            Niveau {mockAffiliateStats.currentTier.charAt(0).toUpperCase() + mockAffiliateStats.currentTier.slice(1)}
          </Badge>
          <Button 
            onClick={generateAffiliateLink}
            className="bg-[#D2C7BA] hover:bg-[#B8AEA2] text-black"
          >
            <Share size={18} className="mr-1" />
            Générer un lien
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl">
          <p className="text-muted-foreground text-sm">Parrainages</p>
          <p className="text-2xl font-bold">{mockAffiliateStats.referrals}</p>
        </div>
        <div className="bg-card p-4 rounded-xl">
          <p className="text-muted-foreground text-sm">Gains totaux</p>
          <p className="text-2xl font-bold">{mockAffiliateStats.earnings}€</p>
        </div>
        <div className="bg-card p-4 rounded-xl">
          <p className="text-muted-foreground text-sm">En attente</p>
          <p className="text-2xl font-bold">{mockAffiliateStats.pendingEarnings}€</p>
        </div>
        <div className="bg-card p-4 rounded-xl">
          <p className="text-muted-foreground text-sm">Taux de conversion</p>
          <p className="text-2xl font-bold">{(mockAffiliateStats.conversionRate * 100).toFixed(1)}%</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 border border-muted rounded-xl bg-card/50">
        <h3 className="text-lg font-medium mb-2">Comment ça fonctionne</h3>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Générez votre lien d'affiliation unique</li>
          <li>Partagez-le avec votre audience</li>
          <li>Gagnez 20% sur chaque nouvel abonnement</li>
          <li>Débloquez des récompenses à chaque palier atteint</li>
        </ol>
      </div>
    </div>
  );
};

export default AffiliateProgram;
