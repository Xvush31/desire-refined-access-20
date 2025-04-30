
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

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isLight = theme === "light";
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

  return (
    <motion.header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? isLight ? 'sexy-glass' : 'glass-effect dark:glass-effect' 
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

            {/* Navigation menu for CreaVerse */}
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
                    <Link to="/performer/1" className={navigationMenuTriggerStyle()}>
                      CreaVerse Demo
                    </Link>
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
                  className={`hover:bg-muted rounded-full p-2 transition-colors ${isLight ? 'text-gray-800' : ''}`}
                >
                  <User size={20} />
                </Button>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  className={`hover:bg-muted rounded-full p-2 transition-colors ${isLight ? 'text-gray-800' : ''}`}
                  onClick={() => setShowMobileMenu(true)}
                >
                  <Menu size={20} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className={`w-full h-[125px] flex items-center justify-center text-muted-foreground rounded-lg mb-4 ${
          isLight ? 'sexy-glass' : 'bg-secondary/30 dark:bg-gray-200'
        }`}>
          Espace publicitaire
        </div>
      </div>

      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </motion.header>
  );
};

export default Header;
