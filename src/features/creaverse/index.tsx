
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * CreaVerse - L'univers des créateurs de XVush
 * Une expérience immersive pour les créateurs et leurs fans
 */
const CreaVerse: React.FC = () => {
  const { currentUser } = useAuth();
  
  // This component now serves as a layout wrapper with protection logic
  // The actual routes are defined in App.tsx
  
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default CreaVerse;
