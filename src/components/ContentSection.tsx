
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ContentSectionProps {
  title: string;
  viewAllLink?: string;
  className?: string;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  viewAllLink,
  className,
  children,
}) => {
  return (
    <section className={cn("py-8", className)}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <Button variant="link" className="text-brand-orange" asChild>
              <a href={viewAllLink} className="flex items-center gap-1">
                Voir tout <ArrowRight size={16} />
              </a>
            </Button>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
