
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useImmersiveMode } from "@/hooks/useImmersiveMode";
import ImmersiveMode from "@/components/navigation/ImmersiveMode";
import { X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CreatorFeedPost {
  id: string;
  title: string;
  content: string;
  mediaUrl: string;
  timestamp: string;
  creatorId: string;
  creatorName: string;
  creatorUsername: string;
  creatorImage: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const MOCK_POSTS: CreatorFeedPost[] = [
  {
    id: "1",
    title: "Nouvelle expérience immersive",
    content: "Découvrez mes nouvelles créations en réalité augmentée !",
    mediaUrl: "https://images.unsplash.com/photo-1633934542143-217d3bc9ab7b",
    timestamp: "2023-11-15T14:30:00.000Z",
    creatorId: "creator1",
    creatorName: "Emma Virtuelle",
    creatorUsername: "emmav",
    creatorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    metrics: {
      likes: 752,
      comments: 48,
      shares: 32
    }
  },
  {
    id: "2",
    title: "Exploration sensorielle",
    content: "Une nouvelle façon d'interagir avec le contenu numérique",
    mediaUrl: "https://images.unsplash.com/photo-1592477725143-2e27772ce424",
    timestamp: "2023-11-14T09:15:00.000Z",
    creatorId: "creator2",
    creatorName: "Neo Digital",
    creatorUsername: "neod",
    creatorImage: "https://randomuser.me/api/portraits/men/35.jpg",
    metrics: {
      likes: 952,
      comments: 87,
      shares: 112
    }
  },
  {
    id: "3",
    title: "Voyage virtuel",
    content: "Embarquez pour une odyssée sensorielle unique",
    mediaUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    timestamp: "2023-11-13T17:45:00.000Z",
    creatorId: "creator3",
    creatorName: "Techno Sophia",
    creatorUsername: "techsoph",
    creatorImage: "https://randomuser.me/api/portraits/women/68.jpg",
    metrics: {
      likes: 1284,
      comments: 93,
      shares: 204
    }
  }
];

const ImmersivePublications: React.FC = () => {
  const navigate = useNavigate();
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const { isImmersive, toggleImmersive } = useImmersiveMode();

  // Pour la démonstration, nous utilisons des données simulées
  const posts = MOCK_POSTS;
  const currentPost = posts[currentPostIndex];

  const handleNextPost = () => {
    setCurrentPostIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePreviousPost = () => {
    setCurrentPostIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const handleEnterImmersiveMode = () => {
    if (!isImmersive) {
      toggleImmersive();
    }
  };

  const handleNavigateToCreator = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const renderPostContent = () => (
    <div className="relative w-full flex flex-col items-center">
      <img
        src={currentPost.mediaUrl}
        alt={currentPost.title}
        className="w-full h-[80vh] object-cover rounded-lg"
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{currentPost.title}</h3>
        <p className="mb-4">{currentPost.content}</p>
        
        <div className="flex items-center gap-3">
          <img
            src={currentPost.creatorImage}
            alt={currentPost.creatorName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
            onClick={() => handleNavigateToCreator(currentPost.creatorUsername)}
          />
          <div>
            <p className="font-semibold">{currentPost.creatorName}</p>
            <p className="text-xs opacity-80">@{currentPost.creatorUsername}</p>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-black/40 border-white/40 text-white hover:bg-black/60"
          onClick={handleEnterImmersiveMode}
        >
          <Zap className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {isImmersive ? (
        <ImmersiveMode 
          isImmersive={isImmersive} 
          onToggleImmersive={toggleImmersive}
        >
          <div className="post-container mx-auto p-4">
            {renderPostContent()}
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={handlePreviousPost}
                className="text-sm"
              >
                Précédent
              </Button>
              <Button 
                variant="outline" 
                onClick={handleNextPost}
                className="text-sm"
              >
                Suivant
              </Button>
            </div>
          </div>
        </ImmersiveMode>
      ) : (
        <div className="regular-view space-y-4">
          {renderPostContent()}
          <div className="flex justify-between px-2">
            <Button 
              variant="outline" 
              onClick={handlePreviousPost}
              className="text-sm"
            >
              Précédent
            </Button>
            <Button 
              variant="default" 
              onClick={handleEnterImmersiveMode}
              className="text-sm"
            >
              Mode Immersif
            </Button>
            <Button 
              variant="outline" 
              onClick={handleNextPost}
              className="text-sm"
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImmersivePublications;
