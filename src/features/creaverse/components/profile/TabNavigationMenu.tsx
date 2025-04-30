
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

interface TabNavigationMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCreatorMode?: boolean;
  isOwner?: boolean;
}

const TabNavigationMenu: React.FC<TabNavigationMenuProps> = ({
  activeTab,
  setActiveTab,
  isCreatorMode = false,
  isOwner = false
}) => {
  const { theme } = useTheme();

  const tabs = [
    { id: "gallery", label: "Galerie", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 14l4-4a1 1 0 0 1 1.414 0L13 15"></path>
        <path d="M13 11l3-3a1 1 0 0 1 1.414 0L21 12"></path>
        <circle cx="11.5" cy="8.5" r="1.5" />
      </svg>
    ) },
    { id: "collections", label: "Collections", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.97 2H9c-.5 0-.98.2-1.34.55C7.3 2.93 7 3.42 7 4v15c0 .58.3 1.07.66 1.42.36.36.84.58 1.34.58h8c.5 0 .98-.23 1.34-.59.36-.35.66-.84.66-1.41V6.97c0-.26-.1-.51-.29-.7l-4-4a.99.99 0 0 0-.7-.27Z"></path>
        <path d="M3 7.1v12.8c0 .5.2 1 .57 1.35.37.36.87.55 1.39.55H9"></path>
        <path d="M13 2v5h5"></path>
      </svg>
    ) },
    { id: "videos", label: "Vidéos", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14 12-8.5 5V7L14 12z"></path>
        <circle cx="14" cy="12" r="8"></circle>
      </svg>
    ) },
    { id: "premium", label: "Premium", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ) }
  ];

  if (isCreatorMode || isOwner) {
    tabs.push(
      { id: "stats", label: "Statistiques", icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ) }
    );
  }

  return (
    <nav className={`border-b ${theme === 'light' ? 'border-gray-200 bg-white' : 'border-zinc-800 bg-zinc-900'} px-2`}>
      <div className="flex overflow-x-auto hide-scrollbar scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigationMenu;
