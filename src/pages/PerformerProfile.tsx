
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Bell, MessageCircle, MoreVertical, Grid, Play, User, Home, Search, Plus, Video } from "lucide-react";
import { toast } from "sonner";
import SendMessageDialog from "@/components/SendMessageDialog";
import PerformerHighlights from "@/components/performer/PerformerHighlights";
import PerformerGrid from "@/components/performer/PerformerGrid";
import { useTheme } from "@/hooks/use-theme";

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
  stats: {
    likes: string;
    views: string;
    rating: number;
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
    stats: {
      likes: "5.7M",
      views: "28.4M",
      rating: 4.8
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
    stats: {
      likes: "3.2M",
      views: "18.7M",
      rating: 4.6
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
    stats: {
      likes: "7.9M",
      views: "35.2M",
      rating: 4.9
    }
  },
};

const PerformerProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const performer = performerDetails[performerId || "1"] || performerDetails["1"];
  const navigate = useNavigate();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentTab, setCurrentTab] = useState("posts");
  const { theme } = useTheme();
  
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
  const textClass = theme === 'light' ? 'text-black' : 'text-white';
  const secondaryBgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${secondaryBgClass} p-4 flex items-center justify-between border-b border-gray-800`}>
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} className={textClass} />
          </Link>
          <h1 className={`text-xl font-bold ${textClass}`}>{performer.username}</h1>
        </div>
        <div className="flex gap-4">
          <button aria-label="Notifications">
            <Bell size={24} className={textClass} />
          </button>
          <button aria-label="More options">
            <MoreVertical size={24} className={textClass} />
          </button>
        </div>
      </header>
      
      <main>
        {/* Profile Info Section */}
        <section className={`${secondaryBgClass} px-4 pt-6 pb-2`}>
          <div className="flex items-start">
            {/* Profile Image */}
            <div className="mr-8">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-pink-500">
                <AvatarImage src={performer.image} alt={performer.displayName} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                  {performer.displayName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Profile Stats */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center">
                  <span className={`font-bold text-xl ${textClass}`}>{performer.videos}</span>
                  <span className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>publications</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className={`font-bold text-xl ${textClass}`}>{performer.followers}</span>
                  <span className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className={`font-bold text-xl ${textClass}`}>{performer.following}</span>
                  <span className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>suivi(e)s</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Bio */}
          <div className="mt-3">
            <h2 className={`font-bold ${textClass}`}>{performer.displayName}</h2>
            <p className={`text-sm my-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{performer.description}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={handleFollowToggle}
              className={`flex-1 ${isFollowing ? 
                'bg-gray-200 hover:bg-gray-300 text-black' : 
                'animated-gradient-bg text-white'}`}
              size="sm"
            >
              {isFollowing ? 'Suivi(e)' : 'Suivre'}
            </Button>
            <Button 
              onClick={handleSubscribe}
              className="flex-1 animated-gradient-bg text-white"
              size="sm"
            >
              S'abonner
            </Button>
            <Button 
              onClick={() => setIsMessageDialogOpen(true)}
              className={`${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}
              size="sm"
            >
              <MessageCircle size={18} />
            </Button>
          </div>
        </section>
        
        {/* Profile Highlights */}
        <PerformerHighlights performer={performer} />
        
        {/* Content Tabs */}
        <Tabs 
          value={currentTab} 
          onValueChange={setCurrentTab} 
          className="w-full mt-2"
        >
          <TabsList className={`w-full grid grid-cols-3 ${secondaryBgClass} border-y ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
            <TabsTrigger 
              value="posts" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3"
            >
              <Grid size={20} className={textClass} />
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3"
            >
              <Play size={20} className={textClass} />
            </TabsTrigger>
            <TabsTrigger 
              value="premium" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3"
            >
              <Badge variant="outline" className="animated-gradient-bg text-white">VIP</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-0">
            <PerformerGrid type="photos" performerId={performer.id} />
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <PerformerGrid type="videos" performerId={performer.id} />
          </TabsContent>
          
          <TabsContent value="premium" className="mt-0">
            <div className={`flex flex-col items-center justify-center h-60 ${secondaryBgClass} p-4`}>
              <Badge variant="outline" className="animated-gradient-bg text-white mb-4 px-4 py-2">Premium</Badge>
              <h3 className={`text-lg font-bold mb-2 ${textClass}`}>Contenu exclusif réservé aux abonnés</h3>
              <p className={`text-sm text-center mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Abonnez-vous à {performer.displayName} pour découvrir son contenu exclusif
              </p>
              <Button onClick={handleSubscribe} className="animated-gradient-bg text-white">
                S'abonner maintenant
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Bottom Nav */}
      <nav className={`fixed bottom-0 w-full flex justify-around py-3 ${secondaryBgClass} border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
        <Link to="/" className={textClass}>
          <Home size={24} />
        </Link>
        <Link to="/search" className={textClass}>
          <Search size={24} />
        </Link>
        <Link to="/upload" className={textClass}>
          <Plus size={24} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-1" />
        </Link>
        <Link to="/xtease" className={textClass}>
          <Video size={24} />
        </Link>
        <Link to={`/performer/${performer.id}`} className={textClass}>
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
