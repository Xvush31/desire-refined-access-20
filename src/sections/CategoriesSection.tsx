
import React from "react";
import ContentSection from "@/components/ContentSection";
import CategoryCard from "@/components/CategoryCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

const popularCategories = [
  { id: 1, name: "Amateur", image: "https://picsum.photos/seed/cat1/320/180", videoCount: 12453 },
  { id: 2, name: "MILF", image: "https://picsum.photos/seed/cat2/320/180", videoCount: 8732 },
  { id: 3, name: "Teen", image: "https://picsum.photos/seed/cat3/320/180", videoCount: 10584 },
  { id: 4, name: "Lesbian", image: "https://picsum.photos/seed/cat4/320/180", videoCount: 7219 },
  { id: 5, name: "Asian", image: "https://picsum.photos/seed/cat5/320/180", videoCount: 5843 },
  { id: 6, name: "Ebony", image: "https://picsum.photos/seed/cat6/320/180", videoCount: 4321 }
];

const CategoriesSection: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <ContentSection
      title="Catégories Populaires"
      viewAllLink="/categories"
      className="bg-secondary/30"
    >
      <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid'} mb-golden-md`}>
        <div>
          <AspectRatio ratio={1.618} className="rounded-2xl overflow-hidden">
            <img 
              src={popularCategories[0].image} 
              alt={popularCategories[0].name} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end p-6">
              <h3 className="text-white text-xl font-medium">{popularCategories[0].name}</h3>
              <p className="text-white/80 text-sm">{popularCategories[0].videoCount} vidéos</p>
            </div>
          </AspectRatio>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-golden-sm">
          {popularCategories.slice(1, 5).map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              videoCount={category.videoCount}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-golden-sm">
        {popularCategories.slice(5).map((category) => (
          <div key={category.id} className="w-full aspect-[4/3]">
            <CategoryCard
              name={category.name}
              image={category.image}
              videoCount={category.videoCount}
            />
          </div>
        ))}
      </div>
    </ContentSection>
  );
};

export default CategoriesSection;
