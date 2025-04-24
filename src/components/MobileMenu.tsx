
import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  TrendingUp, 
  Grid, 
  User, 
  Heart, 
  Clock, 
  Upload, 
  LogIn,
  X,
  Video,
  LayoutGrid,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import GhostModeToggle from "./GhostModeToggle";
import { useTheme } from "@/hooks/use-theme";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  hasSubmenu?: boolean;
  submenu?: {
    label: string;
    href: string;
  }[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  { label: "Accueil", icon: <Home size={18} />, href: "/" },
  { label: "Tendances", icon: <TrendingUp size={18} />, href: "/trending" },
  { 
    label: "Catégories", 
    icon: <Grid size={18} />, 
    href: "/categories",
    hasSubmenu: true,
    submenu: [
      { label: "Amateur", href: "/categories/amateur" },
      { label: "MILF", href: "/categories/milf" },
      { label: "Teen", href: "/categories/teen" },
      { label: "Lesbian", href: "/categories/lesbian" },
      { label: "Voir tout", href: "/categories" },
    ] 
  },
  { 
    label: "Créateurs", 
    icon: <User size={18} />, 
    href: "/creators",
    hasSubmenu: true,
    submenu: [
      { label: "Les plus populaires", href: "/creators/popular" },
      { label: "Récents", href: "/creators/recent" },
      { label: "Voir tout", href: "/creators" },
    ] 
  },
  { label: "Favoris", icon: <Heart size={18} />, href: "/favorites" },
  { label: "XTease", icon: <Video size={18} />, href: "/xtease", badge: "Nouveau" },
  { label: "Tableau de Bord Créateurs", icon: <LayoutGrid size={18} />, href: "/creator-dashboard" },
  { label: "Historique", icon: <Clock size={18} />, href: "/history" },
  { label: "Téléverser", icon: <Upload size={18} />, href: "/upload" },
  { label: "Se connecter", icon: <LogIn size={18} />, href: "/login" },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const toggleSubmenu = (label: string) => {
    if (expandedItems.includes(label)) {
      setExpandedItems(expandedItems.filter(item => item !== label));
    } else {
      setExpandedItems([...expandedItems, label]);
    }
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-all duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div 
        className={cn(
          "fixed right-0 top-0 bottom-0 w-3/4 max-w-xs shadow-xl transition-transform duration-300 ease-in-out overflow-y-auto",
          isLight ? "bg-white" : "bg-black",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn(
          "flex justify-between items-center p-6 sticky top-0 z-10",
          isLight ? "border-b border-gray-200 bg-white" : "border-b border-muted bg-black"
        )}>
          <h2 className={cn("text-lg font-medium", isLight ? "text-gray-800" : "text-white")}>Menu</h2>
          <button 
            onClick={onClose}
            className={cn(
              "rounded-full p-2 transition-colors",
              isLight ? "text-gray-700 hover:bg-gray-100" : "text-foreground hover:text-red-600"
            )}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <div className={cn(
            "border-b pb-4 mb-4",
            isLight ? "border-gray-200" : "border-muted"
          )}>
            <GhostModeToggle />
          </div>

          <ul className="space-y-1 pb-24">
            {menuItems.map((item) => (
              <li key={item.label} className="w-full">
                {item.hasSubmenu ? (
                  <div>
                    <button 
                      onClick={() => toggleSubmenu(item.label)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm",
                        isLight 
                          ? "hover:bg-gray-100 text-gray-800" 
                          : "hover:bg-secondary text-white"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className={isLight ? "text-primary" : ""}>{item.icon}</span>
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge className="ml-2 animated-gradient-bg text-white text-xs">{item.badge}</Badge>
                        )}
                      </div>
                      <span>{expandedItems.includes(item.label) ? "-" : "+"}</span>
                    </button>
                    
                    {expandedItems.includes(item.label) && item.submenu && (
                      <ul className={cn(
                        "pl-6 mt-1 space-y-1",
                        isLight ? "border-l border-gray-200" : "border-l border-muted"
                      )}>
                        {item.submenu.map((subItem) => (
                          <li key={subItem.label}>
                            <Link 
                              to={subItem.href} 
                              className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm",
                                isLight 
                                  ? "hover:bg-gray-100 text-gray-700" 
                                  : "hover:bg-secondary text-white"
                              )}
                              onClick={onClose}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={item.href} 
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full",
                      isLight 
                        ? "hover:bg-gray-100 text-gray-800" 
                        : "hover:bg-secondary text-white"
                    )}
                    onClick={onClose}
                  >
                    <span className={isLight ? "text-primary" : ""}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-2 animated-gradient-bg text-white text-xs">{item.badge}</Badge>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
