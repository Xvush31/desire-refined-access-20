
import React, { useState } from "react";
import { motion } from "framer-motion";
import IntimateCreatorCard from "./IntimateCreatorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock creator data
const mockCreators = [
  {
    id: 1,
    name: "Éléanore Mystique",
    username: "@eleanore_m",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop",
    tags: ["Photographie", "Art"],
    authentic: true,
    premium: true,
    subscriberCount: 15400,
    contentCount: 324,
    description: "Artiste visuelle explorant l'intimité à travers la photographie artistique et les performances visuelles.",
  },
  {
    id: 2,
    name: "Sophia Luna",
    username: "@sophia_dreams",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop",
    tags: ["Danse", "Mode"],
    authentic: true,
    premium: true,
    subscriberCount: 28700,
    contentCount: 513,
    description: "Danseuse professionnelle partageant mon art et ma passion à travers des performances exclusives.",
  },
  {
    id: 3,
    name: "Alexandre Noir",
    username: "@alex_noir",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop",
    tags: ["Photographie", "Mode"],
    authentic: false,
    premium: true,
    subscriberCount: 9300,
    contentCount: 187,
    description: "Photographe de mode explorant l'esthétique du corps à travers une perspective artistique unique.",
  },
  {
    id: 4,
    name: "Camille Étoile",
    username: "@cam_star",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=256&h=256&fit=crop",
    tags: ["Lifestyle", "Yoga"],
    authentic: true,
    premium: false,
    subscriberCount: 12500,
    contentCount: 246,
    description: "Coach de bien-être et yogini partageant des contenus intimes sur la confiance en soi et l'acceptation corporelle.",
  },
  {
    id: 5,
    name: "Lucas Dumas",
    username: "@lucas_d",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop",
    tags: ["Fitness", "Style de vie"],
    authentic: true,
    premium: true,
    subscriberCount: 32200,
    contentCount: 418,
    description: "Coach fitness et modèle partageant des contenus exclusifs pour inspirer et motiver.",
  },
  {
    id: 6,
    name: "Emma Rose",
    username: "@emma_rose",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop",
    tags: ["Créatrice", "Art"],
    authentic: true,
    premium: true,
    subscriberCount: 41600,
    contentCount: 573,
    description: "Artiste et créatrice explorant la sensualité à travers l'art visuel et les performances.",
  },
];

const IntimateCreatorGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCreators, setFilteredCreators] = useState(mockCreators);
  const [showAuthenticOnly, setShowAuthenticOnly] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterCreators(e.target.value, showAuthenticOnly);
  };

  const toggleAuthenticFilter = () => {
    const newValue = !showAuthenticOnly;
    setShowAuthenticOnly(newValue);
    filterCreators(searchTerm, newValue);
  };

  const filterCreators = (search: string, authenticOnly: boolean) => {
    let filtered = mockCreators;
    
    if (search) {
      filtered = filtered.filter(creator => 
        creator.name.toLowerCase().includes(search.toLowerCase()) || 
        creator.username.toLowerCase().includes(search.toLowerCase()) ||
        creator.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (authenticOnly) {
      filtered = filtered.filter(creator => creator.authentic);
    }
    
    setFilteredCreators(filtered);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
          <Input
            type="text"
            placeholder="Rechercher par nom, tag ou @username"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 bg-purple-900/30 border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-500"
          />
        </div>
        <Button
          variant={showAuthenticOnly ? "default" : "outline"}
          className={`${showAuthenticOnly ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-500/50 text-purple-300 hover:bg-purple-900/30'}`}
          onClick={toggleAuthenticFilter}
        >
          <Filter className="w-4 h-4 mr-2" />
          Certifiés GENUINE™
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <IntimateCreatorCard key={creator.id} creator={creator} />
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-300 text-lg">Aucun créateur trouvé avec ces critères.</p>
        </div>
      )}
    </motion.div>
  );
};

export default IntimateCreatorGrid;
