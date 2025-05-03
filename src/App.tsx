
import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Home from "@/pages/Home";
import PublicProfile from "@/pages/PublicProfile";
import Search from "@/pages/Search";
import Settings from "@/pages/Settings";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";
import Video from "@/pages/Video";
import Explore from "@/pages/Explore";
import Layout from "@/layouts/Layout";
import VideosLayout from "@/layouts/VideosLayout";
import FullLayout from "@/layouts/FullLayout";
import MobileProfileLayout from "@/layouts/MobileProfileLayout";
import Fallback from "@/components/errors/Fallback";

// Auth
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

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
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/explore" element={<Explore />} />
                </Route>

                {/* Video routes */}
                <Route element={<VideosLayout />}>
                  <Route path="/video/:videoId" element={<Video />} />
                </Route>

                {/* Auth routes */}
                <Route element={<FullLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>

                {/* Profile routes */}
                <Route path="/profile/:username" element={
                  <Suspense fallback={<div>Chargement...</div>}>
                    <MobileProfileLayout>
                      <PublicProfile />
                    </MobileProfileLayout>
                  </Suspense>
                } />

                {/* Settings routes */}
                <Route element={<Layout />}>
                  <Route path="/settings/*" element={<Settings />} />
                </Route>

                {/* Messages routes */}
                <Route element={<Layout />}>
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/messages/:conversationId" element={<Messages />} />
                </Route>

                {/* Handle legacy performer profile URLs - redirect to appropriate page */}
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
