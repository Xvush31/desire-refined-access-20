
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toujours utiliser la version mobile car useIsMobile() retourne toujours true
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'glass-effect' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left section - empty */}
          <div className="w-32"></div>

          {/* Center section - Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center space-x-4 w-32 justify-end">
            <div className={`${showSearch ? 'w-64' : 'w-10'} transition-all duration-300 overflow-hidden flex items-center bg-secondary rounded-full`}>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-foreground"
              >
                <Search size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Rechercher..."
                className={`${showSearch ? 'w-full opacity-100' : 'w-0 opacity-0'} transition-all duration-300 bg-transparent border-none focus:outline-none px-2 py-1 text-foreground`}
              />
            </div>
            
            <Button variant="ghost" className="hover:bg-muted rounded-full p-2">
              <User size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              className="hover:bg-muted rounded-full p-2"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </header>
  );
};

export default Header;
