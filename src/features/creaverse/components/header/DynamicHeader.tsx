
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, MoreVertical, ArrowLeft } from "@/icons";
import { useTheme } from "@/hooks/use-theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface DynamicHeaderProps {
  username: string;
  displayName: string;
  profileImage?: string;
  tier?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  isScrolled?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  status?: "online" | "offline" | "streaming" | "away";
  lastActive?: string;
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
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(isScrolled);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      case "away": return "bg-yellow-500";
      case "offline": 
      default: return "bg-gray-400";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "online": return "En ligne";
      case "streaming": return "En direct";
      case "away": return "Absent";
      case "offline": 
      default: return lastActive ? `Actif ${lastActive}` : "Hors ligne";
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
                  <span className={`absolute bottom-0 right-1 w-3 h-3 ${getStatusIndicator()} rounded-full border-2 border-white`}></span>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-primary">{username}</h1>
                  <span className="text-xs text-muted-foreground">{getStatusText()}</span>
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
