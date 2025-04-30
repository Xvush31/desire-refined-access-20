
import { mockCollections } from "../mocks/mockCollections";

// Function to get performer collections
export const fetchPerformerCollections = (performerId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCollections[performerId as keyof typeof mockCollections] || []);
    }, 800);
  });
};
