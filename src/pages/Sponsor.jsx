import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MarsBackground from '../components/MarsBackground';
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  HeartIcon,
  RocketLaunchIcon,
  StarIcon,
  HandRaisedIcon,
  GiftIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LightBulbIcon,
  TrophyIcon,
  ClockIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

const Sponsor = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState(null);
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  const sponsors = [
    {
      id: 'akij-dairy',
      name: 'Akij Dairy Limited',
      type: 'Corporate Partner',
      category: 'Industry & Innovation',
      logo: '/Images/sponsor/akij.png',
      description: 'Akij Dairy Ltd. is a concern of the Akij Group, one of the largest conglomerates in Bangladesh. Established to ensure high-quality dairy products for consumers, the company operates with a strong focus on freshness, nutrition, and safety.',
      supportLevel: 'Platinum',
      since: '2023',
      website: '#',
      benefits: [
        'Advanced Technology Funding',
        'Research & Development Support',
        'Strategic Partnership',
        'Innovation Mentorship'
      ],
      achievements: [
        'Enabled cutting-edge rover development',
        'Funded advanced AI systems',
        'Supported international collaboration',
        'Pioneered space technology innovation'
      ],
      gradient: 'from-blue-600 to-purple-600',
      icon: BuildingOfficeIcon
    },
    {
      id: 'south-point',
      name: 'South Point School & College',
      type: 'Educational Institution',
      category: 'Academic Partner',
      logo: '/Images/sponsor/SPSC.jpg',
      description: 'Premier educational institution fostering scientific excellence and supporting student-led research initiatives. South Point School & College provides world-class education and cutting-edge facilities for innovative projects.',
      supportLevel: 'Gold',
      since: '2022',
      website: '#',
      benefits: [
        'Laboratory Facilities',
        'Research Infrastructure',
        'Academic Guidance',
        'Student Development Programs'
      ],
      achievements: [
        'Provided world-class facilities',
        'Mentored student researchers',
        'Enabled practical learning',
        'Fostered innovation culture'
      ],
      gradient: 'from-emerald-600 to-teal-600',
      icon: AcademicCapIcon
    },
    {
      id: 'fusion-net',
      name: 'Fusion Net Limited',
      type: 'Technology Partner',
      category: 'Telecommunications & IT',
      logo: '/Images/sponsor/Fusion Net .jpg',
      description: 'Leading telecommunications and IT solutions provider supporting advanced communication systems and network infrastructure for space exploration projects. Fusion Net Limited delivers cutting-edge connectivity solutions.',
      supportLevel: 'Gold',
      since: '2023',
      website: '#',
      benefits: [
        'Network Infrastructure',
        'Communication Systems',
        'Technical Support',
        'Data Management Solutions'
      ],
      achievements: [
        'Established robust communication links',
        'Provided reliable data transmission',
        'Enabled real-time mission monitoring',
        'Supported remote operations'
      ],
      gradient: 'from-orange-600 to-red-600',
      icon: SignalIcon
    }
  ];

  const sponsorshipTiers = [
    {
      tier: 'Platinum',
      color: 'from-blue-400 to-purple-500',
      benefits: ['Logo on rover', 'Mission naming rights', 'VIP mission access', 'Technology collaboration'],
      icon: TrophyIcon
    },
    {
      tier: 'Gold',
      color: 'from-yellow-400 to-orange-500',
      benefits: ['Mission documentation', 'Research collaboration', 'Educational partnership', 'Brand visibility'],
      icon: StarIcon
    },
    {
      tier: 'Silver',
      color: 'from-gray-400 to-gray-600',
      benefits: ['Mission updates', 'Event invitations', 'Community recognition', 'Social media features'],
      icon: ShieldCheckIcon
    }
  ];

  const impactStats = [
    { label: 'Active Sponsors', value: '3', icon: HandRaisedIcon },
    { label: 'Years of Support', value: '2+', icon: ClockIcon },
    { label: 'Innovation Projects', value: '20+', icon: LightBulbIcon }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-sm text-white relative overflow-hidden z-10">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
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
              className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <HeartIcon className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              Our Sponsors
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Grateful to our incredible sponsors who fuel our mission to explore Mars 
              and push the boundaries of space technology innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-pink-300 font-semibold">Making Mars Accessible</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-cyan-300 font-semibold">Pioneering Innovation</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-gray-900 mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Sponsors */}
      <section className="py-20 bg-gray-50/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These visionary organizations believe in our mission and provide the support 
              that makes Mars exploration possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {sponsors.map((sponsor, index) => {
              const Icon = sponsor.icon;
              const isHovered = hoveredSponsor === sponsor.id;
              
              return (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  onHoverStart={() => setHoveredSponsor(sponsor.id)}
                  onHoverEnd={() => setHoveredSponsor(null)}
                  onClick={() => setSelectedSponsor(sponsor)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8">
                    {/* Sponsor Logo/Image */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        rotate: isHovered ? 2 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-6"
                    >
                      <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 bg-white p-4 shadow-inner">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 filter brightness-100 contrast-110"
                          style={{ imageRendering: 'crisp-edges' }}
                        />
                      </div>
                      
                      {/* Support Level Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.3 + 0.5 }}
                        className={`absolute -top-2 right-4 bg-gradient-to-r ${sponsor.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold`}
                      >
                        {sponsor.supportLevel} Partner
                      </motion.div>
                    </motion.div>

                    {/* Sponsor Info */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.1 : 1
                          }}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 bg-gradient-to-r ${sponsor.gradient} rounded-xl flex items-center justify-center`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                            {sponsor.name}
                          </h3>
                          <p className="text-gray-500 font-medium">{sponsor.type}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {sponsor.description}
                      </p>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Partner Since</p>
                          <p className="font-semibold text-gray-900">{sponsor.since}</p>
                        </div>
                      </div>

                      {/* Key Benefits Preview */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Key Support Areas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {sponsor.benefits.slice(0, 2).map((benefit, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                          {sponsor.benefits.length > 2 && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                              +{sponsor.benefits.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Sparkles */}
                    <motion.div
                      className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                      <SparklesIcon className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-20 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Sponsorship Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in shaping the future of space exploration. 
              Various partnership levels available to match your organization's vision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => {
              const Icon = tier.icon;
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
                  className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    viewport={{ once: true }}
                    className={`w-20 h-20 bg-gradient-to-r ${tier.color} rounded-3xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{tier.tier}</h3>
                  
                  <div className="space-y-3">
                    {tier.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-gray-600"
                      >
                        <StarIcon className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600/95 to-pink-600/95 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Join Our Mission
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed">
              Be part of humanity's next giant leap. Partner with us to make Mars exploration 
              a reality and inspire the next generation of space pioneers.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center space-x-3 bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl"
            >
              <RocketLaunchIcon className="h-6 w-6 group-hover:animate-bounce" />
              <span>Become a Sponsor</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Detailed Sponsor Modal */}
      <AnimatePresence>
        {selectedSponsor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSponsor(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 bg-white p-6 shadow-inner">
                  <img
                    src={selectedSponsor.logo}
                    alt={selectedSponsor.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 filter brightness-100 contrast-110"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedSponsor.name}</h2>
                <p className={`text-lg font-semibold bg-gradient-to-r ${selectedSponsor.gradient} bg-clip-text text-transparent mb-4`}>
                  {selectedSponsor.type}
                </p>
                <p className="text-gray-600">{selectedSponsor.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Support Benefits */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Support Benefits</h3>
                  <div className="space-y-2">
                    {selectedSponsor.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-600">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Key Achievements</h3>
                  <div className="space-y-2">
                    {selectedSponsor.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-600">
                        <TrophyIcon className="h-4 w-4 text-yellow-600" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Partnership Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Support Level</p>
                  <p className="font-bold text-gray-900">{selectedSponsor.supportLevel}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Partner Since</p>
                  <p className="font-bold text-gray-900">{selectedSponsor.since}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-bold text-gray-900">{selectedSponsor.category}</p>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSponsor(null)}
                  className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sponsor;