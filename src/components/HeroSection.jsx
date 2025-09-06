import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RocketLaunchIcon,
  GlobeAltIcon,
  StarIcon,
  SparklesIcon,
  PlayIcon,
  EyeIcon,
  CameraIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [particleAnimation, setParticleAnimation] = useState(true);
  const heroRef = useRef(null);
  const roverRef = useRef(null);

  const slides = [
    {
      title: "Hello Explorers! Join us as we build and control our very own Mars Rover",
      subtitle: "Explore The planet by Mars Rover(Voyager of Light)",
      description: "Journey to Mars,the Red planet where Science Technology,and human curiosity come together to explore new worlds,unlock mysteries and push the boundaries of discovery",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop&q=80",
      color: "from-red-600 to-orange-500"
    },
    {
      title: "Mars Rover V1",
      subtitle: "Advanced Exploration",
      description: "Our state-of-the-art rover is equipped with quantum sensors, AI navigation, and revolutionary scientific instruments.",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&auto=format&fit=crop&q=80",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Scientific Discovery",
      subtitle: "Unlocking Mysteries",
      description: "Discover ancient water channels, mineral compositions, and potential signs of life on the Martian surface.",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80",
      color: "from-emerald-600 to-teal-600"
    }
  ];

  const stats = [
    { icon: RocketLaunchIcon, value: "2.5K", label: "Sols Operational", color: "text-red-400", hideOnMobile: true },
    { icon: GlobeAltIcon, value: "47.2", label: "Kilometers Traveled", color: "text-blue-400", hideOnMobile: true },
    { icon: BeakerIcon, value: "1,247", label: "Samples Analyzed", color: "text-emerald-400", hideOnMobile: true },
    { icon: CameraIcon, value: "15.8K", label: "Images Captured", color: "text-purple-400", hideOnMobile: true }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering, slides.length]);

  useEffect(() => {
    // 3D mouse movement effect
    const handleMouseMove = (e) => {
      if (heroRef.current && roverRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        
        roverRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      ref={heroRef}
      className="relative h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black rounded-[30px] mx-4 sm:mx-6 lg:mx-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background Particles */}
      {particleAnimation && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)
                ],
                y: [
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
                ],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Dynamic Background with Sliding Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05, x: 100 }}
          animate={{ opacity: 0.3, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0 rounded-[30px]"
        >
          <img
            src={currentSlideData.image}
            alt="Mars landscape"
            className="w-full h-full object-cover rounded-[30px]"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.color}/60 rounded-[30px]`}></div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-4 sm:px-6 lg:px-16">
        {/* Left Content */}
        <div className="flex-1 max-w-3xl w-full lg:w-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 50, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Animated Welcome Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
              >
                <SparklesIcon className="h-5 w-5 text-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-sm font-medium">Mission Status: Active</span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.02,
                    textShadow: "0 0 30px rgba(59, 130, 246, 0.8)"
                  }}
                  className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight cursor-pointer group"
                >
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-400 transition-all duration-500">
                    {currentSlideData.title}
                  </span>
                </motion.h1>
                
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.05,
                    x: 10,
                    textShadow: "0 0 20px rgba(251, 146, 60, 0.6)"
                  }}
                  className="text-xl sm:text-2xl lg:text-4xl font-semibold text-gray-300 hover:text-orange-300 transition-all duration-300 cursor-pointer"
                >
                  {currentSlideData.subtitle}
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  textShadow: "0 0 15px rgba(34, 197, 94, 0.4)"
                }}
                className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl hover:text-gray-300 transition-all duration-300 cursor-pointer group"
              >
                <span className="group-hover:text-emerald-300 transition-colors duration-300">
                  {currentSlideData.description}
                </span>
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 w-full sm:w-auto"
                >
                  <RocketLaunchIcon className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Explore Mars Rover</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <PlayIcon className="h-5 w-5 group-hover:text-cyan-400 transition-colors" />
                  <span>Watch Mission</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Content - 3D Mars Rover */}
        <div className="hidden lg:block flex-1 max-w-2xl">
          <motion.div
            ref={roverRef}
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 3D Rover Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transform scale-150"></div>
              
              {/* Main Rover Image */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 1, 0, -1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=600&auto=format&fit=crop&q=80"
                  alt="Mars Rover"
                  className="w-full h-auto rounded-2xl shadow-2xl shadow-blue-500/25"
                />
                
                {/* Animated Scanner Lines */}
                <motion.div
                  animate={{
                    scaleY: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent rounded-2xl"
                ></motion.div>
              </motion.div>

              {/* Floating Data Points */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-6"
      >
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`text-center group cursor-pointer ${stat.hideOnMobile ? 'hidden md:block' : ''}`}
                >
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-sm sm:text-base font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 sm:bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'bg-white shadow-lg shadow-white/50 scale-110'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Particle Toggle */}
      <motion.button
        onClick={() => setParticleAnimation(!particleAnimation)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <SparklesIcon className={`h-6 w-6 ${particleAnimation ? 'text-cyan-400' : 'text-gray-400'}`} />
      </motion.button>
    </div>
  );
};

export default HeroSection;
