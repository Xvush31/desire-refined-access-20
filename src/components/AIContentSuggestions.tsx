
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentSuggestion {
  id: string;
  title: string;
  thumbnail: string;
  type: 'premium' | 'vip' | 'elite';
  match: number;
}

interface AIContentSuggestionsProps {
  suggestions: ContentSuggestion[];
}

const AIContentSuggestions: React.FC<AIContentSuggestionsProps> = ({ suggestions }) => {
  if (!suggestions.length) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl overflow-hidden bg-muted p-4">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 mr-2 animated-gradient" />
        <h3 className="text-lg font-semibold">Recommandé pour vous</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="group relative overflow-hidden rounded-lg hover-card micro-pop">
            <Link to={`/xtease/${suggestion.id}`}>
              <img 
                src={suggestion.thumbnail} 
                alt={suggestion.title}
                className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="text-white text-sm font-medium line-clamp-2">{suggestion.title}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    suggestion.type === 'premium' ? 'animated-gradient-bg' :
                    suggestion.type === 'vip' ? 'bg-purple-500' : 'bg-amber-500'
                  }`}>
                    {suggestion.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-white">Match: {suggestion.match}%</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIContentSuggestions;
