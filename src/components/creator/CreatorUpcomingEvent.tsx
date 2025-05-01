
import React from "react";

interface CreatorUpcomingEventProps {
  event: {
    title: string;
    date: string;
    time: string;
    timeRemaining: string;
  };
}

const CreatorUpcomingEvent: React.FC<CreatorUpcomingEventProps> = ({ event }) => {
  return (
    <div className="mt-6 bg-gray-50 dark:bg-zinc-800/70 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M17 9A5 5 0 0 0 7 9a5 5 0 0 0 10 0z"></path>
            <rect width="16" height="10" x="4" y="11" rx="2"></rect>
            <circle cx="12" cy="13" r="3"></circle>
            <path d="M12 16v2"></path>
            <path d="M8 16v2"></path>
            <path d="M16 16v2"></path>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-red-500">Live à venir</div>
          <div className="font-medium mb-1">{event.title}</div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {event.date}, {event.time} <span className="text-red-500 ml-1">({event.timeRemaining})</span>
            </div>
            <button className="bg-white dark:bg-zinc-700 text-sm px-4 py-1 rounded-full">Rappel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorUpcomingEvent;
