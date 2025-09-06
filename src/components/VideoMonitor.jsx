import { motion } from 'framer-motion';

const VideoMonitor = ({ 
  youtubeId = null,
  title = "We Are Born To Learn",
  subtitle = "Mars Rover Innovation",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative mx-auto ${className}`}
      style={{ maxWidth: '800px', aspectRatio: '16/10' }}
    >
      {/* Monitor Outer Frame */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-6 shadow-2xl">
        {/* Monitor Screen */}
        <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden border-4 border-gray-700 shadow-inner">
          {/* Screen Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-orange-500/10"></div>

          {/* Video Content */}
          <div className="relative w-full h-full">
            {/* YouTube Video */}
            {youtubeId ? (
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video
                className="w-full h-full object-cover rounded-lg"
                controls
                playsInline
                poster="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop&q=80"
              >
                <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_25fps.mp4" type="video/mp4" />
              </video>
            )}

            {/* Video Title Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <p className="text-cyan-300 text-xs">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Monitor Stand */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-full shadow-lg"></div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full shadow-xl"></div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl"
        animate={{
          boxShadow: [
            '0 0 50px rgba(59, 130, 246, 0.2)',
            '0 0 80px rgba(59, 130, 246, 0.3)',
            '0 0 50px rgba(59, 130, 246, 0.2)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default VideoMonitor;