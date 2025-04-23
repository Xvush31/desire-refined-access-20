
import React from "react";
import Header from "@/components/Header";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";
import { useParams, Navigate } from "react-router-dom";
import { VideoCard } from "@/components/VideoCard";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  performer: string;
  streamUrl?: string;
}

// Temporary data store - in a real app this would come from an API
const freemiumVideos = [
  {
    id: 1,
    title: "Balade romantique à Paris",
    thumbnail: "https://picsum.photos/seed/paris/640/360",
    duration: "12:34",
    views: "1.2M",
    performer: "ParisCouple",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-1/playlist.m3u8"
  },
  {
    id: 2,
    title: "Rendez-vous nocturne",
    thumbnail: "https://picsum.photos/seed/night/640/360",
    duration: "18:22",
    views: "843K",
    performer: "NightLife",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-2/playlist.m3u8"
  },
  {
    id: 3,
    title: "Moment de détente en ville",
    thumbnail: "https://picsum.photos/seed/relax/640/360",
    duration: "15:45",
    views: "567K",
    performer: "CityVibes",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-3/playlist.m3u8"
  },
  {
    id: 4,
    title: "Escapade urbaine",
    thumbnail: "https://picsum.photos/seed/urban/640/360",
    duration: "21:18",
    views: "932K",
    performer: "UrbanLife",
    streamUrl: "https://d38s5lp2g9pf7s.cloudfront.net/video-4/playlist.m3u8"
  }
];

const SingleVideo = () => {
  const { videoId } = useParams();
  const video = freemiumVideos.find((v) => v.id === Number(videoId));

  if (!video) {
    return <Navigate to="/" replace />;
  }

  const suggestedVideos = freemiumVideos.filter((v) => v.id !== video.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main video section */}
          <div className="lg:col-span-2">
            <HLSVideoPlayer
              src={video.streamUrl || ""}
              poster={video.thumbnail}
              title={video.title}
              autoPlay={true}
            />
            <div className="mt-4">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{video.title}</h1>
              <div className="flex items-center justify-between mt-2">
                <span className="text-muted-foreground">{video.views} vues</span>
                <span className="text-muted-foreground">{video.performer}</span>
              </div>
            </div>
          </div>

          {/* Suggested videos */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Vidéos similaires</h2>
            {suggestedVideos.map((suggestedVideo) => (
              <VideoCard
                key={suggestedVideo.id}
                title={suggestedVideo.title}
                thumbnail={suggestedVideo.thumbnail}
                duration={suggestedVideo.duration}
                views={suggestedVideo.views}
                performer={suggestedVideo.performer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
