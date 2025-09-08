import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarsBackground from '../components/MarsBackground';
import {
  RocketLaunchIcon,
  TrophyIcon,
  SparklesIcon,
  FireIcon,
  PhotoIcon,
  EyeIcon,
  CalendarIcon,
  MapPinIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Achievement = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleGalleryClick = () => {
    navigate('/gallery');
  };

  const achievements = [
    {
      id: 'uiu-mars-rover',
      title: 'A Tour to UIU Mars Rover',
      shortTitle: 'UIU Mars Tour',
      description: 'An incredible journey exploring the United International University Mars Rover project. Witnessing cutting-edge technology and innovative engineering solutions that push the boundaries of space exploration.',
      icon: RocketLaunchIcon,
      gradient: 'from-blue-500 to-purple-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      imageCount: 9,
      imagePrefix: 'u-',
      date: 'March 2024',
      location: 'UIU Campus',
      category: 'Educational Tour'
    },
    {
      id: 'robo-soccer',
      title: 'ROBO Soccer Day',
      shortTitle: 'Robo Soccer',
      description: 'An exciting day of robotic football competition showcasing advanced AI and robotics technology. Teams battled with their autonomous robots in thrilling matches that demonstrated precision, strategy, and innovation.',
      icon: TrophyIcon,
      gradient: 'from-emerald-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      imageCount: 6,
      imagePrefix: 's-',
      date: 'February 2024',
      location: 'Sports Arena',
      category: 'Competition'
    },
    {
      id: 'rocket-adventure',
      title: 'Rocket Adventure Day',
      shortTitle: 'Rocket Adventure',
      description: 'A thrilling rocket launch event where we experienced the power of aerospace engineering. From model rockets to advanced propulsion systems, this adventure ignited our passion for space exploration.',
      icon: FireIcon,
      gradient: 'from-orange-500 to-red-600',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      imageCount: 4,
      imagePrefix: 'r-',
      date: 'January 2024',
      location: 'Launch Site',
      category: 'Space Event'
    },
    {
      id: 'wice-national',
      title: 'WICE National Round BD',
      shortTitle: 'WICE National',
      description: 'Representing Bangladesh at the WICE National Round, showcasing our innovative solutions and competing with the brightest minds in the country. A proud moment of national representation and technological excellence.',
      icon: SparklesIcon,
      gradient: 'from-purple-500 to-pink-600',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      imageCount: 8,
      imagePrefix: 'w-',
      date: 'April 2024',
      location: 'Dhaka, Bangladesh',
      category: 'National Competition'
    }
  ];


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <MarsBackground />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-gradient-to-br from-red-900/95 via-orange-900/90 to-amber-900/95 backdrop-blur-sm text-white relative z-10"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <TrophyIcon className="h-12 w-12 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Our Achievements
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl lg:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed"
          >
            Celebrating milestones in our journey to Mars - Every achievement brings us closer to the Red Planet
          </motion.p>
        </div>
      </motion.section>

      {/* Achievements Grid */}
      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-purple-900/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-yellow-400/30">
              <span className="text-yellow-300 text-sm font-bold tracking-wider uppercase">
                Our Journey
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Milestone Moments
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the extraordinary moments that define our path to Mars exploration
            </p>
          </motion.div>

          {/* Achievement Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredCard(achievement.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl"
                      style={{ backgroundColor: achievement.glowColor }}
                    />
                    
                    {/* Gradient Border Animation */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      animate={hoveredCard === achievement.id ? {
                        background: [
                          `linear-gradient(0deg, ${achievement.gradient.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                          `linear-gradient(90deg, ${achievement.gradient.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                          `linear-gradient(180deg, ${achievement.gradient.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                          `linear-gradient(270deg, ${achievement.gradient.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                        ]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ padding: '2px' }}
                    >
                      <div className="w-full h-full bg-black/80 rounded-3xl" />
                    </motion.div>

                    {/* Card Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          animate={hoveredCard === achievement.id ? {
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`w-16 h-16 bg-gradient-to-r ${achievement.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{achievement.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{achievement.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        className={`inline-block bg-gradient-to-r ${achievement.gradient} px-4 py-2 rounded-full mb-4 self-start`}
                      >
                        <span className="text-white text-sm font-bold">
                          {achievement.category}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {achievement.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.div
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 flex-grow"
                      >
                        <p className="text-gray-300 leading-relaxed">
                          {achievement.description}
                        </p>
                      </motion.div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <PhotoIcon className="w-5 h-5" />
                          <span className="text-sm">
                            {achievement.imageCount} Photos
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <EyeIcon className="w-5 h-5" />
                          <span className="text-sm">Gallery View</span>
                        </div>
                      </div>

                      {/* Gallery View Button */}
                      <motion.button
                        onClick={handleGalleryClick}
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: `0 20px 40px ${achievement.glowColor}` 
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full bg-gradient-to-r ${achievement.gradient} text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden`}
                      >
                        {/* Button Background Animation */}
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        
                        <span className="relative z-10">Gallery View</span>
                        <ArrowRightIcon className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>

                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievement;