
import React from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const historyVideos = [
  {
    id: 1,
    title: "Couple amateur dans une chambre d'hôtel de luxe",
    thumbnail: "https://picsum.photos/seed/video1/640/360",
    duration: "12:34",
    views: "1.2M",
    performer: "JulieSky",
    isPremium: true,
    watchedDate: "2025-04-22"
  },
  {
    id: 2,
    title: "Séance de massage qui dérape en expérience sensuelle",
    thumbnail: "https://picsum.photos/seed/video2/640/360",
    duration: "18:22",
    views: "843K",
    performer: "MassagePro",
    watchedDate: "2025-04-22"
  },
  {
    id: 3,
    title: "Rendez-vous secret dans un bureau après les heures de travail",
    thumbnail: "https://picsum.photos/seed/video3/640/360",
    duration: "22:15",
    views: "1.5M",
    performer: "OfficeLover",
    isPremium: true,
    watchedDate: "2025-04-21"
  },
  {
    id: 4,
    title: "Première expérience filmée dans un décor minimaliste",
    thumbnail: "https://picsum.photos/seed/video4/640/360",
    duration: "14:08",
    views: "950K",
    performer: "NoviceCouple",
    watchedDate: "2025-04-20"
  }
];

const History: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Historique">
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              Votre historique de visionnage récent
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Effacer l'historique
            </Button>
          </div>
          
          <div className="space-y-8">
            {/* Videos groupés par date */}
            <div>
              <h3 className="text-lg font-medium mb-4">Aujourd'hui</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {historyVideos
                  .filter(video => video.watchedDate === "2025-04-22")
                  .map((video) => (
                    <VideoCard
                      key={video.id}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      duration={video.duration}
                      views={video.views}
                      performer={video.performer}
                      isPremium={video.isPremium}
                    />
                  ))
                }
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Hier</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {historyVideos
                  .filter(video => video.watchedDate === "2025-04-21")
                  .map((video) => (
                    <VideoCard
                      key={video.id}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      duration={video.duration}
                      views={video.views}
                      performer={video.performer}
                      isPremium={video.isPremium}
                    />
                  ))
                }
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Cette semaine</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {historyVideos
                  .filter(video => video.watchedDate === "2025-04-20")
                  .map((video) => (
                    <VideoCard
                      key={video.id}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      duration={video.duration}
                      views={video.views}
                      performer={video.performer}
                      isPremium={video.isPremium}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default History;
