
import { SecurityIncident } from "./XTeaseSecurityTable";

// Données fictives pour les incidents de sécurité
export const securityIncidents: SecurityIncident[] = [
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
