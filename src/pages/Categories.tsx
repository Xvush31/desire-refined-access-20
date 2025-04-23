
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import CategoryCard from "@/components/CategoryCard";
import { useLocale } from "@/contexts/LocaleContext";

const categories = [
  { id: 1, name: "Amateur", image: "https://picsum.photos/seed/cat1/320/180", videoCount: 12453 },
  { id: 2, name: "MILF", image: "https://picsum.photos/seed/cat2/320/180", videoCount: 8732 },
  { id: 3, name: "Teen", image: "https://picsum.photos/seed/cat3/320/180", videoCount: 10584 },
  { id: 4, name: "Lesbian", image: "https://picsum.photos/seed/cat4/320/180", videoCount: 7219 },
  { id: 5, name: "Asian", image: "https://picsum.photos/seed/cat5/320/180", videoCount: 5843 },
  { id: 6, name: "Ebony", image: "https://picsum.photos/seed/cat6/320/180", videoCount: 4321 },
  { id: 7, name: "Blonde", image: "https://picsum.photos/seed/cat7/320/180", videoCount: 6728 },
  { id: 8, name: "Brunette", image: "https://picsum.photos/seed/cat8/320/180", videoCount: 5987 },
  { id: 9, name: "Redhead", image: "https://picsum.photos/seed/cat9/320/180", videoCount: 3542 },
  { id: 10, name: "Couples", image: "https://picsum.photos/seed/cat10/320/180", videoCount: 7865 },
  { id: 11, name: "POV", image: "https://picsum.photos/seed/cat11/320/180", videoCount: 9432 },
  { id: 12, name: "Threesome", image: "https://picsum.photos/seed/cat12/320/180", videoCount: 4231 }
];

const Categories: React.FC = () => {
  const { t } = useLocale();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Toutes les catégories">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link to={`/categories/${category.name.toLowerCase()}`} key={category.id} className="block hover:no-underline">
                <CategoryCard
                  name={category.name}
                  image={category.image}
                  videoCount={category.videoCount}
                />
              </Link>
            ))}
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default Categories;
