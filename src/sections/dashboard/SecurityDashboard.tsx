
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, ShieldAlert, Lock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { regulatoryFirewall } from "../../services/regulatoryFirewall";

// Données simulées pour les incidents de sécurité
const securityIncidents = [
  { id: 1, type: "Capture d'écran", date: "22/04/2025", status: "Bloqué", ip: "198.51.100.x", region: "France" },
  { id: 2, type: "Tentative de copie", date: "21/04/2025", status: "Bloqué", ip: "203.0.113.x", region: "Canada" },
  { id: 3, type: "Téléchargement non autorisé", date: "20/04/2025", status: "Alerte envoyée", ip: "192.0.2.x", region: "Belgique" },
  { id: 4, type: "Partage suspect", date: "19/04/2025", status: "Sous surveillance", ip: "198.51.100.x", region: "Suisse" },
];

// Statistiques de sécurité simulées
const securityStats = {
  totalIncidents: 27,
  blockedAttempts: 23,
  contentProtected: 156,
  alertsSent: 16
};

const SecurityDashboard: React.FC = () => {
  const [activeAlert, setActiveAlert] = useState<boolean>(false);
  const currentRegulations = regulatoryFirewall.getRegulations();

  // Simuler une alerte de sécurité en temps réel
  const simulateSecurityAlert = () => {
    setActiveAlert(true);
    toast.error("Alerte de sécurité", {
      description: "Nouvelle tentative de copie de contenu détectée",
      duration: 5000,
    });
    
    // Réinitialiser l'alerte après 5 secondes
    setTimeout(() => {
      setActiveAlert(false);
    }, 5000);
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold tracking-tight mb-4">Protection et Sécurité</h2>
      
      {activeAlert && (
        <Alert className="mb-4 border-red-500 bg-red-500/10 animate-pulse">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <AlertTitle className="text-red-500">Alerte de sécurité</AlertTitle>
          <AlertDescription>
            Tentative de copie de contenu détectée il y a quelques secondes. Votre contenu reste protégé.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Carte des statistiques de sécurité */}
        <Card className="bg-card border-border hover-card micro-pop">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-brand-red" />
              Statistiques de Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/20 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Incidents détectés</h3>
                  <span className="text-lg font-bold">{securityStats.totalIncidents}</span>
                </div>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Tentatives bloquées</h3>
                  <span className="text-lg font-bold">{securityStats.blockedAttempts}</span>
                </div>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Contenus protégés</h3>
                  <span className="text-lg font-bold">{securityStats.contentProtected}</span>
                </div>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Alertes envoyées</h3>
                  <span className="text-lg font-bold">{securityStats.alertsSent}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <button 
                onClick={simulateSecurityAlert}
                className="bg-brand-red text-white px-4 py-2 rounded-md text-sm micro-animation-pop"
              >
                Simuler une alerte
              </button>
            </div>
          </CardContent>
        </Card>
        
        {/* Carte de conformité réglementaire */}
        <Card className="bg-card border-border hover-card micro-pop">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldAlert className="h-5 w-5 text-brand-red" />
              Conformité Réglementaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-500/10">
                <AlertTitle className="text-green-500">Région détectée: {regulatoryFirewall.currentRegion}</AlertTitle>
                <AlertDescription>
                  Votre tableau de bord est conforme aux réglementations locales.
                </AlertDescription>
              </Alert>
              
              <div className="bg-muted/20 p-3 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Réglementations appliquées:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                    Âge minimum requis: {currentRegulations.minAge} ans
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                    Conservation des données: {currentRegulations.dataRetentionDays} jours
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                    {currentRegulations.requiresContentLabeling ? "Labellisation du contenu activée" : "Labellisation du contenu désactivée"}
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                    {currentRegulations.cookieNoticeRequired ? "Notification de cookies requise" : "Notification de cookies non requise"}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tableau des incidents récents */}
      <Card className="bg-card border-border hover-card micro-pop">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lock className="h-5 w-5 text-brand-red" />
            Incidents Récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>IP (masquée)</TableHead>
                <TableHead>Région</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      incident.status === "Bloqué" ? "bg-green-500/20 text-green-500" :
                      incident.status === "Alerte envoyée" ? "bg-yellow-500/20 text-yellow-500" :
                      "bg-blue-500/20 text-blue-500"
                    }`}>
                      {incident.status}
                    </span>
                  </TableCell>
                  <TableCell>{incident.ip}</TableCell>
                  <TableCell>{incident.region}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default SecurityDashboard;
