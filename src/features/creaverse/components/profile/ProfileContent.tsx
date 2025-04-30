
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ContentItem } from "../content/ContentCard";
import ContentGrid from "../content/ContentGrid";
import CollectionsTabContent from "./CollectionsTabContent";
import JourneyTabContent from "./JourneyTabContent";
import MonetizationTiers from "@/components/creator/MonetizationTiers";

interface ProfileContentProps {
  activeTab: string;
  contentLayout: "grid" | "masonry" | "featured" | "flow";
  setContentLayout: (layout: "grid" | "masonry" | "featured" | "flow") => void;
  isOwner: boolean;
  performerId: number;
  handleSubscribe: () => void;
  handleContentClick: (contentItem: any) => void;
  sampleContentItems: ContentItem[];
  filterByFormat?: (format: "all" | "video" | "image" | "audio" | "text") => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  activeTab,
  contentLayout,
  setContentLayout,
  isOwner,
  performerId,
  handleSubscribe,
  handleContentClick,
  sampleContentItems,
  filterByFormat
}) => {
  return (
    <Tabs value={activeTab} defaultValue="gallery">
      <TabsContent value="gallery" className="mt-0 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ContentGrid
            items={sampleContentItems}
            layout={contentLayout}
            showMetrics={isOwner}
            onItemClick={handleContentClick}
            onLayoutChange={setContentLayout}
            filterByFormat={filterByFormat}
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="collections" className="mt-0 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CollectionsTabContent />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="journey" className="mt-0 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <JourneyTabContent />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-0 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isOwner ? (
            <div className="bg-card rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Planification de contenu</h3>
              <p className="text-muted-foreground mb-4">
                Organisez vos publications et événements à venir
              </p>
              {/* Contenu du calendrier à implémenter */}
              <div className="p-8 border border-dashed rounded-md flex justify-center items-center text-muted-foreground">
                Calendrier de contenu (en développement)
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-48">
              Accès non autorisé
            </div>
          )}
        </motion.div>
      </TabsContent>
      
      <TabsContent value="tiers" className="mt-0 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MonetizationTiers 
            performerId={performerId}
            onSubscribe={handleSubscribe}
          />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileContent;
