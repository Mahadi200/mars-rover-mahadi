import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load all page components for better performance
const MainLayout = lazy(() => import('./components/MainLayout'));
const MarsRoverLayout = lazy(() => import('./components/MarsRover/MarsRoverLayout'));
const Dashboard = lazy(() => import('./pages/MarsRover/Dashboard'));
const LiveCamera = lazy(() => import('./pages/MarsRover/LiveCamera'));
const Navigation = lazy(() => import('./pages/MarsRover/Navigation'));
const ScienceLab = lazy(() => import('./pages/MarsRover/ScienceLab'));
const Features = lazy(() => import('./pages/MarsRover/Features'));
const Systems = lazy(() => import('./pages/MarsRover/Systems'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Achievement = lazy(() => import('./pages/Achievement'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Sponsor = lazy(() => import('./pages/Sponsor'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

// Route loading component using LoadingSpinner
const RouteLoadingSpinner = () => (
  <LoadingSpinner 
    isLoading={true} 
    onLoadComplete={() => {}} 
    isNavigation={true}
  />
);

function AppContent() {

  return (
    <Suspense fallback={<RouteLoadingSpinner />}>
      <Routes>
        {/* Main Site Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="achievement" element={<Achievement />} />
          <Route path="gallery/:achievementId" element={<Gallery />} />
          <Route path="sponsor" element={<Sponsor />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Mars Rover Specialized Layout - unified route */}
        <Route path="/mars-rover-:version/*" element={<MarsRoverLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="camera" element={<LiveCamera />} />
          <Route path="navigation" element={<Navigation />} />
          <Route path="science" element={<ScienceLab />} />
          <Route path="features" element={<Features />} />
          <Route path="power" element={<Systems />} />
          <Route path="communication" element={<Systems />} />
          <Route path="diagnostics" element={<Systems />} />
        </Route>

        {/* Legacy route redirects */}
        <Route path="/mars-rover-1/*" element={<MarsRoverLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="camera" element={<LiveCamera />} />
          <Route path="navigation" element={<Navigation />} />
          <Route path="science" element={<ScienceLab />} />
          <Route path="features" element={<Features />} />
          <Route path="power" element={<Systems />} />
          <Route path="communication" element={<Systems />} />
          <Route path="diagnostics" element={<Systems />} />
        </Route>
        <Route path="/mars-rover-2/*" element={<MarsRoverLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="camera" element={<LiveCamera />} />
          <Route path="navigation" element={<Navigation />} />
          <Route path="science" element={<ScienceLab />} />
          <Route path="features" element={<Features />} />
          <Route path="power" element={<Systems />} />
          <Route path="communication" element={<Systems />} />
          <Route path="diagnostics" element={<Systems />} />
        </Route>
        
        {/* Custom route for mars-rover-1 */}
        <Route path="/mars-rover-1/*" element={<MarsRoverLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="camera" element={<LiveCamera />} />
          <Route path="navigation" element={<Navigation />} />
          <Route path="science" element={<ScienceLab />} />
          <Route path="features" element={<Features />} />
          <Route path="power" element={<Systems />} />
          <Route path="communication" element={<Systems />} />
          <Route path="diagnostics" element={<Systems />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Let the LoadingSpinner handle its own timing
    // The LoadingSpinner will call onLoadComplete when ready
    // This ensures the full Mars journey animation plays
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingSpinner 
        isLoading={isLoading} 
        onLoadComplete={handleLoadComplete}
      />
      {!isLoading && <AppContent />}
    </>
  );
}

export default App;
