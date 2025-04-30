
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Search, Plus, Video, User, LogIn } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationFooterProps {
  performerId: number | string;
  performerImage: string;
  performerName: string;
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({ 
  performerId,
  performerImage,
  performerName
}) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const secondaryBgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-800';
  
  console.log("NavigationFooter rendering with performerId:", performerId);

  // Determine the profile icon/link based on authentication status
  const ProfileIcon = () => {
    if (currentUser) {
      return (
        <Link to={`/creaverse/performer/${performerId}`} className="text-primary">
          <div className="relative">
            <Avatar className="w-6 h-6 border border-pink-500">
              <AvatarImage src={performerImage} />
              <AvatarFallback className="bg-pink-500 text-white text-xs">
                {(performerName || "").substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </Link>
      );
    } else {
      return (
        <Link to="/login" className="text-primary">
          <LogIn size={24} />
        </Link>
      );
    }
  };

  return (
    <nav className={`fixed bottom-0 w-full flex justify-around py-3 ${secondaryBgClass} border-t ${borderClass} z-10`}>
      <Link to="/" className="text-primary">
        <Home size={24} />
      </Link>
      <Link to="/search" className="text-primary">
        <Search size={24} />
      </Link>
      {currentUser ? (
        <Link to="/upload" className="text-primary">
          <Plus size={24} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-1" />
        </Link>
      ) : (
        <Link to="/creators" className="text-primary">
          <User size={24} />
        </Link>
      )}
      <Link to="/xtease" className="text-primary">
        <Video size={24} />
      </Link>
      <ProfileIcon />
    </nav>
  );
};

export default NavigationFooter;
