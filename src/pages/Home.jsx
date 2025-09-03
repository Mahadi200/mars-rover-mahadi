// eslint-disable-next-line
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import {
  RocketLaunchIcon,
  TrophyIcon,
  UsersIcon,
  BeakerIcon,
  CameraIcon,
  GlobeAltIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const backgroundRef = useRef(null);
  const marsRef = useRef(null);

  // 3D Mars Background Effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
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

  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Mission Control",
      description: "Real-time monitoring and control of Mars Rover operations with advanced telemetry data.",
      link: "/mars-rover-1",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: TrophyIcon,
      title: "Achievements",
      description: "Groundbreaking discoveries and milestones in Mars exploration and scientific research.",
      link: "/achievement",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30"
    },
    {
      icon: UsersIcon,
      title: "Expert Team",
      description: "Meet the brilliant scientists, engineers, and researchers driving Mars exploration forward.",
      link: "/team",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: BeakerIcon,
      title: "Science Lab",
      description: "Advanced laboratory analysis with quantum instruments and AI-powered discoveries.",
      link: "/mars-rover-1/science",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: CameraIcon,
      title: "Live Camera",
      description: "High-resolution imagery and real-time visual data from the Martian surface.",
      link: "/mars-rover-1/camera",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    {
      icon: GlobeAltIcon,
      title: "Navigation",
      description: "Precision navigation systems with autonomous pathfinding and obstacle detection.",
      link: "/mars-rover-1/navigation",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30"
    }
  ];

  const missionHighlights = [
    {
      number: "2,547",
      label: "Sols on Mars",
      description: "Days of successful operation"
    },
    {
      number: "47.2",
      label: "Kilometers",
      description: "Distance traveled on surface"
    },
    {
      number: "15,823",
      label: "Images",
      description: "High-resolution photos captured"
    },
    {
      number: "1,247",
      label: "Samples",
      description: "Scientific specimens analyzed"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 -z-10"
        style={{
          transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0) translateY(${scrollY * 0.3}px)`
        }}
      >
        {/* Mars Atmosphere Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-red-900/30 to-amber-900/20"></div>
        
        {/* Mars Surface Texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&auto=format&fit=crop&q=80")',
            backgroundSize: '150% 150%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `scale(1.1) translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px, 0)`
          }}
        ></div>

        {/* 3D Mars Planet */}
        <motion.div
          ref={marsRef}
          className="absolute top-10 right-10 w-96 h-96"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 15, 0, -15, 0]
          }}
          transition={{
            rotateY: { duration: 60, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${mousePosition.y * 2}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative w-full h-full">
            {/* Mars sphere with realistic texture */}
            <div 
              className="w-full h-full rounded-full shadow-2xl"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, #ff6b4a 0%, #d63384 25%, #8b4513 50%, #654321 75%, #2d1810 100%),
                  linear-gradient(45deg, transparent 30%, rgba(255, 107, 74, 0.3) 50%, transparent 70%),
                  conic-gradient(from 0deg, #ff6b4a, #d63384, #8b4513, #654321, #ff6b4a)
                `,
                boxShadow: `
                  inset -20px -20px 40px rgba(0, 0, 0, 0.6),
                  inset 20px 20px 40px rgba(255, 107, 74, 0.3),
                  0 0 60px rgba(255, 107, 74, 0.4),
                  0 0 120px rgba(213, 51, 132, 0.2)
                `
              }}
            >
              {/* Mars surface details */}
              <div className="absolute inset-0 rounded-full opacity-40">
                <div className="w-4 h-4 bg-red-800 rounded-full absolute top-1/4 left-1/3 shadow-lg"></div>
                <div className="w-6 h-6 bg-orange-800 rounded-full absolute top-2/3 right-1/4 shadow-lg"></div>
                <div className="w-3 h-3 bg-amber-700 rounded-full absolute bottom-1/3 left-1/2 shadow-lg"></div>
                <div className="w-8 h-2 bg-red-900 rounded-full absolute top-1/2 left-1/4 shadow-lg"></div>
                <div className="w-5 h-5 bg-orange-900 rounded-full absolute bottom-1/4 right-1/3 shadow-lg"></div>
              </div>
              
              {/* Atmospheric glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 via-transparent to-red-600/20"></div>
            </div>

            {/* Mars moons */}
            <motion.div
              className="absolute -top-8 -right-8 w-6 h-6 bg-gray-400 rounded-full shadow-lg"
              animate={{
                rotateZ: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.6), 0 0 10px rgba(156, 163, 175, 0.3)'
              }}
            />
            <motion.div
              className="absolute -bottom-12 -left-12 w-4 h-4 bg-gray-500 rounded-full shadow-lg"
              animate={{
                rotateZ: [0, -360]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.6), 0 0 8px rgba(107, 114, 128, 0.3)'
              }}
            />
          </div>
        </motion.div>

        {/* Floating Mars Dust Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-300/40 rounded-full"
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 400 - 200],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 4px rgba(251, 146, 60, 0.6)'
              }}
            />
          ))}
        </div>

        {/* Mars Terrain Layers */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to top, 
                  rgba(139, 69, 19, 0.8) 0%, 
                  rgba(160, 82, 45, 0.6) 30%, 
                  rgba(205, 133, 63, 0.4) 60%, 
                  transparent 100%
                )
              `,
              transform: `translateX(${mousePosition.x * -0.5}px) translateY(${scrollY * 0.1}px)`
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to top, 
                  rgba(178, 34, 34, 0.6) 0%, 
                  rgba(165, 42, 42, 0.4) 40%, 
                  transparent 100%
                )
              `,
              transform: `translateX(${mousePosition.x * -0.8}px) translateY(${scrollY * 0.05}px)`
            }}
          />
        </div>

        {/* Atmospheric Haze */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-900/10 to-red-900/20"></div>
        
        {/* Dynamic Light Rays */}
        <motion.div
          className="absolute top-0 right-1/4 w-2 h-full bg-gradient-to-b from-yellow-300/20 via-orange-300/10 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleX: [1, 1.5, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `rotate(15deg) translateX(${mousePosition.x * 0.3}px)`,
            filter: 'blur(1px)'
          }}
        />
        <motion.div
          className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-orange-200/15 via-red-300/8 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleX: [1, 2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            transform: `rotate(-10deg) translateX(${mousePosition.x * -0.2}px)`,
            filter: 'blur(2px)'
          }}
        />

        {/* Distant Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)'
              }}
            />
          ))}
        </div>

        {/* Asteroid Belt */}
        <div className="absolute top-1/4 left-0 right-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              animate={{
                x: [-50, window.innerWidth + 50],
                rotate: [0, 360]
              }}
              transition={{
                x: { duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" },
                rotate: { duration: 5 + Math.random() * 3, repeat: Infinity, ease: "linear" }
              }}
              style={{
                top: `${Math.random() * 20}px`,
                left: `-50px`,
                boxShadow: 'inset -1px -1px 2px rgba(0, 0, 0, 0.5), 0 0 3px rgba(156, 163, 175, 0.3)',
                transform: `scale(${0.5 + Math.random() * 0.8})`
              }}
            />
          ))}
        </div>

        {/* Solar Wind Effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, 
                transparent 0%, 
                rgba(255, 193, 7, 0.03) 25%, 
                transparent 50%, 
                rgba(255, 152, 0, 0.02) 75%, 
                transparent 100%
              )
            `,
            transform: `translateX(${scrollY * 0.1}px)`
          }}
        />

        {/* Nebula Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-gray-50/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Explore Mars Like Never Before
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover cutting-edge technology, groundbreaking science, and humanity's greatest adventure
              in space exploration through our advanced Mars Rover mission.
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className={`group relative bg-white rounded-2xl p-8 border ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`relative z-10 ${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <Link
                      to={feature.link}
                      className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors"
                    >
                      <span>Explore More</span>
                      <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Hover Effect Sparkles */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <SparklesIcon className="h-5 w-5 text-gray-400" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Highlights */}
      <section className="py-20 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-900/95 backdrop-blur-sm text-white relative overflow-hidden z-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Mission by the Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Incredible achievements and milestones from our ongoing Mars exploration mission
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {missionHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                  >
                    {highlight.number}
                  </motion.div>
                  <div className="text-lg font-semibold text-white mb-1">
                    {highlight.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    {highlight.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-600/95 via-orange-500/95 to-amber-500/95 backdrop-blur-sm relative overflow-hidden z-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Join the Mission to Mars
            </h2>
            <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Be part of humanity's greatest adventure. Explore cutting-edge technology, 
              witness groundbreaking discoveries, and help shape the future of space exploration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/mars-rover-1"
                  className="group inline-flex items-center space-x-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl shadow-black/20"
                >
                  <RocketLaunchIcon className="h-6 w-6 group-hover:animate-bounce" />
                  <span>Start Exploring</span>
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/about"
                  className="group inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <GlobeAltIcon className="h-6 w-6 group-hover:text-orange-200 transition-colors" />
                  <span>Learn More</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;