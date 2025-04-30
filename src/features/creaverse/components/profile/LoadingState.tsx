
import React from "react";
import { motion } from "framer-motion";

const pulseAnimation = {
  initial: { opacity: 0.6 },
  animate: { 
    opacity: 1,
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse" as const,
      duration: 1.2 
    }
  }
};

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div 
        className="flex flex-col items-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div variants={pulseAnimation} initial="initial" animate="animate"
          className="h-24 w-24 bg-muted rounded-full"
        />
        
        <div className="space-y-3 w-64">
          <motion.div variants={pulseAnimation} initial="initial" animate="animate"
            className="h-7 bg-muted rounded-md w-full"
          />
          
          <motion.div variants={pulseAnimation} initial="initial" animate="animate"
            className="h-4 bg-muted rounded-md w-3/4 mx-auto"
          />
          
          <div className="flex justify-center space-x-4 pt-2">
            <motion.div variants={pulseAnimation} initial="initial" animate="animate"
              className="h-4 w-16 bg-muted rounded-md"
            />
            <motion.div variants={pulseAnimation} initial="initial" animate="animate"
              className="h-4 w-16 bg-muted rounded-md"
            />
            <motion.div variants={pulseAnimation} initial="initial" animate="animate"
              className="h-4 w-16 bg-muted rounded-md"
            />
          </div>
        </div>
        
        <div className="w-full max-w-md space-y-3 mt-6">
          <motion.div variants={pulseAnimation} initial="initial" animate="animate"
            className="h-10 bg-muted rounded-md w-full"
          />
          <motion.div variants={pulseAnimation} initial="initial" animate="animate"
            className="h-32 bg-muted rounded-md w-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingState;
