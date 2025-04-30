
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

import NavigationFooter from "../components/NavigationFooter";
import SendMessageDialog from "@/components/SendMessageDialog";
import ProfileHeader from "../components/profile/ProfileHeader";
import LoadingState from "../components/profile/LoadingState";
import NotFoundState from "../components/profile/NotFoundState";
import MainContent from "../components/profile/MainContent";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";

import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";
import { ContentItem } from "../components/content/ContentCard";

// Contenu d'exemple pour la grille de contenu
const sampleContentItems: ContentItem[] = [
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
    return <LoadingState />;
  }
  
  if (!performer) {
    return <NotFoundState />;
  }
  
  // Détermine si l'utilisateur actuel est le propriétaire du profil
  const isOwner = currentUser && currentUser.uid === performer.id.toString();
  
  const handleSubscribe = () => {
    if (!currentUser) {
      // Enregistre la page actuelle pour y revenir après connexion
      sessionStorage.setItem('returnTo', `/creaverse/performer/${performer.id}`);
      navigate('/login');
      toast.info("Connectez-vous pour vous abonner à ce créateur");
      return;
    }
    navigate(`/subscription?creator=${performer.id}`);
    toast.success("Redirection vers l'abonnement");
  };

  const handleFollowToggle = () => {
    if (!currentUser) {
      // Enregistre la page actuelle pour y revenir après connexion
      sessionStorage.setItem('returnTo', `/creaverse/performer/${performer.id}`);
      navigate('/login');
      toast.info("Connectez-vous pour suivre ce créateur");
      return;
    }
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 
      `Vous ne suivez plus ${performer.displayName}` : 
      `Vous suivez maintenant ${performer.displayName}`
    );
  };
  
  const handleSendMessage = () => {
    if (!currentUser) {
      // Enregistre la page actuelle pour y revenir après connexion
      sessionStorage.setItem('returnTo', `/creaverse/performer/${performer.id}`);
      navigate('/login');
      toast.info("Connectez-vous pour envoyer un message à ce créateur");
      return;
    }
    setIsMessageDialogOpen(true);
  };
  
  const handleContentClick = (contentItem: any) => {
    if (contentItem.type !== "standard" && !currentUser) {
      // Enregistre la page actuelle pour y revenir après connexion
      sessionStorage.setItem('returnTo', `/creaverse/performer/${performer.id}`);
      navigate('/login');
      toast.info("Connectez-vous pour accéder au contenu premium");
      return;
    }
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
        username={performer?.username || ""}
        displayName={performer?.displayName || ""}
        profileImage={performer?.image} 
        tier={performer?.tier}
        status={creatorStatus}
        lastActive={lastActive}
        performer={performer}
      />
      
      <MainContent
        performer={performer}
        isOwner={isOwner}
        showRevenue={showRevenue}
        isFollowing={isFollowing}
        contentLayout={contentLayout}
        activeTab={activeTab}
        sampleContentItems={sampleContentItems}
        onToggleRevenue={() => setShowRevenue(!showRevenue)}
        onToggleFollow={handleFollowToggle}
        onSubscribe={handleSubscribe}
        onSendMessage={handleSendMessage}
        setActiveTab={setActiveTab}
        setContentLayout={setContentLayout}
        handleContentClick={handleContentClick}
      />
      
      {/* Navigation inférieure */}
      <NavigationFooter
        performerId={currentUser?.uid || "visitor"} 
        performerImage={currentUser ? performer?.image || "/placeholder.svg" : "/placeholder.svg"}
        performerName={currentUser?.uid || "Visiteur"}
      />
      
      <ScrollToTopButton threshold={200} />
      
      <SendMessageDialog 
        performerName={performer?.displayName || ""} 
        performerId={performer?.id}
        isOpen={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
      />
    </div>
  );
};

export default CreatorProfile;
