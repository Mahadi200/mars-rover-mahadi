import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
  EyeIcon,
  CalendarIcon,
  MapPinIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [eventImages, setEventImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Generate array of event images from public/Images/event/ folder
  useEffect(() => {
    const generateEventImages = () => {
      const images = [];
      
      // Define event categories and their image ranges
      const eventCategories = [
        {
          name: 'UIU Mars Rover Tour',
          category: 'Educational Tour',
          prefix: 'u-',
          count: 9,
          date: 'March 2024',
          location: 'UIU Campus',
          gradient: 'from-blue-500 to-purple-600'
        },
        {
          name: 'ROBO Soccer Day',
          category: 'Competition',
          prefix: 's-',
          count: 6,
          date: 'February 2024',
          location: 'Sports Arena',
          gradient: 'from-emerald-500 to-teal-600'
        },
        {
          name: 'Rocket Adventure Day',
          category: 'Space Event',
          prefix: 'r-',
          count: 4,
          date: 'January 2024',
          location: 'Launch Site',
          gradient: 'from-orange-500 to-red-600'
        },
        {
          name: 'WICE National Round',
          category: 'National Competition',
          prefix: 'w-',
          count: 8,
          date: 'April 2024',
          location: 'Dhaka, Bangladesh',
          gradient: 'from-purple-500 to-pink-600'
        }
      ];

      // Generate images for each category
      eventCategories.forEach((event) => {
        for (let i = 1; i <= event.count; i++) {
           images.push({
             id: `${event.prefix}${i}`,
             src: `/Images/event/${event.prefix}${i}.jpg`,
             alt: `${event.name} - Image ${i}`,
             title: `${event.name} - Photo ${i}`,
            category: event.category,
            eventName: event.name,
            date: event.date,
            location: event.location,
            gradient: event.gradient
          });
        }
      });

      setEventImages(images);
      setLoading(false);
    };

    generateEventImages();
  }, []);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % eventImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(eventImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? eventImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(eventImages[prevIndex]);
  };

  const handleImageError = (e) => {
    // Hide the image if it fails to load
    e.target.style.display = 'none';
  };

  const handleBackClick = () => {
    navigate('/achievement');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Loading Gallery...</h2>
          <p className="text-gray-400">Loading event images from public folder</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-black to-red-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-orange-600/20"></div>
        
         {/* Stars */}
         <div className="absolute inset-0">
           {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 10
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleBackClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 focus:outline-none"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-semibold">Back to Achievements</span>
            </motion.button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-full mb-4"
              >
                <span className="text-white text-lg font-bold">
                  Event Gallery
                </span>
              </motion.div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Mars Rover
                </span>
                <span className="text-white"> Events</span>
              </h1>
              <p className="text-gray-400 text-lg">
                {eventImages.length} Photos • All Events from public/Images/event/
              </p>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <PhotoIcon className="w-6 h-6" />
              <span className="font-semibold">{eventImages.length}</span>
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
            {eventImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
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
                  onError={handleImageError}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 text-white"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{image.category}</span>
                      <EyeIcon className="w-5 h-5" />
                    </div>
                    <div className="text-xs text-gray-300">{image.eventName}</div>
                  </div>
                </motion.div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${image.gradient} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl -z-10`}
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
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10 focus:outline-none"
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.button>

            {/* Navigation Buttons */}
            {eventImages.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10 focus:outline-none"
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
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10 focus:outline-none"
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
                onError={handleImageError}
              />
              
              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center justify-between text-white mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{selectedImage.title}</h3>
                    <p className="text-gray-300 text-sm">{selectedImage.eventName}</p>
                  </div>
                  <div className="text-sm text-gray-300">
                    {currentImageIndex + 1} of {eventImages.length}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{selectedImage.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <PhotoIcon className="w-4 h-4" />
                    <span>{selectedImage.category}</span>
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
