
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import CreatorProfile from "./pages/CreatorProfile";
import Dashboard from "./pages/Dashboard";
import CalendarView from "./pages/CalendarView";
import NotFound from "@/pages/NotFound";
import SubscribersManagement from "./pages/SubscribersManagement";
import Index from "./pages/CreaVerseIndex";
import "./styles/creaverse.css";  // Import des styles spécifiques à CreaVerse

const queryClient = new QueryClient();

const CreaVerseApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="creaverse-container">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/creator" element={<CreatorProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/subscribers" element={<SubscribersManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default CreaVerseApp;
