
import React, { useState, useRef, useEffect } from "react";
import { ContentItem } from "./ContentCard";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, Users, Video, Image as ImageIcon, Play, Clock, Lock } from "lucide-react";
import FlowCardLayout from "./FlowCardLayout";

interface ContentFlowProps {
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}

const ContentFlow: React.FC<ContentFlowProps> = ({ items, onItemClick }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Effect to monitor scroll position and determine active item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveItem(index);
            }
          }
        });
      },
      { threshold: 0.7 } // 70% of item needs to be visible
    );
    
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);
  
  if (!items.length) return null;
  
  return (
    <div className="space-y-8 py-4">
      <h3 className="text-xl font-semibold mb-6">Flux de contenu</h3>
      
      {items.map((item, index) => (
        <motion.div 
          key={item.id}
          ref={(el) => itemRefs.current[index] = el}
          initial={{ opacity: 0.7, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
          className={`relative w-full ${index === activeItem ? 'scale-100' : 'scale-95'} transition-transform duration-500`}
        >
          <FlowCardLayout 
            item={item}
            isActive={index === activeItem}
            onClick={() => onItemClick(item)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ContentFlow;
