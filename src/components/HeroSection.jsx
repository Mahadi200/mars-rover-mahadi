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
      title: "Welcome to Mars",
      subtitle: "Explore the Red Planet",
      description: "Join humanity's greatest adventure in space exploration with cutting-edge technology and groundbreaking discoveries.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop&q=80",
      color: "from-red-600 to-orange-500"
    },
    {
      title: "Mars Rover X1",
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
    { icon: RocketLaunchIcon, value: "2.5K", label: "Sols Operational", color: "text-red-400" },
    { icon: GlobeAltIcon, value: "47.2", label: "Kilometers Traveled", color: "text-blue-400" },
    { icon: BeakerIcon, value: "1,247", label: "Samples Analyzed", color: "text-emerald-400" },
    { icon: CameraIcon, value: "15.8K", label: "Images Captured", color: "text-purple-400" }
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background Particles */}
      {particleAnimation && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      )}

      {/* Dynamic Background with Sliding Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlideData.image}
            alt="Mars landscape"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.color}/60`}></div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between min-h-screen px-6 lg:px-16">
        {/* Left Content */}
        <div className="flex-1 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
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
                  className="text-6xl lg:text-8xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                    {currentSlideData.title}
                  </span>
                </motion.h1>
                
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl lg:text-4xl font-semibold text-gray-300"
                >
                  {currentSlideData.subtitle}
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-400 leading-relaxed max-w-2xl"
              >
                {currentSlideData.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-blue-600/25"
                >
                  <RocketLaunchIcon className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Explore Mars Rover</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
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
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group cursor-pointer"
                >
                  <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg shadow-white/50'
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
        className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <SparklesIcon className={`h-6 w-6 ${particleAnimation ? 'text-cyan-400' : 'text-gray-400'}`} />
      </motion.button>
    </div>
  );
};

export default HeroSection;
