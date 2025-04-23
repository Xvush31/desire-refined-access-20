
import React from "react";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";
import { useRecentVideos } from "@/lib/graphql/hooks";
import { Skeleton } from "@/components/ui/skeleton";

// Données de secours en cas d'échec de la requête GraphQL
const fallbackVideos = [
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

const RecentVideosSection: React.FC = () => {
  // Utilisation du hook GraphQL pour les vidéos récentes
  const { videos, loading, error } = useRecentVideos();

  // En cas d'erreur, utiliser les données de secours
  const displayVideos = error || videos.length === 0 ? fallbackVideos : videos;

  // Rendu du skeleton pendant le chargement
  if (loading) {
    return (
      <ContentSection title="Récemment Ajoutées" viewAllLink="/recent">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-golden-md">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </ContentSection>
    );
  }

  return (
    <ContentSection title="Récemment Ajoutées" viewAllLink="/recent">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-golden-md">
        {displayVideos.map((video) => (
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

export default RecentVideosSection;
