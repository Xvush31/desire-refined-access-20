
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import CreatorHeader from "@/components/creator/CreatorHeader";
import EngagementDashboard from "@/components/creator/EngagementDashboard";
import ContentGallery from "@/components/creator/ContentGallery";
import MonetizationTiers from "@/components/creator/MonetizationTiers";
import NavigationFooter from "../components/NavigationFooter";
import SendMessageDialog from "@/components/SendMessageDialog";
import ProfileHeader from "../components/profile/ProfileHeader";
import TabNavigationMenu from "../components/profile/TabNavigationMenu";
import CollectionsTabContent from "../components/profile/CollectionsTabContent";
import JourneyTabContent from "../components/profile/JourneyTabContent";

import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";

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
          />
        </motion.div>
        
        {/* Contenu des tabs - Correction ici: envelopper les TabsContent dans un Tabs */}
        <Tabs value={activeTab}>
          <TabsContent value="gallery" className="mt-0 p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ContentGallery 
                performerId={performer.id} 
                isOwner={isOwner}
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="collections" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CollectionsTabContent />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="journey" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <JourneyTabContent />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="tiers" className="mt-0">
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
