
import React, { useState } from "react";
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

const CreatorProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const { theme } = useTheme();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  
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
    handleFollowToggle,
    handleFilterByFormat
  } = useProfileData(performerId);
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (!performer) {
    return <NotFoundState />;
  }
  
  const handleSendMessage = () => {
    setIsMessageDialogOpen(true);
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
        onSubscribe={handleSubscribe}
        onSendMessage={handleSendMessage}
        setActiveTab={setActiveTab}
        setContentLayout={setContentLayout}
        handleContentClick={handleContentClick}
        filterByFormat={handleFilterByFormat}
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
      
      <SendMessageDialog 
        performerName={performer?.displayName || ""} 
        performerId={performer?.id}
        isOpen={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
      />
    </div>
  );
};

export default CreatorProfile;
