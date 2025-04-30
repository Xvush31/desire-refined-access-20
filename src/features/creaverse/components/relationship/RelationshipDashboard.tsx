
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RelationshipStatus from "./RelationshipStatus";
import SupportHistory from "./SupportHistory";
import CustomInteractions from "./CustomInteractions";
import LoyaltyProgram from "./LoyaltyProgram";
import PriorityCommunication from "./PriorityCommunication";
import { getUserPerformerRelationship } from "../../api/services/relationshipService";
import { useAuth } from "@/contexts/AuthContext";

interface RelationshipDashboardProps {
  performerId: number;
  performerName: string;
  className?: string;
}

const RelationshipDashboard: React.FC<RelationshipDashboardProps> = ({ 
  performerId, 
  performerName,
  className = "" 
}) => {
  const [activeTab, setActiveTab] = useState("status");
  const { currentUser } = useAuth();
  const [relationship, setRelationship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadRelationship = async () => {
      setLoading(true);
      try {
        const userId = currentUser?.uid || "visitor";
        const data = await getUserPerformerRelationship(userId, performerId);
        setRelationship(data);
      } catch (error) {
        console.error("Error loading relationship data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRelationship();
  }, [performerId, currentUser]);
  
  if (loading) {
    return (
      <div className={`p-4 flex justify-center items-center ${className}`}>
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-12 bg-muted rounded-md w-1/3"></div>
          <div className="h-40 bg-muted rounded-md w-full"></div>
        </div>
      </div>
    );
  }
  
  if (!relationship) {
    return (
      <div className={`p-4 text-center ${className}`}>
        <p>Aucune relation établie avec ce créateur.</p>
      </div>
    );
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="status">Statut</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="loyalty">Fidélité</TabsTrigger>
          <TabsTrigger value="priority">Priorité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="pt-4">
          <RelationshipStatus relationship={relationship} />
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <SupportHistory history={relationship.supportHistory} />
        </TabsContent>
        
        <TabsContent value="interactions" className="pt-4">
          <CustomInteractions 
            unlockedInteractions={relationship.customInteractionsUnlocked} 
            performerName={performerName}
          />
        </TabsContent>
        
        <TabsContent value="loyalty" className="pt-4">
          <LoyaltyProgram points={relationship.loyaltyPoints} />
        </TabsContent>
        
        <TabsContent value="priority" className="pt-4">
          <PriorityCommunication level={relationship.level} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelationshipDashboard;
