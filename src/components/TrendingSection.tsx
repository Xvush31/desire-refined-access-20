
import React from "react";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/contexts/LocaleContext";
import { useNavigate } from "react-router-dom";

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

const TrendingSection = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/trending");
  };

  return (
    <ContentSection title={t("home.trending")} viewAllLink="/trending">
      <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid-reverse'}`}>
        <div className="space-y-golden-sm">
          <h3 className="text-golden-lg font-medium">{t("home.popular_videos")}</h3>
          <p className="text-muted-foreground">
            {t("home.trending_desc") === "home.trending_desc" 
              ? "Découvrez les vidéos tendances les plus regardées cette semaine" 
              : t("home.trending_desc")}
          </p>
          <Button 
            className="animated-gradient-bg text-white mt-golden-md w-full sm:w-auto"
            onClick={handleExploreClick}
          >
            {t("home.explore_trends")}
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
              id={video.id}
              navigateTo="/trending"
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
            id={video.id}
            navigateTo="/trending"
          />
        ))}
      </div>
    </ContentSection>
  );
};

export default TrendingSection;
