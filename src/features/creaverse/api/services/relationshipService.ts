
import { mockPerformers } from "../mocks/mockPerformers";

// Relationship levels constants
export enum RelationshipLevel {
  None = 0,
  Basic = 1,
  Regular = 2,
  Supportive = 3,
  Devoted = 4,
  SuperFan = 5
}

// Relationship level info
export interface RelationshipLevelInfo {
  level: RelationshipLevel;
  name: string;
  description: string;
  minimumSupport: number; // Minimum support value to reach this level
  color: string;
  benefits: string[];
  icon: string;
}

// Support history entry
export interface SupportHistoryEntry {
  id: string;
  timestamp: Date;
  type: 'subscription' | 'tip' | 'purchase' | 'gift';
  amount: number;
  description: string;
}

// User relationship with performer
export interface UserPerformerRelationship {
  performerId: number;
  userId: string;
  level: RelationshipLevel;
  supportPoints: number;
  supportHistory: SupportHistoryEntry[];
  firstInteractionDate: Date;
  lastInteractionDate: Date;
  isFollowing: boolean;
  isFavorite: boolean;
  loyaltyPoints: number;
  priorityAccess: boolean;
  customInteractionsUnlocked: string[];
}

// Mock relationship levels data
export const relationshipLevels: Record<RelationshipLevel, RelationshipLevelInfo> = {
  [RelationshipLevel.None]: {
    level: RelationshipLevel.None,
    name: "Visiteur",
    description: "Aucune relation établie",
    minimumSupport: 0,
    color: "gray-400",
    benefits: [],
    icon: "user"
  },
  [RelationshipLevel.Basic]: {
    level: RelationshipLevel.Basic,
    name: "Fan",
    description: "Vous commencez à soutenir ce créateur",
    minimumSupport: 1,
    color: "blue-400",
    benefits: [
      "Accès aux messages privés",
      "Contenu exclusif de base"
    ],
    icon: "heart"
  },
  [RelationshipLevel.Regular]: {
    level: RelationshipLevel.Regular,
    name: "Fan régulier",
    description: "Votre soutien est apprécié",
    minimumSupport: 50,
    color: "green-400",
    benefits: [
      "Réponses prioritaires (48h)",
      "Avantages exclusifs mensuels",
      "Badge spécial dans les commentaires"
    ],
    icon: "star-half"
  },
  [RelationshipLevel.Supportive]: {
    level: RelationshipLevel.Supportive,
    name: "Support fidèle",
    description: "Vous êtes un soutien important",
    minimumSupport: 150,
    color: "purple-400",
    benefits: [
      "Réponses prioritaires (24h)",
      "Contenu personnalisé mensuel",
      "Accès anticipé aux nouveautés"
    ],
    icon: "star"
  },
  [RelationshipLevel.Devoted]: {
    level: RelationshipLevel.Devoted,
    name: "Fan dévoué",
    description: "Votre dévouement est remarquable",
    minimumSupport: 300,
    color: "amber-400",
    benefits: [
      "Réponses prioritaires (12h)",
      "Appels vidéo bimensuels",
      "Cadeaux exclusifs",
      "Mention spéciale dans les vidéos"
    ],
    icon: "award"
  },
  [RelationshipLevel.SuperFan]: {
    level: RelationshipLevel.SuperFan,
    name: "Super-fan",
    description: "Vous faites partie des plus grands soutiens",
    minimumSupport: 500,
    color: "pink-500",
    benefits: [
      "Réponses immédiates",
      "Contenus sur mesure",
      "Accès VIP aux événements",
      "Cadeaux premium",
      "Appels privés mensuels"
    ],
    icon: "trophy"
  }
};

// Mock user-performer relationships
const mockUserRelationships: Record<string, UserPerformerRelationship[]> = {
  "user1": [
    {
      performerId: 1,
      userId: "user1",
      level: RelationshipLevel.SuperFan,
      supportPoints: 560,
      supportHistory: [
        {
          id: "sh1",
          timestamp: new Date("2024-03-15"),
          type: "subscription",
          amount: 49.99,
          description: "Abonnement VIP mensuel"
        },
        {
          id: "sh2",
          timestamp: new Date("2024-03-20"),
          type: "tip",
          amount: 100,
          description: "Pourboire pour live spécial"
        }
      ],
      firstInteractionDate: new Date("2023-10-15"),
      lastInteractionDate: new Date("2024-04-25"),
      isFollowing: true,
      isFavorite: true,
      loyaltyPoints: 1250,
      priorityAccess: true,
      customInteractionsUnlocked: ["private-call", "personal-request", "vip-meetup"]
    },
    {
      performerId: 2,
      userId: "user1",
      level: RelationshipLevel.Regular,
      supportPoints: 85,
      supportHistory: [
        {
          id: "sh3",
          timestamp: new Date("2024-02-10"),
          type: "subscription",
          amount: 19.99,
          description: "Abonnement Standard mensuel"
        }
      ],
      firstInteractionDate: new Date("2024-02-10"),
      lastInteractionDate: new Date("2024-04-10"),
      isFollowing: true,
      isFavorite: false,
      loyaltyPoints: 200,
      priorityAccess: false,
      customInteractionsUnlocked: ["monthly-exclusive"]
    }
  ],
  "creator5": []
};

