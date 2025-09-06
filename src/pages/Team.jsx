import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import MarsBackground from '../components/MarsBackground';
import {
  AcademicCapIcon,
  UserIcon,
  StarIcon,
  RocketLaunchIcon,
  DocumentIcon,
  SparklesIcon,
  BoltIcon,
  CommandLineIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
  HeartIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projectInfo = {
    name: " Mars Rover",
    teamName: "Mars Rover",
    heroQuote: "We don't just dream of Mars, we build the road to it...",
    description: "Discover the journey of our passionate team of young innovators, engineers, and dreamers who are building Sparkeo – our Mars Rover. With a blend of creativity, technical expertise, and dedication, we aim to push the boundaries of robotics and space exploration. Our mission is not just to build a rover, but to inspire, innovate, and create meaningful impact as we represent Bangladesh on the global stage."
  };

  const projectStats = [
    {
      label: "Project",
      value: "Mars Rover",
      icon: RocketLaunchIcon,
      color: "from-red-500 to-orange-500"
    },
    {
      label: "Team Members", 
      value: "3",
      icon: UserIcon,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Years Experience",
      value: "2",
      icon: StarIcon,
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Projects Completed",
      value: "9",
      icon: DocumentIcon,
      color: "from-emerald-500 to-teal-500"
    },
    {
      label: "Innovations",
      value: "5+",
      icon: AcademicCapIcon,
      color: "from-amber-500 to-yellow-500"
    }
  ];

  const teamMembers = [
    {
      id: 'leader',
      name: 'Kaysan Ariz Zayan',
      role: 'Team Leader & Innovation & Strategic Operations Head',
      description: 'The visionary driving force behind the Mars Rover project. Kaysan combines inventive thinking with strategic precision, turning complex challenges into actionable solutions. With a keen eye for innovation and an ability to foresee opportunities where others see obstacles, he leads the team with clarity, confidence, and a relentless pursuit of excellence. His guidance ensures that every mission component aligns seamlessly with the project\'s ambitious goals.',
      image: '/public/Images/Kaysan Ariz zayan.jpg',
      gradient: 'from-blue-500 to-purple-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      skills: ['Strategic Planning', 'Project Management', 'Innovation Leadership', 'Team Coordination'],
      achievements: ['Mars Mission Planning', 'Strategic Innovation', 'Team Leadership Excellence'],
      primaryIcon: CommandLineIcon,
      specialty: 'Strategic Operations'
    },
    {
      id: 'member1',
      name: 'Muhammad Muntasir Rahman',
      role: 'Team Co-lead, Mechanical Head',
      description: 'Muntasir transforms complex mechanical challenges into elegant, reliable solutions, ensuring the rover\'s design and functionality are flawless. With a meticulous attention to detail and a deep understanding of machinery, he bridges innovation and practicality, turning visionary concepts into tangible, mission-ready technology. His leadership in mechanical design keeps the team moving forward with precision and confidence.',
      image: '/public/Images/Muhammad Muntasir Rahman.jpg',
      gradient: 'from-emerald-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      skills: ['Mechanical Design', 'CAD Engineering', 'Robotics Systems', 'Precision Manufacturing'],
      achievements: ['Rover Chassis Design', 'Mechanical Innovation', 'Engineering Excellence'],
      primaryIcon: WrenchScrewdriverIcon,
      specialty: 'Mechanical Engineering'
    },
    {
      id: 'member2',
      name: 'Rahmatullah Khan Ayman',
      role: 'Team Co-lead & Electric Head',
      description: 'Rahmatullah masterfully designs and manages the rover\'s intricate electrical systems, ensuring every circuit and connection operates flawlessly under extreme conditions. His innovative approach and technical precision transform complex electrical challenges into seamless solutions, keeping the mission energized and the team moving forward with confidence.',
      image: '/public/Images/Rahmatullah Khan Ayman.jpg',
      gradient: 'from-orange-500 to-red-600',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      skills: ['Circuit Design', 'Power Systems', 'Electronics Integration', 'Signal Processing'],
      achievements: ['Electrical System Design', 'Power Management', 'Circuit Innovation'],
      primaryIcon: BoltIcon,
      specialty: 'Electrical Engineering'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Interactive Cursor Effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          background: `radial-gradient(circle, rgba(255,107,74,0.8) 0%, transparent 70%)`,
        }}
        animate={{
          x: typeof window !== 'undefined' ? mousePosition.x * window.innerWidth / 100 - 16 : 0,
          y: typeof window !== 'undefined' ? mousePosition.y * window.innerHeight / 100 - 16 : 0,
          scale: hoveredMember ? 2 : 1,
          opacity: hoveredMember ? 0.8 : 0.4
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Dynamic Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Floating Geometric Shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${10 + (i % 5) * 20}%`,
              top: `${10 + Math.floor(i / 5) * 30}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className={`w-16 h-16 ${i % 3 === 0 ? 'bg-orange-500/20' : i % 3 === 1 ? 'bg-blue-500/20' : 'bg-purple-500/20'} 
              ${i % 4 === 0 ? 'rounded-full' : i % 4 === 1 ? 'rounded-lg rotate-45' : i % 4 === 2 ? 'rounded-none' : 'rounded-full'}`} />
          </motion.div>
        ))}
      </motion.div>

      {/* 3D Mars Background */}
      <MarsBackground />
      
      {/* Hero Section */}
      <section data-section="0" className="py-32 bg-gradient-to-br from-red-900/95 via-orange-900/90 to-amber-900/95 backdrop-blur-sm text-white relative overflow-hidden z-10">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {/* Cosmic Energy Waves */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(255,107,74,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255,107,74,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(255,107,74,0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Pulsing Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [0, 4],
                opacity: [0.5, 0],
                rotate: [0, 180]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeOut"
              }}
            >
              <div className="w-32 h-32 border-2 border-orange-400/30 rounded-full" />
            </motion.div>
          ))}
          
          {/* Stellar Particles */}
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
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
              className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <RocketLaunchIcon className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 bg-clip-text text-transparent">
                {projectInfo.heroQuote}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl lg:text-3xl font-semibold mb-8 text-orange-100"
            >
              {projectInfo.teamName} Team
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg lg:text-xl text-orange-100 max-w-5xl mx-auto leading-relaxed mb-12"
            >
              {projectInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            >
              <span className="text-cyan-300 font-semibold">Project:</span>
              <span className="text-white">{projectInfo.name}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Stats */}
      <section data-section="1" className="py-20 bg-gradient-to-br from-gray-900/95 via-black/90 to-red-900/95 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Mission Statistics
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our journey in numbers - from dreams to reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {projectStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -10 }}
                  className="text-center group relative"
                >
                  <div className="relative">
                    <div className={`bg-gradient-to-r ${stat.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} w-20 h-20 rounded-3xl mx-auto opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl`}></div>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1, delay: index * 0.2, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="text-4xl lg:text-5xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300"
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-gray-400 font-medium text-lg group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team - Spectacular Design */}
      <section data-section="2" className="py-32 relative z-10 overflow-hidden">
        {/* Revolutionary Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/40 to-red-900/50">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(139,69,19,0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(139,69,19,0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(139,69,19,0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(139,69,19,0.4) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/20 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 300 - 150],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeOut"
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-full px-6 py-3 mb-10 border border-orange-400/30">
              <span className="text-orange-300 text-sm font-bold tracking-wider uppercase">
                Our Visionaries
              </span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The brilliant minds behind the Mars Rover project - where vision meets innovation, 
              and dreams become reality on the Red Planet.
            </p>
          </motion.div>

          {/* Revolutionary Team Cards */}
          <div className="space-y-32">
            {teamMembers.map((member, index) => {
              const PrimaryIcon = member.primaryIcon;
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.8, rotateY: index % 2 === 0 ? -45 : 45 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1.2, delay: index * 0.3, type: "spring" }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className={`group relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Spectacular Card Container */}
                  <div className="relative max-w-6xl mx-auto">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}>
                      
                      {/* Revolutionary Image Section */}
                      <motion.div
                        className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                        whileHover={{ 
                          scale: 1.05, 
                          rotateY: index % 2 === 0 ? 8 : -8,
                          z: 50
                        }}
                        transition={{ duration: 0.6, type: "spring" }}
                      >
                        <div className="relative group-hover:transform group-hover:scale-105 transition-all duration-700">
                          {/* Multi-layer Glow Effects */}
                          <motion.div
                            className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                              background: `radial-gradient(circle, ${member.glowColor} 0%, transparent 70%)`,
                              filter: 'blur(20px)'
                            }}
                          />
                          
                          {/* Main Image Container */}
                          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.target.src = `https://images.unsplash.com/photo-150700321116${index}?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3`;
                              }}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Floating Icon */}
                            <motion.div
                              className="absolute top-6 right-6"
                              animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <div className={`w-12 h-12 bg-gradient-to-r ${member.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                                <PrimaryIcon className="w-6 h-6 text-white" />
                              </div>
                            </motion.div>
                            
                            {/* Specialty Badge */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.2 }}
                              className="absolute bottom-6 left-6 right-6"
                            >
                              <div className="bg-black/80 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/20">
                                <p className="text-white font-semibold text-sm text-center">
                                  {member.specialty}
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Revolutionary Content Section */}
                      <motion.div
                        className={`relative space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                      >
                        {/* Animated Name with Typewriter Effect */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                          className="space-y-4"
                        >
                          <motion.h3
                            className="text-4xl lg:text-5xl font-bold text-white leading-tight"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            {member.name.split(' ').map((word, wordIndex) => (
                              <motion.span
                                key={wordIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.2 + wordIndex * 0.1 }}
                                className="inline-block mr-2"
                              >
                                {word}
                              </motion.span>
                            ))}
                          </motion.h3>
                          
                          {/* Animated Role Badge */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.2, type: "spring", stiffness: 200 }}
                            className="inline-block"
                          >
                            <div className={`bg-gradient-to-r ${member.gradient} px-6 py-3 rounded-full shadow-2xl border border-white/20`}>
                              <span className="text-white font-bold text-sm lg:text-base">
                                {member.role}
                              </span>
                            </div>
                          </motion.div>
                        </motion.div>

                        {/* Enhanced Description */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 + index * 0.2, duration: 0.8 }}
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                        >
                          <p className="text-white text-lg lg:text-xl leading-relaxed font-light">
                            {member.description}
                          </p>
                        </motion.div>

                        {/* Skills Grid */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                          className="grid grid-cols-2 gap-3"
                        >
                          {member.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              transition={{ 
                                delay: 1.4 + index * 0.2 + skillIndex * 0.1, 
                                type: "spring",
                                stiffness: 200 
                              }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-center group hover:bg-white/25 transition-all duration-300 shadow-lg"
                            >
                              <span className="text-white text-sm font-semibold group-hover:font-bold transition-all duration-300">
                                {skill}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Achievements with Icons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6 + index * 0.2, duration: 0.8 }}
                          className="space-y-3"
                        >
                          <h4 className="text-white font-semibold text-lg flex items-center space-x-2">
                            <TrophyIcon className="w-5 h-5 text-yellow-400" />
                            <span>Key Achievements</span>
                          </h4>
                          <div className="space-y-2">
                            {member.achievements.map((achievement, achIndex) => (
                              <motion.div
                                key={achIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.8 + index * 0.2 + achIndex * 0.1 }}
                                className="flex items-center space-x-3 text-white hover:text-yellow-200 transition-colors duration-300 bg-white/5 rounded-lg p-2"
                              >
                                <SparklesIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                <span className="text-sm font-medium">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Floating Action Buttons */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2.0 + index * 0.2, type: "spring" }}
                          className="flex space-x-4"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
                          >
                            <HeartIcon className="w-4 h-4" />
                            <span>Connect</span>
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                          >
                            <ArrowRightIcon className="w-4 h-4" />
                            <span>Learn More</span>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </div>
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

export default Team;