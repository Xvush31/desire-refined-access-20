
import React from "react";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light/5 to-transparent z-0" />
      
      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text */}
          <div className="parallax-item translate-y-0 lg:-translate-y-2">
            <h1 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">Découvrez une expérience <span className="text-brand-accent">visuelle premium</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Une collection exclusive de vidéos haute définition dans une interface élégante et intuitive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-brand-accent hover:bg-brand-accent/90 text-white rounded-full px-8 py-6">
                Découvrir maintenant
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6">
                En savoir plus
              </Button>
            </div>
          </div>
          
          {/* Right column: Video Player */}
          <div className="parallax-item translate-y-0 lg:translate-y-2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <CustomVideoPlayer 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                poster="https://picsum.photos/seed/hero/1280/720"
                title="Découvrez notre lecteur premium" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
