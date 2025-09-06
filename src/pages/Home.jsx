import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const HeroSection = lazy(() => import('../components/HeroSection'));
const VideoMonitor = lazy(() => import('../components/VideoMonitor'));
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

// Simple loading component for lazy components
const ComponentLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const Home = () => {

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
      description: "Groundbreaking discoveries and milestones in Mars Rover exploration and scientific research.",
      link: "/achievement",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30"
    },
    {
      icon: UsersIcon,
      title: "Expert Team",
      description: "Meet the brilliant scientists, engineers, and researchers driving Mars Rover exploration forward.",
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
      description: "High-resolution imagery and real-time visual data from the Mars Rover surface.",
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
      label: "Sols on Mars Rover",
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
      {/* Simplified Mars Background */}
      <div className="fixed inset-0 -z-10">
        {/* Mars Rover Atmosphere Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-red-900/40 to-amber-900/30"></div>
        
        {/* Simplified Mars Rover Surface */}
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255, 107, 74, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(213, 51, 132, 0.2) 0%, transparent 50%)',
               backgroundSize: '80% 80%'
             }}>
        </div>

        {/* Simple Mars Rover Planet */}
        <motion.div
          className="absolute top-10 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div 
            className="w-full h-full rounded-full shadow-xl"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ff6b4a 0%, #d63384 40%, #8b4513 70%, #654321 100%)',
              boxShadow: 'inset -8px -8px 16px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 74, 0.3)'
            }}
          >
            {/* Simple surface features */}
            <div className="absolute inset-0 rounded-full opacity-60">
              <div className="w-2 h-2 bg-red-800 rounded-full absolute top-1/4 left-1/3"></div>
              <div className="w-3 h-3 bg-orange-800 rounded-full absolute top-2/3 right-1/4"></div>
              <div className="w-1.5 h-1.5 bg-amber-700 rounded-full absolute bottom-1/3 left-1/2"></div>
            </div>
          </div>
        </motion.div>

        {/* Simplified floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-orange-300/60 rounded-full"
              animate={{
                y: [0, -100],
                opacity: [0, 0.8, 0],
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

        {/* Simple terrain gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-red-900/40 via-orange-900/20 to-transparent"></div>

        {/* Atmospheric haze */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-900/5 to-red-900/10"></div>
        
        {/* Simple stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <Suspense fallback={<ComponentLoader />}>
        <HeroSection />
      </Suspense>

      {/* Mars Mission Video Monitor */}
      <section className="py-12 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-block bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 border border-red-400/30">
              <span className="text-red-300 text-xs sm:text-sm font-bold tracking-wider uppercase">
                A little bit of mars
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              We Are Born To Learn
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
             We are a team of students from Bangladesh who are passionate about Mars Rover exploration. We are dedicated to learning and sharing our knowledge with the world.
            </p>
          </motion.div>
          
          <Suspense fallback={<ComponentLoader />}>
            <VideoMonitor 
              youtubeId="9sfeQVPAP2A"
              title="We Are Born To Learn"
              subtitle="Alor Gari Innovation"
              autoPlay={false}
              showControls={true}
              className="mb-6 sm:mb-8"
            />
          </Suspense>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-500 text-xs sm:text-sm mb-4">
              Mission Status: <span className="text-green-500 font-semibold">Active</span> • 
              Signal Delay: <span className="text-orange-500 font-semibold">14 minutes</span> • 
              Distance: <span className="text-blue-500 font-semibold">225M km</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-gray-50/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Explore Mars Like Never Before
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover cutting-edge technology, groundbreaking science, and humanity's greatest adventure
              in space exploration through our advanced Mars Rover mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  className={`group relative bg-white rounded-2xl p-6 sm:p-8 border ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`relative z-10 ${feature.bgColor} w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
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
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-900/95 backdrop-blur-sm text-white relative overflow-hidden z-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Mission by the Numbers
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Incredible achievements and milestones from our ongoing Mars Rover exploration mission
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
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
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2"
                  >
                    {highlight.number}
                  </motion.div>
                  <div className="text-sm sm:text-lg font-semibold text-white mb-1">
                    {highlight.label}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {highlight.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-red-600/95 via-orange-500/95 to-amber-500/95 backdrop-blur-sm relative overflow-hidden z-10">
        {/* Simplified Background Elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                opacity: [0, 0.8, 0]
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Join the Mission to Mars
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Be part of humanity's greatest adventure. Explore cutting-edge technology, 
              witness groundbreaking discoveries, and help shape the future of space exploration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/mars-rover-1"
                  className="group inline-flex items-center space-x-2 sm:space-x-3 bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl shadow-black/20"
                >
                  <RocketLaunchIcon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce" />
                  <span>Start Exploring</span>
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/about"
                  className="group inline-flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <GlobeAltIcon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:text-orange-200 transition-colors" />
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