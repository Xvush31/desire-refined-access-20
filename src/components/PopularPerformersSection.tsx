
import React from "react";
import ContentSection from "@/components/ContentSection";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/contexts/LocaleContext";
import { Link } from "react-router-dom";
import { XDOSE_DOMAIN } from "@/utils/creaverseLinks";

const popularPerformers = [
  { id: 1, name: "JulieSky", videos: 58, subscribers: "1.2M", image: "https://picsum.photos/seed/perf1/150/150" },
  { id: 2, name: "MaxPower", videos: 42, subscribers: "850K", image: "https://picsum.photos/seed/perf2/150/150" },
  { id: 3, name: "LexiLove", videos: 63, subscribers: "1.5M", image: "https://picsum.photos/seed/perf3/150/150" },
  { id: 4, name: "TomSecret", videos: 37, subscribers: "720K", image: "https://picsum.photos/seed/perf4/150/150" }
];

const PopularPerformersSection = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();

  const handlePerformerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = XDOSE_DOMAIN;
  };

  return (
    <ContentSection title={t("home.creators")} viewAllLink="/creators" className="bg-secondary/30">
      <div className={`${isMobile ? 'flex flex-col gap-golden-md' : 'golden-grid'}`}>
        <div className="flex flex-wrap justify-center gap-golden-md">
          {popularPerformers.map((performer) => (
            <a
              key={performer.id}
              href={XDOSE_DOMAIN}
              className="text-center group block"
              aria-label={`Voir le profil de ${performer.name}`}
              onClick={handlePerformerClick}
            >
              <div className="w-32 h-32 mx-auto mb-golden-sm overflow-hidden rounded-full border-2 border-transparent group-hover:border-brand-accent transition-colors">
                <img
                  src={performer.image}
                  alt={performer.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-base group-hover:text-brand-accent transition-colors">{performer.name}</h3>
              <p className="text-sm text-muted-foreground">{performer.videos} {t("home.videos")}</p>
              <p className="text-xs text-brand-accent">{performer.subscribers} {t("home.subscribers")}</p>
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center items-start space-y-golden-md px-golden-md">
          <h3 className="text-golden-xl font-medium">{t("home.top_creators")}</h3>
          <p className="text-muted-foreground">{t("home.creators_desc")}</p>
          <Button className="animated-gradient-bg text-white">
            <a href={XDOSE_DOMAIN} className="w-full h-full block" onClick={handlePerformerClick}>
              {t("home.view_creators")}
            </a>
          </Button>
        </div>
      </div>
    </ContentSection>
  );
};

export default PopularPerformersSection;
