import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import MainLayout from './components/MainLayout';
import MarsRoverLayout from './components/MarsRover/MarsRoverLayout';
import Dashboard from './pages/MarsRover/Dashboard';
import LiveCamera from './pages/MarsRover/LiveCamera';
import Navigation from './pages/MarsRover/Navigation';
import ScienceLab from './pages/MarsRover/ScienceLab';
import Systems from './pages/MarsRover/Systems';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Achievement from './pages/Achievement';
import MarsRover1 from './pages/MarsRover1';
import MarsRover2 from './pages/MarsRover2';
import Sponsor from './pages/Sponsor';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  // Initial app load
  useEffect(() => {
    // Always show loading on app initialization
    setIsLoading(true);
  }, []);

  // Handle route changes
  useEffect(() => {
    // Show mini loading on route changes (except initial load)
    if (!isLoading) {
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800); // Shorter duration for navigation
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleNavigationComplete = () => {
    setIsNavigating(false);
  };

  // Show full loading spinner on initial app load
  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} onLoadComplete={handleLoadComplete} />;
  }

  // Show mini loading spinner on navigation
  if (isNavigating) {
    return <LoadingSpinner isLoading={isNavigating} onLoadComplete={handleNavigationComplete} isNavigation={true} />;
  }

  return (
    <Routes>
      {/* Main Site Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="achievement" element={<Achievement />} />
        <Route path="sponsor" element={<Sponsor />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Mars Rover Specialized Layout - handles both 1 and 1.0 formats */}
      <Route path="/mars-rover-:version/*" element={<MarsRoverLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="camera" element={<LiveCamera />} />
        <Route path="navigation" element={<Navigation />} />
        <Route path="science" element={<ScienceLab />} />
        <Route path="power" element={<Systems />} />
        <Route path="communication" element={<Systems />} />
        <Route path="diagnostics" element={<Systems />} />
      </Route>

      {/* Legacy routes for direct access */}
      <Route path="/mars-rover-1" element={<MarsRoverLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="camera" element={<LiveCamera />} />
        <Route path="navigation" element={<Navigation />} />
        <Route path="science" element={<ScienceLab />} />
        <Route path="power" element={<Systems />} />
        <Route path="communication" element={<Systems />} />
        <Route path="diagnostics" element={<Systems />} />
      </Route>
      <Route path="/mars-rover-2" element={<MarsRoverLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="camera" element={<LiveCamera />} />
        <Route path="navigation" element={<Navigation />} />
        <Route path="science" element={<ScienceLab />} />
        <Route path="power" element={<Systems />} />
        <Route path="communication" element={<Systems />} />
        <Route path="diagnostics" element={<Systems />} />
      </Route>
    </Routes>
  );
}

function App() {
  return <AppContent />;
}

export default App;
