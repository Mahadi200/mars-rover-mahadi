import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { 
  HomeIcon, 
  InformationCircleIcon, 
  UserGroupIcon, 
  TrophyIcon,
  RocketLaunchIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapIcon,
  ChartBarIcon,
  CameraIcon,
  BeakerIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Mars animation setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, 200);
    renderer.setClearColor(0x000000, 0);

    // Create Mars sphere with multiple layers for realism
    const marsGeometry = new THREE.SphereGeometry(15, 64, 64);
    
    const marsMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcd5c5c,
      shininess: 10,
      transparent: true,
      opacity: 0.9,
      bumpScale: 0.5
    });
    
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    mars.position.set(-30, 0, 0);
    scene.add(mars);

    // Add Mars atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(16, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.position.set(-30, 0, 0);
    scene.add(atmosphere);

    // Add some floating particles/dust
    const dustGeometry = new THREE.BufferGeometry();
    const dustMaterial = new THREE.PointsMaterial({ 
      color: 0xd95350, 
      size: 0.3,
      transparent: true,
      opacity: 0.6
    });
    
    const dustVertices = [];
    for (let i = 0; i < 200; i++) {
      dustVertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
    }
    
    dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustVertices, 3));
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      starsVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 50;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      mars.rotation.y += 0.005;
      atmosphere.rotation.y += 0.003;
      stars.rotation.y += 0.0002;
      dust.rotation.x += 0.001;
      dust.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = 200;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About', href: '/about', icon: InformationCircleIcon },
    { name: 'Team', href: '/team', icon: UserGroupIcon },
    { name: 'Achievement', href: '/achievement', icon: TrophyIcon },
    { name: 'Mars Rover 1.0', href: '/mars-rover-1', icon: RocketLaunchIcon },
    { name: 'Mars Rover 2.0', href: '/mars-rover-2', icon: RocketLaunchIcon },
  ];

  const quickLinks = [
    { name: 'Mission Status', href: '#', icon: ChartBarIcon },
    { name: 'Live Feed', href: '#', icon: CameraIcon },
    { name: 'Mars Weather', href: '#', icon: GlobeAltIcon },
    { name: 'Rover Tracking', href: '#', icon: MapIcon },
    { name: 'Research Data', href: '#', icon: BeakerIcon },
    { name: 'Gallery', href: '#', icon: StarIcon },
  ];

  const marsInfo = [
    { label: 'Distance from Earth', value: '225M km' },
    { label: 'Surface Temperature', value: '-80°C avg' },
    { label: 'Day Length', value: '24h 37m' },
    { label: 'Gravity', value: '0.38g' },
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* 3D Mars Animation Background */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{ height: '100%' }}
      />
      
      {/* Footer Content */}
      <div className="relative z-10 bg-gradient-to-r from-gray-900/90 via-red-900/20 to-gray-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RocketLaunchIcon className="h-8 w-8 text-red-400" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                  Mars Rover
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Pioneering the exploration of Mars through advanced robotic technology. 
                Join us on humanity's greatest adventure to understand the Red Planet.
              </p>
              <div className="flex space-x-4">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-400 border-b border-red-400/30 pb-2">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                      >
                        <Icon className="h-4 w-4 text-red-400 group-hover:text-red-300 transition-colors" />
                        <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400 border-b border-orange-400/30 pb-2">
                Quick Access
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                      >
                        <Icon className="h-4 w-4 text-orange-400 group-hover:text-orange-300 transition-colors" />
                        <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mars Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-yellow-400/30 pb-2">
                Mars Facts
              </h4>
              <div className="space-y-3">
                {marsInfo.map((info) => (
                  <div key={info.label} className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm border border-gray-700/50">
                    <div className="text-xs text-gray-400 uppercase tracking-wide">
                      {info.label}
                    </div>
                    <div className="text-sm font-semibold text-yellow-300 mt-1">
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-400">
                  &copy; 2025 Mars Rover Control Center. All rights reserved.
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <Link to="/contact" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Contact Us
                </Link>
                <Link to="/faq" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  FAQ
                </Link>
                <Link to="/sponsor" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Sponsors
                </Link>
              </div>
            </div>

            {/* Made by Dreams of Bangladesh */}
            <div className="mt-6 flex items-center justify-center">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-red-900/30 via-orange-900/30 to-yellow-900/30 backdrop-blur-sm border border-orange-400/20 rounded-full px-6 py-3">
                <HeartIcon className="h-5 w-5 text-red-400 animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  Made with passion by
                </span>
                <div className="flex items-center space-x-2">
                  <StarIcon className="h-4 w-4 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-sm font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Dreams of Bangladesh
                  </span>
                  <StarIcon className="h-4 w-4 text-yellow-400 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                </div>
              </div>
            </div>
            
            {/* Mission Status Indicator */}
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">
                Mission Active • Sol 1247 • Last Contact: 2 hours ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
