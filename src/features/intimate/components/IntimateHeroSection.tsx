
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, Shield, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface IntimateHeroSectionProps {
  onToggleImmersive: () => void;
}

const IntimateHeroSection: React.FC<IntimateHeroSectionProps> = ({ onToggleImmersive }) => {
  const { currentUser } = useAuth();

  return (
    <section className="relative py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500">
          Révolutionner le Contenu Premium
        </h1>
        
        <p className="text-lg md:text-xl text-purple-100 max-w-2xl mb-8">
          Une plateforme où les créateurs de contenu prospèrent en toute sécurité, avec un contrôle total sur leur contenu et leurs revenus.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button 
            onClick={onToggleImmersive}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-6 rounded-lg font-bold"
            size="lg"
          >
            Découvrir en Mode Immersif
          </Button>
          
          {!currentUser && (
            <Button 
              variant="outline" 
              className="border-purple-500 text-purple-400 hover:bg-purple-900/30 px-8 py-6 rounded-lg font-bold"
              size="lg"
            >
              Créer un Compte
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl"
          >
            <div className="mb-4 bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
              <Shield className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Triple Shield™</h3>
            <p className="text-purple-200 text-sm">Protection de contenu de niveau militaire avec filigranes dynamiques et détection automatique.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl"
          >
            <div className="mb-4 bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
              <Heart className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Commission 15%</h3>
            <p className="text-purple-200 text-sm">Des commissions plus basses et un modèle économique favorable aux créateurs.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl"
          >
            <div className="mb-4 bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
              <Lock className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">GENUINE™</h3>
            <p className="text-purple-200 text-sm">Certification d'authenticité pour garantir des interactions véritables entre créateurs et fans.</p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>
      
      {/* Animated shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-purple-700 to-pink-700 opacity-20 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-pink-700 to-purple-700 opacity-20 blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </section>
  );
};

export default IntimateHeroSection;
