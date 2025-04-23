
import React from "react";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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

const TrendingVideosSection: React.FC = () => {
  const isMobile = useIsMobile();
  return (
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
  );
};

export default TrendingVideosSection;
