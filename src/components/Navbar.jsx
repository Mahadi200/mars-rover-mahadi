import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
  HomeIcon, 
  InformationCircleIcon, 
  UserGroupIcon, 
  TrophyIcon,
  RocketLaunchIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMarsRoverDropdownOpen, setIsMarsRoverDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle scroll effect for navbar transparency and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowScrollToTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMarsRoverDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMarsRoverDropdownOpen(false);
  }, [location]);

  // Handle navigation with loading and smooth scroll
  const handleNavigation = (href) => {
    if (location.pathname !== href) {
      setIsLoading(true);
      setIsMobileMenuOpen(false);
      setIsMarsRoverDropdownOpen(false);
      
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Simulate loading time
      setTimeout(() => {
        navigate(href);
        setIsLoading(false);
      }, 500);
    } else {
      // If already on the same page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
      setIsMarsRoverDropdownOpen(false);
    }
  };

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About', href: '/about', icon: InformationCircleIcon },
    { name: 'Team Info', href: '/team', icon: UserGroupIcon },
    { name: 'Achievement', href: '/achievement', icon: TrophyIcon },
    { 
      name: 'Mars Rover', 
      icon: RocketLaunchIcon,
      dropdown: [
        { name: 'Mars Rover 1.0', href: '/mars-rover-1', description: 'First generation rover' },
        { name: 'Mars Rover 2.0', href: '/mars-rover-2', description: 'Advanced rover technology' },
      ]
    },
    { name: 'Sponsor', href: '/sponsor', icon: HeartIcon },
    { name: 'FAQ', href: '/faq', icon: QuestionMarkCircleIcon },
    { name: 'Contact Us', href: '/contact', icon: PhoneIcon },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isDropdownActive = (dropdown) => {
    return dropdown.some(item => location.pathname === item.href);
  };

  return (
    <>
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 sm:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 z-50">
          <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse"></div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-lg shadow-2xl border-b border-gray-700/50' 
          : 'bg-gray-900 shadow-xl border-b border-gray-800'
      } fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isLoading ? 'top-1' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo on the left */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/Images/image.png" 
                  alt="Mars Rover Logo" 
                  className="h-10 w-auto mr-3 hover:scale-105 transition-transform duration-300"
                />
                <span className="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  TararBari
                </span>
              </Link>
            </div>

            {/* Menu on the right */}
            <div className="hidden sm:flex sm:space-x-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.dropdown) {
                    return (
                      <div key={item.name} className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setIsMarsRoverDropdownOpen(!isMarsRoverDropdownOpen)}
                          className={`${
                            isDropdownActive(item.dropdown)
                              ? 'text-white'
                              : 'text-gray-300 hover:text-white'
                          } inline-flex items-center text-sm font-medium transition-all duration-300 ease-out group`}
                        >
                          <Icon className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                          {item.name}
                          <ChevronDownIcon className={`h-3 w-3 ml-1 transition-transform duration-300 ${isMarsRoverDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isMarsRoverDropdownOpen && (
                          <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-700 backdrop-blur-sm bg-opacity-95 animate-fadeIn">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700">
                              Mars Rover Versions
                            </div>
                            {item.dropdown.map((dropdownItem) => (
                              <button
                                key={dropdownItem.name}
                                onClick={() => {
                                  handleNavigation(dropdownItem.href);
                                  setIsMarsRoverDropdownOpen(false);
                                }}
                                className={`${
                                  isActive(dropdownItem.href)
                                    ? 'bg-indigo-900 text-indigo-100 border-l-4 border-indigo-400'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent'
                                } block px-4 py-3 transition-all duration-300 group/item w-full text-left focus:outline-none focus:bg-gray-700`}
                              >
                                <div className="font-medium flex items-center">
                                  {dropdownItem.name}
                                  {isActive(dropdownItem.href) && (
                                    <div className="ml-2 h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
                                  )}
                                </div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-400 mt-1 group-hover/item:text-gray-200 transition-colors">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive(item.href)
                          ? 'text-white underline decoration-indigo-400 decoration-2 underline-offset-4'
                          : 'text-gray-300 hover:text-white hover:underline hover:decoration-white hover:decoration-1 hover:underline-offset-4'
                      } inline-flex items-center text-sm font-medium transition-all duration-300 ease-out group relative pb-1 focus:outline-none focus:underline focus:decoration-indigo-400 focus:decoration-2 focus:underline-offset-4`}
                    >
                      <Icon className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-300 min-w-[44px] min-h-[44px]"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <span className="sr-only">{isMobileMenuOpen ? "Close main menu" : "Open main menu"}</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
                ) : (
                  <Bars3Icon className="h-6 w-6 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with enhanced animations */}
        <div className={`sm:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className={`${
            isScrolled 
              ? 'bg-gray-900/90 backdrop-blur-lg border-t border-gray-700/50' 
              : 'bg-gray-900 border-t border-gray-800'
          } transition-all duration-300`}>
            <div className="pt-2 pb-4 space-y-1 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {navigation.map((item) => {
                const Icon = item.icon;
                
                if (item.dropdown) {
                  return (
                    <div key={item.name} className="px-2">
                      <button
                        onClick={() => setIsMarsRoverDropdownOpen(!isMarsRoverDropdownOpen)}
                        className={`${
                          isDropdownActive(item.dropdown)
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        } w-full text-left px-3 py-3 rounded-md text-base font-medium transition-all duration-300 flex items-center justify-between`}
                      >
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </div>
                        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${
                          isMarsRoverDropdownOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <div className={`ml-4 mt-1 space-y-1 transition-all duration-500 ease-in-out ${
                        isMarsRoverDropdownOpen 
                          ? 'max-h-60 opacity-100' 
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}>
                        <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700">
                          Rover Versions
                        </div>
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => {
                              handleNavigation(dropdownItem.href);
                              setIsMobileMenuOpen(false);
                              setIsMarsRoverDropdownOpen(false);
                            }}
                            className={`${
                              isActive(dropdownItem.href)
                                ? 'bg-indigo-900 text-indigo-100'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            } px-4 py-3 rounded-md text-sm transition-all duration-300 w-full text-left focus:outline-none focus:bg-gray-800 min-h-[44px] flex flex-col justify-center`}
                          >
                            <div className="font-medium">{dropdownItem.name}</div>
                            {dropdownItem.description && (
                              <div className="text-xs text-gray-400 mt-1">{dropdownItem.description}</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`${
                      isActive(item.href)
                        ? 'bg-gray-800 text-white underline decoration-indigo-400 decoration-2 underline-offset-4'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:underline hover:decoration-white hover:decoration-1 hover:underline-offset-4'
                    } px-3 py-4 rounded-md mx-2 text-base font-medium transition-all duration-300 transform hover:translate-x-2 focus:outline-none focus:underline focus:decoration-indigo-400 focus:decoration-2 focus:underline-offset-4 w-full text-left min-h-[48px] flex items-center`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="flex-1">{item.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;