
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import CreatorHeader from "@/components/creator/CreatorHeader";
import EngagementDashboard from "@/components/creator/EngagementDashboard";
import MonetizationTiers from "@/components/creator/MonetizationTiers";
import NavigationFooter from "../components/NavigationFooter";
import SendMessageDialog from "@/components/SendMessageDialog";
import ProfileHeader from "../components/profile/ProfileHeader";
import TabNavigationMenu from "../components/profile/TabNavigationMenu";
import CollectionsTabContent from "../components/profile/CollectionsTabContent";
import JourneyTabContent from "../components/profile/JourneyTabContent";
import ContentGrid from "../components/content/ContentGrid";

import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";

// Contenu d'exemple pour la grille de contenu
const sampleContentItems = [
  {
    id: "1",
    title: "Shooting en studio - Collection été",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    type: "standard",
    metrics: { views: 1250, likes: 78, engagement: 4.2 }
  },
  {
    id: "2",
    title: "Séance exclusive en extérieur",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    type: "premium",
    metrics: { views: 843, likes: 124, engagement: 6.7 }
  },
  {
    id: "3",
    title: "Behind the scenes - VIP uniquement",
    thumbnail: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    type: "vip",
    metrics: { views: 412, likes: 89, engagement: 9.1 }
  }
];

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

const CreatorProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  const { theme } = useTheme();
  const { currentUser } = useAuth() || { currentUser: null };
  const [showRevenue, setShowRevenue] = useState(true);
  const [contentLayout, setContentLayout] = useState<"grid" | "masonry" | "featured">("grid");
  
  useEffect(() => {
    const loadPerformerData = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformerData(performerId || "1");
        setPerformer(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Impossible de charger les données du créateur");
      } finally {
        setLoading(false);
      }
    };
    
    loadPerformerData();
  }, [performerId]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!performer) {
    return <div className="flex items-center justify-center min-h-screen">Créateur non trouvé</div>;
  }
  
  // Détermine si l'utilisateur actuel est le propriétaire du profil
  const isOwner = currentUser && currentUser.uid === performer.id.toString();
  
  const handleSubscribe = () => {
    navigate(`/subscription?creator=${performer.id}`);
    toast.success("Redirection vers l'abonnement");
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 
      `Vous ne suivez plus ${performer.displayName}` : 
      `Vous suivez maintenant ${performer.displayName}`
    );
  };
  
  const handleContentClick = (contentItem: any) => {
    toast.info(`Ouverture de: ${contentItem.title}`);
    // Implémentation de l'ouverture de contenu à faire
  };
  
  // Déterminer le statut du créateur (online, streaming, away, offline)
  const creatorStatus = performer.isLive ? "streaming" : 
                        performer.isActive ? "online" : "offline";
  const lastActive = performer.lastActive || "il y a 3h";
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
      {/* Header avec navigation */}
      <ProfileHeader 
        username={performer.username}
        displayName={performer.displayName}
        profileImage={performer.image} 
        tier={performer.tier}
        status={creatorStatus}
        lastActive={lastActive}
        performer={performer}
      />
      
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
            onToggleRevenue={() => setShowRevenue(!showRevenue)}
            isFollowing={isFollowing}
            onToggleFollow={handleFollowToggle}
            onSubscribe={handleSubscribe}
            onSendMessage={() => setIsMessageDialogOpen(true)}
          />
        </motion.div>
        
        {/* Tableau de bord d'engagement en temps réel */}
        <motion.div variants={itemVariants}>
          <EngagementDashboard 
            performer={performer}
            isOwner={isOwner}
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
        <Tabs value={activeTab}>
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
                performerId={performer.id}
                onSubscribe={handleSubscribe}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.main>
      
      {/* Navigation inférieure */}
      <NavigationFooter
        performerId={performer.id}
        performerImage={performer.image}
        performerName={performer.displayName}
      />
      
      <SendMessageDialog 
        performerName={performer.displayName} 
        performerId={performer.id}
        isOpen={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
      />
    </div>
  );
};

export default CreatorProfile;
