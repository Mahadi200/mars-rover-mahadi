import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MarsBackground from '../components/MarsBackground';
import {
  ArrowLeftIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const Gallery = () => {
  const { achievementId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [achievement, setAchievement] = useState(null);

  // Get achievement data from navigation state or default
  useEffect(() => {
    if (location.state?.achievement) {
      setAchievement(location.state.achievement);
    } else {
      // Fallback data if accessed directly
      const defaultAchievements = {
        'uiu-mars-rover': {
          id: 'uiu-mars-rover',
          title: 'A Tour to UIU Mars Rover',
          shortTitle: 'UIU Mars Tour',
          description: 'An incredible journey exploring the United International University Mars Rover project.',
          gradient: 'from-blue-500 to-purple-600',
          glowColor: 'rgba(59, 130, 246, 0.4)',
          imageCount: 9,
          imagePrefix: 'u-',
          date: 'March 2024',
          location: 'UIU Campus',
          category: 'Educational Tour'
        },
        'robo-soccer': {
          id: 'robo-soccer',
          title: 'ROBO Soccer Day',
          shortTitle: 'Robo Soccer',
          description: 'An exciting day of robotic football competition showcasing advanced AI and robotics technology.',
          gradient: 'from-emerald-500 to-teal-600',
          glowColor: 'rgba(16, 185, 129, 0.4)',
          imageCount: 6,
          imagePrefix: 's-',
          date: 'February 2024',
          location: 'Sports Arena',
          category: 'Competition'
        },
        'rocket-adventure': {
          id: 'rocket-adventure',
          title: 'Rocket Adventure Day',
          shortTitle: 'Rocket Adventure',
          description: 'A thrilling rocket launch event where we experienced the power of aerospace engineering.',
          gradient: 'from-orange-500 to-red-600',
          glowColor: 'rgba(249, 115, 22, 0.4)',
          imageCount: 4,
          imagePrefix: 'r-',
          date: 'January 2024',
          location: 'Launch Site',
          category: 'Space Event'
        },
        'wice-national': {
          id: 'wice-national',
          title: 'WICE National Round BD',
          shortTitle: 'WICE National',
          description: 'Representing Bangladesh at the WICE National Round, showcasing our innovative solutions.',
          gradient: 'from-purple-500 to-pink-600',
          glowColor: 'rgba(168, 85, 247, 0.4)',
          imageCount: 8,
          imagePrefix: 'w-',
          date: 'May 2024',
          location: 'Dhaka, Bangladesh',
          category: 'National Competition'
        }
      };
      setAchievement(defaultAchievements[achievementId]);
    }
  }, [achievementId, location.state]);

  // Generate image paths
  useEffect(() => {
    if (achievement) {
      const imageList = [];
      for (let i = 1; i <= achievement.imageCount; i++) {
        // Create event-specific themed images for each category
        const getEventImage = (prefix, imageNumber) => {
          const eventImageSets = {
            'u-': [ // UIU Mars Rover Tour
              'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&q=80', // Mars rover
              'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=800&h=600&fit=crop&q=80', // Space tech
              'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&q=80', // Rover design
              'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop&q=80', // Space exploration
              'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&q=80', // Mars surface
              'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=800&h=600&fit=crop&q=80', // Technology
              'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&q=80', // Rover testing
              'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop&q=80', // Space mission
              'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&q=80'  // Mars exploration
            ],
            's-': [ // ROBO Soccer Day
              'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80', // Robotics
              'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop&q=80', // Robot competition
              'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80', // AI robotics
              'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop&q=80', // Soccer robots
              'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80', // Competition
              'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop&q=80'  // Tournament
            ],
            'r-': [ // Rocket Adventure Day
              'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop&q=80', // Rocket launch
              'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=600&fit=crop&q=80', // Space shuttle
              'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop&q=80', // Rocket fire
              'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=600&fit=crop&q=80'  // Launch pad
            ],
            'w-': [ // WICE National Round
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80', // Competition
              'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80', // Team meeting
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80', // Awards ceremony
              'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80', // Presentation
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80', // Innovation
              'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80', // National event
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80', // Competition day
              'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80'  // Victory
            ]
          };
          
          const imageSet = eventImageSets[prefix] || eventImageSets['u-'];
          return imageSet[(imageNumber - 1) % imageSet.length];
        };
        
        imageList.push({
          id: i,
          src: `/Images/event/${achievement.imagePrefix}${i}.jpg`,
          alt: `${achievement.title} - Image ${i}`,
          title: `${achievement.title} - Photo ${i}`,
          placeholder: getEventImage(achievement.imagePrefix, i)
        });
      }
      setImages(imageList);
    }
  }, [achievement]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleBackClick = () => {
    navigate('/achievement');
  };

  if (!achievement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Gallery...</h2>
          <p className="text-gray-400">Please wait while we load the images</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <MarsBackground />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleBackClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-semibold">Back to Achievements</span>
            </motion.button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`inline-block bg-gradient-to-r ${achievement.gradient} px-4 py-2 rounded-full mb-2`}
              >
                <span className="text-white text-sm font-bold">
                  {achievement.category}
                </span>
              </motion.div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                {achievement.title}
              </h1>
              <p className="text-gray-400 mt-2">
                {images.length} Photos • Gallery View
              </p>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <PhotoIcon className="w-6 h-6" />
              <span className="font-semibold">{images.length}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Gallery Grid */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => openLightbox(image, index)}
                className="group relative aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to themed placeholder if local image doesn't exist
                    e.target.src = image.placeholder;
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 text-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Photo {image.id}</span>
                    <EyeIcon className="w-5 h-5" />
                  </div>
                </motion.div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${achievement.gradient} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl -z-10`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                onError={(e) => {
                  // Fallback to themed placeholder if local image doesn't exist
                  e.target.src = selectedImage.placeholder;
                }}
              />
              
              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="font-bold text-lg">{selectedImage.title}</h3>
                    <p className="text-gray-300 text-sm">{achievement.title}</p>
                  </div>
                  <div className="text-sm text-gray-300">
                    {currentImageIndex + 1} of {images.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
