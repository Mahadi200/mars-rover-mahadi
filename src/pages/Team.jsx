import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  UserIcon,
  StarIcon,
  RocketLaunchIcon,
  ChevronRightIcon,
  LinkIcon,
  DocumentIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const projectInfo = {
    name: "Mars Rover",
    teamName: "Mars Rover",
    description: "Pioneering the future of interplanetary exploration through cutting-edge technology and scientific innovation."
  };

  const teamMembers = [
    {
      id: 'leader',
      role: 'Team Leader',
      fullName: 'Kaysan Ariz Zayan',
      phone: '01833136933',
      whatsapp: '01833136933',
      facebook: 'https://www.facebook.com/share/1JCohgZ5io/',
      passportPhoto: 'https://drive.google.com/drive/folders/1rmbYY0fQ3OynYfI305lejn5Z-UmUjxOi?usp=drive_link',
      casualPhoto: 'https://drive.google.com/drive/folders/1rmbYY0fQ3OynYfI305lejn5Z-UmUjxOi?usp=drive_link',
      passportDocument: 'https://drive.google.com/drive/folders/1rmbYY0fQ3OynYfI305lejn5Z-UmUjxOi?usp=drive_link',
      institute: 'South Point School & College',
      address: 'Flat E7,29/1, Resource Sharkar Shahnaj Kunja,Malibag,Dhaka',
      specialization: 'Project Management & Systems Architecture',
      achievements: ['Mars Mission Planning', 'Team Leadership', 'Technical Innovation'],
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'member1',
      role: 'Senior Engineer',
      fullName: 'Muhammad Muntasir Rahman',
      phone: '01730662954',
      whatsapp: '01730662954',
      facebook: 'https://www.facebook.com/share/1GfUvRFNhF/?mibextid=wwXIfr',
      passportPhoto: 'https://drive.google.com/drive/folders/1-rLRMmE1WEkMxwGCEn7G4OF54QO9DvLi?usp=drive_link',
      casualPhoto: 'https://drive.google.com/drive/folders/1-rLRMmE1WEkMxwGCEn7G4OF54QO9DvLi?usp=drive_link',
      institute: 'South Point School & College',
      address: 'Road-4,house c/57,mohanagar project,west rampura,dhaka',
      specialization: 'Robotics & Navigation Systems',
      achievements: ['Autonomous Navigation', 'AI Development', 'System Integration'],
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'member2',
      role: 'Research Scientist',
      fullName: 'Rahmatullah Khan Ayman',
      phone: '01747611903',
      whatsapp: '01747611903',
      facebook: '',
      passportPhoto: 'https://drive.google.com/drive/folders/12fJ82lGhEPrZ3cr6GlH_vQMPV0xZBoRY?usp=drive_link',
      casualPhoto: 'https://drive.google.com/drive/folders/12fJ82lGhEPrZ3cr6GlH_vQMPV0xZBoRY?usp=drive_link',
      institute: 'South Point School & College',
      address: 'South point school and college 102/B,haji nur complex,malibagh',
      specialization: 'Scientific Analysis & Data Processing',
      achievements: ['Scientific Research', 'Data Analysis', 'Laboratory Systems'],
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  const stats = [
    { label: 'Team Members', value: '3', icon: UserIcon },
    { label: 'Years Experience', value: '5+', icon: StarIcon },
    { label: 'Projects Completed', value: '12', icon: RocketLaunchIcon },
    { label: 'Innovations', value: '25+', icon: AcademicCapIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
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
              className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <RocketLaunchIcon className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              {projectInfo.teamName} Team
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-8"
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

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
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
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* Team Members */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals working together to push the boundaries of space exploration 
              and bring Mars closer to humanity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                onHoverStart={() => setHoveredCard(member.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => setSelectedMember(member)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Profile Section */}
                <div className="relative p-8">
                  {/* Profile Image */}
                  <motion.div
                    animate={{
                      scale: hoveredCard === member.id ? 1.1 : 1,
                      rotate: hoveredCard === member.id ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative mb-6"
                  >
                    <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${member.gradient} p-1`}>
                      <img
                        src={member.profileImage}
                        alt={member.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    
                    {/* Role Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${member.gradient} text-white px-4 py-1 rounded-full text-sm font-semibold`}
                    >
                      {member.role}
                    </motion.div>
                  </motion.div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {member.fullName}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {member.specialization}
                    </p>

                    {/* Institute */}
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <AcademicCapIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{member.institute}</span>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-1 mb-6">
                      {member.achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center justify-center space-x-2 text-sm text-gray-600"
                        >
                          <StarIcon className="h-3 w-3 text-yellow-500" />
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick Contact */}
                    <div className="flex justify-center space-x-4">
                      <motion.a
                        href={`tel:${member.phone}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-300"
                      >
                        <PhoneIcon className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                      </motion.a>
                      
                      {member.facebook && (
                        <motion.a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-300"
                        >
                          <LinkIcon className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center">
                      <ChevronRightIcon className="h-5 w-5" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${selectedMember.gradient} p-1 mb-6`}>
                  <img
                    src={selectedMember.profileImage}
                    alt={selectedMember.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.fullName}</h2>
                <p className={`text-lg font-semibold bg-gradient-to-r ${selectedMember.gradient} bg-clip-text text-transparent mb-4`}>
                  {selectedMember.role}
                </p>
                <p className="text-gray-600">{selectedMember.specialization}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                  
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedMember.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">{selectedMember.whatsapp}</p>
                    </div>
                  </div>

                  {selectedMember.facebook && (
                    <div className="flex items-center space-x-3">
                      <LinkIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Facebook</p>
                        <a 
                          href={selectedMember.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedMember.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <AcademicCapIcon className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Institute</p>
                      <p className="font-medium">{selectedMember.institute}</p>
                    </div>
                  </div>
                </div>

                {/* Documents & Photos */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Documents & Photos</h3>
                  
                  <div className="space-y-3">
                    <a
                      href={selectedMember.passportPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CameraIcon className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Passport Size Photo</span>
                    </a>

                    <a
                      href={selectedMember.casualPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CameraIcon className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Casual Photo</span>
                    </a>

                    {selectedMember.passportDocument && (
                      <a
                        href={selectedMember.passportDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <DocumentIcon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">Passport Document</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedMember.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMember(null)}
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

export default Team;
