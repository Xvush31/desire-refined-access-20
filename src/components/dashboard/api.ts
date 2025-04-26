import axios from 'axios';

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export const fetchNotifications = async (creatorId: string): Promise<Notification[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/creators/${creatorId}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (creatorId: string, notificationId: string): Promise<void> => {
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/creators/${creatorId}/notifications/${notificationId}`, {
      read: true,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la notification:', error);
  }
};
