
import React, { useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, BookmarkCheck, Award, CircleDollarSign, Calendar } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";

interface TabNavigationMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCreatorMode?: boolean;
}

const TabNavigationMenu: React.FC<TabNavigationMenuProps> = ({ 
  activeTab, 
  setActiveTab,
  isCreatorMode = false
}) => {
  const { theme } = useTheme();
  const tabsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation pour l'onglet actif
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector('[data-state="active"]');
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeTab]);
  
  const standardTabs = [
    { id: "gallery", icon: <Grid size={18} />, label: "Galerie" },
    { id: "collections", icon: <BookmarkCheck size={18} />, label: "Collections" },
    { id: "journey", icon: <Award size={18} />, label: "Journey" },
    { id: "tiers", icon: <CircleDollarSign size={18} />, label: "Abonnement" }
  ];
  
  const creatorTabs = [
    ...standardTabs,
    { id: "calendar", icon: <Calendar size={18} />, label: "Planning" }
  ];
  
  const tabs = isCreatorMode ? creatorTabs : standardTabs;
  
  return (
    <div className="relative w-full mt-4">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <div 
          ref={tabsRef}
          className="overflow-x-auto no-scrollbar"
        >
          <TabsList className={`w-full min-w-max grid grid-flow-col auto-cols-fr ${theme === 'light' ? 'bg-white/70 backdrop-blur-md' : 'bg-zinc-900/70 backdrop-blur-md'} border-y ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="data-[state=active]:border-b-2 data-[state=active]:border-brand-red py-3 flex flex-col items-center relative px-6"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: activeTab === tab.id ? 1 : 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.icon}
                </motion.div>
                <span className="text-xs mt-1">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                    layoutId="activeTabIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default TabNavigationMenu;
