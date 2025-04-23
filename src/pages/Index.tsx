
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import XTeaseSection from "@/components/XTeaseSection";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import TrendingVideosSection from "@/sections/TrendingVideosSection";
import CategoriesSection from "@/sections/CategoriesSection";
import PopularPerformersSection from "@/sections/PopularPerformersSection";
import RecentVideosSection from "@/sections/RecentVideosSection";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />

      <TrendingVideosSection />

      <div className="container mx-auto px-golden-sm py-golden-md">
        <XTeaseSection />
      </div>

      <CategoriesSection />

      <SubscriptionTiers />

      <RecentVideosSection />

      <PopularPerformersSection />

      {/* Footer */}
      <footer className="py-golden-lg border-t border-muted">
        <div className="container px-golden-sm mx-auto">
          <div className={`${isMobile ? 'flex flex-col gap-4' : 'golden-grid'} items-center`}>
            <div>
              <p className="text-muted-foreground text-sm">
                © 2025 Visua. Tous droits réservés.
              </p>
            </div>
            <div className="flex justify-end gap-golden-md flex-wrap">
              <a href="/about" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">À propos</a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">Conditions</a>
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">Confidentialité</a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
