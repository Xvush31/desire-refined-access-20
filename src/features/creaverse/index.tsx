import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * CreaVerse - L'univers des créateurs de XVush
 * Une expérience immersive pour les créateurs et leurs fans
 */
const CreaVerse: React.FC = () => {
  const { currentUser } = useAuth();
  
  // If user is not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise, render the child routes
  return <Outlet />;
};

export default CreaVerse;
