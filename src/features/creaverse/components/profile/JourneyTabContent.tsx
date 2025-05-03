
import React from "react";
import { Award } from "@/icons";
import { useTheme } from "@/hooks/use-theme";

const JourneyTabContent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} p-4`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Award className="mr-2" size={18} />
        Creator Journey
      </h2>
      
      <div className="space-y-4">
        <div className="relative pl-6 pb-6 border-l-2 border-brand-red">
          <div className="absolute left-[-8px] top-0 bg-brand-red rounded-full w-4 h-4"></div>
          <div className="mb-1">
            <span className="text-xs text-muted-foreground">Avril 2023</span>
            <h3 className="font-medium">A atteint 50K abonnés</h3>
          </div>
          <p className="text-sm text-muted-foreground">Une étape importante dans la croissance</p>
        </div>
        
        <div className="relative pl-6 pb-6 border-l-2 border-brand-red">
          <div className="absolute left-[-8px] top-0 bg-brand-red rounded-full w-4 h-4"></div>
          <div className="mb-1">
            <span className="text-xs text-muted-foreground">Février 2023</span>
            <h3 className="font-medium">Première vidéo "Sunset Dance"</h3>
          </div>
          <p className="text-sm text-muted-foreground">La vidéo qui a lancé ma carrière sur XVush</p>
        </div>
        
        <div className="relative pl-6 pb-6 border-l-2 border-brand-red">
          <div className="absolute left-[-8px] top-0 bg-brand-red rounded-full w-4 h-4"></div>
          <div className="mb-1">
            <span className="text-xs text-muted-foreground">Janvier 2022</span>
            <h3 className="font-medium">A rejoint XVush</h3>
          </div>
          <p className="text-sm text-muted-foreground">Le début d'une belle aventure</p>
        </div>
      </div>
    </div>
  );
};

export default JourneyTabContent;
