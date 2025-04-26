import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getNotifications } from "./api"; // Importe la fonction API

interface Notification {
  id: string;
  message: string;
  sentAt: string;
}

interface NotificationCenterProps {
  creatorId: string; // Ajoute creatorId comme prop
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  creatorId,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(creatorId);
        // Adapte les données reçues pour correspondre à l'interface Notification
        const formattedNotifications = data.map((notification: any) => ({
          id: notification.id.toString(),
          message: notification.message,
          sentAt: notification.sentAt,
          read: false, // Par défaut, les notifications sont non lues
        }));
        setNotifications(formattedNotifications);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [creatorId]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  if (loading) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Bell className="h-5 w-5" />
      </Button>
    );
  }

  if (error) {
    return (
      <Button variant="outline" size="icon" title={error}>
        <Bell className="h-5 w-5 text-red-500" />
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, read: true }))
                )
              }
            >
              Tout marquer comme lu
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                    !notification.read ? "bg-muted/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{notification.message}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.sentAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Aucune notification
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
