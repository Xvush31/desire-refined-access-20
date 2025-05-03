
import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Fallback from "@/components/errors/Fallback";

// Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

// Auth
import { AuthProvider } from "@/contexts/AuthContext";

// Theme
import { ThemeProvider } from "@/providers/theme-provider";

function App() {
  // Set up React Query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="xvush-ui-theme">
          <AuthProvider>
            <TooltipProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                
                {/* Legacy redirect */}
                <Route path="/performer/:performerId" element={<Navigate to="/" replace />} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
