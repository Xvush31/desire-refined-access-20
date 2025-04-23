
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";

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
  },
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
  },
  {
    id: 9,
    title: "Aventure torride avec un inconnu",
    thumbnail: "https://picsum.photos/seed/video9/640/360",
    duration: "15:20",
    views: "892K",
    performer: "MysteryLover",
    isPremium: true
  },
  {
    id: 10,
    title: "Week-end passionné dans un chalet isolé",
    thumbnail: "https://picsum.photos/seed/video10/640/360",
    duration: "31:45",
    views: "1.1M",
    performer: "MountainLovers"
  },
  {
    id: 11,
    title: "Escapade sensuelle sur une plage déserte",
    thumbnail: "https://picsum.photos/seed/video11/640/360",
    duration: "24:30",
    views: "1.3M",
    performer: "BeachCouple",
    isPremium: true
  },
  {
    id: 12,
    title: "Nuit torride dans une suite parisienne",
    thumbnail: "https://picsum.photos/seed/video12/640/360",
    duration: "18:45",
    views: "975K",
    performer: "ParisLover"
  }
];

const Trending: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Tendances">
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Découvrez les vidéos les plus populaires et les plus regardées du moment. Notre sélection est mise à jour quotidiennement pour vous offrir le meilleur du contenu tendance.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingVideos.map((video) => (
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
      </main>
    </div>
  );
};

export default Trending;
