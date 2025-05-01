
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, UserPlus, UserMinus, Star } from "lucide-react";
import ContentGrid from "../content/ContentGrid";
import ContentFlow from "../content/ContentFlow";
import ContentFormatFilter from "../content/ContentFormatFilter";
import ProfileInfo from "../creator/ProfileInfo";
import ProfileStats from "../creator/ProfileStats";
import ContentLayout from "../content/ContentLayout";
import MessagingButton from "../messaging/MessagingButton";

interface MainContentProps {
  performer: any;
  isOwner: boolean;
  showRevenue?: boolean;
  isFollowing: boolean;
  contentLayout: "grid" | "masonry" | "featured" | "flow";
  activeTab: string;
  sampleContentItems: any[];
  onToggleRevenue: () => void;
  onToggleFollow: () => void;
  onSubscribe: () => void;
  onSendMessage: () => void;
  onViewRelationship: () => void;
  setActiveTab: (tab: string) => void;
  setContentLayout: (layout: "grid" | "masonry" | "featured" | "flow") => void;
  handleContentClick: (item: any) => void;
  filterByFormat: (format: "all" | "video" | "image" | "audio" | "text") => void;
}

const MainContent: React.FC<MainContentProps> = ({
  performer,
  isOwner,
  showRevenue,
  isFollowing,
  contentLayout,
  activeTab,
  sampleContentItems,
  onToggleRevenue,
  onToggleFollow,
  onSubscribe,
  onSendMessage,
  onViewRelationship,
  setActiveTab,
  setContentLayout,
  handleContentClick,
  filterByFormat,
}) => {
  // Safely access performer properties with fallbacks
  const performerName = performer?.name || performer?.displayName || "Creator";
  const performerUsername = performer?.username || "";
  const performerBio = performer?.bio || performer?.description || "";
  const performerTier = performer?.tier || "";
  const performerIsVerified = performer?.isVerified || false;
  const performerIsOnline = performer?.isOnline || false;
  
  // Safely access metrics with fallbacks
  const followerCount = performer?.metrics?.followers || performer?.stats?.followers || 0;
  const followingCount = performer?.metrics?.following || performer?.stats?.following || 0;
  const contentCount = performer?.metrics?.contentCount || performer?.content?.total || performer?.stats?.contentCount || 0;
  const viewCount = performer?.metrics?.views || performer?.stats?.views || 0;

  return (
    <div className="container px-4 lg:px-8 py-6 -mt-12 z-20 relative">
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <ProfileInfo
            displayName={performerName}
            username={performerUsername}
            bio={performerBio}
            tier={performerTier}
            isVerified={performerIsVerified}
            isOnline={performerIsOnline}
          />
          
          <div className="flex flex-col xs:flex-row gap-3 justify-end">
            {!isOwner ? (
              <>
                <Button
                  onClick={onSubscribe}
                  className="flex items-center gap-2 animated-gradient-bg text-white min-w-[120px] justify-center"
                >
                  <Star className="h-4 w-4" />
                  S'abonner
                </Button>

                <MessagingButton
                  performerId={performer.id.toString()}
                  performerName={performerName}
                  performerAvatar={performer.avatar || performer.image}
                  variant="outline"
                />

                <Button
                  variant="outline"
                  onClick={onToggleFollow}
                  className="flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4" />
                      Suivi
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Suivre
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onViewRelationship}
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Relations
                </Button>
                {showRevenue !== undefined && (
                  <Button
                    variant="outline"
                    onClick={onToggleRevenue}
                  >
                    {showRevenue ? "Masquer revenus" : "Afficher revenus"}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        
        <ProfileStats
          followerCount={followerCount}
          followingCount={followingCount}
          contentCount={contentCount}
          viewCount={viewCount}
          tier={performerTier}
        />

        <div className="mt-6">
          <Tabs
            defaultValue="content"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center border-b border-border">
              <TabsList className="bg-transparent">
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
                <TabsTrigger value="journey">Parcours</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center">
                {activeTab === "content" && (
                  <>
                    <ContentFormatFilter onChange={filterByFormat} />
                    <ContentLayout
                      currentLayout={contentLayout}
                      onChange={setContentLayout}
                      items={[]}
                    />
                  </>
                )}
              </div>
            </div>

            <TabsContent value="content" className="mt-6">
              {contentLayout === "grid" ? (
                <ContentGrid
                  items={sampleContentItems}
                  layout={contentLayout}
                  onItemClick={handleContentClick}
                  onLayoutChange={setContentLayout}
                />
              ) : (
                <ContentFlow
                  items={sampleContentItems}
                  onItemClick={handleContentClick}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
