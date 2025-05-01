
import React from "react";

interface CreatorStatsDisplayProps {
  followers: number;
  subscriptions: number;
  superfans: number;
  retentionRate: string;
  watchMinutes: number;
}

const CreatorStatsDisplay: React.FC<CreatorStatsDisplayProps> = ({
  followers,
  subscriptions,
  superfans,
  retentionRate,
  watchMinutes
}) => {
  return (
    <div className="space-y-5">
      {/* Première ligne: abonnés et abonnements */}
      <div className="flex justify-center items-center gap-8">
        <div className="text-center flex items-center gap-2">
          <span className="text-rose-400 text-lg">●</span>
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl">{followers}</span>
            <span className="text-muted-foreground text-sm">abonnés</span>
          </div>
        </div>
        
        <div className="text-center flex items-center gap-2">
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl">{subscriptions}</span>
            <span className="text-muted-foreground text-sm">abonnements</span>
          </div>
        </div>
      </div>

      {/* Deuxième ligne: super-fans et fidélisation */}
      <div className="flex justify-center items-center gap-8">
        <div className="text-center flex items-center gap-2">
          <span className="text-yellow-400 text-lg">★</span>
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl">{superfans.toLocaleString('fr-FR')}</span>
            <span className="text-muted-foreground text-sm">super-fans</span>
          </div>
        </div>
        
        <div className="text-center flex items-center gap-2">
          <span className="text-blue-400 text-lg">↑</span>
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl">{retentionRate}</span>
            <span className="text-muted-foreground text-sm">fidélisation</span>
          </div>
        </div>
      </div>

      {/* Troisième ligne: minutes regardées */}
      <div className="text-center">
        <span className="font-bold text-xl">{watchMinutes}</span>
        <span className="text-muted-foreground text-sm ml-1">min regardées</span>
      </div>
    </div>
  );
};

export default CreatorStatsDisplay;
