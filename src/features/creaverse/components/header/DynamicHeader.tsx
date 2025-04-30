
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, MoreVertical, ArrowLeft, Star, Clock, Users } from "@/icons";
import { useTheme } from "@/hooks/use-theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip";

interface DynamicHeaderProps {
  username: string;
  displayName: string;
  profileImage?: string;
  tier?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  isScrolled?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  status?: "online" | "offline" | "streaming" | "away" | "creating" | "responding";
  lastActive?: string;
  activityMessage?: string;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({
  username,
  displayName,
  profileImage,
  tier,
  isScrolled = false,
  showBackButton = true,
  onBack,
  status = "offline",
  lastActive,
  activityMessage,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(isScrolled);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Effet pour animer le pulse en fonction du statut
  useEffect(() => {
    if (status === "streaming" || status === "creating" || status === "responding") {
      const interval = setInterval(() => {
        setPulseAnimation(prev => !prev);
      }, status === "streaming" ? 800 : 1500);
      
      return () => clearInterval(interval);
    }
    
    setPulseAnimation(false);
  }, [status]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case "bronze": return "from-amber-600 to-amber-500";
      case "silver": return "from-gray-400 to-gray-300";
      case "gold": return "from-yellow-400 to-yellow-300";
      case "platinum": return "from-blue-400 to-blue-300";
      case "diamond": return "from-purple-400 to-purple-300";
      default: return "from-gray-400 to-gray-300";
    }
  };

  const getStatusIndicator = () => {
    switch (status) {
      case "online": return "bg-green-500";
      case "streaming": return "bg-red-500";
      case "creating": return "bg-purple-500";
      case "responding": return "bg-blue-500";
      case "away": return "bg-yellow-500";
      case "offline": 
      default: return "bg-gray-400";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "online": return "En ligne";
      case "streaming": return "En direct";
      case "creating": return "Création en cours";
      case "responding": return "Réponse aux messages";
      case "away": return "Absent";
      case "offline": 
      default: return lastActive ? `Actif ${lastActive}` : "Hors ligne";
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case "streaming": return <Star size={12} className="text-white" />;
      case "creating": return <Clock size={12} className="text-white" />;
      case "responding": return <MessageCircle size={12} className="text-white" />;
      case "online" : return null;
      default: return null;
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? theme === 'light' 
            ? 'sexy-glass border-b border-gray-200' 
            : 'glass-effect dark:glass-effect border-b border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="icon"
                className="mr-2" 
                onClick={handleBack}
                aria-label="Retour"
              >
                <ArrowLeft size={24} className="text-primary" />
              </Button>
            )}
            
            <div className="flex items-center">
              {profileImage && (
                <div className="relative">
                  <Avatar className="h-10 w-10 mr-2 border-2 border-transparent">
                    <img src={profileImage} alt={displayName} className="object-cover" />
                  </Avatar>
                  
                  <div className="absolute bottom-0 right-1 flex items-center justify-center">
                    <motion.span 
                      className={`w-3 h-3 ${getStatusIndicator()} rounded-full border-2 border-white flex items-center justify-center`}
                      animate={
                        pulseAnimation ? { 
                          scale: [1, 1.4, 1], 
                          opacity: [1, 0.8, 1]
                        } : {}
                      }
                      transition={
                        status === "streaming" 
                          ? { duration: 1, repeat: Infinity }
                          : { duration: 1.5, repeat: Infinity }
                      }
                    >
                      {getStatusIcon()}
                    </motion.span>
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-primary">{username}</h1>
                  <span className="text-xs text-muted-foreground">{getStatusText()}</span>
                  {activityMessage && (
                    <span className="text-xs italic text-muted-foreground">"{activityMessage}"</span>
                  )}
                </div>
                {tier && (
                  <Badge variant="outline" className={`bg-gradient-to-r ${getTierColor(tier)} text-white text-xs px-2 py-0.5`}>
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-muted rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-primary" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-muted rounded-full transition-colors"
              aria-label="Messages"
            >
              <MessageCircle size={20} className="text-primary" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-muted rounded-full transition-colors"
              aria-label="Plus d'options"
            >
              <MoreVertical size={20} className="text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DynamicHeader;
