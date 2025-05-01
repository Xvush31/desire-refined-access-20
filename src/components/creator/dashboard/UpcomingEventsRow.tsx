
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface Event {
  icon: React.ReactNode;
  title: string;
  time: string;
  isActive: boolean;
}

interface UpcomingEventsRowProps {
  events?: Event[];
}

const UpcomingEventsRow: React.FC<UpcomingEventsRowProps> = ({ events }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800/50';
  const bgClassActive = theme === 'light' ? 'bg-gray-100' : 'bg-zinc-800';
  
  const defaultEvents = [
    {
      icon: <Clock size={16} className="text-brand-red" />,
      title: "Live exclusif",
      time: "Aujourd'hui, 20:00",
      isActive: true
    },
    {
      icon: <Calendar size={16} />,
      title: "Nouveau contenu",
      time: "Demain",
      isActive: false
    },
    {
      icon: <Users size={16} />,
      title: "Q&A avec fans",
      time: "Vendredi, 19:00",
      isActive: false
    }
  ];

  const eventsToShow = events || defaultEvents;

  return (
    <div className="mb-2">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <Calendar size={14} className="mr-1" />
        Prochains événements
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {eventsToShow.map((event, index) => (
          <div
            key={index}
            className={`${event.isActive ? bgClassActive : bgClass} px-3 py-2 rounded-lg flex items-center gap-2 min-w-[180px]`}
          >
            {event.icon}
            <div>
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
            {event.isActive && (
              <Badge className="ml-auto bg-brand-red text-white text-xs">Bientôt</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(UpcomingEventsRow);
