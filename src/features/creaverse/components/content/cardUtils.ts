
export const getTypeColor = (type: 'standard' | 'premium' | 'vip') => {
  switch (type) {
    case 'premium':
      return 'bg-gradient-to-r from-amber-500 to-amber-300';
    case 'vip':
      return 'bg-gradient-to-r from-purple-600 to-indigo-400';
    default:
      return 'bg-gray-700';
  }
};

export const getValueColor = (value: number) => {
  if (value >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-400';
  if (value >= 70) return 'bg-gradient-to-r from-blue-500 to-cyan-400';
  if (value >= 50) return 'bg-gradient-to-r from-amber-500 to-yellow-400';
  if (value >= 30) return 'bg-gradient-to-r from-orange-500 to-amber-400';
  return 'bg-gradient-to-r from-red-500 to-rose-400';
};

export const getFormatIcon = (format: string) => {
  switch (format) {
    case 'video':
      return 'video';
    case 'image':
      return 'image';
    case 'audio':
      return 'headphones';
    case 'text':
      return 'file-text';
    default:
      return 'file';
  }
};

// Ajout de la fonction manquante getLayoutClasses
export const getLayoutClasses = (layout: 'grid' | 'masonry' | 'featured') => {
  switch (layout) {
    case 'grid':
      return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
    case 'masonry':
      return 'grid grid-cols-2 md:grid-cols-3 auto-rows-max gap-4';
    case 'featured':
      return 'space-y-8';
    default:
      return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
  }
};

export const formatDuration = (seconds: number | string): string => {
  if (typeof seconds === 'string') return seconds;
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
