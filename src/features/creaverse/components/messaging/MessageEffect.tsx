
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Star } from "lucide-react";

interface MessageEffectProps {
  type: "tip" | "priority";
  amount?: number;
}

const MessageEffect: React.FC<MessageEffectProps> = ({ type, amount }) => {
  return (
    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={`rounded-full flex items-center justify-center p-1.5 ${type === "tip" ? "bg-yellow-500" : "bg-purple-500"} text-white shadow-lg`}
        >
          {type === "tip" ? (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-xs font-bold">{amount}</span>
            </div>
          ) : (
            <Star className="h-4 w-4" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MessageEffect;
