
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Gift, Ticket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LoyaltyProgramProps {
  points: number;
  className?: string;
}

interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  icon: React.ReactNode;
}

const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({ points, className = "" }) => {
  // Available rewards in the loyalty program
  const rewards: LoyaltyReward[] = [
    {
      id: "reward1",
      name: "Coupon 10% réduction",
      description: "10% de réduction sur le prochain abonnement",
      pointsCost: 500,
      icon: <Ticket size={18} className="text-blue-500" />
    },
    {
      id: "reward2",
      name: "Contenu exclusif",
      description: "Accès à un pack de contenu spécial",
      pointsCost: 1000,
      icon: <Gift size={18} className="text-purple-500" />
    },
    {
      id: "reward3",
      name: "Badge personnalisé",
      description: "Badge spécial pour votre profil",
      pointsCost: 1500,
      icon: <Award size={18} className="text-amber-500" />
    },
    {
      id: "reward4",
      name: "Accès VIP",
      description: "Statut VIP pour 30 jours",
      pointsCost: 2500,
      icon: <Crown size={18} className="text-pink-500" />
    }
  ];
  
  const handleRedeemReward = (reward: LoyaltyReward) => {
    if (points >= reward.pointsCost) {
      toast.success(`Récompense échangée : ${reward.name}`, {
        description: `Vous avez utilisé ${reward.pointsCost} points de fidélité.`
      });
    } else {
      toast.error("Points insuffisants", {
        description: `Il vous manque ${reward.pointsCost - points} points pour cette récompense.`
      });
    }
  };
  
  // Get next available reward
  const nextReward = rewards.find(r => r.pointsCost > points) || rewards[rewards.length - 1];
  const progressToNextReward = nextReward 
    ? Math.min(100, Math.round((points / nextReward.pointsCost) * 100))
    : 100;
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Award className="mr-2 text-amber-500" size={20} />
            Programme de fidélité
          </CardTitle>
          <span className="font-bold text-amber-500">{points} points</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress to next reward */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Prochaine récompense: {nextReward.name}</span>
              <span>{progressToNextReward}%</span>
            </div>
            <Progress value={progressToNextReward} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {points} sur {nextReward.pointsCost} points nécessaires
            </p>
          </div>
          
          {/* Available rewards */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-medium">Récompenses disponibles</h4>
            {rewards.map((reward) => (
              <div 
                key={reward.id} 
                className={`flex items-center justify-between p-2 border rounded-md ${
                  points >= reward.pointsCost ? 'bg-card' : 'bg-muted/30 text-muted-foreground'
                }`}
              >
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-muted">
                    {reward.icon}
                  </div>
                  <div>
                    <p className="font-medium">{reward.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{reward.description}</span>
                      <span className="ml-2 font-semibold">
                        {reward.pointsCost} pts
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant={points >= reward.pointsCost ? "default" : "outline"}
                  disabled={points < reward.pointsCost}
                  onClick={() => handleRedeemReward(reward)}
                >
                  Échanger
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyProgram;
