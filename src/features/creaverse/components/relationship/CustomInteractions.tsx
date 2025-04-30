
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, MessageCircle, Video, Gift, Calendar, Star } from "lucide-react";
import { toast } from "sonner";

interface CustomInteractionsProps {
  unlockedInteractions: string[];
  performerName: string;
  className?: string;
}

interface InteractionOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const CustomInteractions: React.FC<CustomInteractionsProps> = ({ 
  unlockedInteractions, 
  performerName,
  className = "" 
}) => {
  // All possible interactions
  const allInteractions: InteractionOption[] = [
    {
      id: "basic-messaging",
      name: "Message privé",
      description: "Envoyez un message privé",
      icon: <MessageCircle size={18} />
    },
    {
      id: "monthly-exclusive",
      name: "Contenu exclusif",
      description: "Accès au contenu mensuel exclusif",
      icon: <Star size={18} />
    },
    {
      id: "custom-content",
      name: "Contenu personnalisé",
      description: "Demandez du contenu sur mesure",
      icon: <Star size={18} />
    },
    {
      id: "early-access",
      name: "Accès anticipé",
      description: "Accédez en avant-première aux contenus",
      icon: <Calendar size={18} />
    },
    {
      id: "video-calls",
      name: "Appels vidéo",
      description: "Planifiez un appel vidéo bimensuel",
      icon: <Video size={18} />
    },
    {
      id: "exclusive-gifts",
      name: "Cadeaux exclusifs",
      description: "Recevez des cadeaux exclusifs",
      icon: <Gift size={18} />
    },
    {
      id: "private-call",
      name: "Appel privé",
      description: "Planifiez un appel privé mensuel",
      icon: <Video size={18} />
    },
    {
      id: "personal-request",
      name: "Demande personnelle",
      description: "Faites une demande spéciale",
      icon: <Star size={18} />
    },
    {
      id: "vip-meetup",
      name: "Rencontre VIP",
      description: "Opportunité de rencontre en personne",
      icon: <Calendar size={18} />
    }
  ];
  
  // Filter and split interactions into unlocked and locked
  const availableInteractions = allInteractions.filter(i => unlockedInteractions.includes(i.id));
  const lockedInteractions = allInteractions.filter(i => !unlockedInteractions.includes(i.id));
  
  const handleInteractionClick = (interaction: InteractionOption) => {
    toast.success(`${interaction.name} avec ${performerName}`, {
      description: `Votre demande a été envoyée. ${performerName} vous répondra bientôt.`
    });
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Interactions personnalisées</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Unlocked Interactions */}
          {availableInteractions.map((interaction) => (
            <div key={interaction.id} className="flex items-center justify-between p-2 border rounded-md bg-card">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-full bg-muted">
                  {interaction.icon}
                </div>
                <div>
                  <p className="font-medium">{interaction.name}</p>
                  <p className="text-xs text-muted-foreground">{interaction.description}</p>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleInteractionClick(interaction)}
                className="ml-2"
              >
                <Unlock size={14} className="mr-1" />
                Utiliser
              </Button>
            </div>
          ))}
          
          {/* Locked Interactions (showing first 3) */}
          {lockedInteractions.slice(0, 3).map((interaction) => (
            <div key={interaction.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/30 text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-full bg-muted/50">
                  {interaction.icon}
                </div>
                <div>
                  <p className="font-medium">{interaction.name}</p>
                  <p className="text-xs">Débloquez en atteignant un niveau supérieur</p>
                </div>
              </div>
              <Button size="sm" variant="outline" disabled>
                <Lock size={14} className="mr-1" />
                Verrouillé
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomInteractions;
