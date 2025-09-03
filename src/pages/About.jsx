import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
  ChartBarIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              About Mars Rover X1
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed"
            >
              Pioneering the future of interplanetary exploration through cutting-edge technology, 
              advanced AI systems, and revolutionary scientific capabilities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Objectives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Objectives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our mission objectives drive every aspect of rover design and operation, 
              pushing the boundaries of what's possible in space exploration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${objective.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${objective.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {objective.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {objective.description}
                    </p>
                  </div>

                  {/* Hover Effect Particles */}
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
                    <StarIcon className="h-6 w-6 text-gray-300" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Advanced Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary technology systems working in harmony to enable unprecedented 
              scientific discovery and autonomous operation on Mars.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === feature.id;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -10
                  }}
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          {feature.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center space-x-2 text-sm text-gray-500"
                            >
                              <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                              <span>{detail}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A sophisticated workflow combining autonomous decision-making, 
              advanced sensors, and real-time data processing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Workflow Steps */}
            <div className="space-y-6">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveStep(index)}
                    className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          rotate: isActive ? 360 : 0
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-cyan-500' : 'bg-white/10'
                        }`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`text-sm font-bold ${
                            isActive ? 'text-cyan-400' : 'text-white/60'
                          }`}>
                            STEP {step.id}
                          </span>
                          <h3 className={`text-xl font-bold ${
                            isActive ? 'text-white' : 'text-white/80'
                          }`}>
                            {step.title}
                          </h3>
                        </div>
                        
                        <p className={`${
                          isActive ? 'text-blue-100' : 'text-white/60'
                        } mb-3`}>
                          {step.description}
                        </p>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-blue-200 leading-relaxed"
                            >
                              {step.details}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Flow Chart */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-center mb-8 text-cyan-400">Mission Flow</h3>
                
                <div className="space-y-6">
                  {workflowSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = activeStep === index;
                    
                    return (
                      <div key={index} className="relative">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.2 : 1,
                            backgroundColor: isActive ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                          }}
                          className="w-full p-4 rounded-xl border border-white/20 text-center"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <Icon className={`h-6 w-6 ${isActive ? 'text-cyan-400' : 'text-white/60'}`} />
                            <span className={`font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                              {step.title}
                            </span>
                          </div>
                        </motion.div>
                        
                        {index < workflowSteps.length - 1 && (
                          <motion.div
                            animate={{
                              opacity: activeStep >= index ? 1 : 0.3
                            }}
                            className="flex justify-center my-2"
                          >
                            <ArrowDownIcon className="h-6 w-6 text-cyan-400" />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Auto-advance buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(Math.min(workflowSteps.length - 1, activeStep + 1))}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition-all duration-300"
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Explore Mars?
            </h2>
            <p className="text-xl text-orange-100 leading-relaxed">
              Experience the cutting-edge technology and scientific capabilities 
              of our Mars Rover through our interactive mission control dashboard.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center space-x-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl"
            >
              <RocketLaunchIcon className="h-6 w-6 group-hover:animate-bounce" />
              <span>Start Mission Control</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
