
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";

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
  },
  {
    id: 20,
    title: "Première fois face caméra",
    thumbnail: "https://picsum.photos/seed/video20/640/360",
    duration: "21:15",
    views: "324K",
    performer: "NewcomerGirl"
  },
  {
    id: 21,
    title: "Expérience avec un nouvel accessoire",
    thumbnail: "https://picsum.photos/seed/video21/640/360",
    duration: "18:47",
    views: "511K",
    performer: "ToysExplorer",
    isPremium: true
  },
  {
    id: 22,
    title: "Découverte sensuelle en extérieur",
    thumbnail: "https://picsum.photos/seed/video22/640/360",
    duration: "23:34",
    views: "418K",
    performer: "NatureLover"
  },
  {
    id: 23,
    title: "Premier rendez-vous qui se prolonge",
    thumbnail: "https://picsum.photos/seed/video23/640/360",
    duration: "28:19",
    views: "386K",
    performer: "DateNight",
    isPremium: true
  },
  {
    id: 24,
    title: "Moment intime après une soirée",
    thumbnail: "https://picsum.photos/seed/video24/640/360",
    duration: "19:42",
    views: "472K",
    performer: "AfterPartyCouple"
  },
  {
    id: 25,
    title: "Séjour romantique en bord de mer",
    thumbnail: "https://picsum.photos/seed/video25/640/360",
    duration: "24:38",
    views: "587K",
    performer: "SeaSideDuo",
    isPremium: true
  },
  {
    id: 26,
    title: "Rencontre impromptue à l'hôtel",
    thumbnail: "https://picsum.photos/seed/video26/640/360",
    duration: "17:25",
    views: "346K",
    performer: "HotelEncounter"
  },
  {
    id: 27,
    title: "Soirée pyjama qui dérape",
    thumbnail: "https://picsum.photos/seed/video27/640/360",
    duration: "22:53",
    views: "492K",
    performer: "SleepoverGirls",
    isPremium: true
  }
];

const Recent: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Vidéos Récentes">
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Découvrez les dernières vidéos ajoutées sur notre plateforme. Notre collection est constamment mise à jour avec du contenu frais et exclusif.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </main>
    </div>
  );
};

export default Recent;
