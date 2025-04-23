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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {/* Core Navigation Group */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="nav-link">{t("header.home")}</Link>
              <Link to="/trending" className="nav-link">{t("header.trending")}</Link>
              <Link to="/categories" className="nav-link">{t("header.categories")}</Link>
              <Link to="/performers" className="nav-link">{t("header.performers")}</Link>
            </div>

            {/* User Features Group */}
            <div className="flex items-center space-x-6">
              <Link to="/community" className="nav-link">{t("header.community")}</Link>
              <Link to="/favorites" className="nav-link">{t("header.favorites")}</Link>
              <div className="flex flex-col items-center">
                <Link to="/xtease" className="nav-link">XTease</Link>
                <Badge variant="default" className="bg-brand-red text-white text-[10px] py-0 px-2 mt-1 rounded-md">
                  {t("header.new")}
                </Badge>
              </div>
            </div>

            {/* Creator Tools Group */}
            <div className="flex items-center space-x-6">
              <Link to="/creator-dashboard" className="nav-link">{t("header.creator_dashboard")}</Link>
            </div>
          </nav>

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
            
            <div className="hidden md:block mr-2">
              <LanguageSelector compact />
            </div>
            
            <div className="hidden md:block">
              <GhostModeToggle />
            </div>
            
            <Button variant="ghost" className="hover:bg-muted rounded-full p-2">
              <User size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              className="md:hidden hover:bg-muted rounded-full p-2"
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
