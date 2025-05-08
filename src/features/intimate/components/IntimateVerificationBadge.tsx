
import React from "react";
import { Shield, User, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IntimateVerificationBadgeProps {
  tooltip?: string;
  size?: "sm" | "md" | "lg";
}

const IntimateVerificationBadge: React.FC<IntimateVerificationBadgeProps> = ({ 
  tooltip = "Compte vérifié", 
  size = "md" 
}) => {
  // Determine size
  let badgeSize = 20;
  let iconSize = 12;
  
  if (size === "sm") {
    badgeSize = 16;
    iconSize = 10;
  } else if (size === "lg") {
    badgeSize = 24;
    iconSize = 14;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="relative flex items-center justify-center cursor-help"
            style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse-subtle"></div>
            <Check size={iconSize} className="relative text-white z-10" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-purple-900 border-purple-500 text-white">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IntimateVerificationBadge;
