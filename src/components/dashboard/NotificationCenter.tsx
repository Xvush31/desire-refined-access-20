import React, { useState, useEffect } from "react";
import { fetchNotifications, markNotificationAsRead } from "./api"; // Corrige l'importation
import { useAuth } from "@/contexts/AuthContext";

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

const NotificationCenter: React.FC = () => {
  const { currentUser } = useAuth();
  const creatorId = currentUser?.uid || "creator5"; // Utilise l'ID de l'utilisateur connecté ou un ID par défaut
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications(creatorId); // Utilise fetchNotifications
      setNotifications(data);
      setLoading(false);
    };
    loadNotifications();
  }, [creatorId]);

  const handleMarkAsRead = async (notificationId: string) => {
    await markNotificationAsRead(creatorId, notificationId);
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  if (loading) {
    return <div>Chargement des notifications...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Centre de Notifications</h3>
      {notifications.length === 0 ? (
        <p>Aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-2 rounded ${
                notification.read ? "bg-gray-100" : "bg-blue-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Marquer comme lu
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;
