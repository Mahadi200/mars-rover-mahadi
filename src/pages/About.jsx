import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';

// Lazy load the video monitor for better performance
const VideoMonitor = lazy(() => import('../components/VideoMonitor'));
import {
  RocketLaunchIcon,
  BeakerIcon,
  CameraIcon,
  MapIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  StarIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  PlayIcon,
  EyeIcon,
  CommandLineIcon,
  Square3Stack3DIcon,
  BoltIcon,
  WifiIcon,
  ChartBarIcon,
  SparklesIcon,
  FireIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const backgroundRef = useRef(null);
  const marsRoverRef = useRef(null);
  const particleRefs = useRef([]);

  // Enhanced 3D Mars Background Effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const objectives = [
    {
      icon: GlobeAltIcon,
      title: "Planetary Exploration",
      description: "Conduct comprehensive surface analysis and mapping of Mars terrain to understand geological composition and history.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: BeakerIcon,
      title: "Scientific Discovery",
      description: "Search for signs of past or present life through advanced spectroscopic analysis and sample collection.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: RocketLaunchIcon,
      title: "Technology Advancement",
      description: "Pioneer cutting-edge autonomous navigation and AI-driven decision-making systems for future missions.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: StarIcon,
      title: "Future Colonization",
      description: "Gather critical data for human settlement planning including atmospheric analysis and resource mapping.",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const features = [
    {
      id: 'navigation',
      icon: MapIcon,
      title: "Autonomous Navigation",
      description: "Advanced AI-powered pathfinding with real-time obstacle detection and route optimization.",
      details: [
        "Machine learning terrain analysis",
        "Real-time hazard avoidance",
        "GPS-independent positioning",
        "Adaptive route planning"
      ],
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 'camera',
      icon: CameraIcon,
      title: "Multi-Spectral Imaging",
      description: "High-resolution camera systems capturing visible, infrared, and UV spectrum imagery.",
      details: [
        "4K panoramic photography",
        "Infrared thermal imaging",
        "UV fluorescence detection",
        "3D stereoscopic mapping"
      ],
      color: "from-emerald-600 to-teal-600"
    },
    {
      id: 'science',
      icon: BeakerIcon,
      title: "Laboratory Analysis",
      description: "Onboard scientific instruments for chemical composition and biological marker detection.",
      details: [
        "X-ray spectroscopy",
        "Organic compound detection",
        "Mineral identification",
        "Atmospheric analysis"
      ],
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 'communication',
      icon: WifiIcon,
      title: "Deep Space Communication",
      description: "High-gain antenna systems for reliable data transmission across interplanetary distances.",
      details: [
        "X-band radio communication",
        "Data compression algorithms",
        "Error correction protocols",
        "Orbital relay coordination"
      ],
      color: "from-amber-600 to-orange-600"
    },
    {
      id: 'power',
      icon: BoltIcon,
      title: "Nuclear Power System",
      description: "Radioisotope thermoelectric generator providing consistent power for extended missions.",
      details: [
        "Multi-mission power source",
        "Weather-independent operation",
        "Thermal management system",
        "Battery backup integration"
      ],
      color: "from-red-600 to-pink-600"
    },
    {
      id: 'ai',
      icon: CpuChipIcon,
      title: "AI Decision Making",
      description: "Machine learning algorithms for autonomous operation and scientific prioritization.",
      details: [
        "Pattern recognition",
        "Autonomous decision trees",
        "Scientific target prioritization",
        "Anomaly detection systems"
      ],
      color: "from-indigo-600 to-blue-600"
    }
  ];

  const workflowSteps = [
    {
      id: 1,
      title: "Mission Planning",
      description: "Define objectives and plan optimal routes",
      icon: CommandLineIcon,
      details: "Advanced algorithms analyze terrain data and mission requirements to create optimal exploration paths."
    },
    {
      id: 2,
      title: "Navigation & Movement",
      description: "Autonomous pathfinding and obstacle avoidance",
      icon: MapIcon,
      details: "AI-powered navigation system continuously maps environment and adjusts routes in real-time."
    },
    {
      id: 3,
      title: "Data Collection",
      description: "Multi-sensor scientific measurements",
      icon: BeakerIcon,
      details: "Comprehensive sensor suite collects geological, atmospheric, and visual data simultaneously."
    },
    {
      id: 4,
      title: "Analysis & Processing",
      description: "Onboard data analysis and prioritization",
      icon: CpuChipIcon,
      details: "Advanced AI algorithms process data locally and identify scientifically significant findings."
    },
    {
      id: 5,
      title: "Communication",
      description: "Transmit findings to Earth stations",
      icon: WifiIcon,
      details: "High-gain antenna systems relay compressed data packages to Earth through orbital satellites."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Simplified Mars Rover Background */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 -z-10"
        style={{
          transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px, 0) translateY(${scrollY * 0.2}px)`
        }}
      >
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-black to-red-900/70"></div>
        
        {/* Mars Atmosphere Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-orange-600/20"></div>
        
        {/* Futuristic Mars Surface */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1600&auto=format&fit=crop&q=80")',
            backgroundSize: '120% 120%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `scale(1.1) translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px, 0)`,
            filter: 'hue-rotate(15deg) contrast(1.3) brightness(0.8)'
          }}
        ></div>

        {/* Simplified Mars Rover Planet */}
        <motion.div
          className="absolute top-10 right-4 sm:right-10 w-32 h-32 sm:w-40 sm:h-40"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`
          }}
        >
          <div 
            className="w-full h-full rounded-full shadow-xl"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ff6b4a 0%, #d63384 40%, #8b4513 70%, #654321 100%)',
              boxShadow: 'inset -8px -8px 16px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 74, 0.3)'
            }}
          />
        </motion.div>

        {/* Simplified Particle System */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-orange-400/40 rounded-full"
              animate={{
                y: [0, -100],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`
              }}
            />
          ))}
        </div>

        {/* Advanced Terrain Layers */}
        <div className="absolute bottom-0 left-0 right-0 h-96">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to top, 
                  rgba(139, 0, 0, 0.9) 0%, 
                  rgba(178, 34, 34, 0.7) 30%, 
                  rgba(220, 20, 60, 0.5) 60%, 
                  transparent 100%
                )
              `,
              transform: `translateX(${mousePosition.x * -0.4}px) translateY(${scrollY * 0.05}px)`
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to top, 
                  rgba(255, 69, 0, 0.8) 0%, 
                  rgba(255, 140, 0, 0.6) 40%, 
                  transparent 100%
                )
              `,
              transform: `translateX(${mousePosition.x * -0.7}px) translateY(${scrollY * 0.03}px)`
            }}
          />
        </div>

        {/* Futuristic Atmospheric Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-blue-900/20"></div>
        
        {/* Dynamic Energy Rays */}
        <motion.div
          className="absolute top-0 right-1/3 w-3 h-full bg-gradient-to-b from-cyan-400/30 via-blue-400/20 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [1, 2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `rotate(20deg) translateX(${mousePosition.x * 0.2}px)`,
            filter: 'blur(3px)'
          }}
        />
        <motion.div
          className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-orange-300/25 via-red-400/15 to-transparent"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleX: [1, 1.8, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{
            transform: `rotate(-15deg) translateX(${mousePosition.x * -0.3}px)`,
            filter: 'blur(4px)'
          }}
        />

        {/* Cosmic Stars Field */}
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 10
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
              }}
            />
          ))}
        </div>

        {/* Nebula Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-15"
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, rgba(138, 43, 226, 0.2) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 60%, rgba(30, 144, 255, 0.2) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 30%, rgba(255, 20, 147, 0.15) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 40%, rgba(138, 43, 226, 0.2) 0%, transparent 60%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Solar Wind Effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(60deg, 
                transparent 0%, 
                rgba(255, 215, 0, 0.05) 30%, 
                transparent 60%, 
                rgba(255, 165, 0, 0.03) 80%, 
                transparent 100%
              )
            `,
            transform: `translateX(${scrollY * 0.2}px)`
          }}
        />
      </div>

      {/* Futuristic Hero Section */}
      <section className="py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-12"
          >
            {/* Futuristic Team Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block relative"
            >
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-3xl px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <p className="text-cyan-300 text-lg font-medium">
                    <span className="font-bold text-cyan-200 text-xl">Alar Gari</span> • Powered by{' '}
                    <span className="font-semibold text-white">South Point School & College</span>
                  </p>
                  <p className="text-cyan-400/80 text-sm mt-2 font-light">
                    🚀 Bangladesh's Premier Student Robotics Team
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Epic Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="space-y-6"
            >
              <motion.h1 
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 50px rgba(59, 130, 246, 0.8)"
                }}
                className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight cursor-pointer group"
              >
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-400 transition-all duration-700">
                  MARS
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:via-red-300 group-hover:to-pink-400 transition-all duration-700">
                  EXPLORATION
                </span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.1,
                  x: 20,
                  textShadow: "0 0 30px rgba(251, 146, 60, 0.8)"
                }}
                className="text-3xl lg:text-5xl font-light text-orange-300 hover:text-orange-200 transition-all duration-500 cursor-pointer"
              >
                Pioneering the Future of Space Technology
              </motion.h2>
            </motion.div>

            {/* Epic Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <motion.p
                whileHover={{ 
                  scale: 1.02,
                  y: -10,
                  textShadow: "0 0 20px rgba(34, 197, 94, 0.6)"
                }}
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-light hover:text-emerald-300 transition-all duration-500 cursor-pointer group"
              >
                <span className="group-hover:text-cyan-300 transition-colors duration-500">
                  We are forging the path to interplanetary civilization through cutting-edge robotics, 
                  artificial intelligence, and revolutionary space technology. Our mission transcends Earth's 
                  boundaries to inspire humanity's greatest adventure among the stars.
                </span>
              </motion.p>
            </motion.div>

            {/* Futuristic Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5), 0 0 50px rgba(59, 130, 246, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl transition-all duration-500 flex items-center space-x-3 shadow-2xl shadow-blue-600/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <RocketLaunchIcon className="h-6 w-6 group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Launch Mission Control</span>
                <FireIcon className="h-5 w-5 group-hover:text-orange-300 transition-colors relative z-10" />
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-orange-500/20 backdrop-blur-xl text-orange-300 font-bold text-lg rounded-2xl border-2 border-orange-400/50 hover:bg-orange-500/30 hover:border-orange-300 transition-all duration-500 flex items-center space-x-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <PlayIcon className="h-6 w-6 group-hover:text-orange-200 transition-colors relative z-10" />
                <span className="relative z-10">Experience Mars</span>
                <SparklesIcon className="h-5 w-5 group-hover:animate-spin transition-all relative z-10" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mars Rover Documentation Monitor */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-full px-6 py-3 mb-10 border border-cyan-400/30">
              <span className="text-cyan-300 text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
                <span>Mission Documentation</span>
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Behind the
              </span>
              <span className="text-white"> Scenes of </span>
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Mars Exploration
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
              Watch exclusive footage of our Mars Rover development, testing procedures, and the brilliant minds 
              behind this revolutionary space exploration technology.
            </p>
          </motion.div>

          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          }>
            <VideoMonitor 
              youtubeId="9sfeQVPAP2A"
              title="We Are Born To Learn"
              subtitle="Team SPSC • Alor Gari Innovation Journey"
              autoPlay={false}
              showControls={true}
              className="mb-16"
            />
          </Suspense>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/20">
              <h3 className="text-cyan-300 font-bold text-lg mb-2">Development Phase</h3>
              <p className="text-gray-400 text-sm">18 months of intensive research and engineering</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/20">
              <h3 className="text-orange-300 font-bold text-lg mb-2">Testing Protocols</h3>
              <p className="text-gray-400 text-sm">Over 500 simulation tests in Mars-like conditions</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/20">
              <h3 className="text-purple-300 font-bold text-lg mb-2">Team Collaboration</h3>
              <p className="text-gray-400 text-sm">25+ students working across multiple disciplines</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Mission Objectives */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full px-6 py-3 mb-10 border border-purple-400/30">
              <span className="text-purple-300 text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
                <StarIcon className="h-4 w-4" />
                <span>Mission Objectives</span>
                <StarIcon className="h-4 w-4" />
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Pioneering
              </span>
              <span className="text-white"> the </span>
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Red Planet
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
              Our advanced Mars Rover mission represents humanity's boldest step toward becoming 
              a multi-planetary species, combining cutting-edge AI, quantum sensors, and revolutionary exploration technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    rotateY: 5
                  }}
                  className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-gray-500/50 transition-all duration-500 overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${objective.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{
                         boxShadow: `inset 0 0 50px rgba(59, 130, 246, 0.2), 0 0 50px rgba(59, 130, 246, 0.1)`
                       }}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${objective.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                      {objective.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {objective.description}
                    </p>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <SparklesIcon className="h-6 w-6 text-cyan-400" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Futuristic Features Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-black/95 backdrop-blur-xl relative z-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-full px-6 py-3 mb-10 border border-cyan-400/30">
              <span className="text-cyan-300 text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
                <BoltIcon className="h-4 w-4" />
                <span>Advanced Technology</span>
                <BoltIcon className="h-4 w-4" />
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Next-Gen
              </span>
              <span className="text-white"> Rover </span>
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Systems
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto font-light">
              Our Mars Rover deploys revolutionary quantum sensors, AI-powered navigation, and autonomous sample collection 
              systems that redefine the boundaries of space exploration technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -20,
                    rotateX: 5,
                    rotateY: 5
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-600/50 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{
                         boxShadow: hoveredFeature === index 
                           ? `inset 0 0 50px rgba(34, 197, 94, 0.2), 0 0 50px rgba(34, 197, 94, 0.1)`
                           : 'none'
                       }}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    {/* Feature Details */}
                    <AnimatePresence>
                      {hoveredFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          {feature.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detailIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.1 }}
                              className="flex items-center space-x-2 text-sm text-cyan-300"
                            >
                              <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                              <span>{detail}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Floating Icon */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <EyeIcon className="h-5 w-5 text-purple-400" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-32 bg-gradient-to-br from-black/95 via-red-900/30 to-orange-900/40 backdrop-blur-xl relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-full px-6 py-3 mb-10 border border-orange-400/30">
              <span className="text-orange-300 text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
                <SunIcon className="h-4 w-4" />
                <span>Mission Workflow</span>
                <SunIcon className="h-4 w-4" />
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Revolutionary
              </span>
              <span className="text-white"> Mars </span>
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Operations
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-6xl mx-auto font-light">
              Experience the future of Mars exploration through our quantum-enhanced rover systems, 
              featuring AI-driven autonomous navigation, advanced sample preservation, and real-time environmental adaptation.
            </p>
          </motion.div>

          {/* Enhanced Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -20,
                    rotateY: 10
                  }}
                  onMouseEnter={() => setActiveStep(index)}
                  className="group text-center relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative mb-8">
                    {/* Enhanced Icon Container */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-orange-500/30">
                        <Icon className="h-12 w-12 text-white" />
                      </div>
                      
                      {/* Step Number */}
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/30">
                        {step.id}
                      </div>
                      
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)',
                          filter: 'blur(20px)',
                          transform: 'scale(1.5)'
                        }}
                      />
                    </div>
                    
                    {/* Enhanced Connection Line */}
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-full w-8 h-1 bg-gradient-to-r from-orange-400 to-red-400 opacity-60">
                        <motion.div
                          className="absolute -top-2 right-0"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRightIcon className="h-5 w-5 text-orange-400" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                  
                  {/* Enhanced Details */}
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-4 border border-orange-400/30 shadow-2xl"
                      >
                        <p className="text-orange-300 text-sm leading-relaxed">
                          {step.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Floating Particles */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className="absolute w-1 h-1 bg-orange-400 rounded-full"
                        animate={{
                          x: [0, Math.random() * 100 - 50],
                          y: [0, Math.random() * 100 - 50],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: particleIndex * 0.3
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Epic Call to Action */}
      <section className="py-40 relative z-10 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-blue-900/90 to-cyan-900/95"></div>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                x: [0, 150, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 6
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-2xl border border-cyan-400/30 rounded-4xl p-16 relative overflow-hidden"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-4xl bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              <div className="relative z-10">
                <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Ready to
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Conquer Mars?
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 leading-relaxed font-light mb-12 max-w-4xl mx-auto">
                  Join humanity's greatest adventure and experience the cutting-edge technology 
                  that will shape our multi-planetary future through our revolutionary Mars Rover mission control.
                </p>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-3xl font-bold text-xl hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-500 shadow-2xl shadow-blue-600/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <RocketLaunchIcon className="h-8 w-8 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10">Initialize Mars Mission</span>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="relative z-10"
                  >
                    <SparklesIcon className="h-6 w-6" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
