
import React from "react";
import { Link } from "react-router-dom";

const IntimateFooter: React.FC = () => {
  return (
    <footer className="bg-[#151824] border-t border-purple-900/50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">INTIMATE</h3>
            <p className="text-purple-200 text-sm">
              Révolutionner l'industrie du contenu premium avec sécurité, authenticité et équité économique.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Découvrir</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/intimate/creators" className="text-purple-300 hover:text-white transition-colors">
                  Créateurs
                </Link>
              </li>
              <li>
                <Link to="/intimate/explore" className="text-purple-300 hover:text-white transition-colors">
                  Explorer
                </Link>
              </li>
              <li>
                <Link to="/intimate/protection" className="text-purple-300 hover:text-white transition-colors">
                  Protection du contenu
                </Link>
              </li>
              <li>
                <Link to="/intimate/premium" className="text-purple-300 hover:text-white transition-colors">
                  Offres Premium
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Créateurs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/intimate/creators/join" className="text-purple-300 hover:text-white transition-colors">
                  Devenir Créateur
                </Link>
              </li>
              <li>
                <Link to="/intimate/creators/guidelines" className="text-purple-300 hover:text-white transition-colors">
                  Directives
                </Link>
              </li>
              <li>
                <Link to="/intimate/creators/tools" className="text-purple-300 hover:text-white transition-colors">
                  Outils et Ressources
                </Link>
              </li>
              <li>
                <Link to="/intimate/creators/payout" className="text-purple-300 hover:text-white transition-colors">
                  Paiements
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Assistance</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-purple-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-purple-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-purple-300 hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-purple-300 hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-900/50 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} INTIMATE. Tous droits réservés.
          </p>
          
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-purple-300 hover:text-white transition-colors text-sm">
              Confidentialité
            </Link>
            <Link to="/terms" className="text-purple-300 hover:text-white transition-colors text-sm">
              Conditions
            </Link>
            <Link to="/cookies" className="text-purple-300 hover:text-white transition-colors text-sm">
              Cookies
            </Link>
            <Link to="/" className="text-purple-300 hover:text-white transition-colors text-sm">
              Xvush
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IntimateFooter;
