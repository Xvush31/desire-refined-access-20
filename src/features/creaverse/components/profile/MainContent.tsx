
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

const MainContent = ({
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
  // Default empty metrics - to satisfy TypeScript requirements
  const defaultMetrics = {
    video: 0,
    image: 0,
    audio: 0,
    text: 0
  };

  // Make sure performer has all required properties for ProfileInfo with fallbacks
  const safeDisplayName = performer?.name || "";
  const safeBio = performer?.bio || "";
  const safeAvatar = performer?.avatar || "/placeholder.svg";
  const safeFollowers = performer?.metrics?.followers?.toLocaleString() || "0";
  const safeStats = {
    retentionRate: performer?.metrics?.retentionRate || "0%",
    watchMinutes: performer?.metrics?.watchMinutes || "0",
    superfans: performer?.metrics?.superfans || 0
  };

  return (
    <div className="container px-4 lg:px-8 py-6 -mt-12 z-20 relative">
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <ProfileInfo
            image={safeAvatar}
            displayName={safeDisplayName}
            description={safeBio}
            followers={safeFollowers}
            stats={safeStats}
            relationshipLevel={performer?.relationshipLevel}
            nextEvent={performer?.nextEvent}
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
                  performerId={performer?.id?.toString()}
                  performerName={safeDisplayName}
                  performerAvatar={safeAvatar}
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
          isOwner={isOwner}
          showRevenue={showRevenue}
          onToggleRevenue={onToggleRevenue}
          stats={{
            monthlyRevenue: performer?.metrics?.monthlyRevenue || 0,
            monthlyRevenueChange: performer?.metrics?.monthlyRevenueChange || 0,
            watchMinutes: performer?.metrics?.watchMinutes || "0",
            retentionRate: performer?.metrics?.retentionRate || "0%",
            superfans: performer?.metrics?.superfans || 0,
            subscriptions: performer?.metrics?.subscriptions || 0,
            engagementRate: performer?.metrics?.engagementRate || "0%",
            completionRate: performer?.metrics?.completionRate || "0%",
            averageWatchTime: performer?.metrics?.averageWatchTime || "0",
            trendingScore: performer?.metrics?.trendingScore || 0
          }}
          content={{
            total: performer?.metrics?.contentCount || 0,
            premium: performer?.metrics?.premiumCount || 0,
            trending: performer?.metrics?.trendingCount || 0
          }}
          tier={performer?.tier || "bronze"}
          nextTier={performer?.nextTier || "silver"}
          tierProgress={performer?.tierProgress || 0}
          tierColor={performer?.tierColor || "#cd7f32"}
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
                    <ContentFormatFilter 
                      activeFormat="all" 
                      onFormatChange={filterByFormat}
                      metrics={defaultMetrics}
                    />
                    <ContentLayout
                      layout={contentLayout}
                      onItemClick={(item) => handleContentClick(item)}
                      items={sampleContentItems || []}
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
                  onLayoutChange={setContentLayout}
                  onItemClick={handleContentClick}
                  filterByFormat={filterByFormat}
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
