
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, BookmarkCheck, Award, Grid, MoreVertical, CircleDollarSign, Lock, Play } from "@/icons";

import CreatorHeader from "@/components/creator/CreatorHeader";
import EngagementDashboard from "@/components/creator/EngagementDashboard";
import ContentGallery from "@/components/creator/ContentGallery";
import MonetizationTiers from "@/components/creator/MonetizationTiers";
import NavigationFooter from "../components/NavigationFooter";
import SendMessageDialog from "@/components/SendMessageDialog";

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
  
  const bgClass = theme === 'light' ? 'bg-gray-100' : 'bg-black';
  
  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header avec navigation */}
      <header className={`sticky top-0 z-10 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} p-3 flex items-center justify-between border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} className="text-primary" />
          </Link>
          <h1 className="text-xl font-bold text-primary">{performer.username}</h1>
          {performer.tier && (
            <Badge variant="outline" className="ml-2 animated-gradient-bg text-white">
              Palier {performer.tier.charAt(0).toUpperCase() + performer.tier.slice(1)}
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          <button aria-label="Notifications">
            <Bell size={22} className="text-primary" />
          </button>
          <button aria-label="More options">
            <MoreVertical size={22} className="text-primary" />
          </button>
        </div>
      </header>
      
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
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full mt-4"
        >
          <TabsList className={`w-full grid grid-cols-4 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} border-y ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
            <TabsTrigger 
              value="gallery" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
            >
              <Grid size={18} />
              <span className="text-xs mt-1">Galerie</span>
            </TabsTrigger>
            <TabsTrigger 
              value="collections" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
            >
              <BookmarkCheck size={18} />
              <span className="text-xs mt-1">Collections</span>
            </TabsTrigger>
            <TabsTrigger 
              value="journey" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
            >
              <Award size={18} />
              <span className="text-xs mt-1">Journey</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tiers" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
            >
              <CircleDollarSign size={18} />
              <span className="text-xs mt-1">Abonnement</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="mt-0 p-0">
            <ContentGallery 
              performerId={performer.id} 
              isOwner={isOwner}
            />
          </TabsContent>
          
          <TabsContent value="collections" className="mt-0">
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} p-4`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BookmarkCheck className="mr-2" size={18} />
                Collections Thématiques
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {["Danses sensuelles", "Moments intimes", "Behind the scenes", "Archives VIP"].map((collection, index) => (
                  <div 
                    key={collection} 
                    className={`${theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800'} rounded-lg p-3 relative ${index === 3 ? 'opacity-70' : ''}`}
                  >
                    <div className="aspect-video bg-black/30 rounded-md mb-2 flex items-center justify-center">
                      {index === 3 ? (
                        <Lock className="text-white/70" size={24} />
                      ) : (
                        <Play className="text-white" size={24} />
                      )}
                    </div>
                    <h3 className="font-medium">{collection}</h3>
                    <p className="text-xs text-muted-foreground">
                      {index === 3 ? '23 vidéos · Abonnés VIP uniquement' : `${5 + index * 3} vidéos`}
                    </p>
                    {index === 3 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="default" size="sm" className="animated-gradient-bg text-white">
                          Débloquer
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="journey" className="mt-0">
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} p-4`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="mr-2" size={18} />
                Creator Journey
              </h2>
              
              <div className="space-y-4">
                <div className="relative pl-6 pb-6 border-l-2 border-brand-red">
                  <div className="absolute left-[-8px] top-0 bg-brand-red rounded-full w-4 h-4"></div>
                  <div className="mb-1">
                    <span className="text-xs text-muted-foreground">Avril 2023</span>
                    <h3 className="font-medium">A atteint 50K abonnés</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Une étape importante dans la croissance</p>
                </div>
                
                <div className="relative pl-6 pb-6 border-l-2 border-brand-red">
                  <div className="absolute left-[-8px] top-0 bg-brand-red rounded-full w-4 h-4"></div>
                  <div className="mb-1">
                    <span className="text-xs text-muted-foreground">Février 2023</span>
                    <h3 className="font-medium">Première vidéo "Sunset Dance"</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">La vidéo qui a lancé ma carrière sur XVush</p>
                </div>
                
                <div className="relative pl-6 pb-6 border-l-2 border-brand-red">
                  <div className="absolute left-[-8px] top-0 bg-brand-red rounded-full w-4 h-4"></div>
                  <div className="mb-1">
                    <span className="text-xs text-muted-foreground">Janvier 2022</span>
                    <h3 className="font-medium">A rejoint XVush</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Le début d'une belle aventure</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tiers" className="mt-0">
            <MonetizationTiers 
              performerId={performer.id}
              onSubscribe={handleSubscribe}
            />
          </TabsContent>
        </Tabs>
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
