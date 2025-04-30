
import { Routes, Route } from "react-router-dom";
// Remove the incorrect import and use a temporary layout instead
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
import PerformerProfile from "./pages/PerformerProfile";
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
import CreatorProfile from "./features/creaverse/pages/CreatorProfile";
import CreatorDashboard from "./features/creaverse/pages/CreatorDashboard";
import CreatorSettings from "./features/creaverse/pages/CreatorSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="min-h-screen">{/* Placeholder for layout */}
        <Routes>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="trending" element={<Trending />} />
          <Route path="recent" element={<Recent />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="creators" element={<Creators />} />
          <Route path="creators/popular" element={<CreatorsPopular />} />
          <Route path="creators/recent" element={<CreatorsRecent />} />
          <Route path="community" element={<Community />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="performers" element={<Performers />} />
          <Route path="performer/:performerId" element={<PerformerProfile />} />
          <Route path="video/:videoId" element={<SingleVideo />} />
          <Route path="upload" element={<Upload />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="invite" element={<Invite />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="history" element={<History />} />
          <Route path="xtease" element={<XTease />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="subscription/confirmation" element={<SubscriptionConfirmation />} />
          <Route path="auth/callback" element={<AuthCallback />} />
          <Route path="access-denied" element={<AccessDenied />} />

          {/* Routes CreaVerse */}
          <Route path="performer/:performerId" element={<CreatorProfile />} />
          <Route path="creator/:performerId/dashboard" element={<CreatorDashboard />} />
          <Route path="creator/:performerId/settings" element={<CreatorSettings />} />
        </Routes>
      </div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
