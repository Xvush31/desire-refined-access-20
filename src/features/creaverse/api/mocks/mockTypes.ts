
import { PerformerData } from "../../types/performer";
import { ContentItem } from "../../components/content/ContentCard";

export interface CollectionData {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  itemTypes: {
    videos?: number;
    images?: number;
    audio?: number;
    text?: number;
  };
}

export type MockCollectionsMap = Record<string, CollectionData[]>;
export type MockPerformersMap = Record<string, PerformerData>;
