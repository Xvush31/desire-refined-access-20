
import React from "react";
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

const Index = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Trending Videos */}
      <TrendingSection />

      {/* XTease Section */}
      <div className="container mx-auto px-golden-sm py-golden-md">
        <XTeaseSection />
      </div>

      {/* Categories */}
      <HomeCategoriesSection />

      {/* SECTION CREATOR - before SubscriptionTiers */}
      <HomeCreatorsSection />

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
              <a href="/about" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.about")}</a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.terms")}</a>
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.privacy")}</a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">{t("footer.contact")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
