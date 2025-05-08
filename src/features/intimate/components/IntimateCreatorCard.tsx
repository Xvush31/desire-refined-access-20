
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Shield, ImageIcon, Lock } from "lucide-react";
import IntimateVerificationBadge from "./IntimateVerificationBadge";

interface Creator {
  id: number;
  name: string;
  username: string;
  avatar: string;
  tags: string[];
  authentic: boolean;
  premium: boolean;
  subscriberCount: number;
  contentCount: number;
  description: string;
}

interface IntimateCreatorCardProps {
  creator: Creator;
}

const IntimateCreatorCard: React.FC<IntimateCreatorCardProps> = ({ creator }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 ring-2 ring-purple-500/50">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{creator.name}</h3>
              {creator.authentic && <IntimateVerificationBadge tooltip="Créateur certifié GENUINE™" />}
            </div>
            <p className="text-purple-300 text-sm">{creator.username}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {creator.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-purple-900/50 border-purple-500/50 text-purple-200 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-purple-100 text-sm mb-4 line-clamp-3">{creator.description}</p>
        
        <div className="flex gap-4 text-sm mb-4">
          <div className="text-purple-300">
            <span className="font-bold text-white">{creator.subscriberCount.toLocaleString()}</span> abonnés
          </div>
          <div className="text-purple-300">
            <span className="font-bold text-white">{creator.contentCount}</span> contenus
          </div>
        </div>
        
        <div className="flex gap-3 mb-3">
          <div className="w-1/3 aspect-[3/4] rounded-md bg-purple-800/40 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {creator.premium && (
                <Lock className="text-purple-300" size={20} />
              )}
              {!creator.premium && (
                <ImageIcon className="text-purple-300" size={20} />
              )}
            </div>
          </div>
          <div className="w-1/3 aspect-[3/4] rounded-md bg-purple-800/40 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {creator.premium && (
                <Lock className="text-purple-300" size={20} />
              )}
              {!creator.premium && (
                <ImageIcon className="text-purple-300" size={20} />
              )}
            </div>
          </div>
          <div className="w-1/3 aspect-[3/4] rounded-md bg-purple-800/40 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {creator.premium && (
                <Lock className="text-purple-300" size={20} />
              )}
              {!creator.premium && (
                <ImageIcon className="text-purple-300" size={20} />
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            S'abonner
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30 hover:text-pink-400"
          >
            <Heart size={18} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default IntimateCreatorCard;
