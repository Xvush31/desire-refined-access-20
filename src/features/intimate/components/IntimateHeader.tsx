
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, Lock, Heart, Menu } from "lucide-react";
import { useIntimateTheme } from "../contexts/IntimateThemeContext";
import { motion } from "framer-motion";

const IntimateHeader: React.FC = () => {
  const { currentUser } = useAuth();
  const { isDark, toggleTheme } = useIntimateTheme();

  return (
    <header className="border-b border-purple-900/50 bg-[#1A1F2C] py-4 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/intimate" className="flex items-center space-x-2">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400"
            >
              INTIMATE
            </motion.div>
          </Link>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex items-center space-x-2 text-purple-300 hover:text-white hover:bg-purple-900/50"
                >
                  <Heart size={18} />
                  <span>Favorites</span>
                </Button>
                <Link to="/intimate/creators">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden md:flex items-center space-x-2 text-purple-300 hover:text-white hover:bg-purple-900/50"
                  >
                    <User size={18} />
                    <span>Creators</span>
                  </Button>
                </Link>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                >
                  <span>My Account</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-purple-300 hover:text-white hover:bg-purple-900/50"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-purple-300 hover:text-white hover:bg-purple-900/50"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default IntimateHeader;
