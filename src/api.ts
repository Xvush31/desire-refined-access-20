import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://backend-puce-rho-15.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Récupérer les notifications d’un créateur
export const getNotifications = async (creatorId: string) => {
  const response = await api.get(`/creators/${creatorId}/notifications`);
  return response.data;
};
