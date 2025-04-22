
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";
import CategoryCard from "@/components/CategoryCard";
import HeroSection from "@/components/HeroSection";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import XTeaseSection from "@/components/XTeaseSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Sample data - normally this would come from an API
const trendingVideos = [
  {
    id: 1,
    title: "Couple amateur dans une chambre d'hôtel de luxe",
    thumbnail: "https://picsum.photos/seed/video1/640/360",
    duration: "12:34",
    views: "1.2M",
    performer: "JulieSky",
    isPremium: true
  },
  {
    id: 2,
    title: "Séance de massage qui dérape en expérience sensuelle",
    thumbnail: "https://picsum.photos/seed/video2/640/360",
    duration: "18:22",
    views: "843K",
    performer: "MassagePro"
  },
  {
    id: 3,
    title: "Rendez-vous secret dans un bureau après les heures de travail",
    thumbnail: "https://picsum.photos/seed/video3/640/360",
    duration: "22:15",
    views: "1.5M",
    performer: "OfficeLover",
    isPremium: true
  },
  {
    id: 4,
    title: "Première expérience filmée dans un décor minimaliste",
    thumbnail: "https://picsum.photos/seed/video4/640/360",
    duration: "14:08",
    views: "950K",
    performer: "NoviceCouple"
  }
];

const popularCategories = [
  { id: 1, name: "Amateur", image: "https://picsum.photos/seed/cat1/320/180", videoCount: 12453 },
  { id: 2, name: "MILF", image: "https://picsum.photos/seed/cat2/320/180", videoCount: 8732 },
  { id: 3, name: "Teen", image: "https://picsum.photos/seed/cat3/320/180", videoCount: 10584 },
  { id: 4, name: "Lesbian", image: "https://picsum.photos/seed/cat4/320/180", videoCount: 7219 },
  { id: 5, name: "Asian", image: "https://picsum.photos/seed/cat5/320/180", videoCount: 5843 },
  { id: 6, name: "Ebony", image: "https://picsum.photos/seed/cat6/320/180", videoCount: 4321 }
];

const recentVideos = [
  {
    id: 5,
    title: "Soirée improvisée qui se transforme en moment intime",
    thumbnail: "https://picsum.photos/seed/video5/640/360",
    duration: "16:47",
    views: "421K",
    performer: "PartyGirl",
    isPremium: true
  },
  {
    id: 6,
    title: "Séance photo qui devient plus personnelle",
    thumbnail: "https://picsum.photos/seed/video6/640/360",
    duration: "25:10",
    views: "732K",
    performer: "PhotoArtist"
  },
  {
    id: 7,
    title: "Rencontre dans un hôtel 5 étoiles à Paris",
    thumbnail: "https://picsum.photos/seed/video7/640/360",
    duration: "19:32",
    views: "623K",
    performer: "LuxuryCouple",
    isPremium: true
  },
  {
    id: 8,
    title: "Dîner romantique qui se poursuit en chambre",
    thumbnail: "https://picsum.photos/seed/video8/640/360",
    duration: "27:44",
    views: "514K",
    performer: "RomanticDuo"
  }
];

