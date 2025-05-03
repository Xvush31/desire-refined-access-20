
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { fetchPerformerData, fetchPerformerContent, fetchPerformerCollections, fetchTrendingContent } from '../api/performers';
import { ContentItem } from '../components/content/ContentCard';
import { PerformerData } from '../types/performer';

export const useProfileData = (performerId: string | undefined) => {
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  
  // Logs for debugging
  console.log("useProfileData hook initialized with performerId:", performerId);
  
  // Load performer data
  useEffect(() => {
    const loadPerformerData = async () => {
      if (!performerId) {
        console.error("No performerId provided");
        setError("Identifiant de créateur manquant");
        setLoading(false);
        return;
      }

      console.log("Loading performer data for ID:", performerId);
      try {
        setLoading(true);
        setError(null);
        
        // Utiliser directement le service
        const data = await fetchPerformerData(performerId);
        
        if (!data) {
          setError("Créateur non trouvé");
          console.error("Performer not found:", performerId);
          return;
        }
        
        console.log("Performer data loaded:", data);
        setPerformer(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setError("Impossible de charger les données du créateur");
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
      if (!performer || error) return;
      
      try {
        setContentLoading(true);
        console.log("Loading content for performer:", performer.id);
        
        // Load content based on active format
        const content = await fetchPerformerContent(performer.id.toString(), activeFormat);
        setContentItems(content);
        
        // Load trending content
        const trending = await fetchTrendingContent(8);
        setTrendingContent(trending);
        
        // Load collections
        const collections = await fetchPerformerCollections(performer.id.toString());
        setCollections(collections);
      } catch (error) {
        console.error("Erreur lors du chargement du contenu:", error);
        toast.error("Impossible de charger le contenu du créateur");
      } finally {
        setContentLoading(false);
      }
    };
    
    loadContent();
  }, [performer, activeFormat, error]);

  // Determine owner status
  const isOwner = currentUser && performer && currentUser.uid === performer.id.toString();

  // Handler functions
  const handleSubscribe = () => {
    if (!currentUser) {
      sessionStorage.setItem('returnTo', `/creaverse-app/performer/${performer?.id}`);
      navigate('/login');
      toast.info("Connectez-vous pour vous abonner à ce créateur");
      return;
    }
    navigate(`/subscription?creator=${performer?.id}`);
    toast.success("Redirection vers l'abonnement");
  };

  const handleFollowToggle = () => {
    if (!currentUser) {
      sessionStorage.setItem('returnTo', `/creaverse-app/performer/${performer?.id}`);
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
    error,
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
