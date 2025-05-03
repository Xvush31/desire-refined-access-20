
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Collection {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  itemTypes?: {
    videos?: number;
    images?: number;
    audio?: number;
    text?: number;
  };
}

interface ContentCollectionsProps {
  collections: Collection[];
  onCollectionClick: (collection: Collection) => void;
}

const ContentCollections: React.FC<ContentCollectionsProps> = ({
  collections,
  onCollectionClick
}) => {
  const { theme } = useTheme();
  
  if (!collections || !collections.length) return null;
  
  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold mb-4">Collections thématiques</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
            onClick={() => onCollectionClick(collection)}
          >
            <div className={`rounded-lg overflow-hidden border shadow-sm ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'}`}>
              {/* Collection thumbnail */}
              <div className="relative aspect-video">
                <img 
                  src={collection.thumbnail || '/placeholder.svg'}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                  <div>
                    <h4 className="text-white text-lg font-semibold">{collection.name}</h4>
                    <p className="text-white/80 text-sm mt-1 line-clamp-2">{collection.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Collection info */}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {collection.itemCount} éléments
                  </div>
                  <div className="flex items-center">
                    {collection.itemTypes && collection.itemTypes.videos !== undefined && (
                      <span className="mr-2 text-sm">{collection.itemTypes.videos} vidéos</span>
                    )}
                    {collection.itemTypes && collection.itemTypes.images !== undefined && (
                      <span className="mr-2 text-sm">{collection.itemTypes.images} photos</span>
                    )}
                    {collection.itemTypes && collection.itemTypes.audio !== undefined && (
                      <span className="mr-2 text-sm">{collection.itemTypes.audio} audios</span>
                    )}
                    {collection.itemTypes && collection.itemTypes.text !== undefined && (
                      <span className="mr-2 text-sm">{collection.itemTypes.text} textes</span>
                    )}
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full mt-2 justify-between">
                  Voir la collection 
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentCollections;
