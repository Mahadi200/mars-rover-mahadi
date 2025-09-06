import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
  HomeIcon,
  ArrowLeftIcon,
  CogIcon,
  ChartBarIcon,
  CameraIcon,
  MapIcon,
  BeakerIcon,
  RocketLaunchIcon,
  BoltIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const MarsRoverNavbar = ({ roverVersion = "1", formattedVersion = "1.0" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSystemsDropdownOpen, setIsSystemsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Determine the base path based on current location
  const getBasePath = () => {
    return `/mars-rover-${roverVersion}`;
  };

  const basePath = getBasePath();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSystemsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSystemsDropdownOpen(false);
  };

  const roverNavigation = [
    { name: 'Dashboard', href: basePath, icon: ChartBarIcon },
    { name: 'Live Camera', href: `${basePath}/camera`, icon: CameraIcon },
    { name: 'Navigation', href: `${basePath}/navigation`, icon: MapIcon },
    { name: 'Science Lab', href: `${basePath}/science`, icon: BeakerIcon },
    { name: 'Features', href: `${basePath}/features`, icon: CogIcon },
    { 
      name: 'Systems', 
      icon: CogIcon,
      dropdown: [
        { name: 'Power Management', href: `${basePath}/power`, icon: BoltIcon, description: 'Solar panels & battery status' },
        { name: 'Communication', href: `${basePath}/communication`, icon: GlobeAltIcon, description: 'Earth communication systems' },
        { name: 'Diagnostics', href: `${basePath}/diagnostics`, icon: CogIcon, description: 'System health monitoring' },
      ]
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isDropdownActive = (dropdown) => {
    return dropdown.some(item => location.pathname === item.href);
  };

  const getRoverDisplayName = () => {
    return `Mars Rover ${formattedVersion}`;
  };

  const getStatusColor = () => {
    return formattedVersion === "1.0" ? "text-blue-400" : "text-purple-400";
  };

  const getAccentColor = () => {
    return formattedVersion === "1.0" ? "border-blue-400" : "border-purple-400";
  };

  return (
    <>
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Mars Rover Specialized Navigation */}
      <nav className="bg-black shadow-2xl relative z-50 border-b-2 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Left: Back to Main + Rover Info */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <ArrowLeftIcon className="h-5 w-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
                <span className="text-sm font-medium">Main Site</span>
              </Link>
              
              <div className="h-8 w-px bg-gray-600"></div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <RocketLaunchIcon className={`h-8 w-8 ${getStatusColor()}`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse`}></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {getRoverDisplayName()}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">Mission Active • Sol 1247</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Rover Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {roverNavigation.map((item) => {
                const Icon = item.icon;
                
                if (item.dropdown) {
                  return (
                    <div key={item.name} className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setIsSystemsDropdownOpen(!isSystemsDropdownOpen)}
                        className={`${
                          isDropdownActive(item.dropdown)
                            ? 'text-white'
                            : 'text-gray-300 hover:text-white'
                        } inline-flex items-center text-sm font-medium transition-all duration-300 ease-out group`}
                      >
                        <Icon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        {item.name}
                        <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-300 ${isSystemsDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isSystemsDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl py-3 z-50 border border-gray-600 backdrop-blur-sm bg-opacity-95">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700">
                            Rover Systems
                          </div>
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                onClick={() => setIsSystemsDropdownOpen(false)}
                                className={`${
                                  isActive(dropdownItem.href)
                                    ? 'bg-red-900 text-red-100 border-l-4 border-red-400'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent'
                                } block px-4 py-4 transition-all duration-300 group/item`}
                              >
                                <div className="flex items-start space-x-3">
                                  <DropdownIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium">{dropdownItem.name}</div>
                                    <div className="text-xs text-gray-400 mt-1">{dropdownItem.description}</div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
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
                        ? `text-white border-b-2 ${getAccentColor()}`
                        : 'text-gray-300 hover:text-white'
                    } inline-flex items-center text-sm font-medium transition-all duration-300 ease-out group relative pb-1`}
                  >
                    <Icon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-all duration-300"
                aria-expanded="false"
                aria-label="Toggle rover navigation menu"
              >
                <span className="sr-only">Open rover menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-black border-t border-gray-800">
            <div className="pt-2 pb-3 space-y-1">
              
              {/* Mobile: Back to main site */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="block pl-3 pr-4 py-3 border-l-4 border-gray-600 text-gray-300 hover:text-white hover:border-white transition-all duration-200"
              >
                <div className="flex items-center">
                  <ArrowLeftIcon className="h-5 w-5 mr-3" />
                  Back to Main Site
                </div>
              </Link>

              {/* Mobile: Rover navigation */}
              {roverNavigation.map((item) => {
                const Icon = item.icon;
                
                if (item.dropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setIsSystemsDropdownOpen(!isSystemsDropdownOpen)}
                        className="w-full text-left pl-3 pr-4 py-3 border-l-4 border-transparent text-gray-300 hover:text-white hover:border-red-500 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon className="h-5 w-5 mr-3" />
                            {item.name}
                          </div>
                          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${
                            isSystemsDropdownOpen ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </button>
                      
                      <div className={`ml-4 space-y-1 transition-all duration-300 bg-gray-900 rounded-md mr-4 ${
                        isSystemsDropdownOpen 
                          ? 'max-h-60 opacity-100 py-2' 
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}>
                        {item.dropdown.map((dropdownItem) => {
                          const DropdownIcon = dropdownItem.icon;
                          return (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              onClick={closeMobileMenu}
                              className="block pl-4 pr-4 py-3 text-sm text-gray-300 hover:text-white transition-all duration-200 mx-2 rounded"
                            >
                              <div className="flex items-center">
                                <DropdownIcon className="h-4 w-4 mr-3" />
                                <div>
                                  <div className="font-medium">{dropdownItem.name}</div>
                                  <div className="text-xs text-gray-500 mt-1">{dropdownItem.description}</div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={`${
                      isActive(item.href)
                        ? 'border-red-500 text-white bg-gray-900'
                        : 'border-transparent text-gray-300 hover:text-white hover:border-red-500'
                    } block pl-3 pr-4 py-3 border-l-4 transition-all duration-200`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MarsRoverNavbar;
