
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';
import XTease from './pages/XTease';
import Profile from './pages/Profile';
import CategoryPage from './pages/CategoryPage';
import Trending from './pages/Trending';
import PerformerProfile from './pages/PerformerProfile';
import CreaVerse from './features/creaverse';
import NotFound from './pages/NotFound';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner';
import ImmersiveShowcase from './pages/ImmersiveShowcase';
import Creators from './pages/Creators';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add new immersive showcase route */}
        <Route path="/immersive" element={<ImmersiveShowcase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/xtease" element={<XTease />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/performer/:slug" element={<PerformerProfile />} />
        <Route path="/creaverse/*" element={<CreaVerse />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
