
import React from 'react';
import { useTheme } from '@/hooks/use-theme';

interface PerformerHighlightsProps {
  performer: {
    id: number;
    username: string;
    displayName: string;
    tags: string[];
  };
}

const highlights = [
  {
    id: 1,
    title: "🇳🇱",
    image: "https://picsum.photos/seed/story1/150/150"
  },
  {
    id: 2,
    title: "🌙",
    image: "https://picsum.photos/seed/story2/150/150"
  },
  {
    id: 3,
    title: "tiktok4ik",
    image: "https://picsum.photos/seed/story3/150/150"
  },
  {
    id: 4,
    title: "💭",
    image: "https://picsum.photos/seed/story4/150/150"
  }
];

const PerformerHighlights: React.FC<PerformerHighlightsProps> = ({ performer }) => {
  const { theme } = useTheme();
  const secondaryBgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  const textClass = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <div className={`${secondaryBgClass} p-4 overflow-x-auto`}>
      <div className="flex space-x-4">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="flex flex-col items-center min-w-[72px]">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-br from-pink-500 to-yellow-500">
              <div className="w-full h-full rounded-full p-[2px] bg-black">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className={`text-xs mt-1 ${textClass}`}>{highlight.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformerHighlights;
