
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreatorProfile from "./pages/CreatorProfile";
import Creator from "./features/creaverse/pages/Creator";
import Dashboard from "./pages/Dashboard";
import CalendarView from "./pages/CalendarView";
import NotFound from "./pages/NotFound";
import SubscribersManagement from "./pages/SubscribersManagement";
import XTease from "./pages/XTease";
import Creators from "./pages/Creators";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/creator-profile" element={<CreatorProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/subscribers" element={<SubscribersManagement />} />
        <Route path="/xtease" element={<XTease />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
