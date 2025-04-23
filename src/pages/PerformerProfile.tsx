import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoCard from "@/components/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Star, Clock, Video, Users } from "lucide-react";
import SendMessageDialog from "@/components/SendMessageDialog";
import { useNavigate } from "react-router-dom";

interface PerformerData {
  id: number;
  name: string;
  image: string;
  videos: number;
  subscribers: string;
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
    name: "JulieSky",
    image: "https://picsum.photos/seed/perf1/150/150",
    videos: 58,
    subscribers: "1.2M",
    description: "Passionnée et créative, Julie aime partager des moments intimes et authentiques. Elle se spécialise dans les vidéos solo et les danses sensuelles. Abonnez-vous pour découvrir son univers unique et personnel.",
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
    name: "MaxPower",
    image: "https://picsum.photos/seed/perf2/150/150",
    videos: 42,
    subscribers: "850K",
    description: "Max propose des vidéos énergiques et passionnées avec différentes partenaires. Il se démarque par son énergie et sa créativité. Son contenu est varié et toujours de grande qualité.",
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
    name: "LexiLove",
    image: "https://picsum.photos/seed/perf3/150/150",
    videos: 63,
    subscribers: "1.5M",
    description: "Lexi est connue pour son charisme et sa douceur dans des scènes sensuelles. Elle aime explorer différents univers et fantasmes. Ses vidéos sont toujours élégantes et de grande qualité.",
    joinDate: "Nov 2020",
    tags: ["Glamour", "Lingerie", "Roleplay", "Romance", "ASMR"],
    stats: {
      likes: "7.9M",
      views: "35.2M",
      rating: 4.9
    }
  },
};

const performerVideos = [
  {
    id: 1,
    title: "Ma routine matinale sensuelle",
    thumbnail: "https://picsum.photos/seed/vid1/640/360",
    duration: "12:34",
    views: "1.2M",
    performer: "JulieSky",
    isPremium: true
  },
  {
    id: 2,
    title: "Séance en lingerie exclusive",
    thumbnail: "https://picsum.photos/seed/vid2/640/360",
    duration: "18:22",
    views: "843K",
    performer: "JulieSky"
  },
  {
    id: 3,
    title: "Danse sensuelle en privé",
    thumbnail: "https://picsum.photos/seed/vid3/640/360",
    duration: "22:15",
    views: "1.5M",
    performer: "JulieSky",
    isPremium: true
  },
  {
    id: 4,
    title: "Moment de détente dans mon bain",
    thumbnail: "https://picsum.photos/seed/vid4/640/360",
    duration: "14:08",
    views: "950K",
    performer: "JulieSky"
  }
];

const PerformerProfile: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const performer = performerDetails[performerId || "1"] || performerDetails["1"];
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate(`/subscription?creator=${performer.id}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero section with performer info */}
        <section className="py-10 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-background shadow-lg">
                <Avatar className="w-full h-full">
                  <AvatarImage src={performer.image} alt={performer.name} className="object-cover" />
                  <AvatarFallback>{performer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{performer.name}</h1>
                <p className="text-muted-foreground mb-4">Membre depuis {performer.joinDate} • {performer.videos} vidéos</p>
                
                <p className="text-foreground/90 max-w-2xl mb-6">{performer.description}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  {performer.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-brand-red" />
                    <span>{performer.stats.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video size={18} className="text-foreground/70" />
                    <span>{performer.stats.views} vues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-foreground/70" />
                    <span>{performer.subscribers} abonnés</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(performer.stats.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}
                      />
                    ))}
                    <span className="ml-1">{performer.stats.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Button className="animated-gradient-bg text-white" onClick={handleSubscribe}>
                    S'abonner
                  </Button>
                  <SendMessageDialog performerName={performer.name} performerId={performer.id} />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content tabs */}
        <section className="py-8">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="mb-8 w-full md:w-auto flex justify-start overflow-x-auto">
                <TabsTrigger value="videos" className="px-6">Vidéos</TabsTrigger>
                <TabsTrigger value="photos" className="px-6">Photos</TabsTrigger>
                <TabsTrigger value="exclusif" className="px-6">Contenu Exclusif</TabsTrigger>
                <TabsTrigger value="about" className="px-6">À Propos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="videos">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {performerVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      duration={video.duration}
                      views={video.views}
                      performer={video.performer}
                      isPremium={video.isPremium}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="photos">
                <div className="text-center py-12">
                  <Clock size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Contenu disponible avec un abonnement</h3>
                  <p className="text-muted-foreground mb-6">Abonnez-vous pour accéder aux albums photos exclusifs de {performer.name}</p>
                  <Button className="animated-gradient-bg text-white">
                    S'abonner maintenant
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="exclusif">
                <div className="text-center py-12">
                  <Clock size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Contenu premium réservé aux abonnés</h3>
                  <p className="text-muted-foreground mb-6">Débloquez du contenu exclusif en vous abonnant au profil de {performer.name}</p>
                  <Button className="animated-gradient-bg text-white">
                    Débloquer le contenu exclusif
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="about">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-medium mb-4">À propos de {performer.name}</h3>
                  <p className="text-foreground/90 mb-6">{performer.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-secondary/30 rounded-lg p-5">
                      <h4 className="font-medium mb-3">Informations</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Membre depuis:</span>
                          <span>{performer.joinDate}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Vidéos:</span>
                          <span>{performer.videos}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Abonnés:</span>
                          <span>{performer.subscribers}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Évaluation:</span>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < Math.floor(performer.stats.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}
                              />
                            ))}
                            <span className="ml-1">{performer.stats.rating.toFixed(1)}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-secondary/30 rounded-lg p-5">
                      <h4 className="font-medium mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {performer.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PerformerProfile;
