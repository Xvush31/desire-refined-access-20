
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import CreatorProfile from "./pages/CreatorProfile";
import Dashboard from "./pages/Dashboard";
import CalendarView from "./pages/CalendarView";
import NotFound from "@/pages/NotFound";
import SubscribersManagement from "./pages/SubscribersManagement";
import Index from "./pages/CreaVerseIndex";
import CreatorSettings from "./pages/CreatorSettings";
import "./styles/creaverse.css";  // Import des styles spécifiques à CreaVerse

const CreaVerseApp = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <div className="creaverse-container">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/performer/:id" element={<CreatorProfile />} />
        <Route path="/creator/:performerId/settings" element={<CreatorSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/subscribers" element={<SubscribersManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </TooltipProvider>
);

export default CreaVerseApp;
