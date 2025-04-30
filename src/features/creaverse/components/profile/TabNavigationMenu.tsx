
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gallery, FileImage, Clock, Calendar, Layers } from "lucide-react";

interface TabNavigationMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOwner: boolean;
}

const TabNavigationMenu: React.FC<TabNavigationMenuProps> = ({ 
  activeTab, 
  setActiveTab,
  isOwner
}) => {
  return (
    <div className="border-t border-b border-muted sticky top-0 bg-card/95 backdrop-blur-sm z-10">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto overflow-x-auto flex justify-start bg-transparent p-0">
          <TabsTrigger 
            value="gallery" 
            className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
          >
            <Gallery size={18} />
            <span>Galerie</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="collections" 
            className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
          >
            <FileImage size={18} />
            <span>Collections</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="journey" 
            className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
          >
            <Clock size={18} />
            <span>Parcours</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="tiers" 
            className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
          >
            <Layers size={18} />
            <span>Abonnements</span>
          </TabsTrigger>
          
          {isOwner && (
            <TabsTrigger 
              value="calendar" 
              className="flex items-center gap-2 py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
            >
              <Calendar size={18} />
              <span>Calendrier</span>
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigationMenu;
