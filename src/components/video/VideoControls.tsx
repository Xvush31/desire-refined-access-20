
import React from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/utils/formatTime";

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  qualityLevels: Array<{height: number}>;
  currentQuality: number;
  isControlsVisible: boolean;
  onTogglePlay: () => void;
  onVolumeChange: (value: number[]) => void;
  onToggleMute: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  onQualityChange: (level: number) => void;
  onToggleFullscreen: () => void;
}

export const VideoControls = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  qualityLevels,
  currentQuality,
  isControlsVisible,
  onTogglePlay,
  onVolumeChange,
  onToggleMute,
  onSeek,
  onQualityChange,
  onToggleFullscreen
}: VideoControlsProps) => {
  const getCurrentQualityLabel = () => {
    if (currentQuality === -1) return "Auto";
    if (qualityLevels.length > currentQuality) {
      return `${qualityLevels[currentQuality].height}p`;
    }
    return "Auto";
  };

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div 
        className="w-full h-1 bg-gray-700 mb-4 cursor-pointer rounded-full overflow-hidden" 
        onClick={onSeek}
      >
        <div 
          className="h-full animated-gradient-bg"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="text-white hover:text-brand-red p-1"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          
          <div className="hidden md:flex items-center space-x-2">
            <button 
              className="text-white hover:text-brand-red p-1"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="w-20">
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={onVolumeChange}
                className="cursor-pointer"
              />
            </div>
          </div>
          
          <div className="text-white text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative group">
            <button className="text-white hover:text-brand-red text-xs p-1">
              {getCurrentQualityLabel()}
            </button>
            <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-black/90 rounded-md p-2 z-10">
              <div className="text-white text-xs space-y-2 min-w-[80px]">
                <button 
                  className={`block w-full text-left px-2 py-1 hover:bg-white/10 rounded ${currentQuality === -1 ? 'text-brand-red font-bold' : ''}`}
                  onClick={() => onQualityChange(-1)}
                >
                  Auto
                </button>
                {qualityLevels.map((level, index) => (
                  <button 
                    key={index}
                    className={`block w-full text-left px-2 py-1 hover:bg-white/10 rounded ${currentQuality === index ? 'text-brand-red font-bold' : ''}`}
                    onClick={() => onQualityChange(index)}
                  >
                    {level.height}p
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            className="text-white p-1 cursor-pointer"
            onClick={onToggleFullscreen}
            aria-label="Plein écran"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
