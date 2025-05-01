
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRevolutionaryNavigation } from "@/hooks/use-revolutionary-navigation";
import { useProfileContent } from "../hooks/useProfileContent";
import { toast } from "sonner";

// Component imports
import NavigationFooter from "../components/NavigationFooter";
import ModernNavigation from "../components/navigation/ModernNavigation";
import ModernProfileHeader from "../components/creator/ModernProfileHeader";
import ProfileContent from "../components/profile/ProfileContent";
import LoadingState from "../components/profile/LoadingState";
import NotFoundState from "../components/profile/NotFoundState";

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
  
  // Handle subscription button click
  const handleSubscribeClick = () => {
    handleSubscribe();
    toast.success("Action d'abonnement initiée");
  };
  
  // Handle upcoming event subscription
  const handleEventSubscribe = () => {
    toast.success("Vous serez notifié avant le prochain événement");
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error || !performer) {
    return <NotFoundState errorMessage={error || "Performer not found"} />;
  }

  // Stats data preparation with default values to avoid TypeScript errors
  const statsData = {
    followers: parseInt(performer.followers.replace(/[^\d]/g, '') || '0'),
    following: 0,
    revenue: 0,
    growthRate: 0,
    nextTierProgress: 0,
    retentionRate: 0,
    superfans: 0,
    watchMinutes: '0'
  };

  if (performer.stats) {
    if (performer.stats.monthlyRevenue) statsData.revenue = performer.stats.monthlyRevenue;
    if (performer.stats.monthlyRevenueChange) statsData.growthRate = performer.stats.monthlyRevenueChange;
    if (performer.stats.retentionRate) statsData.retentionRate = parseFloat(performer.stats.retentionRate);
    if (performer.stats.superfans) statsData.superfans = performer.stats.superfans;
    if (performer.stats.watchMinutes) statsData.watchMinutes = performer.stats.watchMinutes;
  }

  // Mock upcoming event if needed
  const upcomingEvent = performer.nextEvent ? {
    title: performer.nextEvent.title || "Prochain live",
    time: performer.nextEvent.time || "Aujourd'hui, 20:00",
    type: 'live' as const,
    countdown: performer.nextEvent.timeRemaining || "2h"
  } : undefined;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <ModernNavigation 
        isCreator={isOwner} 
        performerId={performer.id}
      />
      
      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <ModernProfileHeader 
          name={performer.displayName}
          username={performer.username}
          avatar={performer.image}
          bio={performer.description}
          tier={performer.tier || 'silver'}
          metrics={statsData}
          status={performer.status ? performer.status : 'offline'}
          scheduledTime={performer.nextEvent?.time}
          isCreator={isOwner}
          upcomingEvent={upcomingEvent}
          onEventSubscribe={handleEventSubscribe}
        />
        
        {/* Content Area */}
        <div className="mt-6">
          <ProfileContent 
            activeTab={activeTab}
            contentLayout={contentLayout}
            setContentLayout={setContentLayout}
            isOwner={isOwner}
            performerId={performer.id}
            handleSubscribe={handleSubscribeClick}
            handleContentClick={handleContentClick}
            sampleContentItems={sampleContentItems}
            filterByFormat={filterByFormat}
          />
        </div>
      </div>
      
      {/* Mobile Navigation Footer */}
      {isMobile && (
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
