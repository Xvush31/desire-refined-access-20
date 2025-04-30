
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, MoreVertical } from "@/icons";
import { useTheme } from "@/hooks/use-theme";

interface ProfileHeaderProps {
  username: string;
  tier?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, tier }) => {
  const { theme } = useTheme();

  return (
    <header className={`sticky top-0 z-10 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} p-3 flex items-center justify-between border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
      <div className="flex items-center">
        <Link to="/" className="mr-4">
          <ArrowLeft size={24} className="text-primary" />
        </Link>
        <h1 className="text-xl font-bold text-primary">{username}</h1>
        {tier && (
          <Badge variant="outline" className="ml-2 animated-gradient-bg text-white">
            Palier {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </Badge>
        )}
      </div>
      <div className="flex gap-3">
        <button aria-label="Notifications">
          <Bell size={22} className="text-primary" />
        </button>
        <button aria-label="More options">
          <MoreVertical size={22} className="text-primary" />
        </button>
      </div>
    </header>
  );
};

export default ProfileHeader;
