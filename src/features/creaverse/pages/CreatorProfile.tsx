
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPerformerById } from "../api/performers";
import { PerformerData } from "../types/performer";
import MainContent from "../components/profile/MainContent";
import ProfileSections from "../components/profile/ProfileSections";
import DynamicHeader from "../components/header/DynamicHeader";
import LoadingState from "../components/profile/LoadingState";
import NotFoundState from "../components/profile/NotFoundState";
import { useAuth } from "@/contexts/AuthContext";
import { generateSampleContentItems } from "../api/utils/contentGenerators";
import { ContentItem } from "../components/content/ContentCard";
import { RelationshipLevel } from "../api/services/relationshipService";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRevolutionaryNavigation } from "@/hooks/use-revolutionary-navigation";

const CreatorProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const { isImmersiveMode, zoomLevel } = useRevolutionaryNavigation();
  
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false);
  const [contentLayout, setContentLayout] = useState<"grid" | "masonry" | "featured" | "flow">("grid");
  const [activeTab, setActiveTab] = useState<string>("gallery");
  const [sampleContentItems, setSampleContentItems] = useState<ContentItem[]>([]);
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [relationshipLevel, setRelationshipLevel] = useState<RelationshipLevel>(RelationshipLevel.None);
  const [contentFormat, setContentFormat] = useState<"all" | "video" | "image" | "audio" | "text">("all");
  
  // Load performer data
  useEffect(() => {
    const loadPerformer = async () => {
      try {
        setLoading(true);
        
        if (!performerId) {
          setError("No performer ID provided");
          setLoading(false);
          return;
        }
        
        const fetchedPerformer = await fetchPerformerById(performerId);
        setPerformer(fetchedPerformer);
        
        // Check if current user is the owner
        if (currentUser && currentUser.uid === fetchedPerformer.id.toString()) {
          setIsOwner(true);
        }
        
        // Generate sample content items
        const contentItems = generateSampleContentItems(20);
        const trending = generateSampleContentItems(12, true);
        
        setSampleContentItems(contentItems);
        setTrendingContent(trending);
        
        // Set sample collections
        setCollections([
          { id: 1, name: "Meilleurs moments", itemCount: 12 },
          { id: 2, name: "Backstage", itemCount: 8 },
          { id: 3, name: "Exclusivités", itemCount: 5 }
        ]);
        
        // Set relationship level based on some logic
        // This would normally come from a backend service
        const randomLevel = Math.floor(Math.random() * 5) as RelationshipLevel;
        setRelationshipLevel(isOwner ? RelationshipLevel.Creator : randomLevel);
        
        setLoading(false);
      } catch (err: any) {
        console.error("Error loading performer:", err);
        setError(err.message || "Failed to load performer");
        setLoading(false);
      }
    };
    
    loadPerformer();
  }, [performerId, currentUser]);
  
  // Action handlers
  const handleToggleFollow = () => {
    setIsFollowing(prev => !prev);
    toast.success(isFollowing ? "Abonnement annulé" : "Vous êtes maintenant abonné");
  };
  
  const handleSubscribe = () => {
    toast.success("Redirection vers la page d'abonnement");
    // Redirect to subscription page or open modal
  };
  
  const handleSendMessage = () => {
    toast.success("Envoi d'un message");
    // Open message dialog
  };
  
  const handleViewRelationship = () => {
    toast.success("Affichage des détails de la relation");
    // Navigate to relationship details or open modal
  };
  
  const handleContentClick = (contentItem: ContentItem) => {
    toast.success(`Contenu sélectionné: ${contentItem.title}`);
    // Handle content item click
  };
  
  const handleCollectionClick = (collection: any) => {
    toast.success(`Collection sélectionnée: ${collection.name}`);
    setActiveTab("collections");
    // Handle collection click
  };
  
  const filterByFormat = (format: "all" | "video" | "image" | "audio" | "text") => {
    setContentFormat(format);
    // In a real app, this would filter the content items
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error || !performer) {
    return <NotFoundState error={error} />;
  }
  
  return (
    <div className={`min-h-screen pt-0 ${isImmersiveMode ? 'pb-0' : 'pb-20'}`}>
      <DynamicHeader 
        performer={performer}
        isScrolled={false}
        isFollowing={isFollowing}
      />
      
      <MainContent 
        performer={performer}
        isOwner={isOwner}
        showRevenue={showRevenue}
        isFollowing={isFollowing}
        contentLayout={contentLayout}
        activeTab={activeTab}
        sampleContentItems={sampleContentItems}
        onToggleRevenue={() => setShowRevenue(prev => !prev)}
        onToggleFollow={handleToggleFollow}
        onSubscribe={handleSubscribe}
        onSendMessage={handleSendMessage}
        onViewRelationship={handleViewRelationship}
        setActiveTab={setActiveTab}
        setContentLayout={setContentLayout}
        handleContentClick={handleContentClick}
        filterByFormat={filterByFormat}
        relationshipLevel={relationshipLevel}
      />
      
      <ProfileSections 
        activeTab={activeTab}
        contentLayout={contentLayout}
        contentItems={sampleContentItems}
        trendingContent={trendingContent}
        collections={collections}
        handleContentClick={handleContentClick}
        handleCollectionClick={handleCollectionClick}
      />
    </div>
  );
};

export default CreatorProfile;
