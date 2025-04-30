
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, BookmarkCheck, Award, CircleDollarSign } from "@/icons";
import { useTheme } from "@/hooks/use-theme";

interface TabNavigationMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigationMenu: React.FC<TabNavigationMenuProps> = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full mt-4"
    >
      <TabsList className={`w-full grid grid-cols-4 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} border-y ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
        <TabsTrigger 
          value="gallery" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
        >
          <Grid size={18} />
          <span className="text-xs mt-1">Galerie</span>
        </TabsTrigger>
        <TabsTrigger 
          value="collections" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
        >
          <BookmarkCheck size={18} />
          <span className="text-xs mt-1">Collections</span>
        </TabsTrigger>
        <TabsTrigger 
          value="journey" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
        >
          <Award size={18} />
          <span className="text-xs mt-1">Journey</span>
        </TabsTrigger>
        <TabsTrigger 
          value="tiers" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center"
        >
          <CircleDollarSign size={18} />
          <span className="text-xs mt-1">Abonnement</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabNavigationMenu;
