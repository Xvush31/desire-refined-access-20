
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useRevolutionaryNavigation } from '@/hooks/use-revolutionary-navigation';

interface PerformerGridProps {
  type: 'photos' | 'videos';
  performerId: number;
}

// Mock data pour les posts (photos et vidéos)
const generateMockPosts = (type: 'photos' | 'videos', count: number = 9) => {
  return Array.from({ length: count }, (_, i) => {
    const isPremium = i % 3 === 0;
    const id = `${type}-${i + 1}`;
    return {
      id,
      type,
      image: `https://picsum.photos/seed/${id}/400/400`,
      likes: Math.floor(Math.random() * 10000) + 1000,
      comments: Math.floor(Math.random() * 100) + 10,
      isPremium,
      duration: type === 'videos' ? `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null
    };
  });
};

const PerformerGrid: React.FC<PerformerGridProps> = ({ type, performerId }) => {
  const { theme } = useTheme();
  const { setIsImmersiveMode } = useRevolutionaryNavigation();
  const posts = generateMockPosts(type, 12);
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  
  // Activer automatiquement le mode immersif lorsque ce composant est monté
  React.useEffect(() => {
    setIsImmersiveMode(true);
    return () => {
      // Désactiver le mode immersif lors du démontage
      setIsImmersiveMode(false);
    };
  }, [setIsImmersiveMode]);
  
  return (
    <div className={`${bgClass}`}>
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            to={`/performer/${performerId}/${type}/${post.id}`}
            className="relative aspect-square overflow-hidden"
          >
            <img 
              src={post.image} 
              alt={`Post ${post.id}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay pour les options premium */}
            {post.isPremium && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Badge className="animated-gradient-bg text-white">Premium</Badge>
              </div>
            )}
            
            {/* Indicateur de vidéo */}
            {type === 'videos' && !post.isPremium && (
              <div className="absolute top-2 right-2">
                <Play size={18} fill="white" className="drop-shadow-lg" />
              </div>
            )}
            
            {/* Durée de la vidéo */}
            {type === 'videos' && post.duration && !post.isPremium && (
              <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
                {post.duration}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PerformerGrid;
