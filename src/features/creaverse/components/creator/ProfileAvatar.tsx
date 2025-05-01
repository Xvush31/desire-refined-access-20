
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface ProfileAvatarProps {
  image: string;
  displayName: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "streaming" | "away";
  hasStory?: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  image,
  displayName = "", // Provide default empty string
  size = "md",
  status = "offline",
  hasStory = false
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "h-8 w-8";
      case "lg": return "h-16 w-16";
      case "xl": return "h-24 w-24";
      case "md":
      default: return "h-12 w-12";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "online": return "bg-green-500";
      case "streaming": return "bg-red-500";
      case "away": return "bg-yellow-500";
      case "offline":
      default: return "bg-gray-400";
    }
  };

  const getInitials = (name: string) => {
    if (!name) return ""; // Return empty string if name is falsy
    return name
      .split(' ')
      .map(part => part[0] || '')
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative">
      {hasStory && (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.9 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3
          }}
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 -z-10 ${
            size === "xl" ? "scale-105" : "scale-110"
          }`}
        />
      )}
      
      <Avatar className={`${getSizeClass()} border-2 ${hasStory ? 'border-transparent' : 'border-background'}`}>
        <AvatarImage src={image} alt={displayName || "Profile"} className="object-cover" />
        <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
      </Avatar>
      
      <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-background`}></span>
    </div>
  );
};

export default ProfileAvatar;
