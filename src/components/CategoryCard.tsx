
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
    <div className="category-card group">
      <div className="relative aspect-video">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h3 className="text-white text-lg font-bold">{name}</h3>
          <p className="text-white/80 text-sm">{videoCount} vidéos</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
