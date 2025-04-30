
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Bell, MessageCircle, MoreVertical, Grid,
  Play, User, Home, Search, Plus, Video, Award,
  TrendingUp, Heart, BookmarkCheck, Calendar, Clock, CircleDollarSign, 
  BarChart, Star, CircleCheck, Lock
} from "lucide-react";
import { toast } from "sonner";
import SendMessageDialog from "@/components/SendMessageDialog";
import { useTheme } from "@/hooks/use-theme";
import CreatorHeader from "@/components/creator/CreatorHeader";
import MonetizationTiers from "@/components/creator/MonetizationTiers";
import ContentGallery from "@/components/creator/ContentGallery";
import EngagementDashboard from "@/components/creator/EngagementDashboard";
import { useAuth } from "@/contexts/AuthContext";

interface PerformerData {
  id: number;
  username: string;
  displayName: string;
  image: string;
  videos: number;
  followers: string;
  following: number;
  description: string;
  joinDate: string;
  tags: string[];
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  tierProgress: number;
  stats: {
    likes: string;
    views: string;
    rating: number;
    retentionRate: string;
    watchMinutes: string;
    monthlyRevenue: number;
    monthlyRevenueChange: number;
    superfans: number;
  };
  nextEvent?: {
    type: string;
    timeRemaining: string;
  };
}

const performerDetails: Record<string, PerformerData> = {
  "1": {
    id: 1,
    username: "juliesky",
    displayName: "Julie Sky",
    image: "https://picsum.photos/seed/perf1/150/150",
    videos: 63,
    followers: "64,4K",
    following: 68,
    description: "Passionnée et créative, Julie aime partager des moments intimes et authentiques. Elle se spécialise dans les vidéos solo et les danses sensuelles.",
    joinDate: "Jan 2022",
    tags: ["Amateur", "Solo", "Danse", "Lingerie", "Jeux de rôle"],
    tier: "gold",
    tierProgress: 73,
    stats: {
      likes: "5.7M",
      views: "28.4M",
      rating: 4.8,
      retentionRate: "87%",
      watchMinutes: "237K",
      monthlyRevenue: 4752,
      monthlyRevenueChange: 12,
      superfans: 3200
    },
    nextEvent: {
      type: "Live",
      timeRemaining: "3h24min"
    }
  },
  "2": {
    id: 2,
    username: "maxpower",
    displayName: "Max Power",
    image: "https://picsum.photos/seed/perf2/150/150",
    videos: 42,
    followers: "850K",
    following: 123,
    description: "Max propose des vidéos énergiques et passionnées avec différentes partenaires. Il se démarque par son énergie et sa créativité.",
    joinDate: "Mar 2021",
    tags: ["Couple", "Fitness", "POV", "Extérieur", "Sportif"],
    tier: "silver",
    tierProgress: 58,
    stats: {
      likes: "3.2M",
      views: "18.7M",
      rating: 4.6,
      retentionRate: "82%",
      watchMinutes: "184K",
      monthlyRevenue: 3268,
      monthlyRevenueChange: 8,
      superfans: 1850
    }
  },
  "3": {
    id: 3,
    username: "lexilove",
    displayName: "Lexi Love",
    image: "https://picsum.photos/seed/perf3/150/150",
    videos: 63,
    followers: "1.5M",
    following: 42,
    description: "Lexi est connue pour son charisme et sa douceur dans des scènes sensuelles. Elle aime explorer différents univers et fantasmes.",
    joinDate: "Nov 2020",
    tags: ["Glamour", "Lingerie", "Roleplay", "Romance", "ASMR"],
    tier: "platinum",
    tierProgress: 31,
    stats: {
      likes: "7.9M",
      views: "35.2M",
      rating: 4.9,
      retentionRate: "93%", 
      watchMinutes: "412K",
      monthlyRevenue: 8745,
      monthlyRevenueChange: 18,
      superfans: 5800
    },
    nextEvent: {
      type: "Nouveau contenu",
      timeRemaining: "demain"
    }
  },
};

const PerformerProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const performer = performerDetails[performerId || "1"] || performerDetails["1"];
  const navigate = useNavigate();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  const { theme } = useTheme();
  const { currentUser } = useAuth() || { currentUser: null };
  const [showRevenue, setShowRevenue] = useState(true);
  
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
  const secondaryBgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header avec navigation */}
      <header className={`sticky top-0 z-10 ${secondaryBgClass} p-3 flex items-center justify-between border-b border-gray-800`}>
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
          <TabsList className={`w-full grid grid-cols-4 ${secondaryBgClass} border-y ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
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
            <div className={`${secondaryBgClass} p-4`}>
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
            <div className={`${secondaryBgClass} p-4`}>
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
      <nav className={`fixed bottom-0 w-full flex justify-around py-3 ${secondaryBgClass} border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'} z-10`}>
        <Link to="/" className="text-primary">
          <Home size={24} />
        </Link>
        <Link to="/search" className="text-primary">
          <Search size={24} />
        </Link>
        <Link to="/upload" className="text-primary">
          <Plus size={24} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-1" />
        </Link>
        <Link to="/xtease" className="text-primary">
          <Video size={24} />
        </Link>
        <Link to={`/performer/${performer.id}`} className="text-primary">
          <div className="relative">
            <Avatar className="w-6 h-6 border border-pink-500">
              <AvatarImage src={performer.image} />
              <AvatarFallback className="bg-pink-500 text-white text-xs">
                {performer.displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </Link>
      </nav>
      
      <SendMessageDialog 
        performerName={performer.displayName} 
        performerId={performer.id}
        isOpen={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
      />
    </div>
  );
};

export default PerformerProfile;
