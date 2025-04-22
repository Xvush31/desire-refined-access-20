
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import XTeaseSecurityStats from "./XTeaseSecurityStats";
import XTeaseSecurityTable from "./XTeaseSecurityTable";
import XTeaseSecuritySettings from "./XTeaseSecuritySettings";
import { securityIncidents } from "./securityIncidents.mock";

const XTeaseSecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'incidents' | 'settings'>('incidents');

  // Statistiques calculées
  const totalIncidents = securityIncidents.length;
  const highSeverityCount = securityIncidents.filter(i => i.severity === 'high').length;
  const captureScreenshotCount = securityIncidents.filter(i => i.type === "Capture d'écran").length;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border flex flex-row justify-between items-center">
        <div>
          <CardTitle className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 animated-gradient" />
            Sécurité XTease
          </CardTitle>
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${activeTab === 'incidents' ? 'animated-gradient-bg text-white' : 'bg-secondary'}`}
            onClick={() => setActiveTab('incidents')}
          >
            Incidents
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${activeTab === 'settings' ? 'animated-gradient-bg text-white' : 'bg-secondary'}`}
            onClick={() => setActiveTab('settings')}
          >
            Paramètres
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {activeTab === 'incidents' ? (
          <>
            <XTeaseSecurityStats
              totalIncidents={totalIncidents}
              highSeverityCount={highSeverityCount}
              captureScreenshotCount={captureScreenshotCount}
            />
            <XTeaseSecurityTable incidents={securityIncidents} />
          </>
        ) : (
          <XTeaseSecuritySettings />
        )}
      </CardContent>
    </Card>
  );
};

export default XTeaseSecurity;
