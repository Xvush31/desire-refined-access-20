
import React from "react";
import { motion } from "framer-motion";
import ContentFlow from "../content/ContentFlow";
import ContentCollections from "../content/ContentCollections";
import ContentCarousel from "../content/ContentCarousel";
import { ContentItem } from "../content/ContentCard";

interface ProfileSectionsProps {
  activeTab: string;
  contentLayout: "grid" | "masonry" | "featured" | "flow";
  contentItems: ContentItem[];
  trendingContent: ContentItem[];
  collections: any[];
  handleContentClick: (item: ContentItem) => void;
  handleCollectionClick: (collection: any) => void;
}

const ProfileSections: React.FC<ProfileSectionsProps> = ({
  activeTab,
  contentLayout,
  contentItems,
  trendingContent,
  collections,
  handleContentClick,
  handleCollectionClick,
}) => {
  // Only render these sections when Gallery tab is active
  if (activeTab !== "gallery") {
    return null;
  }

  return (
    <motion.div 
      className="px-4 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contenu en flux vertical animé */}
      {contentLayout === "flow" && (
        <ContentFlow 
          items={contentItems}
          onItemClick={handleContentClick}
        />
      )}
      
      {/* Collections thématiques */}
      {collections.length > 0 && (
        <ContentCollections 
          collections={collections}
          onCollectionClick={handleCollectionClick}
        />
      )}
      
      {/* Contenus en tendance */}
      <ContentCarousel
        title="En tendance"
        items={trendingContent}
        type="trending"
        onItemClick={handleContentClick}
      />
      
      {/* Contenus premium */}
      <ContentCarousel
        title="Contenu Premium"
        items={contentItems.filter(item => item.type === "premium").slice(0, 8)}
        type="premium"
        onItemClick={handleContentClick}
      />
      
      {/* Afficher les collections en carrousel */}
      {collections.length > 0 && collections.map((collection) => (
        <ContentCarousel
          key={collection.id}
          title={collection.name}
          items={contentItems.slice(0, 6)} // Pour la démo, on utilise les mêmes items
          type="collection"
          collectionName={collection.name}
          onItemClick={handleContentClick}
        />
      ))}
    </motion.div>
  );
};

export default ProfileSections;
