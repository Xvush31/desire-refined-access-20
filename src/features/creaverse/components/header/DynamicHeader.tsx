
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, MoreVertical, ArrowLeft } from "@/icons";
import { useTheme } from "@/hooks/use-theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface DynamicHeaderProps {
  username: string;
  displayName: string;
  profileImage?: string;
  tier?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  isScrolled?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({
  username,
  displayName,
  profileImage,
  tier,
  isScrolled = false,
  showBackButton = true,
  onBack,
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
      case "bronze": return "bg-amber-600";
      case "silver": return "bg-gray-400";
      case "gold": return "bg-yellow-400";
      case "platinum": return "bg-blue-400";
      case "diamond": return "bg-purple-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <header 
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
                <Avatar className="h-8 w-8 mr-2">
                  <img src={profileImage} alt={displayName} className="object-cover" />
                </Avatar>
              )}
              <div>
                <h1 className="text-lg font-bold text-primary">{username}</h1>
                {tier && (
                  <Badge variant="outline" className={`animated-gradient-bg text-white text-xs`}>
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
    </header>
  );
};

export default DynamicHeader;
