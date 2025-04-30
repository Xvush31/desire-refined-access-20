
import React from "react";
import { PerformerData } from "../../types/performer";
import ProfileInfo from "../creator/ProfileInfo";
import ProfileActions from "../creator/ProfileActions";
import ProfileContent from "./ProfileContent";
import TabNavigationMenu from "./TabNavigationMenu";
import { ContentItem } from "../content/ContentCard";
import { Button } from "@/components/ui/button";
import { RelationshipLevel } from "../../api/services/relationshipService";
import { Users } from "lucide-react";

interface MainContentProps {
  performer: PerformerData;
  isOwner: boolean;
  showRevenue: boolean;
  isFollowing: boolean;
  contentLayout: "grid" | "masonry" | "featured" | "flow";
  activeTab: string;
  sampleContentItems: ContentItem[];
  onToggleRevenue: () => void;
  onToggleFollow: () => void;
  onSubscribe: () => void;
  onSendMessage: () => void;
  onViewRelationship?: () => void;
  setActiveTab: (tab: string) => void;
  setContentLayout: (layout: "grid" | "masonry" | "featured" | "flow") => void;
  handleContentClick: (contentItem: any) => void;
  filterByFormat?: (format: "all" | "video" | "image" | "audio" | "text") => void;
  relationshipLevel?: RelationshipLevel;
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
  relationshipLevel = RelationshipLevel.None
}) => {
  return (
    <div className="p-4 bg-card rounded-lg max-w-screen-xl mx-auto shadow-sm mb-4">
      {/* Profile Info & Actions */}
      <div className="mb-6">
        <ProfileInfo
          image={performer.image}
          displayName={performer.displayName}
          description={performer.description}
          followers={performer.followers}
          stats={performer.stats}
          nextEvent={performer.nextEvent}
          relationshipLevel={relationshipLevel}
        />
        
        <div className="flex items-center justify-between mt-4">
          <ProfileActions
            isFollowing={isFollowing}
            onToggleFollow={onToggleFollow}
            onSubscribe={onSubscribe}
            onSendMessage={onSendMessage}
            relationshipLevel={relationshipLevel}
          />
          
          {relationshipLevel && relationshipLevel > RelationshipLevel.None && onViewRelationship && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onViewRelationship}
              className="ml-2"
            >
              <Users size={16} className="mr-1" />
              Relation
            </Button>
          )}
          
          {/* Revenue Toggle for Owner */}
          {isOwner && (
            <div className="ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onToggleRevenue} 
                className={showRevenue ? "bg-muted" : ""}
              >
                {showRevenue ? 'Masquer revenus' : 'Voir revenus'}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <TabNavigationMenu 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOwner={isOwner}
      />
      
      {/* Content Area */}
      <ProfileContent 
        activeTab={activeTab}
        contentLayout={contentLayout}
        setContentLayout={setContentLayout}
        isOwner={isOwner}
        performerId={performer.id}
        handleSubscribe={onSubscribe}
        handleContentClick={handleContentClick}
        sampleContentItems={sampleContentItems}
        filterByFormat={filterByFormat}
      />
    </div>
  );
};

export default MainContent;
