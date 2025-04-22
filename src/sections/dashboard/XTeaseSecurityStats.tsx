
import React from "react";
import { Shield, Lock, Shield as ShieldIcon } from "lucide-react";

interface XTeaseSecurityStatsProps {
  totalIncidents: number;
  highSeverityCount: number;
  captureScreenshotCount: number;
}

const XTeaseSecurityStats: React.FC<XTeaseSecurityStatsProps> = ({
  totalIncidents,
  highSeverityCount,
  captureScreenshotCount,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Total incidents</h3>
        <ShieldIcon className="h-5 w-5 text-yellow-500" />
      </div>
      <p className="text-3xl font-bold mt-2">{totalIncidents}</p>
      <p className="text-sm text-muted-foreground mt-1">Derniers 30 jours</p>
    </div>
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Incidents graves</h3>
        <Shield className="h-5 w-5 text-red-500" />
      </div>
      <p className="text-3xl font-bold mt-2">{highSeverityCount}</p>
      <p className="text-sm text-muted-foreground mt-1">Risque élevé</p>
    </div>
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Captures</h3>
        <Lock className="h-5 w-5 animated-gradient" />
      </div>
      <p className="text-3xl font-bold mt-2">{captureScreenshotCount}</p>
      <p className="text-sm text-muted-foreground mt-1">Captures d'écran bloquées</p>
    </div>
  </div>
);

export default XTeaseSecurityStats;
