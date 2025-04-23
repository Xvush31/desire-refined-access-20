
import React from "react";
import Header from "@/components/Header";
import AffiliateProgram from "@/features/affiliate/AffiliateProgram";
import CommunityBadges from "@/features/community/CommunityBadges";
import DiscreteSharing from "@/features/sharing/DiscreteSharing";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Communauté</h1>
            <p className="text-muted-foreground">
              Développez votre réseau, gagnez des récompenses et partagez de façon discrète
            </p>
          </div>
          
          <Button className="mt-4 md:mt-0 bg-[#D2C7BA] hover:bg-[#B8AEA2] text-black">
            <Users className="mr-2" size={18} />
            Inviter des amis
          </Button>
        </div>
        
        <AffiliateProgram />
        <CommunityBadges />
        <DiscreteSharing />
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-muted">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground text-sm">
                © 2025 Visua. Tous droits réservés.
              </p>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-[#D2C7BA] transition-colors">À propos</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-[#D2C7BA] transition-colors">Conditions</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-[#D2C7BA] transition-colors">Confidentialité</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-[#D2C7BA] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Community;
