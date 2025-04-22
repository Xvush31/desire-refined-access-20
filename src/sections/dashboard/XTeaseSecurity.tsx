import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, ShieldCheck, Lock, Shield as ShieldIcon } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Video ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Pays</TableHead>
                    <TableHead>Gravité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>{incident.type}</TableCell>
                      <TableCell className="font-mono text-xs">{incident.videoId}</TableCell>
                      <TableCell>{new Date(incident.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{incident.ip}</TableCell>
                      <TableCell>{incident.country}</TableCell>
                      <TableCell>
                        <span className={`badge inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          incident.severity === 'high' 
                            ? 'bg-red-500/20 text-red-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {incident.severity === 'high' ? 'Élevée' : 'Moyenne'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Protection du contenu</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Filigrane invisible</p>
                    <p className="text-sm text-muted-foreground">Ajoute un filigrane invisible à toutes les vidéos</p>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Détection de capture d'écran</p>
                    <p className="text-sm text-muted-foreground">Détecte et bloque les captures d'écran</p>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Filigrane visible sur violation</p>
                    <p className="text-sm text-muted-foreground">Affiche un filigrane visible en cas de tentative de capture</p>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertes en temps réel</p>
                    <p className="text-sm text-muted-foreground">Recevoir des alertes pour les incidents de sécurité</p>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-6 flex items-center bg-brand-gradient rounded-full p-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rapport hebdomadaire</p>
                    <p className="text-sm text-muted-foreground">Recevoir un rapport hebdomadaire par email</p>
                  </div>
                  <div className="w-16">
                    <div className="w-12 h-6 flex items-center bg-muted rounded-full p-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default XTeaseSecurity;
