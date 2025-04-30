
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import DynamicHeader from "../header/DynamicHeader";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PerformerData } from "../../types/performer";

interface ProfileHeaderProps {
  username: string;
  displayName?: string;
  profileImage?: string;
  tier?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  status?: "online" | "offline" | "streaming" | "away" | "creating" | "responding";
  lastActive?: string;
  performer?: PerformerData;
  activityMessage?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  username, 
  displayName = "", 
  profileImage,
  tier,
  status = "offline",
  lastActive,
  performer,
  activityMessage
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Vérifier si l'utilisateur est le propriétaire du profil
  const isOwner = currentUser && performer && currentUser.uid === performer.id.toString();

  return (
    <div className="relative">
      <DynamicHeader
        username={username}
        displayName={displayName}
        profileImage={profileImage}
        tier={tier}
        showBackButton={true}
        onBack={() => navigate("/")}
        status={status}
        lastActive={lastActive}
        activityMessage={activityMessage}
      />
      
      {isOwner && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => navigate(`/creator/${performer.id}/settings`)}
        >
          <Settings size={18} />
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
