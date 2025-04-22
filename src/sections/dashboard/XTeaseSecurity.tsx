
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import XTeaseSecurityStats from "./XTeaseSecurityStats";
import XTeaseSecurityTable from "./XTeaseSecurityTable";
import XTeaseSecuritySettings from "./XTeaseSecuritySettings";

// Données fictives pour les incidents de sécurité
const securityIncidents = [
  {
    id: 1,
    type: "Capture d'écran",
    videoId: "video-456-xte",
    timestamp: "2025-04-20T15:32:10",
    ip: "198.51.100.42",
    country: "France",
    severity: "medium"
  },
  {
    id: 2,
    type: "Enregistrement d'écran",
    videoId: "video-234-xte",
    timestamp: "2025-04-19T18:24:05",
    ip: "192.0.2.101",
    country: "Belgique",
    severity: "high"
  },
  {
    id: 3,
    type: "Capture d'écran",
    videoId: "video-789-xte",
    timestamp: "2025-04-18T09:15:22",
    ip: "203.0.113.87",
    country: "France",
    severity: "medium"
  },
  {
    id: 4,
    type: "Tentative d'extraction URL",
    videoId: "video-456-xte",
    timestamp: "2025-04-16T22:10:43",
    ip: "198.51.100.23",
    country: "Suisse",
    severity: "high"
  },
  {
    id: 5,
    type: "Capture d'écran",
    videoId: "video-123-xte",
    timestamp: "2025-04-15T14:56:31",
    ip: "203.0.113.42",
    country: "Canada",
    severity: "medium"
  }
];

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
