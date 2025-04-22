import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import GhostModeToggle from "./GhostModeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="nav-link">Accueil</a>
            <a href="/trending" className="nav-link">Tendances</a>
            <a href="/categories" className="nav-link">Catégories</a>
            <a href="/performers" className="nav-link">Créateurs</a>
            <a href="/community" className="nav-link">Communauté</a>
            <a href="/favorites" className="nav-link">Favoris</a>
            <a href="/xtease" className="nav-link flex items-center">
              XTease
              <Badge className="ml-2 bg-brand-red text-white">Nouveau</Badge>
            </a>
            <Link to="/creator-dashboard" className="nav-link">Tableau de Bord Créateurs</Link>
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
                placeholder="Rechercher..." 
                className={`${showSearch ? 'w-full opacity-100' : 'w-0 opacity-0'} transition-all duration-300 bg-transparent border-none focus:outline-none px-2 py-1 text-foreground`}
              />
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
