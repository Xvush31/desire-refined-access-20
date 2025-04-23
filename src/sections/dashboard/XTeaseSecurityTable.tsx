
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export interface SecurityIncident {
  id: number;
  type: string;
  videoId: string;
  timestamp: string;
  ip: string;
  country: string;
  severity: "medium" | "high";
}

interface XTeaseSecurityTableProps {
  incidents: SecurityIncident[];
}

// Fonction utilitaire pour formater les dates en toute sécurité
const formatTimestamp = (timestamp: string): string => {
  if (!timestamp) return "Date inconnue";
  
  try {
    const date = new Date(timestamp);
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return "Date invalide";
    }
    return date.toLocaleString();
  } catch (error) {
    console.error("Erreur lors du formatage de la date:", error);
    return "Date invalide";
  }
};

const XTeaseSecurityTable: React.FC<XTeaseSecurityTableProps> = ({ incidents }) => (
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
        {incidents.map((incident) => (
          <TableRow key={incident.id}>
            <TableCell>{incident.type}</TableCell>
            <TableCell className="font-mono text-xs">{incident.videoId}</TableCell>
            <TableCell>{formatTimestamp(incident.timestamp)}</TableCell>
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
);

export default XTeaseSecurityTable;
