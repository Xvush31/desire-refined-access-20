
import React from "react";
import { motion } from "framer-motion";
import CreatorHeader from "@/components/creator/CreatorHeader";
import TabNavigationMenu from "./TabNavigationMenu";
import ProfileContent from "./ProfileContent";
import { ContentItem } from "../content/ContentCard";
import { PerformerData } from "../../types/performer";

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
  setActiveTab: (tab: string) => void;
  setContentLayout: (layout: "grid" | "masonry" | "featured" | "flow") => void;
  handleContentClick: (contentItem: any) => void;
  filterByFormat?: (format: "all" | "video" | "image" | "audio" | "text") => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

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
  setActiveTab,
  setContentLayout,
  handleContentClick,
  filterByFormat
}) => {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* En-tête du créateur avec statistiques dynamiques */}
      <motion.div variants={itemVariants}>
        <CreatorHeader 
          performer={performer} 
          isOwner={isOwner}
          showRevenue={showRevenue}
          onToggleRevenue={onToggleRevenue}
          isFollowing={isFollowing}
          onToggleFollow={onToggleFollow}
          onSubscribe={onSubscribe}
          onSendMessage={onSendMessage}
        />
      </motion.div>
      
      {/* Menu de navigation amélioré */}
      <motion.div variants={itemVariants}>
        <TabNavigationMenu 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCreatorMode={isOwner}
        />
      </motion.div>
      
      {/* Contenu des tabs avec le wrapper Tabs correct */}
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
    </motion.main>
  );
};

export default MainContent;
