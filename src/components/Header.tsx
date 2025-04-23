
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'glass-effect' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        {/* Main header row */}
        <div className="py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left section - Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Center section - Search */}
            <div className="flex-grow flex justify-center max-w-2xl">
              <SearchBar />
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center space-x-4 flex-shrink-0">
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

        {/* Ad banner section */}
        <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mb-4">
          Espace publicitaire
        </div>
      </div>

      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </header>
  );
};

export default Header;
