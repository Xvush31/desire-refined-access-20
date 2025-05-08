
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, User, Heart, Image, MessageSquare, Settings, Play } from "lucide-react";

interface IntimateNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onToggleImmersive: () => void;
}

const IntimateNavigation: React.FC<IntimateNavigationProps> = ({
  activeSection,
  onSectionChange,
  onToggleImmersive
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 mb-6">
      <Tabs 
        value={activeSection} 
        onValueChange={onSectionChange}
        className="w-full md:w-auto"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full bg-purple-900/30">
          <TabsTrigger 
            value="home"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Accueil
          </TabsTrigger>
          <TabsTrigger 
            value="creators"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Créateurs
          </TabsTrigger>
          <TabsTrigger 
            value="protection"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <Shield className="w-4 h-4 mr-2" />
            Protection
          </TabsTrigger>
          <TabsTrigger 
            value="explore"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <Image className="w-4 h-4 mr-2" />
            Explorer
          </TabsTrigger>
          <TabsTrigger 
            value="connect"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Connect
          </TabsTrigger>
          <TabsTrigger 
            value="premium"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            <Heart className="w-4 h-4 mr-2" />
            Premium
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="border border-purple-500/50 text-purple-300 hover:bg-purple-900/30"
          onClick={() => navigate("/")}
        >
          Retour à Xvush
        </Button>
        <Button
          variant="default"
          className="bg-gradient-to-r from-purple-600 to-pink-500"
          onClick={onToggleImmersive}
        >
          <Play className="w-4 h-4 mr-2" />
          Mode Immersif
        </Button>
      </div>
    </div>
  );
};

export default IntimateNavigation;
