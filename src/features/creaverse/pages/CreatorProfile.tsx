
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
import ContentCarousel from "../components/content/ContentCarousel";

import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";
import { ContentItem } from "../components/content/ContentCard";

// Contenu d'exemple pour la grille de contenu
const generateSampleContent = (count: number, type: "standard" | "premium" | "vip"): ContentItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = `${type}-${i + 1}`;
    return {
      id,
      title: type === "premium" 
        ? `Contenu Premium #${i + 1}` 
        : type === "vip" 
          ? `Exclusivité VIP #${i + 1}`
          : `Création #${i + 1}`,
      thumbnail: `https://images.unsplash.com/photo-${1580000000000 + i * 10000}?auto=format&fit=crop&w=800&q=80`,
      type,
      metrics: { 
        views: Math.floor(Math.random() * 10000) + 500, 
        likes: Math.floor(Math.random() * 1000) + 100, 
        engagement: Number((Math.random() * 10 + 2).toFixed(1))
      },
      revenue: type !== "standard" ? Math.floor(Math.random() * 500) + 100 : undefined
    };
  });
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
  
  // Générer les différentes catégories de contenu
  const standardContent = generateSampleContent(8, "standard");
  const premiumContent = generateSampleContent(4, "premium");
  const vipContent = generateSampleContent(2, "vip");
  const trendingContent = [...generateSampleContent(3, "premium"), ...generateSampleContent(2, "standard")];
  
  // Combiner les contenus pour l'affichage principal
  const sampleContentItems: ContentItem[] = [
    ...standardContent.slice(0, 3),
    ...premiumContent.slice(0, 2),
    ...vipContent.slice(0, 1),
    ...standardContent.slice(3, 6),
    ...premiumContent.slice(2, 4),
    ...vipContent.slice(1, 2),
    ...standardContent.slice(6, 8)
  ];
  
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
  
  const handleContentClick = (contentItem: ContentItem) => {
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
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
      {/* Header avec navigation */}
      <ProfileHeader 
        username={performer?.username || ""}
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
      
      {/* Sections de contenu en carrousel - visible uniquement sur l'onglet Galerie */}
      {activeTab === "gallery" && (
        <div className="px-4 pb-20">
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
            items={premiumContent}
            type="premium"
            onItemClick={handleContentClick}
          />
        </div>
      )}
      
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
