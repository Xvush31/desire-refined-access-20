
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import GhostModeToggle from "./GhostModeToggle";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import LanguageSelector from "./dashboard/LanguageSelector";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLocale();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'glass-effect' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="flex items-center space-x-4">
            <div className={`${showSearch ? 'w-64' : 'w-10'} transition-all duration-300 overflow-hidden flex items-center bg-secondary rounded-full`}>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-foreground"
              >
                <Search size={20} />
              </button>
              <input 
                type="text" 
                placeholder={t("header.search")}
                className={`${showSearch ? 'w-full opacity-100' : 'w-0 opacity-0'} transition-all duration-300 bg-transparent border-none focus:outline-none px-2 py-1 text-foreground`}
              />
            </div>
            
            <div className="mr-2">
              <LanguageSelector compact />
            </div>
            
            <GhostModeToggle />
            
            <Button variant="ghost" className="hover:bg-muted rounded-full p-2">
              <User size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              className="hover:bg-muted rounded-full p-2"
              onClick={() => setShowMenu(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={showMenu} 
        onClose={() => setShowMenu(false)} 
      />
    </header>
  );
};

export default Header;
