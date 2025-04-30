
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RelationshipBadge from "./RelationshipBadge";
import { UserPerformerRelationship, RelationshipLevel, relationshipLevels } from "../../api/services/relationshipService";
import { CalendarDays, Clock, MessageCircle, Award } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface RelationshipStatusProps {
  relationship: UserPerformerRelationship;
  className?: string;
  compact?: boolean;
}

const RelationshipStatus: React.FC<RelationshipStatusProps> = ({ 
  relationship,
  className = "",
  compact = false
}) => {
  // Get the current level and next level
  const currentLevel = relationshipLevels[relationship.level];
  const nextLevelKey = relationship.level < RelationshipLevel.SuperFan 
    ? relationship.level + 1
    : relationship.level;
  const nextLevel = relationshipLevels[nextLevelKey];
  
  // Calculate progress to next level
  const currentMin = currentLevel.minimumSupport;
  const nextMin = nextLevel.minimumSupport;
  const pointsNeeded = nextMin - currentMin;
  const pointsProgress = relationship.supportPoints - currentMin;
  const progressPercentage = Math.min(100, Math.round((pointsProgress / pointsNeeded) * 100));
  
  // Format dates
  const firstInteractionDate = formatDistanceToNow(relationship.firstInteractionDate, { 
    addSuffix: true, 
    locale: fr 
  });
  const lastInteractionDate = formatDistanceToNow(relationship.lastInteractionDate, { 
    addSuffix: true, 
    locale: fr 
  });
  
  if (compact) {
    return (
      <div className={`p-3 bg-card border rounded-lg shadow-sm ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <RelationshipBadge level={relationship.level} />
          <span className="text-xs text-muted-foreground">
            {relationship.supportPoints} pts
          </span>
        </div>
        
        {relationship.level < RelationshipLevel.SuperFan && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Prochain niveau: {nextLevel.name}</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Relation</span>
            <RelationshipBadge level={relationship.level} />
          </div>
          <div className="text-sm font-normal text-muted-foreground">
            {relationship.supportPoints} points
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress to next level */}
          {relationship.level < RelationshipLevel.SuperFan && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progression vers {nextLevel.name}</span>
                <span className="font-semibold">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {pointsProgress} sur {pointsNeeded} points nécessaires
              </p>
            </div>
          )}
          
          {/* Relationship info */}
          <div className="space-y-3 pt-2">
            {/* First interaction */}
            <div className="flex items-center text-sm">
              <CalendarDays size={16} className="mr-2 text-muted-foreground" />
              <span>Première interaction: </span>
              <span className="ml-1 text-muted-foreground">{firstInteractionDate}</span>
            </div>
            
            {/* Last interaction */}
            <div className="flex items-center text-sm">
              <Clock size={16} className="mr-2 text-muted-foreground" />
              <span>Dernière interaction: </span>
              <span className="ml-1 text-muted-foreground">{lastInteractionDate}</span>
            </div>
            
            {/* Priority access */}
            {relationship.priorityAccess && (
              <div className="flex items-center text-sm">
                <MessageCircle size={16} className="mr-2 text-brand-red" />
                <span>Accès prioritaire aux messages</span>
              </div>
            )}
            
            {/* Loyalty points */}
            <div className="flex items-center text-sm">
              <Award size={16} className="mr-2 text-amber-500" />
              <span>Programme de fidélité: </span>
              <span className="ml-1 font-semibold">{relationship.loyaltyPoints} points</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelationshipStatus;
