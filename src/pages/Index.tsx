import React, { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import XTeaseSection from "@/components/XTeaseSection";
import TrendingSection from "@/components/TrendingSection";
import HomeCategoriesSection from "@/components/HomeCategoriesSection";
import HomeCreatorsSection from "@/components/HomeCreatorsSection";
import RecentVideosSection from "@/components/RecentVideosSection";
import PopularPerformersSection from "@/components/PopularPerformersSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/contexts/LocaleContext";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const { currentUser, loading } = useAuth();
  
  useEffect(() => {
    console.log("Index component mounted, auth loading:", loading);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* CreaVerse Access Button */}
      {currentUser && (
        <div className="container mx-auto px-4 py-4 text-center">
          <Button asChild className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
            <Link to="/creaverse">Accéder à CreaVerse</Link>
          </Button>
        </div>
      )}

      {/* XTease Section - PREMIÈRE SECTION */}
      <div className="container mx-auto px-golden-sm py-golden-md">
        <XTeaseSection />
      </div>

      {/* Creators Section - DEUXIÈME SECTION */}
      <HomeCreatorsSection />

      {/* Hero Section - DÉPLACÉE EN TROISIÈME POSITION */}
      <HeroSection />

      {/* Trending Videos */}
      <TrendingSection />

      {/* Categories */}
      <HomeCategoriesSection />

      {/* Subscription Tiers */}
      <SubscriptionTiers />

      {/* Recent Videos */}
      <RecentVideosSection />

      {/* Popular Performers */}
      <PopularPerformersSection />

      {/* Footer */}
      <footer className="py-golden-lg border-t border-muted">
        <div className="container px-golden-sm mx-auto">
          <div className={`${isMobile ? 'flex flex-col gap-4' : 'golden-grid'} items-center`}>
            <div>
              <p className="text-muted-foreground text-sm">
                {t("footer.copyright")}
              </p>
            </div>
            <div className="flex justify-end gap-golden-md flex-wrap">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.about")}</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.terms")}</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.privacy")}</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.contact")}</Link>
              {currentUser && (
                <Link to="/creaverse" className="text-sm text-brand-accent font-medium transition-colors">CreaVerse</Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
