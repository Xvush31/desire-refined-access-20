import React, { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const xteaseData = [
  {
    id: 1,
    title: "Moment intime en soirée",
    performer: "PartyGirl",
    views: "421K",
    thumbnail: "https://picsum.photos/seed/xtease1/1080/1920",
    videoUrl: "https://www.example.com/xtease/1"
  },
  {
    id: 2,
    title: "Séance photo qui devient personnelle",
    performer: "PhotoArtist",
    views: "732K",
    thumbnail: "https://picsum.photos/seed/xtease2/1080/1920",
    videoUrl: "https://www.example.com/xtease/2"
  },
  {
    id: 3,
    title: "Rencontre dans un hôtel 5 étoiles",
    performer: "LuxuryCouple",
    views: "628K",
    thumbnail: "https://picsum.photos/seed/xtease3/1080/1920",
    videoUrl: "https://www.example.com/xtease/3"
  }
];

interface ShareMenuProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ open, onClose, videoUrl, anchorRef }) => {
  if (!open) return null;

  const encodedUrl = encodeURIComponent(videoUrl);
  const waLink = `https://wa.me/?text=${encodedUrl}`;
  const tgLink = `https://t.me/share/url?url=${encodedUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(videoUrl);
    toast.success("Lien copié dans le presse-papiers !");
    onClose();
  };

  return (
    <div className="absolute z-30 right-4 top-12 w-44 bg-white border border-neutral-300 rounded shadow-lg text-sm animate-in fade-in-80 text-black">
      <button
        className="w-full px-4 py-2 hover:bg-neutral-100 text-left"
        onClick={() => {
          window.open(waLink, "_blank");
          onClose();
        }}
      >
        Partager sur WhatsApp
      </button>
      <button
        className="w-full px-4 py-2 hover:bg-neutral-100 text-left"
        onClick={() => {
          window.open(tgLink, "_blank");
          onClose();
        }}
      >
        Partager sur Telegram
      </button>
      <button
        className="w-full px-4 py-2 hover:bg-neutral-100 text-left"
        onClick={copyToClipboard}
      >
        Copier le lien
      </button>
    </div>
  );
};

const XTeaseSection: React.FC = () => {
  const [liked, setLiked] = useState<{[id:number]: boolean}>({});
  const [shareMenu, setShareMenu] = useState<{open:boolean, videoId:number|null}>({open:false, videoId:null});
  const shareBtnRefs = xteaseData.reduce<{[id:number]: React.RefObject<HTMLButtonElement>}>((acc, vid) => {
    acc[vid.id] = React.createRef();
    return acc;
  }, {});

  const handleLike = (id:number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShareClick = (id:number) => {
    setShareMenu({ open: shareMenu.videoId !== id || !shareMenu.open, videoId: id });
  };

  const handleShareMenuClose = () => {
    setShareMenu({open:false, videoId:null});
  }

  return (
    <section className="py-10 bg-background overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-6 px-4 md:px-0 text-foreground font-sans">
        <span className="">X</span>
        <span className="text-brand-red">T</span>
        <span>ease · Vidéos verticales captivantes</span>
      </h2>
      
      <div className="flex flex-row justify-start px-4 overflow-x-auto pb-4 ml-0 gap-4 md:gap-8">
        {xteaseData.map((video) => (
          <div key={video.id} className="xtease-container min-w-[200px] max-w-[280px] md:min-w-0 md:max-w-none flex-shrink-0">
            <div className="relative w-full aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg">
              <Link to="/xtease" className="block w-full h-full">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/40 hover:bg-black/60 rounded-full p-4 transition-colors">
                    <svg width={48} height={48} fill="white" viewBox="0 0 24 24">
                      <polygon points="8,5.5 19,12 8,18.5" />
                    </svg>
                  </div>
                </div>
              </Link>
              
              {/* Like & Share vertical group (right) */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 items-center">
                <button 
                  className={`p-2 rounded-full transition-colors ${liked[video.id] ? "bg-red-600 text-white" : "bg-black/40 text-white hover:bg-red-600"}`}
                  onClick={() => handleLike(video.id)}
                  aria-label="J'aime"
                >
                  <Heart size={26} fill={liked[video.id] ? "white" : "none"} />
                </button>
                <div className="relative">
                  <button
                    ref={shareBtnRefs[video.id]}
                    className="p-2 rounded-full bg-black/40 text-white hover:bg-brand-red hover:text-white transition-colors"
                    onClick={() => handleShareClick(video.id)}
                    aria-label="Partager"
                  >
                    <Share2 size={24} />
                  </button>
                  <ShareMenu
                    open={shareMenu.open && shareMenu.videoId === video.id}
                    onClose={handleShareMenuClose}
                    videoUrl={video.videoUrl}
                    anchorRef={shareBtnRefs[video.id]}
                  />
                </div>
              </div>
            </div>
            
            {/* Titre et infos en dessous de la vidéo */}
            <div className="xtease-info mt-3">
              <h3 className="font-bold text-base md:text-lg text-white">{video.title}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-200">{video.performer}</span>
                <span className="text-sm text-gray-200">{video.views} vues</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default XTeaseSection;
