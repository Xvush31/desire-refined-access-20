
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample videos for favorites
const favoriteVideos = [
  {
    id: 1,
    title: "Couple amateur dans une chambre d'hôtel de luxe",
    thumbnail: "https://picsum.photos/seed/video1/640/360",
    duration: "12:34",
    views: "1.2M",
    performer: "JulieSky",
    isPremium: true,
    dateAdded: "Aujourd'hui"
  },
  {
    id: 3,
    title: "Rendez-vous secret dans un bureau après les heures de travail",
    thumbnail: "https://picsum.photos/seed/video3/640/360",
    duration: "22:15",
    views: "1.5M",
    performer: "OfficeLover",
    isPremium: true,
    dateAdded: "Hier"
  },
  {
    id: 7,
    title: "Rencontre dans un hôtel 5 étoiles à Paris",
    thumbnail: "https://picsum.photos/seed/video7/640/360",
    duration: "19:32",
    views: "623K",
    performer: "LuxuryCouple",
    isPremium: true,
    dateAdded: "Il y a 3 jours"
  },
  {
    id: 11,
    title: "Escapade sensuelle sur une plage déserte",
    thumbnail: "https://picsum.photos/seed/video11/640/360",
    duration: "24:30",
    views: "1.3M",
    performer: "BeachCouple",
    isPremium: true,
    dateAdded: "La semaine dernière"
  }
];

// Sample favorite performers
const favoritePerformers = [
  { id: 1, name: "JulieSky", videos: 58, image: "https://picsum.photos/seed/perf1/150/150" },
  { id: 3, name: "LexiLove", videos: 63, image: "https://picsum.photos/seed/perf3/150/150" },
  { id: 5, name: "SophieWild", videos: 45, image: "https://picsum.photos/seed/perf5/150/150" }
];

const Favorites: React.FC = () => {
  // State to track if user is logged in (would normally come from auth context)
  const [isLoggedIn] = React.useState(false);
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="py-16">
          <div className="container px-4 mx-auto text-center">
            <Lock size={64} className="mx-auto text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold mb-4">Connectez-vous pour accéder à vos favoris</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Créez un compte ou connectez-vous pour sauvegarder vos vidéos et performeurs préférés et y accéder à tout moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="animated-gradient-bg text-white px-8">
                Se connecter
              </Button>
              <Button variant="outline" className="px-8">
                Créer un compte
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Mes Favoris">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
              <TabsTrigger value="performers">Performeurs</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos">
              {favoriteVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {favoriteVideos.map((video) => (
                    <div key={video.id} className="relative">
                      <VideoCard
                        title={video.title}
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        views={video.views}
                        performer={video.performer}
                        isPremium={video.isPremium}
                      />
                      <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                        {video.dateAdded}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-6">Vous n'avez pas encore ajouté de vidéos à vos favoris.</p>
                  <Button asChild>
                    <a href="/trending">Découvrir des vidéos</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="performers">
              {favoritePerformers.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {favoritePerformers.map((performer) => (
                    <a href={`/performers/${performer.id}`} key={performer.id} className="text-center group">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 overflow-hidden rounded-full border-2 border-transparent group-hover:border-brand-accent transition-colors">
                        <img 
                          src={performer.image} 
                          alt={performer.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium group-hover:text-brand-accent transition-colors">{performer.name}</h3>
                      <p className="text-sm text-muted-foreground">{performer.videos} vidéos</p>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-6">Vous n'avez pas encore ajouté de performeurs à vos favoris.</p>
                  <Button asChild>
                    <a href="/performers">Découvrir des performeurs</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="playlists">
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">Vous n'avez pas encore créé de playlists.</p>
                <Button>
                  Créer une playlist
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </ContentSection>
      </main>
    </div>
  );
};

export default Favorites;
