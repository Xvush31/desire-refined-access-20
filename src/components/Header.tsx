import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CREAVERSE_DOMAIN, XDOSE_DOMAIN } from "@/utils/creaverseLinks";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const isDark = theme === "dark";
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  
  // Use framer-motion to detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only hide header after scrolling down a bit
    if (latest < 50) {
      setHidden(false);
      return;
    }
    
    // Determine if scrolling up or down
    const direction = latest > lastScrollY.current ? "down" : "up";
    
    if (direction === "down" && latest > 80 && !hidden) {
      setHidden(true);
    } else if (direction === "up" && hidden) {
      setHidden(false);
    }
    
    lastScrollY.current = latest;
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants for the header
  const headerVariants = {
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    hidden: { 
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  // Class for dark theme header
  const darkHeaderClass = isDark 
    ? 'bg-[#1a1b31]/90 backdrop-blur-md border-b border-[#2a2b4a]' 
    : '';

  // Handler for CreaVerse Demo link
  const handleCreaVerseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(`${CREAVERSE_DOMAIN}/performer/1`, '_blank');
  };

  // Handler for XDose Demo link
  const handleXDoseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(`${XDOSE_DOMAIN}`, '_blank');
  };

  return (
    <motion.header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? isLight 
              ? 'sexy-glass' 
              : darkHeaderClass
          : 'bg-transparent'
      }`}
      variants={headerVariants}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
    >
      <div className="container mx-auto px-4">
        <div className="py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.div 
              className="flex-shrink-0"
              whileTap={{ scale: 0.95 }}
            >
              <Logo />
            </motion.div>

            {/* Navigation menu for XDose */}
            {!isMobile && (
              <NavigationMenu className="mx-4 hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className={navigationMenuTriggerStyle()}>
                      Accueil
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/creators" className={navigationMenuTriggerStyle()}>
                      Créateurs
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/security-demo" className={navigationMenuTriggerStyle()}>
                      Démo Sécurité
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <a 
                      href={XDOSE_DOMAIN} 
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleXDoseClick}
                      className={navigationMenuTriggerStyle()}
                    >
                      XDose Demo
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            <div className="flex-grow flex justify-center max-w-2xl">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-4 flex-shrink-0">
              <ThemeToggle />
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  className={`hover:bg-muted rounded-full p-2 transition-colors ${isLight ? 'text-gray-800' : 'text-white'}`}
                >
                  <User size={20} />
                </Button>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  className={`hover:bg-muted rounded-full p-2 transition-colors ${isLight ? 'text-gray-800' : 'text-white'}`}
                  onClick={() => setShowMobileMenu(true)}
                >
                  <Menu size={20} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Suppression de l'espace publicitaire */}
      </div>

      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </motion.header>
  );
};

export default Header;
