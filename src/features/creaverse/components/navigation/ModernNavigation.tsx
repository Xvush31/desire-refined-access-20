import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Home, Grid, Bookmark, 
  Zap, Calendar, Users, 
  Settings, Menu, X,
  Layers, Star
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const mainNavItems: NavigationItem[] = [
  { id: 'home', label: 'Accueil', icon: Home, path: '/creaverse-app/performer/1' },
  { id: 'explore', label: 'Découvrir', icon: Grid, path: '/creaverse-app/explore' },
  { id: 'collections', label: 'Collections', icon: Bookmark, path: '/creaverse-app/collections' },
  { id: 'trending', label: 'Tendances', icon: Zap, path: '/creaverse-app/trending' },
];

const creatorNavItems: NavigationItem[] = [
  { id: 'content', label: 'Contenu', icon: Layers, path: '/creaverse-app/creator/content' },
  { id: 'calendar', label: 'Calendrier', icon: Calendar, path: '/creaverse-app/creator/calendar' },
  { id: 'community', label: 'Communauté', icon: Users, path: '/creaverse-app/creator/community' },
  { id: 'monetization', label: 'Monétisation', icon: Star, path: '/creaverse-app/creator/monetization' },
  { id: 'settings', label: 'Paramètres', icon: Settings, path: '/creaverse-app/creator/settings' },
];

interface ModernNavigationProps {
  isCreator?: boolean;
  performerId?: string | number;
}

const ModernNavigation: React.FC<ModernNavigationProps> = ({ 
  isCreator = false,
  performerId
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("main");
  
  // Determine which set of navigation items to show
  const navItems = activeTab === "creator" ? creatorNavItems : mainNavItems;
  
  // Determine active item based on current path
  const getActiveItem = () => {
    return navItems.find(item => location.pathname.includes(item.path))?.id || navItems[0].id;
  };
  
  const handleNavigation = (item: NavigationItem) => {
    const targetPath = item.path.includes('/performer') 
      ? item.path
      : performerId 
        ? `${item.path}/performer/${performerId}`
        : item.path;
        
    navigate(targetPath);
    if (isMobile) setMobileMenuOpen(false);
  };
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="font-bold text-xl mr-8">CreatorVerse</div>
              
              {isCreator && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-8">
                  <TabsList>
                    <TabsTrigger value="main">Explorer</TabsTrigger>
                    <TabsTrigger value="creator">Créateur</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
              
              <nav className="flex space-x-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={getActiveItem() === item.id ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleNavigation(item)}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between bg-background border-b border-border px-4 h-14">
          <div className="font-bold text-lg">CreatorVerse</div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        {/* Mobile menu dropdown */}
        <div className={cn(
          "bg-background border-b border-border shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          {isCreator && (
            <div className="p-4 border-b border-border">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="main">Explorer</TabsTrigger>
                  <TabsTrigger value="creator">Créateur</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
          
          <nav className="p-4 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={getActiveItem() === item.id ? "default" : "outline"}
                className="flex items-center justify-center gap-2"
                onClick={() => handleNavigation(item)}
              >
                <item.icon size={16} />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Spacer for mobile */}
      <div className="md:hidden h-14"></div>
    </>
  );
};

export default ModernNavigation;
