
import { ContentItem } from "./ContentCard";

// Type color helper
export const getTypeColor = (type: ContentItem['type']) => {
  switch (type) {
    case "premium": return "bg-gradient-to-r from-amber-500 to-yellow-500";
    case "vip": return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "standard":
    default: return "bg-gradient-to-r from-blue-500 to-cyan-500";
  }
};

// Value indicator color based on score
export const getValueColor = (valueScore?: number) => {
  if (!valueScore) return "bg-gray-400";
  if (valueScore >= 80) return "bg-emerald-500";
  if (valueScore >= 60) return "bg-green-500";
  if (valueScore >= 40) return "bg-yellow-500";
  if (valueScore >= 20) return "bg-orange-500";
  return "bg-red-500";
};

// Layout classes helper
export const getLayoutClasses = (layout: "grid" | "masonry" | "featured" | "flow") => {
  switch (layout) {
    case "masonry": return "h-auto";
    case "featured": return "h-72 md:h-96";
    case "flow": return "w-full flex flex-col md:flex-row";
    case "grid":
    default: return "h-48 md:h-60";
  }
};
