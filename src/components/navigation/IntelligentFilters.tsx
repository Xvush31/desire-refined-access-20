
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterCategory {
  id: string;
  name: string;
  options: FilterOption[];
}

interface IntelligentFiltersProps {
  categories: FilterCategory[];
  onFilterChange: (selectedFilters: Record<string, string[]>) => void;
  className?: string;
}

const IntelligentFilters: React.FC<IntelligentFiltersProps> = ({
  categories,
  onFilterChange,
  className = ""
}) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDark = theme === "dark";
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Initialize empty arrays for each category
  useEffect(() => {
    const initialState: Record<string, string[]> = {};
    categories.forEach(category => {
      initialState[category.id] = [];
    });
    setSelectedFilters(initialState);
  }, [categories]);

  const toggleFilter = (categoryId: string, filterId: string) => {
    setSelectedFilters(prev => {
      const updatedFilters = {...prev};
      
      if (updatedFilters[categoryId].includes(filterId)) {
        // Remove filter if already selected
        updatedFilters[categoryId] = updatedFilters[categoryId].filter(id => id !== filterId);
      } else {
        // Add filter if not selected
        updatedFilters[categoryId] = [...updatedFilters[categoryId], filterId];
      }
      
      return updatedFilters;
    });
  };

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  // Count total selected filters
  const totalSelected = Object.values(selectedFilters).reduce(
    (sum, filters) => sum + filters.length, 0
  );

  return (
    <div className={`${className} w-full overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Filtrer par</h3>
        
        {totalSelected > 0 && (
          <button
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            onClick={() => {
              const resetFilters: Record<string, string[]> = {};
              categories.forEach(category => {
                resetFilters[category.id] = [];
              });
              setSelectedFilters(resetFilters);
            }}
          >
            Réinitialiser
          </button>
        )}
      </div>
      
      <div className={`flex overflow-x-auto hide-scrollbar pb-2 gap-2 ${isMobile ? 'flex-nowrap' : 'flex-wrap'}`}>
        {categories.map(category => (
          <div key={category.id} className="flex-shrink-0">
            <motion.div
              className={`relative rounded-full ${
                expandedCategory === category.id
                  ? isDark ? "bg-zinc-800" : "bg-gray-100"
                  : "bg-transparent"
              } transition-colors`}
            >
              <button
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm ${
                  selectedFilters[category.id]?.length > 0
                    ? isDark
                      ? "bg-primary/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                    : isDark
                    ? "hover:bg-zinc-800"
                    : "hover:bg-gray-100"
                } transition-colors`}
                onClick={() => setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )}
              >
                <span>{category.name}</span>
                {selectedFilters[category.id]?.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1 h-5 min-w-5 flex items-center justify-center"
                  >
                    {selectedFilters[category.id].length}
                  </Badge>
                )}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  className={`transition-transform ${
                    expandedCategory === category.id ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M2 4L6 8L10 4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-10 mt-1 p-2 rounded-lg shadow-lg min-w-[180px] ${
                    isDark ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {category.options.map(option => (
                      <motion.button
                        key={option.id}
                        className={`flex items-center px-2 py-1.5 rounded-md text-sm ${
                          selectedFilters[category.id]?.includes(option.id)
                            ? isDark
                              ? "bg-primary/20 text-primary-foreground"
                              : "bg-primary/10 text-primary"
                            : "hover:bg-muted transition-colors"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFilter(category.id, option.id);
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            {option.icon && (
                              <span className="mr-2">{option.icon}</span>
                            )}
                            <span>{option.label}</span>
                          </div>
                          
                          {selectedFilters[category.id]?.includes(option.id) && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M13.3 4.8l-7.1 7.1-3.6-3.6" />
                            </svg>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntelligentFilters;
