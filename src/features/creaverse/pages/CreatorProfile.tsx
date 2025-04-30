
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
import ContentFlow from "../components/content/ContentFlow";
import ContentCollections from "../components/content/ContentCollections";

import { fetchPerformerData, fetchPerformerContent, fetchPerformerCollections, fetchTrendingContent } from "../api/performers";
import { PerformerData } from "../types/performer";
import { ContentItem } from "../components/content/ContentCard";

const CreatorProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const navigate = useNavigate();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  const { theme } = useTheme();
  const { currentUser } = useAuth() || { currentUser: null };
  const [showRevenue, setShowRevenue] = useState(true);
  const [contentLayout, setContentLayout] = useState<"grid" | "masonry" | "featured" | "flow">("grid");
  
  // Content states
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [activeFormat, setActiveFormat] = useState<"all" | "video" | "image" | "audio" | "text">("all");
  
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
  
  useEffect(() => {
    const loadContent = async () => {
      if (!performer) return;
      
      try {
        setContentLoading(true);
        
        // Load content based on active format
        const content = await fetchPerformerContent(performerId || "1", activeFormat);
        setContentItems(content);
        
        // Load trending content
        const trending = await fetchTrendingContent(8);
        setTrendingContent(trending);
        
        // Load collections
        const collections = await fetchPerformerCollections(performerId || "1");
        setCollections(collections);
      } catch (error) {
        console.error("Erreur lors du chargement du contenu:", error);
        toast.error("Impossible de charger le contenu du créateur");
      } finally {
        setContentLoading(false);
      }
    };
    
    loadContent();
  }, [performer, performerId, activeFormat]);
  
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
  
  const handleFilterByFormat = (format: "all" | "video" | "image" | "audio" | "text") => {
    setActiveFormat(format);
  };
  
  const handleCollectionClick = (collection: any) => {
    toast.info(`Collection sélectionnée: ${collection.name}`);
    // Implementation de l'affichage de la collection à faire
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
        sampleContentItems={contentItems}
        onToggleRevenue={() => setShowRevenue(!showRevenue)}
        onToggleFollow={handleFollowToggle}
        onSubscribe={handleSubscribe}
        onSendMessage={handleSendMessage}
        setActiveTab={setActiveTab}
        setContentLayout={setContentLayout}
        handleContentClick={handleContentClick}
        filterByFormat={handleFilterByFormat}
      />
      
      {/* Sections de contenu selon le layout sélectionné - visible uniquement sur l'onglet Galerie */}
      {activeTab === "gallery" && (
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
