
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
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [hlsLoaded, setHlsLoaded] = useState(false);
  const [hlsError, setHlsError] = useState<string | null>(null);
  
  // Determine if the source is an HLS stream or a direct video file
  const isHlsStream = src && (src.includes('.m3u8') || src.includes('playlist'));
  const isMP4Source = src && (src.toLowerCase().includes('.mp4') || src.toLowerCase().includes('video/mp4'));
  
  // Log for debugging purposes
  useEffect(() => {
    console.log(`HLSVideoPlayer initialized - videoId: ${videoId}, src: ${src}, isHLS: ${isHlsStream}, isMP4: ${isMP4Source}, autoPlay: ${autoPlay}, muted: ${muted}`);
    
    // Validation check for src being a valid URL
    if (!src) {
      console.error(`HLSVideoPlayer received empty src for video ${videoId}`);
    } else if (!src.startsWith('http')) {
      console.warn(`HLSVideoPlayer received potentially invalid URL for video ${videoId}: ${src}`);
    }
    
    return () => {
      console.log(`HLSVideoPlayer unmounting - videoId: ${videoId}`);
    };
  }, [videoId, src, autoPlay, muted, className, isHlsStream, isMP4Source]);
  
  // Configuration de HLS.js pour la lecture vidéo
  useEffect(() => {
    let hls: Hls | null = null;
    
    // Fonction de nettoyage
    const cleanup = () => {
      if (hls) {
        console.log(`Destroying HLS instance for video ${videoId}`);
        hls.destroy();
        hls = null;
      }
      setHlsLoaded(false);
    };
    
    const video = videoRef.current;
    
    if (!video) {
      console.warn(`Video element not available for video ${videoId}`);
      return cleanup;
    }
    
    if (!src) {
      console.error(`No src provided for video ${videoId}`);
      setHlsError("No source URL provided");
      return cleanup;
    }
    
    // Définir l'état initial de muted
    video.muted = isMuted;
    
    // Use HLS.js if supported and if the source seems to be an HLS stream
    if (Hls.isSupported() && isHlsStream) {
      console.log(`Setting up HLS.js for stream: ${src}`);
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        debug: false
      });
      
      try {
        hls.loadSource(src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log(`HLS manifest parsed for video ${videoId}, autoPlay: ${autoPlay}`);
          setHlsLoaded(true);
          setHlsError(null);
          
          if (autoPlay) {
            try {
              console.log(`Attempting autoplay for video ${videoId}`);
              video.muted = true; // Ensure muted for autoplay policy
              setIsMuted(true);
              
              video.play()
                .then(() => {
                  console.log(`Autoplay successful for video ${videoId}`);
                  setIsPlaying(true);
                })
                .catch(error => {
                  console.error(`Autoplay prevented for video ${videoId}:`, error);
                  // Try playing muted as fallback
                  video.muted = true;
                  setIsMuted(true);
                  video.play()
                    .then(() => {
                      console.log(`Fallback muted autoplay successful for video ${videoId}`);
                      setIsPlaying(true);
                    })
                    .catch(fallbackError => {
                      console.error(`Even fallback autoplay failed for video ${videoId}:`, fallbackError);
                      setHlsError("Autoplay prevented by browser");
                    });
                });
            } catch (error) {
              console.error(`Error during autoplay for video ${videoId}:`, error);
              setHlsError("Error during autoplay");
            }
          }
        });
        
        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error(`HLS error for video ${videoId}:`, data);
          
          if (data.fatal) {
            setHlsError(`HLS error: ${data.type}`);
            
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log(`Network error for video ${videoId}, trying to recover...`);
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log(`Media error for video ${videoId}, trying to recover...`);
                hls?.recoverMediaError();
                break;
              default:
                if (isMP4Source) {
                  // Fallback to direct video playback if HLS fails and source appears to be MP4
                  console.log(`HLS failed for ${videoId}, falling back to direct video playback`);
                  cleanup();
                  video.src = src;
                  video.load();
                  if (autoPlay) {
                    video.play().catch(e => console.error("Fallback playback failed:", e));
                  }
                } else {
                  console.error(`Unrecoverable error for video ${videoId}`);
                  cleanup();
                }
                break;
            }
          }
        });
      } catch (error) {
        console.error(`Error setting up HLS for video ${videoId}:`, error);
        setHlsError(`Failed to initialize player: ${error.message}`);
        
        // Try fallback to direct video
        if (isMP4Source) {
          console.log(`Falling back to direct video playback for ${videoId}`);
          video.src = src;
          video.load();
        }
      }
    } 
    // Use native video player for direct video files or if HLS is not supported
    else {
      try {
        console.log(`Using native video player for ${videoId}: ${src}`);
        video.src = src;
        
        video.addEventListener('loadedmetadata', () => {
          console.log(`Native video loaded metadata for ${videoId}`);
          setHlsLoaded(true);
          setHlsError(null);
          
          if (autoPlay) {
            try {
              video.muted = true; // Ensure muted for autoplay policy
              setIsMuted(true);
              video.play()
                .then(() => {
                  console.log(`Native autoplay successful for video ${videoId}`);
                  setIsPlaying(true);
                })
                .catch(error => {
                  console.error(`Native autoplay prevented for video ${videoId}:`, error);
                  setHlsError("Autoplay prevented by browser");
                });
            } catch (error) {
              console.error(`Error during native autoplay for video ${videoId}:`, error);
              setHlsError("Error during autoplay");
            }
          }
        });
        
        video.addEventListener('error', (e) => {
          console.error(`Native video error for ${videoId}:`, video.error);
          setHlsError(`Video error: ${video.error?.message || 'Unknown error'}`);
        });
      } catch (error) {
        console.error(`Error setting up native video for ${videoId}:`, error);
        setHlsError(`Failed to initialize player: ${error.message}`);
      }
    }
    
    // Nettoyer lors du démontage du composant
    return cleanup;
  }, [src, autoPlay, videoId, isHlsStream, isMP4Source]);
  
  // Gérer les mises à jour de l'état de lecture
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    const handlePlay = () => {
      console.log(`Video ${videoId} is now playing`);
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      console.log(`Video ${videoId} is now paused`);
      setIsPlaying(false);
    };
    
    const handleTimeUpdate = () => {
      if (video.duration) {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
        
        // Notify parent component about progress
        if (typeof onVideoComplete === 'function' && video.currentTime >= video.duration * 0.9) {
          console.log(`Video ${videoId} is 90% complete, calling onVideoComplete`);
          onVideoComplete();
        }
      }
    };
    
    const handleDurationChange = () => {
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      console.log(`Video ${videoId} has ended`);
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
  }, [onVideoComplete, videoId]);
  
  // Attempt to play when HLS is loaded
  useEffect(() => {
    const video = videoRef.current;
    
    if (video && hlsLoaded && autoPlay && !isPlaying && !hlsError) {
      try {
        console.log(`HLS loaded, attempting to play video ${videoId}`);
        video.play()
          .then(() => {
            console.log(`Play after HLS load successful for video ${videoId}`);
            setIsPlaying(true);
          })
          .catch(error => {
            console.error(`Play after HLS load failed for video ${videoId}:`, error);
            setHlsError(`Playback failed: ${error.message}`);
          });
      } catch (error) {
        console.error(`Error playing after HLS load for video ${videoId}:`, error);
        setHlsError(`Playback error: ${error.message}`);
      }
    }
  }, [hlsLoaded, autoPlay, isPlaying, videoId, hlsError]);
  
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
        console.log(`User clicked to pause video ${videoId}`);
        video.pause();
      } else {
        console.log(`User clicked to play video ${videoId}`);
        video.play().catch(error => {
          console.error(`Play prevented on click for video ${videoId}:`, error);
          setHlsError(`Playback failed: ${error.message}`);
        });
      }
    }
  };
  
  // Fonction pour gérer le clic sur le bouton mute/unmute
  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (video) {
      console.log(`Toggling mute for video ${videoId} from ${isMuted} to ${!isMuted}`);
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
      {hlsError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="p-4 bg-black/80 text-white rounded-lg max-w-[80%] text-center">
            <p className="mb-2 font-semibold">Erreur de lecture</p>
            <p className="text-sm">{hlsError}</p>
            <button 
              className="mt-3 px-4 py-2 bg-primary rounded-md text-sm"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </button>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        playsInline
        onClick={handleVideoClick}
        muted={isMuted}
        data-video-id={videoId}
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
      {!isPlaying && !isPreview && !hlsError && (
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
