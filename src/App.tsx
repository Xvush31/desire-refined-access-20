
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Trending from "./pages/Trending";
import Recent from "./pages/Recent";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Creators from "./pages/Creators";
import CreatorsPopular from "./pages/CreatorsPopular";
import CreatorsRecent from "./pages/CreatorsRecent";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Performers from "./pages/Performers";
import SingleVideo from "./pages/SingleVideo";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Invite from "./pages/Invite";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import XTease from "./pages/XTease";
import SubscriptionConfirmation from "./pages/SubscriptionConfirmation";
import Subscription from "./pages/Subscription";
import AuthCallback from "./pages/AuthCallback";
import AccessDenied from "./pages/AccessDenied";
import CreaVerse from "./features/creaverse";
import CreatorProfile from "./features/creaverse/pages/CreatorProfile";
import CreatorDashboard from "./features/creaverse/pages/CreatorDashboard";
import CreatorSettings from "./features/creaverse/pages/CreatorSettings";

// Simple layout component to wrap routes
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen">{children}</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/trending" element={<Layout><Trending /></Layout>} />
      <Route path="/recent" element={<Layout><Recent /></Layout>} />
      <Route path="/categories" element={<Layout><Categories /></Layout>} />
      <Route path="/category/:categoryId" element={<Layout><CategoryPage /></Layout>} />
      <Route path="/creators" element={<Layout><Creators /></Layout>} />
      <Route path="/creators/popular" element={<Layout><CreatorsPopular /></Layout>} />
      <Route path="/creators/recent" element={<Layout><CreatorsRecent /></Layout>} />
      <Route path="/community" element={<Layout><Community /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/signup" element={<Layout><Signup /></Layout>} />
      <Route path="/performers" element={<Layout><Performers /></Layout>} />
      <Route path="/video/:videoId" element={<Layout><SingleVideo /></Layout>} />
      <Route path="/upload" element={<Layout><Upload /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
      <Route path="/terms" element={<Layout><Terms /></Layout>} />
      <Route path="/invite" element={<Layout><Invite /></Layout>} />
      <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
      <Route path="/history" element={<Layout><History /></Layout>} />
      <Route path="/xtease" element={<Layout><XTease /></Layout>} />
      <Route path="/subscription" element={<Layout><Subscription /></Layout>} />
      <Route path="/subscription/confirmation" element={<Layout><SubscriptionConfirmation /></Layout>} />
      <Route path="/auth/callback" element={<Layout><AuthCallback /></Layout>} />
      <Route path="/access-denied" element={<Layout><AccessDenied /></Layout>} />

      {/* CreaVerse Routes - Using the CreaVerse layout wrapper */}
      <Route element={<CreaVerse />}>
        <Route path="/performer/:performerId" element={<Layout><CreatorProfile /></Layout>} />
        <Route path="/creator/:performerId/dashboard" element={<Layout><CreatorDashboard /></Layout>} />
        <Route path="/creator/:performerId/settings" element={<Layout><CreatorSettings /></Layout>} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
