import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MarsBackground from '../components/MarsBackground';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  HeartIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const contactInfo = [
    {
      id: 'phone',
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+8801833136933'],
      description: 'Direct contact',
      gradient: 'from-green-500 to-emerald-600',
      action: 'tel:+8801833136933'
    },
    {
      id: 'email',
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['kaysanariz1@gmail.com'],
      description: 'Send us an email',
      gradient: 'from-blue-500 to-cyan-600',
      action: 'mailto:kaysanariz1@gmail.com'
    },
    {
      id: 'location',
      icon: MapPinIcon,
      title: 'Location',
      details: ['South Point School and College', 'Malibagh, Dhaka'],
      description: 'Visit our facility',
      gradient: 'from-purple-500 to-pink-600',
      action: '#'
    }
  ];

  const contactTypes = [
    { value: 'general', label: 'General', icon: ChatBubbleLeftRightIcon, color: 'blue' },
    { value: 'partnership', label: 'Partnership', icon: HeartIcon, color: 'purple' },
    { value: 'technical', label: 'Technical', icon: RocketLaunchIcon, color: 'green' },
    { value: 'sponsorship', label: 'Sponsorship', icon: BuildingOfficeIcon, color: 'pink' }
  ];

  const teamMembers = [
    {
      name: 'Kaysan Ariz Zayan',
      role: 'Team Leader',
      phone: '+8801833136933',
      whatsapp: '8801833136933',
      facebook: 'https://www.facebook.com/share/1JCohgZ5io/',
      email: 'kaysanariz1@gmail.com',
      image: '/Images/Kaysan Ariz zayan.jpg',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      name: 'Muhammad Muntasir Rahman',
      role: 'Senior Engineer',
      phone: '+8801730662954',
      whatsapp: '8801730662954',
      facebook: 'https://www.facebook.com/share/1GfUvRFNhF/?mibextid=wwXIfr',
      email: 'muhammadmuntasirrahman@gmail.com',
      image: '/Images/Muhammad Muntasir Rahman.jpg',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      name: 'Rahmatullah Khan Ayman',
      role: 'Research Scientist',
      phone: '+8801747611903',
      whatsapp: '8801747611903',
      email: 'Rahmatullahkhanayman@gmail.com',
      image: '/Images/Rahmatullah Khan Ayman.jpg',
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactType: 'general'
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-sm text-white relative overflow-hidden z-10">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                y: [0, -120, 0],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6
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
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent"
            >
              Contact Us
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-6"
            >
              Get in touch with our Mars Rover team.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contact our team directly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const isHovered = hoveredCard === info.id;
              
              return (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  onHoverStart={() => setHoveredCard(info.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  <div className="relative text-center">
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {info.title}
                    </h3>
                    
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className={`text-gray-600 ${
                          info.id === 'email' ? 'text-xs break-all' : 'text-sm'
                        }`}>
                          {detail}
                        </p>
                      ))}
                    </div>
                    
                    <p className="text-gray-500 text-xs mb-4">
                      {info.description}
                    </p>

                    {info.action !== '#' && (
                      <motion.a
                        href={info.action}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center space-x-2 bg-gradient-to-r ${info.gradient} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300`}
                      >
                        <span>Contact</span>
                        <PaperAirplaneIcon className="h-4 w-4" />
                      </motion.a>
                    )}

                    {/* Hover sparkles */}
                    <motion.div
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                      <SparklesIcon className="h-5 w-5 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50/90 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Send Message</h3>
                <p className="text-gray-600 text-sm">
                  Send us a message and we'll respond soon.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {contactTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <motion.label
                          key={type.value}
                          whileHover={{ scale: 1.01 }}
                          className={`relative flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all duration-300 ${
                            formData.contactType === type.value
                              ? `border-${type.color}-500 bg-${type.color}-50`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactType"
                            value={type.value}
                            checked={formData.contactType === type.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <Icon className={`h-3 w-3 ${
                            formData.contactType === type.value 
                              ? `text-${type.color}-600` 
                              : 'text-gray-400'
                          }`} />
                          <span className={`text-xs font-medium ${
                            formData.contactType === type.value 
                              ? `text-${type.color}-700` 
                              : 'text-gray-600'
                          }`}>
                            {type.label}
                          </span>
                        </motion.label>
                      );
                    })}
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                    >
                      <ExclamationCircleIcon className="h-4 w-4" />
                      <span>{errors.name}</span>
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="Your email"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                    >
                      <ExclamationCircleIcon className="h-4 w-4" />
                      <span>{errors.email}</span>
                    </motion.p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
                      errors.subject 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                      placeholder="Subject"
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                    >
                      <ExclamationCircleIcon className="h-4 w-4" />
                      <span>{errors.subject}</span>
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                    >
                      <ExclamationCircleIcon className="h-4 w-4" />
                      <span>{errors.message}</span>
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Submit Status */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`p-4 rounded-lg flex items-center space-x-3 ${
                        submitStatus === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                      )}
                      <span>
                        {submitStatus === 'success' 
                          ? 'Message sent successfully! We\'ll get back to you soon.' 
                          : 'Failed to send message. Please try again.'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Team Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Team Contact</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Contact our team members directly.
                </p>
              </div>

              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${member.gradient} rounded-full p-1`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=96`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{member.name}</h4>
                      <p className="text-gray-600 text-sm">{member.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.a
                      href={`tel:${member.phone}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      title={member.phone}
                    >
                      <PhoneIcon className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Call</span>
                    </motion.a>

                    <motion.a
                      href={`mailto:${member.email}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <EnvelopeIcon className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Email</span>
                    </motion.a>

                    <motion.a
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">WhatsApp</span>
                    </motion.a>

                    {member.facebook && (
                      <motion.a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <GlobeAltIcon className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Facebook</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Explore?
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              Join our Mars mission. Contact us for partnerships or collaborations.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl"
              >
                <RocketLaunchIcon className="h-6 w-6 group-hover:animate-bounce" />
                <span>Start a Project</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <LightBulbIcon className="h-6 w-6" />
                <span>Learn More</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
