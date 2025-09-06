import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MarsBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 -z-10"
      style={{
        transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0) translateY(${scrollY * 0.05}px)`
      }}
    >
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50"></div>
      
      {/* Mars Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/20 via-red-50/15 to-amber-50/20"></div>
      
      {/* Mars Planet */}
      <motion.div
        className="absolute top-20 right-20 w-48 h-48 opacity-15"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          transform: `perspective(800px) rotateY(${mousePosition.x * 0.5}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #fca5a5 0%, #dc2626 50%, #7f1d1d 100%)',
            boxShadow: 'inset -8px -8px 15px rgba(0,0,0,0.2), 0 0 20px rgba(248,113,113,0.1)'
          }}
        >
          <div className="absolute inset-0 rounded-full opacity-40">
            <div className="w-1 h-1 bg-red-400 rounded-full absolute top-1/4 left-1/3"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full absolute top-2/3 right-1/4"></div>
          </div>
        </div>
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gray-300/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 150 - 75],
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gray-400/15 rounded-full"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`
            }}
          />
        ))}
      </div>

      {/* Atmospheric Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-50/3 to-purple-50/5"></div>
    </div>
  );
};

export default MarsBackground;