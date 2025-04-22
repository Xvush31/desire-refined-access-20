import React from "react";
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
  Eye,
  Video,
  LayoutGrid 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import GhostModeToggle from "./GhostModeToggle";

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
    href: "/performers",
    hasSubmenu: true,
    submenu: [
      { label: "Les plus populaires", href: "/performers/popular" },
      { label: "Récents", href: "/performers/recent" },
      { label: "Voir tout", href: "/performers" },
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
        "fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-all duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div 
        className={cn(
          "fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-black/90 backdrop-blur-lg shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-muted">
          <h2 className="text-lg font-medium">Menu</h2>
          <button 
            onClick={onClose}
            className="text-foreground hover:text-red-600 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <div className="border-b border-muted pb-4 mb-4">
            <GhostModeToggle />
          </div>

          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                {item.hasSubmenu ? (
                  <div>
                    <button 
                      onClick={() => toggleSubmenu(item.label)}
                      className="menu-item w-full justify-between"
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge className="ml-2 bg-brand-red text-white text-xs">{item.badge}</Badge>
                        )}
                      </div>
                      <span>{expandedItems.includes(item.label) ? "-" : "+"}</span>
                    </button>
                    
                    {expandedItems.includes(item.label) && item.submenu && (
                      <ul className="pl-6 mt-1 space-y-1 border-l border-muted animate-slide-up">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.label}>
                            <a href={subItem.href} className="menu-item">
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a href={item.href} className="menu-item block">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-2 bg-brand-red text-white text-xs">{item.badge}</Badge>
                    )}
                  </a>
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
