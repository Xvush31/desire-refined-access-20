
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";

import NavigationFooter from "../components/NavigationFooter";
import SendMessageDialog from "@/components/SendMessageDialog";
import ProfileHeader from "../components/profile/ProfileHeader";
import LoadingState from "../components/profile/LoadingState";
import NotFoundState from "../components/profile/NotFoundState";
import MainContent from "../components/profile/MainContent";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";
import ProfileSections from "../components/profile/ProfileSections";
import { useProfileData } from "../hooks/useProfileData";
import { ContentItem } from "../components/content/ContentCard";
import { useAuth } from "@/contexts/AuthContext";
import RelationshipDashboard from "../components/relationship/RelationshipDashboard";
import { 
  getUserPerformerRelationship, 
  toggleFollowingStatus, 
  addRelationshipPoints 
} from "../api/services/relationshipService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CreatorProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isRelationshipDialogOpen, setIsRelationshipDialogOpen] = useState(false);
  const [relationship, setRelationship] = useState<any>(null);
  
  // Use our custom hook to handle profile data
  const {
    performer,
    loading,
    isFollowing,
    showRevenue,
    contentLayout,
    activeTab,
    contentItems,
    trendingContent,
    collections,
    isOwner,
    setShowRevenue,
    setContentLayout,
    setActiveTab,
    handleSubscribe,
    handleFollowToggle: originalHandleFollowToggle,
    handleFilterByFormat
  } = useProfileData(performerId);

  // Load relationship data
  useEffect(() => {
    const loadRelationship = async () => {
      if (!performerId || !performer) return;
      
      try {
        const userId = currentUser?.uid || "visitor";
        const data = await getUserPerformerRelationship(userId, performer.id);
        setRelationship(data);
      } catch (error) {
        console.error("Error loading relationship data:", error);
      }
    };
    
    if (performer) {
      loadRelationship();
    }
  }, [performerId, performer, currentUser]);
  
  // Enhanced follow toggle with relationship update
  const handleFollowToggle = async () => {
    try {
      if (!performer) return;
      
      const userId = currentUser?.uid || "visitor";
      const result = await toggleFollowingStatus(userId, performer.id);
      
      // Update local following state
      originalHandleFollowToggle();
      
      // Update relationship if needed
      if (result && !isFollowing) {
        // Add relationship points for following
        const updatedRelationship = await addRelationshipPoints(
          userId, 
          performer.id, 
          1, 
          "subscription", 
          "A commencé à suivre"
        );
        setRelationship(updatedRelationship);
        
        toast.success("Super-fan en devenir!", {
          description: "Abonnez-vous pour débloquer plus d'interactions."
        });
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };
  
  // Enhanced subscribe handler with relationship update
  const handleSubscribeWithRelationship = async () => {
    try {
      if (!performer) return;
      
      // Call the original subscription handler
      handleSubscribe();
      
      // Update relationship with substantial points
      const userId = currentUser?.uid || "visitor";
      const updatedRelationship = await addRelationshipPoints(
        userId, 
        performer.id, 
        50, 
        "subscription", 
        "Abonnement mensuel"
      );
      
      setRelationship(updatedRelationship);
      
      toast.success("Relation améliorée!", {
        description: `Vous êtes maintenant ${updatedRelationship.level >= 3 ? 'super-fan' : 'fan'} de ${performer.displayName}.`
      });
    } catch (error) {
      console.error("Error handling subscription:", error);
    }
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (!performer) {
    return <NotFoundState />;
  }
  
  const handleSendMessage = () => {
    setIsMessageDialogOpen(true);
  };
  
  const handleViewRelationship = () => {
    setIsRelationshipDialogOpen(true);
  };
  
  const handleContentClick = (contentItem: ContentItem) => {
    toast.info(`Ouverture de: ${contentItem.title}`);
    // Implementation to be completed
  };
  
  const handleCollectionClick = (collection: any) => {
    toast.info(`Collection sélectionnée: ${collection.name}`);
    // Implementation to be completed
  };
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
      {/* Header with navigation */}
      <ProfileHeader 
        username={performer?.username || ""}
        performer={performer}
      />
      
      <MainContent
        performer={performer}
        isOwner={isOwner}
        showRevenue={showRevenue}
        isFollowing={isFollowing}
        contentLayout={contentLayout}
        activeTab={activeTab}
        sampleContentItems={contentItems}
        onToggleRevenue={() => setShowRevenue(!showRevenue)}
        onToggleFollow={handleFollowToggle}
        onSubscribe={handleSubscribeWithRelationship}
        onSendMessage={handleSendMessage}
        onViewRelationship={handleViewRelationship}
        setActiveTab={setActiveTab}
        setContentLayout={setContentLayout}
        handleContentClick={handleContentClick}
        filterByFormat={handleFilterByFormat}
        relationshipLevel={relationship?.level}
      />
      
      {/* Content sections managed by ProfileSections component */}
      <ProfileSections
        activeTab={activeTab}
        contentLayout={contentLayout}
        contentItems={contentItems}
        trendingContent={trendingContent}
        collections={collections}
        handleContentClick={handleContentClick}
        handleCollectionClick={handleCollectionClick}
      />
      
      {/* Navigation inférieure */}
      <NavigationFooter
        performerId={performer?.id || "visitor"} 
        performerImage={performer?.image || "/placeholder.svg"}
        performerName={performer?.username || "Visiteur"}
      />
      
      <ScrollToTopButton threshold={200} />
      
      {/* Message Dialog */}
      <SendMessageDialog 
        performerName={performer?.displayName || ""} 
        performerId={performer?.id}
        isOpen={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
      />
      
      {/* Relationship Dialog */}
      <Dialog open={isRelationshipDialogOpen} onOpenChange={setIsRelationshipDialogOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Relation avec {performer.displayName}</DialogTitle>
          </DialogHeader>
          
          <RelationshipDashboard 
            performerId={performer.id} 
            performerName={performer.displayName} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorProfile;
