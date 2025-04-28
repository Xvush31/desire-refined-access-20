import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

interface NotificationCenterProps {
  creatorId: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  creatorId,
}) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `https://backend-puce-rho-15.vercel.app/api/notifications/${creatorId}`
        );
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [creatorId]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="mb-2">
              {notification.message} - {notification.timestamp}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationCenter;
