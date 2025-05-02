
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-8 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">XVush</h3>
            <p className="text-sm text-muted-foreground mb-2">
              La plateforme des créateurs de contenu premium
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} XVush. Tous droits réservés.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-3">Explorer</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/trending" className="text-muted-foreground hover:text-foreground">Tendances</Link></li>
                <li><Link to="/recent" className="text-muted-foreground hover:text-foreground">Récents</Link></li>
                <li><Link to="/categories" className="text-muted-foreground hover:text-foreground">Catégories</Link></li>
                <li><Link to="/creators" className="text-muted-foreground hover:text-foreground">Créateurs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">XVush</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">À propos</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link to="/xtease" className="text-muted-foreground hover:text-foreground">XTease</Link></li>
                <li><Link to="/creaverse" className="text-muted-foreground hover:text-foreground">CreaVerse</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Conditions d'utilisation</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Politique de confidentialité</Link></li>
                <li><a href="#cookies" className="text-muted-foreground hover:text-foreground">Cookies</a></li>
                <li><a href="#DMCA" className="text-muted-foreground hover:text-foreground">DMCA</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