// Function to get relationship level from support points
export const getRelationshipLevelFromPoints = (points: number): RelationshipLevel => {
  if (points >= relationshipLevels[RelationshipLevel.SuperFan].minimumSupport) {
    return RelationshipLevel.SuperFan;
  } else if (points >= relationshipLevels[RelationshipLevel.Devoted].minimumSupport) {
    return RelationshipLevel.Devoted;
  } else if (points >= relationshipLevels[RelationshipLevel.Supportive].minimumSupport) {
    return RelationshipLevel.Supportive;
  } else if (points >= relationshipLevels[RelationshipLevel.Regular].minimumSupport) {
    return RelationshipLevel.Regular;
  } else if (points >= relationshipLevels[RelationshipLevel.Basic].minimumSupport) {
    return RelationshipLevel.Basic;
  } else {
    return RelationshipLevel.None;
  }
};

// Get user relationship with a performer
export const getUserPerformerRelationship = (
  userId: string,
  performerId: number
): Promise<UserPerformerRelationship> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userRelationships = mockUserRelationships[userId] || [];
      const relationship = userRelationships.find(r => r.performerId === performerId);
      
      if (relationship) {
        resolve(relationship);
      } else {
        // Return default relationship if none exists
        resolve({
          performerId: performerId,
          userId: userId,
          level: RelationshipLevel.None,
          supportPoints: 0,
          supportHistory: [],
          firstInteractionDate: new Date(),
          lastInteractionDate: new Date(),
          isFollowing: false,
          isFavorite: false,
          loyaltyPoints: 0,
          priorityAccess: false,
          customInteractionsUnlocked: []
        });
      }
    }, 300);
  });
};

// Get all relationships for a user
export const getUserRelationships = (userId: string): Promise<UserPerformerRelationship[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserRelationships[userId] || []);
    }, 500);
  });
};

// Add relationship points for interactions
export const addRelationshipPoints = (
  userId: string,
  performerId: number,
  points: number,
  interactionType: 'subscription' | 'tip' | 'purchase' | 'gift',
  description: string
): Promise<UserPerformerRelationship> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userRelationships = mockUserRelationships[userId] || [];
      let relationship = userRelationships.find(r => r.performerId === performerId);
      
      if (!relationship) {
        // Create new relationship if none exists
        relationship = {
          performerId: performerId,
          userId: userId,
          level: RelationshipLevel.None,
          supportPoints: 0,
          supportHistory: [],
          firstInteractionDate: new Date(),
          lastInteractionDate: new Date(),
          isFollowing: false,
          isFavorite: false,
          loyaltyPoints: 0,
          priorityAccess: false,
          customInteractionsUnlocked: []
        };
        
        if (!mockUserRelationships[userId]) {
          mockUserRelationships[userId] = [];
        }
        
        mockUserRelationships[userId].push(relationship);
      }
      
      // Update relationship
      relationship.supportPoints += points;
      relationship.lastInteractionDate = new Date();
      relationship.loyaltyPoints += Math.floor(points * 2.5);
      
      // Add to history
      relationship.supportHistory.push({
        id: `sh${Date.now()}`,
        timestamp: new Date(),
        type: interactionType,
        amount: points,
        description
      });
      
      // Update relationship level based on points
      relationship.level = getRelationshipLevelFromPoints(relationship.supportPoints);
      
      // Update priority access and custom interactions based on level
      if (relationship.level >= RelationshipLevel.Supportive) {
        relationship.priorityAccess = true;
      }
      
      // Update custom interactions based on level
      relationship.customInteractionsUnlocked = [];
      
      if (relationship.level >= RelationshipLevel.Basic) {
        relationship.customInteractionsUnlocked.push("basic-messaging");
      }
      if (relationship.level >= RelationshipLevel.Regular) {
        relationship.customInteractionsUnlocked.push("monthly-exclusive");
      }
      if (relationship.level >= RelationshipLevel.Supportive) {
        relationship.customInteractionsUnlocked.push("custom-content", "early-access");
      }
      if (relationship.level >= RelationshipLevel.Devoted) {
        relationship.customInteractionsUnlocked.push("video-calls", "exclusive-gifts");
      }
      if (relationship.level >= RelationshipLevel.SuperFan) {
        relationship.customInteractionsUnlocked.push("private-call", "personal-request", "vip-meetup");
      }
      
      resolve(relationship);
    }, 300);
  });
};

// Toggle following status
export const toggleFollowingStatus = (
  userId: string,
  performerId: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userRelationships = mockUserRelationships[userId] || [];
      let relationship = userRelationships.find(r => r.performerId === performerId);
      
      if (!relationship) {
        // Create new relationship with following=true
        relationship = {
          performerId: performerId,
          userId: userId,
          level: RelationshipLevel.None,
          supportPoints: 0,
          supportHistory: [],
          firstInteractionDate: new Date(),
          lastInteractionDate: new Date(),
          isFollowing: true,
          isFavorite: false,
          loyaltyPoints: 0,
          priorityAccess: false,
          customInteractionsUnlocked: []
        };
        
        if (!mockUserRelationships[userId]) {
          mockUserRelationships[userId] = [];
        }
        
        mockUserRelationships[userId].push(relationship);
        resolve(true);
      } else {
        // Toggle existing relationship
        relationship.isFollowing = !relationship.isFollowing;
        relationship.lastInteractionDate = new Date();
        resolve(relationship.isFollowing);
      }
    }, 300);
  });
};
