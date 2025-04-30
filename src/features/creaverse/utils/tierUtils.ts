
export const getTierColor = (tier: string): string => {
  switch(tier) {
    case "bronze": return "from-amber-700 to-amber-500";
    case "silver": return "from-gray-400 to-gray-300";
    case "gold": return "from-yellow-500 to-amber-300";
    case "platinum": return "from-slate-300 to-gray-100";
    case "diamond": return "from-blue-300 to-cyan-100";
    default: return "from-amber-700 to-amber-500";
  }
};

export const getNextTier = (currentTier: string): string => {
  switch(currentTier) {
    case "bronze": return "silver";
    case "silver": return "gold";
    case "gold": return "platinum";
    case "platinum": return "diamond";
    default: return "diamond";
  }
};
