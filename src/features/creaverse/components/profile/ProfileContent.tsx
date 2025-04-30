
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
  contentLayout: "grid" | "masonry" | "featured";
  setContentLayout: (layout: "grid" | "masonry" | "featured") => void;
  isOwner: boolean;
  performerId: number;
  handleSubscribe: () => void;
  handleContentClick: (contentItem: any) => void;
  sampleContentItems: ContentItem[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  activeTab,
  contentLayout,
  setContentLayout,
  isOwner,
  performerId,
  handleSubscribe,
  handleContentClick,
  sampleContentItems
}) => {
  return (
    <Tabs value={activeTab} defaultValue="gallery">
      <TabsContent value="gallery" className="mt-0 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* En-tête avec contrôles de mise en page */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Galerie de contenu</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setContentLayout("grid")}
                className={`p-1 rounded ${contentLayout === "grid" ? "bg-muted" : ""}`}
                aria-label="Affichage en grille"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setContentLayout("masonry")}
                className={`p-1 rounded ${contentLayout === "masonry" ? "bg-muted" : ""}`}
                aria-label="Affichage en mosaïque"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="9" />
                  <rect x="14" y="3" width="7" height="5" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="10" width="7" height="11" />
                </svg>
              </button>
              <button
                onClick={() => setContentLayout("featured")}
                className={`p-1 rounded ${contentLayout === "featured" ? "bg-muted" : ""}`}
                aria-label="Affichage avec élément en avant"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="8" />
                  <rect x="3" y="13" width="8" height="8" />
                  <rect x="13" y="13" width="8" height="8" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Grille de contenu avec différentes dispositions */}
          <ContentGrid
            items={sampleContentItems}
            layout={contentLayout}
            showMetrics={isOwner}
            onItemClick={handleContentClick}
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
