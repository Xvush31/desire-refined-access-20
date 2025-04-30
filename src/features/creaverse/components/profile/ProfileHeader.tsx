
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import DynamicHeader from "../header/DynamicHeader";

interface ProfileHeaderProps {
  username: string;
  displayName?: string;
  profileImage?: string;
  tier?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  username, 
  displayName = "", 
  profileImage,
  tier 
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <DynamicHeader
      username={username}
      displayName={displayName}
      profileImage={profileImage}
      tier={tier}
      showBackButton={true}
      onBack={() => navigate("/")}
    />
  );
};

export default ProfileHeader;
