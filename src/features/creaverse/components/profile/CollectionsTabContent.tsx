
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Lock, Play } from "@/icons";
import { useTheme } from "@/hooks/use-theme";

const CollectionsTabContent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} p-4`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <BookmarkCheck className="mr-2" size={18} />
        Collections Thématiques
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {["Danses sensuelles", "Moments intimes", "Behind the scenes", "Archives VIP"].map((collection, index) => (
          <div 
            key={collection} 
            className={`${theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800'} rounded-lg p-3 relative ${index === 3 ? 'opacity-70' : ''}`}
          >
            <div className="aspect-video bg-black/30 rounded-md mb-2 flex items-center justify-center">
              {index === 3 ? (
                <Lock className="text-white/70" size={24} />
              ) : (
                <Play className="text-white" size={24} />
              )}
            </div>
            <h3 className="font-medium">{collection}</h3>
            <p className="text-xs text-muted-foreground">
              {index === 3 ? '23 vidéos · Abonnés VIP uniquement' : `${5 + index * 3} vidéos`}
            </p>
            {index === 3 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="default" size="sm" className="animated-gradient-bg text-white">
                  Débloquer
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsTabContent;
