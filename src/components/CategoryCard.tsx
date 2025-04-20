
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
    <div className="category-card group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-video">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-4">
          <h3 className="text-white text-lg font-medium">{name}</h3>
          <p className="text-white/80 text-sm">{videoCount} vidéos</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
