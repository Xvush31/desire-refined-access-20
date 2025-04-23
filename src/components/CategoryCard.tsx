
import React from "react";

interface CategoryCardProps {
  name: string;
  image: string;
  videoCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  image,
  videoCount,
}) => {
  return (
    <div className="category-card group rounded-lg sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
      <div className="relative aspect-[4/3] sm:aspect-golden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end p-2 sm:p-golden-sm">
          <h3 className="text-sm sm:text-lg font-medium text-white text-center mb-1">{name}</h3>
          <p className="text-xs sm:text-sm text-white/80 mb-1">{videoCount} vidéos</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
