
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { TabsContent } from "@/components/ui/tabs";

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
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
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
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
      {/* Header avec navigation */}
      <ProfileHeader 
        username={performer.username}
        displayName={performer.displayName}
        profileImage={performer.image} 
        tier={performer.tier} 
      />
      
      <main>
        {/* En-tête du créateur avec statistiques dynamiques */}
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
        
        {/* Tableau de bord d'engagement en temps réel */}
        <EngagementDashboard 
          performer={performer}
          isOwner={isOwner}
        />
        
        {/* Menu de navigation amélioré */}
        <TabNavigationMenu 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {/* Contenu des tabs */}
        <TabsContent value="gallery" className="mt-0 p-0">
          <ContentGallery 
            performerId={performer.id} 
            isOwner={isOwner}
          />
        </TabsContent>
        
        <TabsContent value="collections" className="mt-0">
          <CollectionsTabContent />
        </TabsContent>
        
        <TabsContent value="journey" className="mt-0">
          <JourneyTabContent />
        </TabsContent>
        
        <TabsContent value="tiers" className="mt-0">
          <MonetizationTiers 
            performerId={performer.id}
            onSubscribe={handleSubscribe}
          />
        </TabsContent>
      </main>
      
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
