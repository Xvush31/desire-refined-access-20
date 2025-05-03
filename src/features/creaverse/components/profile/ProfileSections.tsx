
import React from "react";
import { motion } from "framer-motion";
import ContentFlow from "../content/ContentFlow";
import ContentCollections from "../content/ContentCollections";
import ContentCarousel from "../content/ContentCarousel";
import { ContentItem } from "../content/ContentCard";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

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
      {/* Trending content highlight section */}
      {trendingContent.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-rose-500" size={20} />
            <h2 className="text-2xl font-bold">Contenu en tendance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingContent.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleContentClick(item)}
                className="cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="absolute top-2 left-2 z-20">
                    <Badge className="bg-rose-500 text-white flex items-center gap-1">
                      <TrendingUp size={12} />
                      {item.trendingRank ? `#${item.trendingRank}` : "Tendance"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white font-medium text-lg">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
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
      
      {/* Contenus en tendance carousel */}
      <ContentCarousel
        title="Plus de tendances"
        items={trendingContent.slice(3)}
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
