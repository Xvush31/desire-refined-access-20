
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="mb-6 text-muted-foreground"
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold mb-2">Créateur non trouvé</h2>
      <p className="text-muted-foreground mb-6">
        Nous n'avons pas pu trouver le profil que vous recherchez.
      </p>
      <Button onClick={() => navigate('/')}>
        Retourner à l'accueil
      </Button>
    </motion.div>
  );
};

export default NotFoundState;
