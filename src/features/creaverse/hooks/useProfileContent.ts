
import { useState, useEffect } from 'react';
import { ContentItem } from '../components/content/ContentCard';
import { RelationshipLevel } from '../api/services/relationshipService';
import { toast } from 'sonner';

// Helper function to generate sample content items
const generateSampleContentItems = (count: number, trending: boolean = false): ContentItem[] => {
  const formats = ["video", "image", "audio", "text"];
  const items: ContentItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const format = formats[Math.floor(Math.random() * formats.length)];
    const formatProps = trending 
      ? { ...getFormatProperties(format, true) }
      : { ...getFormatProperties(format) };
    
    // Randomly assign content type (standard, premium, vip)
    const contentTypes: Array<"standard" | "premium" | "vip"> = ["standard", "premium", "vip"];
    const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    
    items.push({
      id: `content-${i}`,
      title: `${trending ? 'Trending' : 'Sample'} ${format} ${i + 1}`,
      thumbnail: getRandomThumbnail("1", i, format),
      type: contentType,
      format: format as "video" | "image" | "audio" | "text",
      trending: trending,
      trendingRank: trending ? Math.floor(Math.random() * 20) + 1 : undefined,
      ...formatProps
    });
  }
  
  return items;
};

// Generate sample collections with proper structure
const generateSampleCollections = () => {
  return [
    { 
      id: "1", 
      name: "Meilleurs moments", 
      description: "Les meilleurs moments de ma carrière",
      thumbnail: "/placeholder.svg",
      itemCount: 12,
      itemTypes: { videos: 8, images: 4 }
    },
    { 
      id: "2", 
      name: "Backstage", 
      description: "Découvrez les coulisses",
      thumbnail: "/placeholder.svg",
      itemCount: 8,
      itemTypes: { videos: 3, images: 5 }
    },
    { 
      id: "3", 
      name: "Exclusivités", 
      description: "Contenu exclusif pour mes fans",
      thumbnail: "/placeholder.svg",
      itemCount: 5,
      itemTypes: { videos: 2, images: 3 }
    }
  ];
};

// Import these from the appropriate file
import { getFormatProperties, getRandomThumbnail } from '../api/utils/contentGenerators';

export const useProfileContent = (performerId: string | undefined, isOwner: boolean) => {
  const [sampleContentItems, setSampleContentItems] = useState<ContentItem[]>([]);
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [relationshipLevel, setRelationshipLevel] = useState<RelationshipLevel>(0);
  const [contentLayout, setContentLayout] = useState<"grid" | "masonry" | "featured" | "flow">("grid");
  const [activeTab, setActiveTab] = useState<string>("gallery");
  const [contentFormat, setContentFormat] = useState<"all" | "video" | "image" | "audio" | "text">("all");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false);
  
  // Load content data
  useEffect(() => {
    try {
      // Generate sample content items
      const contentItems = generateSampleContentItems(20);
      const trending = generateSampleContentItems(12, true);
      
      setSampleContentItems(contentItems);
      setTrendingContent(trending);
      
      // Set sample collections
      setCollections(generateSampleCollections());
      
      // Set relationship level based on some logic
      // This would normally come from a backend service
      const randomLevel = Math.floor(Math.random() * 5) as RelationshipLevel;
      // Use SuperFan level for owners
      setRelationshipLevel(isOwner ? 4 : randomLevel);
      
    } catch (err: any) {
      console.error("Error generating sample content:", err);
      toast.error("Failed to load sample content");
    }
  }, [performerId, isOwner]);
  
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
  
  return {
    sampleContentItems,
    trendingContent,
    collections,
    relationshipLevel,
    contentLayout,
    activeTab,
    contentFormat,
    isFollowing,
    showRevenue,
    setShowRevenue,
    setContentLayout,
    setActiveTab,
    handleToggleFollow,
    handleSubscribe,
    handleSendMessage,
    handleViewRelationship,
    handleContentClick,
    handleCollectionClick,
    filterByFormat
  };
};
