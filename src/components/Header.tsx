
import React, { useState, useEffect } from "react";
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

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? isLight ? 'sexy-glass' : 'glass-effect dark:glass-effect' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <Logo />
            </div>

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
              <Button 
                variant="ghost" 
                className={`hover:bg-muted rounded-full p-2 transition-colors ${isLight ? 'text-gray-800' : ''}`}
              >
                <User size={20} />
              </Button>
              
              <Button 
                variant="ghost" 
                className={`hover:bg-muted rounded-full p-2 transition-colors ${isLight ? 'text-gray-800' : ''}`}
                onClick={() => setShowMobileMenu(true)}
              >
                <Menu size={20} />
              </Button>
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
    </header>
  );
};

export default Header;
