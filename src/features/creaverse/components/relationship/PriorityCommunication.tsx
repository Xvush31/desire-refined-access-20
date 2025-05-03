
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Clock, Shield, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RelationshipLevel, relationshipLevels } from "../../api/services/relationshipService";

interface PriorityCommunicationProps {
  level: RelationshipLevel;
  className?: string;
}

const PriorityCommunication: React.FC<PriorityCommunicationProps> = ({ level, className = "" }) => {
  // Get communication priority benefits based on level
  const getCommunicationBenefits = () => {
    switch (level) {
      case RelationshipLevel.SuperFan:
        return {
          responseTime: "Immédiate",
          priority: "Ultra prioritaire",
          badge: "bg-pink-500",
          icon: <MessageCircle size={16} className="text-white" />
        };
      case RelationshipLevel.Devoted:
        return {
          responseTime: "Sous 12 heures",
          priority: "Très haute",
          badge: "bg-amber-500",
          icon: <Clock size={16} className="text-white" />
        };
      case RelationshipLevel.Supportive:
        return {
          responseTime: "Sous 24 heures",
          priority: "Haute",
          badge: "bg-purple-500",
          icon: <Shield size={16} className="text-white" />
        };
      case RelationshipLevel.Regular:
        return {
          responseTime: "Sous 48 heures",
          priority: "Medium",
          badge: "bg-green-500",
          icon: <Clock size={16} className="text-white" />
        };
      default:
        return {
          responseTime: "Standard (72 heures)",
          priority: "Standard",
          badge: "bg-blue-500",
          icon: <AlertTriangle size={16} className="text-white" />
        };
    }
  };
  
  const benefits = getCommunicationBenefits();
  const levelInfo = relationshipLevels[level];
  
  // List of communication perks based on level
  const communicationPerks = [
    {
      level: RelationshipLevel.Basic,
      perk: "Messages privés (réponse standard)"
    },
    {
      level: RelationshipLevel.Regular,
      perk: "Réponses sous 48 heures garanties"
    },
    {
      level: RelationshipLevel.Supportive,
      perk: "Réponses sous 24 heures garanties"
    },
    {
      level: RelationshipLevel.Devoted,
      perk: "Réponses sous 12 heures + appels vidéo"
    },
    {
      level: RelationshipLevel.SuperFan,
      perk: "Réponses immédiates + appels privés"
    }
  ];
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle size={20} />
          Communication prioritaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current priority status */}
          <div className="flex items-center justify-between p-3 border rounded-md bg-card/50">
            <div>
              <div className="text-sm font-medium">Votre priorité actuelle</div>
              <div className="text-xs text-muted-foreground">
                Niveau {levelInfo.name}
              </div>
            </div>
            <Badge className={`${benefits.badge}`}>
              <span className="flex items-center gap-1">
                {benefits.icon}
                <span>{benefits.priority}</span>
              </span>
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-md bg-card/50">
            <div>
              <div className="text-sm font-medium">Temps de réponse estimé</div>
              <div className="text-xs text-muted-foreground">
                Pour les messages envoyés maintenant
              </div>
            </div>
            <div className="font-semibold text-brand-red">{benefits.responseTime}</div>
          </div>
          
          {/* Communication perks available at different levels */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Avantages de communication</h4>
            <div className="space-y-1.5">
              {communicationPerks.map((item) => (
                <div 
                  key={item.level} 
                  className={`flex items-center text-sm py-1 ${level >= item.level ? '' : 'text-muted-foreground'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full mr-2 ${level >= item.level ? 'bg-brand-red' : 'bg-muted'}`}></div>
                  <span>{item.perk}</span>
                  {level === item.level && (
                    <Badge variant="outline" className="ml-2 px-1.5 py-0 text-[10px] bg-muted/30">
                      Votre niveau
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityCommunication;
