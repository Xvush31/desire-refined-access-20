
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreatorProfile from "./pages/CreatorProfile";
import CreatorDashboard from "./pages/CreatorDashboard";
import { useAuth } from "@/contexts/AuthContext";

/**
 * CreaVerse - L'univers des créateurs de XVush
 * Une expérience immersive pour les créateurs et leurs fans
 */
const CreaVerse: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/:performerId" element={<CreatorProfile />} />
      <Route 
        path="/dashboard/:performerId" 
        element={
          currentUser ? <CreatorDashboard /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

export default CreaVerse;
