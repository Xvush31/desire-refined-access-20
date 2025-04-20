
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-background border-b border-muted">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="nav-link">Accueil</a>
            <a href="/trending" className="nav-link">Tendances</a>
            <a href="/categories" className="nav-link">Catégories</a>
            <a href="/performers" className="nav-link">Performeurs</a>
            <a href="/favorites" className="nav-link">Mes Favoris</a>
          </nav>

          {/* Search and User Actions */}
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

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </header>
  );
};

export default Header;
