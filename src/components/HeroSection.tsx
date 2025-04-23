
import React from "react";
import VideoCard from "./VideoCard";

const freemiumVideos = [
  {
    id: 1,
    title: "Balade romantique à Paris",
    thumbnail: "https://picsum.photos/seed/paris/640/360",
    duration: "12:34",
    views: "1.2M",
    performer: "ParisCouple"
  },
  {
    id: 2,
    title: "Rendez-vous nocturne",
    thumbnail: "https://picsum.photos/seed/night/640/360",
    duration: "18:22",
    views: "843K",
    performer: "NightLife"
  },
  {
    id: 3,
    title: "Moment de détente en ville",
    thumbnail: "https://picsum.photos/seed/relax/640/360",
    duration: "15:45",
    views: "567K",
    performer: "CityVibes"
  },
  {
    id: 4,
    title: "Escapade urbaine",
    thumbnail: "https://picsum.photos/seed/urban/640/360",
    duration: "21:18",
    views: "932K",
    performer: "UrbanLife"
  }
];

const HeroSection = () => {
  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* Background gradient avec les couleurs du logo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/5 to-transparent z-0" />
      
      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {freemiumVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              performer={video.performer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

