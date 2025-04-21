
import React, { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    toast({
      title: "Lien copié dans le presse-papiers !",
      duration: 2000
    });
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
    <section className="py-10 bg-white">
      <h2 className="text-2xl font-bold mb-6 px-4 md:px-0 text-black">
        <span className="text-brand-red">T</span>
        <span>XTease · Vidéos verticales captivantes</span>
      </h2>
      <div className="flex flex-col md:flex-row md:justify-center gap-8">
        {xteaseData.map((video) => (
          <div key={video.id} className="relative flex flex-col items-center w-full md:max-w-xs">
            {/* Ratio 9:16 */}
            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-lg md:max-w-[340px]">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/70 hover:bg-white/90 rounded-full p-4 transition-colors">
                  <svg width={48} height={48} fill="black" viewBox="0 0 24 24">
                    <polygon points="8,5.5 19,12 8,18.5" />
                  </svg>
                </button>
              </div>
              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 w-full px-4 pb-4 flex flex-col z-10">
                <h3 className="font-bold text-lg text-black mb-1">{video.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{video.performer}</span>
                  <span className="text-sm text-gray-700">{video.views} vues</span>
                </div>
              </div>
              {/* Like & Share vertical group (right) */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 items-center">
                <button 
                  className={`p-2 rounded-full transition-colors ${liked[video.id] ? "bg-red-600 text-white" : "bg-white/70 text-black hover:bg-red-600 hover:text-white"}`}
                  onClick={() => handleLike(video.id)}
                  aria-label="J'aime"
                >
                  <Heart size={26} fill={liked[video.id] ? "white" : "none"} />
                </button>
                <div className="relative">
                  <button
                    ref={shareBtnRefs[video.id]}
                    className="p-2 rounded-full bg-white/70 text-black hover:bg-brand-red hover:text-white transition-colors"
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default XTeaseSection;

