
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";

interface VideoData {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  performer: string;
  isPremium?: boolean;
}

// Sample video data for each category
const categoryVideos: Record<string, VideoData[]> = {
  amateur: [
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
  ],
  milf: [
    {
      id: 7,
      title: "Rencontre à l'hôtel avec une femme d'expérience",
      thumbnail: "https://picsum.photos/seed/video7/640/360",
      duration: "19:32",
      views: "623K",
      performer: "MatureLady",
      isPremium: true
    },
    {
      id: 8,
      title: "Leçon particulière avec une professeure expérimentée",
      thumbnail: "https://picsum.photos/seed/video8/640/360",
      duration: "27:44",
      views: "514K",
      performer: "TeacherMilf"
    },
    {
      id: 9,
      title: "Voisine qui passe pour emprunter du sucre",
      thumbnail: "https://picsum.photos/seed/video9/640/360",
      duration: "15:20",
      views: "892K",
      performer: "NeighborWoman",
      isPremium: true
    },
  ],
  teen: [
    {
      id: 10,
      title: "Première rencontre avec un partenaire expérimenté",
      thumbnail: "https://picsum.photos/seed/video10/640/360",
      duration: "20:15",
      views: "1.7M",
      performer: "YoungCouple",
      isPremium: true
    },
  ],
  lesbian: [
    {
      id: 11,
      title: "Soirée entre filles qui dérape",
      thumbnail: "https://picsum.photos/seed/video11/640/360",
      duration: "24:30",
      views: "1.3M",
      performer: "GirlsDuo",
      isPremium: true
    },
  ],
  asian: [
    {
      id: 12,
      title: "Rencontre exotique dans un ryokan",
      thumbnail: "https://picsum.photos/seed/video12/640/360",
      duration: "18:45",
      views: "975K",
      performer: "AsianBeauty",
      isPremium: false
    },
  ],
  ebony: [
    {
      id: 13,
      title: "Soirée torride avec une beauté au teint d'ébène",
      thumbnail: "https://picsum.photos/seed/video13/640/360",
      duration: "21:18",
      views: "865K",
      performer: "EbonyQueen",
      isPremium: true
    },
  ],
  blonde: [
    {
      id: 14,
      title: "Blonde sensuelle en lingerie de dentelle",
      thumbnail: "https://picsum.photos/seed/video14/640/360",
      duration: "17:22",
      views: "942K",
      performer: "BlondeAngel",
      isPremium: false
    },
  ],
  brunette: [
    {
      id: 15,
      title: "Brune mystérieuse en tenue provocante",
      thumbnail: "https://picsum.photos/seed/video15/640/360",
      duration: "23:41",
      views: "782K",
      performer: "DarkBeauty",
      isPremium: true
    },
  ],
  redhead: [
    {
      id: 16,
      title: "Rousse passionnée en lingerie de satin",
      thumbnail: "https://picsum.photos/seed/video16/640/360",
      duration: "19:58",
      views: "653K",
      performer: "FireQueen",
      isPremium: false
    },
  ],
  couples: [
    {
      id: 17,
      title: "Couple marié explore de nouvelles expériences",
      thumbnail: "https://picsum.photos/seed/video17/640/360",
      duration: "31:24",
      views: "874K",
      performer: "MarriedCouple",
      isPremium: true
    },
  ],
  pov: [
    {
      id: 18,
      title: "Expérience immersive avec une partenaire attentionnée",
      thumbnail: "https://picsum.photos/seed/video18/640/360",
      duration: "14:52",
      views: "1.1M",
      performer: "POVQueen",
      isPremium: false
    },
  ],
  threesome: [
    {
      id: 19,
      title: "Rencontre à trois dans une suite luxueuse",
      thumbnail: "https://picsum.photos/seed/video19/640/360",
      duration: "29:37",
      views: "1.9M",
      performer: "TrioHeaven",
      isPremium: true
    },
  ],
};

// Default videos to show if the category doesn't have specific videos
const defaultVideos: VideoData[] = [
  {
    id: 1,
    title: "Vidéo exclusive de notre collection",
    thumbnail: "https://picsum.photos/seed/default1/640/360",
    duration: "15:34",
    views: "850K",
    performer: "StudioX",
    isPremium: true
  },
  {
    id: 2,
    title: "Contenu premium sélectionné pour vous",
    thumbnail: "https://picsum.photos/seed/default2/640/360",
    duration: "22:47",
    views: "675K",
    performer: "PremiumStudio"
  },
  {
    id: 3,
    title: "Découvrez notre meilleur contenu",
    thumbnail: "https://picsum.photos/seed/default3/640/360",
    duration: "19:23",
    views: "925K",
    performer: "XclusiveContent",
    isPremium: true
  },
  {
    id: 4,
    title: "Vidéo spéciale de notre collection",
    thumbnail: "https://picsum.photos/seed/default4/640/360",
    duration: "17:58",
    views: "780K",
    performer: "VIPContent"
  },
];

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const formattedCategoryId = categoryId?.toLowerCase() || "";
  
  // Get videos for this category or use default videos if none exist
  const videos = categoryVideos[formattedCategoryId] || defaultVideos;
  
  // Format category name for display
  const categoryName = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 
    : "Catégorie";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title={`Catégorie: ${categoryName}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
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

export default CategoryPage;
