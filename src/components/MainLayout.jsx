import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main content */}
      <main className="flex-1 main-fallback pt-[74px]">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
