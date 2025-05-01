
import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import ProfileHeader from "../components/profile/ProfileHeader";
import MainContent from "../components/profile/MainContent";
import ProfileSections from "../components/profile/ProfileSections";
import { useProfileData } from "../hooks/useProfileData";
import EngagementDashboard from "@/components/creator/EngagementDashboard";
import { toast } from "sonner";
import LoadingState from "../components/profile/LoadingState";
import NotFoundState from "../components/profile/NotFoundState";

const CreatorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("CreatorProfile component rendered with id:", id);
  
  const { theme } = useTheme();
  
  const {
    performer,
    loading,
    error,
    contentLoading,
    isFollowing,
    showRevenue,
    contentLayout,
    activeTab,
    contentItems,
    trendingContent,
    collections,
    isOwner,
    setShowRevenue,
    setIsFollowing,
    setContentLayout,
    setActiveTab,
    handleSubscribe,
    handleFollowToggle,
    handleFilterByFormat
  } = useProfileData(id);

  // Logs for debugging
  console.log("CreatorProfile data:", { performer, loading, error });
  
  const handleContentClick = (contentItem: any) => {
    console.log("Content clicked:", contentItem);
    toast.info(`Vous avez sélectionné: ${contentItem.title}`);
  };
  
  const handleCollectionClick = (collection: any) => {
    console.log("Collection clicked:", collection);
    toast.info(`Collection: ${collection.name}`);
  };
  
  const handleSendMessage = () => {
    toast.info("Fonction de messagerie en développement");
  };
  
  const handleViewRelationship = () => {
    toast.info("Fonctionnalité de relation en développement");
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error || !performer) {
    return <NotFoundState message={error || "Profil non trouvé"} />;
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-black/90'}`}>
      {/* Profile Header */}
      <ProfileHeader 
        username={performer.username} 
        performer={performer}
      />
      
      {/* Engagement Dashboard */}
      {!contentLoading && <EngagementDashboard performer={performer} isOwner={isOwner} />}
      
      {/* Main Content */}
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
        onSubscribe={handleSubscribe}
        onSendMessage={handleSendMessage}
        onViewRelationship={handleViewRelationship}
        setActiveTab={setActiveTab}
        setContentLayout={setContentLayout}
        handleContentClick={handleContentClick}
        filterByFormat={handleFilterByFormat}
      />
      
      {/* Additional Profile Sections */}
      <ProfileSections 
        activeTab={activeTab}
        contentLayout={contentLayout}
        contentItems={contentItems}
        trendingContent={trendingContent}
        collections={collections}
        handleContentClick={handleContentClick}
        handleCollectionClick={handleCollectionClick}
      />
    </div>
  );
};

export default CreatorProfile;
