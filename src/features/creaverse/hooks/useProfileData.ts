
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  fetchPerformerData, 
  fetchPerformerContent, 
  fetchPerformerCollections, 
  fetchTrendingContent 
} from '../api/performers';
import { ContentItem } from '../components/content/ContentCard';
import { PerformerData } from '../types/performer';

export const useProfileData = (performerId: string | undefined) => {
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showRevenue, setShowRevenue] = useState(true);
  const [contentLayout, setContentLayout] = useState<"grid" | "masonry" | "featured" | "flow">("grid");
  const [activeTab, setActiveTab] = useState("gallery");
  const [activeFormat, setActiveFormat] = useState<"all" | "video" | "image" | "audio" | "text">("all");
  
  // Content states
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const { currentUser } = useAuth() || { currentUser: null };
  
  // Load performer data
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
  
  // Load content data
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

  // Determine owner status
  const isOwner = currentUser && performer && currentUser.uid === performer.id.toString();

  // Handler functions
  const handleSubscribe = () => {
    if (!currentUser) {
      sessionStorage.setItem('returnTo', `/creaverse/performer/${performer?.id}`);
      navigate('/login');
      toast.info("Connectez-vous pour vous abonner à ce créateur");
      return;
    }
    navigate(`/subscription?creator=${performer?.id}`);
    toast.success("Redirection vers l'abonnement");
  };

  const handleFollowToggle = () => {
    if (!currentUser) {
      sessionStorage.setItem('returnTo', `/creaverse/performer/${performer?.id}`);
      navigate('/login');
      toast.info("Connectez-vous pour suivre ce créateur");
      return;
    }
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 
      `Vous ne suivez plus ${performer?.displayName}` : 
      `Vous suivez maintenant ${performer?.displayName}`
    );
  };
  
  const handleFilterByFormat = (format: "all" | "video" | "image" | "audio" | "text") => {
    setActiveFormat(format);
  };

  return {
    performer,
    loading,
    contentLoading,
    isFollowing,
    showRevenue,
    contentLayout,
    activeTab,
    contentItems,
    trendingContent,
    collections,
    isOwner,
    setShowRevenue,
    setIsFollowing,
    setContentLayout,
    setActiveTab,
    handleSubscribe,
    handleFollowToggle,
    handleFilterByFormat
  };
};
