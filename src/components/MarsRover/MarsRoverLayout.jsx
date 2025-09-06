import { Outlet, useParams, useLocation } from 'react-router-dom';
import MarsRoverNavbar from './MarsRoverNavbar';
import Footer from '../Footer';

const MarsRoverLayout = () => {
  const { version } = useParams();
  const location = useLocation();
  
  // Extract version from URL path - handle both /mars-rover-1 and /mars-rover-1.0 patterns
  let roverVersion = version;
  if (!roverVersion) {
    // Check for mars-rover pattern first
    const marsRoverMatch = location.pathname.match(/mars-rover-(\d+(?:\.\d+)?)/);
    if (marsRoverMatch) {
      roverVersion = marsRoverMatch[1];
    } else {
      roverVersion = "1"; // default fallback
    }
  }
  
  // Extract base version number (remove .0 if present) for routing
  const baseVersion = roverVersion.includes('.') ? roverVersion.split('.')[0] : roverVersion;
  // Ensure display format includes .0
  const formattedVersion = roverVersion.includes('.') ? roverVersion : `${roverVersion}.0`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
      {/* Specialized Mars Rover Navbar */}
      <MarsRoverNavbar roverVersion={baseVersion} formattedVersion={formattedVersion} />

      {/* Mars Rover Content Area */}
      <main className="flex-1">
        {/* Mars atmosphere effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 via-transparent to-orange-900/5 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MarsRoverLayout;