const popularPerformers = [
  { id: 1, name: "JulieSky", videos: 58, subscribers: "1.2M", image: "https://picsum.photos/seed/perf1/150/150" },
  { id: 2, name: "MaxPower", videos: 42, subscribers: "850K", image: "https://picsum.photos/seed/perf2/150/150" },
  { id: 3, name: "LexiLove", videos: 63, subscribers: "1.5M", image: "https://picsum.photos/seed/perf3/150/150" },
  { id: 4, name: "TomSecret", videos: 37, subscribers: "720K", image: "https://picsum.photos/seed/perf4/150/150" }
];

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trending Videos - Utilisation du ratio d'or pour la structure */}
      <ContentSection title="Tendances" viewAllLink="/trending">
        <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid-reverse'}`}>
          <div className="space-y-golden-sm">
            <h3 className="text-golden-lg font-medium">Vidéos populaires</h3>
            <p className="text-muted-foreground">Découvrez les vidéos tendances les plus regardées cette semaine</p>
            <Button className="animated-gradient-bg text-white mt-golden-md w-full sm:w-auto">
              Explorer toutes les tendances
            </Button>
          </div>
          <div className={`grid grid-cols-1 ${isMobile ? 'mt-5' : 'sm:grid-cols-2'} gap-golden-md`}>
            {trendingVideos.slice(0, isMobile ? 1 : 2).map((video) => (
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
        </div>
        
        <div className="mt-golden-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-golden-md">
          {trendingVideos.slice(2).map((video) => (
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
      </ContentSection>
      
      {/* XTease Section : Nouveau format vertical short-vidéos */}
      <div className="container mx-auto px-golden-sm py-golden-md">
        <XTeaseSection />
      </div>
      
      {/* Categories - Grille basée sur le ratio d'or */}
      <ContentSection title="Catégories Populaires" viewAllLink="/categories" className="bg-secondary/30">
        <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid'} mb-golden-md`}>
          <div>
            <AspectRatio ratio={1.618} className="rounded-2xl overflow-hidden">
              <img 
                src={popularCategories[0].image} 
                alt={popularCategories[0].name} 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end p-6">
                <h3 className="text-white text-xl font-medium">{popularCategories[0].name}</h3>
                <p className="text-white/80 text-sm">{popularCategories[0].videoCount} vidéos</p>
              </div>
            </AspectRatio>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-golden-sm">
            {popularCategories.slice(1, 5).map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
                videoCount={category.videoCount}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-golden-sm">
          {popularCategories.slice(5).map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              videoCount={category.videoCount}
            />
          ))}
        </div>
      </ContentSection>
      
      {/* Subscription Tiers */}
      <SubscriptionTiers />
      
      {/* Recent Videos */}
      <ContentSection title="Récemment Ajoutées" viewAllLink="/recent">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-golden-md">
          {recentVideos.map((video) => (
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
      </ContentSection>
      
      {/* Popular Performers - Section avec proportion d'or */}
      <ContentSection title="Créateurs Populaires" viewAllLink="/performers" className="bg-secondary/30">
        <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid'}`}>
          <div className="flex flex-wrap justify-center gap-golden-md">
            {popularPerformers.map((performer) => (
              <div key={performer.id} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-golden-sm overflow-hidden rounded-full border-2 border-transparent group-hover:border-brand-accent transition-colors">
                  <img 
                    src={performer.image} 
                    alt={performer.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium group-hover:text-brand-accent transition-colors">{performer.name}</h3>
                <p className="text-sm text-muted-foreground">{performer.videos} vidéos</p>
                <p className="text-xs text-brand-accent">{performer.subscribers} abonnés</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-start space-y-golden-md px-golden-md">
            <h3 className="text-golden-xl font-medium">Nos meilleurs créateurs</h3>
            <p className="text-muted-foreground">Découvrez les créateurs les plus populaires sur notre plateforme et abonnez-vous pour ne rien manquer de leur contenu exclusif.</p>
            <Button className="animated-gradient-bg text-white">
              Voir tous les créateurs
            </Button>
          </div>
        </div>
      </ContentSection>
      
      {/* Footer */}
      <footer className="py-golden-lg border-t border-muted">
        <div className="container px-golden-sm mx-auto">
          <div className={`${isMobile ? 'flex flex-col gap-4' : 'golden-grid'} items-center`}>
            <div>
              <p className="text-muted-foreground text-sm">
                © 2025 Visua. Tous droits réservés.
              </p>
            </div>
            <div className="flex justify-end gap-golden-md flex-wrap">
              <a href="/about" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">À propos</a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">Conditions</a>
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">Confidentialité</a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
