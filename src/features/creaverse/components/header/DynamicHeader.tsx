
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, MoreVertical, ArrowLeft, Star } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

interface DynamicHeaderProps {
  username: string;
  displayName?: string;
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
  showBackButton = true,
  onBack,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
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

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? theme === 'light' 
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200' 
          : 'bg-zinc-900/90 backdrop-blur-md border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
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
                <ArrowLeft className="text-primary" />
              </Button>
            )}
            
            <h1 className="text-lg font-medium">@{username}</h1>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              aria-label="Notifications"
            >
              <Bell className="text-primary" size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              aria-label="Plus d'options"
            >
              <MoreVertical className="text-primary" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DynamicHeader;
