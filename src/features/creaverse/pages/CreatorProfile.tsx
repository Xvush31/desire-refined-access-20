
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";
import MainContent from "../components/profile/MainContent";
import ProfileSections from "../components/profile/ProfileSections";
import DynamicHeader from "../components/header/DynamicHeader";
import LoadingState from "../components/profile/LoadingState";
import NotFoundState from "../components/profile/NotFoundState";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRevolutionaryNavigation } from "@/hooks/use-revolutionary-navigation";
import { useProfileContent } from "../hooks/useProfileContent";
import NavigationFooter from "../components/NavigationFooter";

const CreatorProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const { isImmersiveMode } = useRevolutionaryNavigation();
  
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  
  // Load performer data
  useEffect(() => {
    const loadPerformer = async () => {
      try {
        setLoading(true);
        
        if (!performerId) {
          setError("No performer ID provided");
          setLoading(false);
          return;
        }
        
        const fetchedPerformer = await fetchPerformerData(performerId);
        setPerformer(fetchedPerformer);
        
        // Check if current user is the owner
        if (currentUser && currentUser.uid === fetchedPerformer.id.toString()) {
          setIsOwner(true);
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error("Error loading performer:", err);
        setError(err.message || "Failed to load performer");
        setLoading(false);
      }
    };
    
    loadPerformer();
  }, [performerId, currentUser]);

  // Use our custom hook to manage content and interactions
  const {
    sampleContentItems,
    trendingContent,
    collections,
    relationshipLevel,
    contentLayout,
    activeTab,
    isFollowing,
    showRevenue,
    setShowRevenue,
    setContentLayout,
    setActiveTab,
    handleToggleFollow,
    handleSubscribe,
    handleSendMessage,
    handleViewRelationship,
    handleContentClick,
    handleCollectionClick,
    filterByFormat
  } = useProfileContent(performerId, isOwner);
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error || !performer) {
    return <NotFoundState errorMessage={error || "Performer not found"} />;
  }
  
  return (
    <div className="min-h-screen pt-0 pb-20">
      <DynamicHeader 
        username={performer.username}
        displayName={performer.displayName}
        profileImage={performer.image}
        isScrolled={false}
      />
      
      <MainContent 
        performer={performer}
        isOwner={isOwner}
        showRevenue={showRevenue}
        isFollowing={isFollowing}
        contentLayout={contentLayout}
        activeTab={activeTab}
        sampleContentItems={sampleContentItems}
        onToggleRevenue={() => setShowRevenue(prev => !prev)}
        onToggleFollow={handleToggleFollow}
        onSubscribe={handleSubscribe}
        onSendMessage={handleSendMessage}
        onViewRelationship={handleViewRelationship}
        setActiveTab={setActiveTab}
        setContentLayout={setContentLayout}
        handleContentClick={handleContentClick}
        filterByFormat={filterByFormat}
        relationshipLevel={relationshipLevel}
      />
      
      <ProfileSections 
        activeTab={activeTab}
        contentLayout={contentLayout}
        contentItems={sampleContentItems}
        trendingContent={trendingContent}
        collections={collections}
        handleContentClick={handleContentClick}
        handleCollectionClick={handleCollectionClick}
      />
      
      {isMobile && performer && (
        <NavigationFooter 
          performerId={performer.id} 
          performerImage={performer.image}
          performerName={performer.displayName}
        />
      )}
    </div>
  );
};

export default CreatorProfile;
