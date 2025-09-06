import { useState } from 'react';
import { motion } from 'framer-motion';
import MarsBackground from '../../components/MarsBackground';
import {
  CameraIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  BeakerIcon,
  SunIcon,
  ShieldCheckIcon,
  CloudIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  CubeIcon,
  TruckIcon,
  CircleStackIcon,
  MapIcon,
  FireIcon
} from '@heroicons/react/24/outline';

const Features = ({ roverVersion = "1.0" }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const roverFeatures = [
    {
      icon: CameraIcon,
      title: "HD AI Camera",
      description: "Eyes on Mars! Navigates rocky terrain, low-light craters, and dust storms. Think Mastcam-Z vibes, spotting hazards and prime science targets.",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Robotic Claw Arm",
      description: "Multi-joint precision for picking rocks, instruments, and samples without damage. Servo-powered, like a mechanical ninja grabbing fragile stuff.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30"
    },
    {
      icon: CogIcon,
      title: "Excavator Arm",
      description: "Digs deep soil layers for ice, organics, and past-life clues. Works with AI to find the juiciest underground samples.",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30"
    },
    {
      icon: CubeIcon,
      title: "Drilling Arm",
      description: "Smashes hard rocks safely for inner-layer analysis. Hard-core science without breaking nearby instruments.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: CircleStackIcon,
      title: "Sample Collection System",
      description: "Sterile storage carousel keeps rocks and soil pristine. Measures weight & optical properties before secure storage—like a mini lab on wheels.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: TruckIcon,
      title: "Sample Rover (MSR)",
      description: "Mini deployable bot collecting samples from risky or far zones—extends reach, saves main rover from danger.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30"
    },
    {
      icon: TruckIcon,
      title: "Assistant Rover",
      description: "Backup squad! Transports tools, clears obstacles, and handles minor repairs—keeps the mission smooth.",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/30"
    },
    {
      icon: CogIcon,
      title: "Bogie Suspension System",
      description: "Six-wheel rocker-bogie keeps the ride smooth, stable, and unstoppable on rocky Mars terrain.",
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30"
    },
    {
      icon: BeakerIcon,
      title: "Soil & Microbial Analysis",
      description: "Measures pH, moisture, and microbial clues. Essential for habitability & past water investigation.",
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/30"
    },
    {
      icon: SunIcon,
      title: "Solar + Dust Cleaner",
      description: "High-efficiency panels with auto dust removal. No dust = full power, all day, every day.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: ShieldCheckIcon,
      title: "Warm Electronics Box (WEB)",
      description: "Thermal shield for electronics & batteries. Survives -90°C nights like a boss.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: CloudIcon,
      title: "Atmospheric Analysis Unit",
      description: "Tracks CO₂, H₂, O₂, temperature, pressure, humidity, wind—Mars weather, decoded in real time.",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/30"
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Metal Detection",
      description: "Finds iron, nickel, meteorites—geology and resource exploration. Treasure hunter mode activated!",
      color: "from-zinc-500 to-gray-500",
      bgColor: "bg-zinc-500/10",
      borderColor: "border-zinc-500/30"
    },
    {
      icon: BoltIcon,
      title: "Iron Oxide Energy Sensor",
      description: "Experimental energy generator from Mars hematite—backup juice beyond solar.",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    }
  ];

  const workflowSteps = [
    { step: "Scan", icon: MagnifyingGlassIcon, color: "from-blue-500 to-cyan-500" },
    { step: "Analyze", icon: BeakerIcon, color: "from-cyan-500 to-teal-500" },
    { step: "Dig", icon: CogIcon, color: "from-teal-500 to-green-500" },
    { step: "Drill", icon: CubeIcon, color: "from-green-500 to-lime-500" },
    { step: "Grab", icon: WrenchScrewdriverIcon, color: "from-lime-500 to-yellow-500" },
    { step: "Store", icon: CircleStackIcon, color: "from-yellow-500 to-orange-500" },
    { step: "Preserve", icon: ShieldCheckIcon, color: "from-orange-500 to-red-500" },
    { step: "Repeat", icon: MapIcon, color: "from-red-500 to-pink-500" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/95 via-orange-900/95 to-amber-900/95 backdrop-blur-sm text-white relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CogIcon className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              Mars Rover Features
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Discover the cutting-edge technology and innovative systems that power 
              our Mars Rover Version {roverVersion} exploration mission.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-orange-300 font-semibold">Advanced AI Systems</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-red-300 font-semibold">Mars Exploration Ready</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">🚀 Mars Rover Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each component is engineered for extreme conditions, designed to work as a synchronized crew 
              for efficient, safe, and groundbreaking Mars exploration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roverFeatures.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  onClick={() => setSelectedFeature(feature)}
                  className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${feature.borderColor} ${feature.bgColor}`}
                >
                  <div className="relative p-8">
                    {/* Feature Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Feature Info */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className={`w-3 h-3 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">💡 How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              The main rover, sample bot, and assistant squad work as a synced crew, 
              keeping Mars exploration efficient, safe, and lit.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <Icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                  </motion.div>
                  
                  <span className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {step.step}
                  </span>
                  
                  {index < workflowSteps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="hidden lg:block absolute top-8 left-20 w-16 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"
                      style={{ transformOrigin: 'left' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl inline-block shadow-lg">
              <p className="text-lg font-semibold">
                Scan → Analyze → Dig → Drill → Grab → Store → Preserve → Repeat
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeature(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-r ${selectedFeature.color} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                <selectedFeature.icon className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedFeature.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{selectedFeature.description}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFeature(null)}
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Features;
