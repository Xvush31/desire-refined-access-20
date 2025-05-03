
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, MoreVertical, ArrowLeft, Star } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const isDark = theme === 'dark';
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Determine if scrolled past threshold for background change
      setScrolled(currentScrollPos > 10);
      
      // Hide header when scrolling down, show when scrolling up
      // Don't hide when at the top of the page
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isAtTop = currentScrollPos < 10;
      
      setVisible(!isScrollingDown || isAtTop);
      setPrevScrollPos(currentScrollPos);
    };

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Dark mode header class
  const darkHeaderBgClass = isDark && scrolled ? 'bg-[#1a1b31]/90 backdrop-blur-md border-b border-[#2a2b4a]' : '';

  return (
    <motion.header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? theme === 'light' 
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200' 
            : darkHeaderBgClass 
          : 'bg-transparent'
      }`}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -70 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="mr-2" 
                  onClick={handleBack}
                  aria-label="Retour"
                >
                  <ArrowLeft className="text-primary" />
                </Button>
              </motion.div>
            )}
            
            <motion.h1 
              className="text-lg font-medium"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              @{username}
            </motion.h1>
          </div>

          <div className="flex gap-2">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full"
                aria-label="Notifications"
              >
                <Bell className="text-primary" size={20} />
              </Button>
            </motion.div>
            
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full"
                aria-label="Plus d'options"
              >
                <MoreVertical className="text-primary" size={20} />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DynamicHeader;
