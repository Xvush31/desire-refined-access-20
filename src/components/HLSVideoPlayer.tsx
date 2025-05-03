
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  videoId: number;
  onVideoComplete?: () => void;
  isPreview?: boolean;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
}

const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({
  src,
  poster,
  title,
  videoId,
  onVideoComplete,
  isPreview = false,
  className = '',
  autoPlay = false,
  muted = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Configuration de HLS.js pour la lecture vidéo
  useEffect(() => {
    let hls: Hls;
    
    // Fonction de nettoyage
    const cleanup = () => {
      if (hls) {
        hls.destroy();
      }
    };
    
    const video = videoRef.current;
    
    if (video) {
      // Définir l'état initial de muted
      video.muted = isMuted;
      
      // Utiliser HLS.js si supporté et si la source est un flux HLS (.m3u8)
      if (Hls.isSupported() && src && src.includes('.m3u8')) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        
        hls.loadSource(src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            try {
              video.play().catch(error => {
                console.error('Autoplay prevented:', error);
              });
            } catch (error) {
              console.error('Error during autoplay:', error);
            }
          }
        });
        
        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error('HLS error:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('Network error, trying to recover...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('Media error, trying to recover...');
                hls.recoverMediaError();
                break;
              default:
                cleanup();
                break;
            }
          }
        });
      } 
      // Utiliser le lecteur vidéo natif si HLS n'est pas supporté ou si c'est une source directe
      else if (video.canPlayType('application/vnd.apple.mpegurl') || !src.includes('.m3u8')) {
        video.src = src;
        
        if (autoPlay) {
          try {
            video.play().catch(error => {
              console.error('Native autoplay prevented:', error);
            });
          } catch (error) {
            console.error('Error during native autoplay:', error);
          }
        }
      }
    }
    
    // Nettoyer lors du démontage du composant
    return cleanup;
  }, [src, autoPlay, muted]);
  
  // Gérer les mises à jour de l'état de lecture
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleTimeUpdate = () => {
      if (video.duration) {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
        
        // Notify parent component about progress
        if (typeof onVideoComplete === 'function' && video.currentTime >= video.duration * 0.9) {
          onVideoComplete();
        }
      }
    };
    
    const handleDurationChange = () => {
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      if (typeof onVideoComplete === 'function') {
        onVideoComplete();
      }
    };
    
    // Ajouter les écouteurs d'événements
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);
    
    // Nettoyer les écouteurs d'événements
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onVideoComplete]);
  
  // Mettre à jour l'état muted quand la prop muted change
  useEffect(() => {
    setIsMuted(muted);
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);
  
  // Gérer l'affichage/masquage automatique des contrôles
  const showControlsTemporarily = () => {
    setShowControls(true);
    
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };
  
  // Fonction pour formater le temps en MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Fonction pour gérer le clic sur la vidéo
  const handleVideoClick = () => {
    const video = videoRef.current;
    
    showControlsTemporarily();
    
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(error => {
          console.error('Play prevented:', error);
        });
      }
    }
  };
  
  // Fonction pour gérer le clic sur le bouton mute/unmute
  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (video) {
      setIsMuted(!isMuted);
      video.muted = !isMuted;
    }
  };

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      onMouseMove={showControlsTemporarily}
      onMouseEnter={() => setShowControls(true)}
      onTouchStart={showControlsTemporarily}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        playsInline
        onClick={handleVideoClick}
        muted={isMuted}
      />
      
      {/* Titre de la vidéo */}
      {title && showControls && (
        <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent">
          <h3 className="text-white font-medium drop-shadow-lg text-sm">{title}</h3>
        </div>
      )}
      
      {/* Contrôles vidéo */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          {/* Barre de progression */}
          <div className="w-full bg-white/30 h-1 rounded-full mb-3 cursor-pointer">
            <div 
              className="bg-primary h-full rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Boutons de contrôle */}
          <div className="flex justify-between items-center">
            <button 
              onClick={handleVideoClick} 
              className="text-white hover:text-primary transition-colors p-1"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            {/* Affichage du temps */}
            <div className="text-white text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            {/* Bouton mute/unmute */}
            <button 
              onClick={handleMuteToggle} 
              className="text-white hover:text-primary transition-colors p-1"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      )}
      
      {/* Overlay pour les vidéos preview */}
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background/90 p-4 rounded-lg text-center max-w-xs mx-auto">
            <p className="font-semibold mb-2">Contenu premium</p>
            <p className="text-sm mb-4">Abonnez-vous pour voir la vidéo complète</p>
            <button className="bg-primary text-white px-4 py-2 rounded-md w-full font-medium">
              S'abonner
            </button>
          </div>
        </div>
      )}
      
      {/* Overlay de lecture - affiché au centre quand la vidéo est en pause */}
      {!isPlaying && !isPreview && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handleVideoClick}
        >
          <div className="bg-black/30 p-5 rounded-full">
            <Play size={32} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HLSVideoPlayer;
