
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Home, Video, Calendar, Users, Heart, BookOpen, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  
  // Close the menu when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-md bg-background z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X size={24} />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Main navigation */}
                <div>
                  <h3 className="text-sm text-muted-foreground mb-3 uppercase font-semibold tracking-wider">Navigation</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        to="/" 
                        className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                        onClick={onClose}
                      >
                        <Home size={20} className="mr-3" />
                        Accueil
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/trending" 
                        className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                        onClick={onClose}
                      >
                        <Video size={20} className="mr-3" />
                        Tendances
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/intimate" 
                        className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                        onClick={onClose}
                      >
                        <ShieldCheck size={20} className="mr-3 text-purple-500" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-semibold">INTIMATE</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/recent" 
                        className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                        onClick={onClose}
                      >
                        <Calendar size={20} className="mr-3" />
                        Récents
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/creators" 
                        className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                        onClick={onClose}
                      >
                        <Users size={20} className="mr-3" />
                        Créateurs
                      </Link>
                    </li>
                  </ul>
                </div>
                
                {/* User-specific links */}
                {currentUser && (
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-3 uppercase font-semibold tracking-wider">Votre compte</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link 
                          to="/favorites" 
                          className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                          onClick={onClose}
                        >
                          <Heart size={20} className="mr-3" />
                          Favoris
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/history" 
                          className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
                          onClick={onClose}
                        >
                          <BookOpen size={20} className="mr-3" />
                          Historique
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                
                {/* Authentication links */}
                <div>
                  <h3 className="text-sm text-muted-foreground mb-3 uppercase font-semibold tracking-wider">Compte</h3>
                  <div className="space-y-3">
                    {currentUser ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={onClose}
                        >
                          Profil
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={onClose}
                        >
                          Se déconnecter
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={onClose}>
                          <Button variant="default" className="w-full">
                            Se connecter
                          </Button>
                        </Link>
                        <Link to="/signup" onClick={onClose}>
                          <Button variant="outline" className="w-full">
                            S'inscrire
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
