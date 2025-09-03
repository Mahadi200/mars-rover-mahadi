import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = ({ isLoading, onLoadComplete, isNavigation = false }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState('initializing'); // initializing, traveling, landing, complete
  const [showRocket, setShowRocket] = useState(true);

  useEffect(() => {
    if (!isLoading) return;

    // Different phases for navigation vs initial load
    const phases = isNavigation ? [
      { phase: 'traveling', duration: 600, progress: 80 },
      { phase: 'complete', duration: 200, progress: 100 }
    ] : [
      { phase: 'initializing', duration: 1000, progress: 20 },
      { phase: 'traveling', duration: 3000, progress: 80 },
      { phase: 'landing', duration: 1000, progress: 95 },
      { phase: 'complete', duration: 500, progress: 100 }
    ];

    let currentPhaseIndex = 0;
    let startTime = Date.now();

    const updateProgress = () => {
      const currentPhase = phases[currentPhaseIndex];
      const elapsed = Date.now() - startTime;
      const phaseProgress = Math.min(elapsed / currentPhase.duration, 1);
      
      const previousProgress = currentPhaseIndex > 0 
        ? phases[currentPhaseIndex - 1].progress 
        : 0;
      
      const currentProgress = previousProgress + 
        (currentPhase.progress - previousProgress) * phaseProgress;
      
      setLoadingProgress(currentProgress);
      setLoadingPhase(currentPhase.phase);

      if (phaseProgress >= 1) {
        if (currentPhaseIndex < phases.length - 1) {
          currentPhaseIndex++;
          startTime = Date.now();
          requestAnimationFrame(updateProgress);
        } else {
          // Loading complete
          setTimeout(() => {
            setShowRocket(false);
            setTimeout(() => {
              onLoadComplete();
            }, 500);
          }, 800);
        }
      } else {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [isLoading, onLoadComplete]);

  const getPhaseMessage = () => {
    if (isNavigation) {
      switch (loadingPhase) {
        case 'traveling':
          return 'Navigating...';
        case 'complete':
          return 'Ready!';
        default:
          return 'Loading...';
      }
    }
    
    switch (loadingPhase) {
      case 'initializing':
        return 'Initializing Mission Control...';
      case 'traveling':
        return 'Traveling to Mars...';
      case 'landing':
        return 'Landing on Mars...';
      case 'complete':
        return 'Mission Control Ready!';
      default:
        return 'Preparing for Mars Exploration...';
    }
  };

  const getRocketPosition = () => {
    const progress = loadingProgress / 100;
    return {
      x: progress * 70, // Move from left to right
      y: Math.sin(progress * Math.PI * 2) * 5, // Slight wave motion
      rotate: progress * 45 + (Math.sin(progress * Math.PI * 4) * 5) // Rotation with wobble
    };
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isNavigation ? 0.2 : 0.5 }}
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
            isNavigation 
              ? 'bg-black/70 backdrop-blur-sm' 
              : 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'
          }`}
        >
          {/* Animated Stars Background - Only for full loading */}
          {!isNavigation && (
            <div className="absolute inset-0">
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
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
          )}

          {/* Nebula Effect - Only for full loading */}
          {!isNavigation && (
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-purple-600/20 via-transparent to-transparent"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          )}

          {/* Main Loading Container */}
          <div className="relative z-10 text-center">
            {isNavigation ? (
              /* Simple Navigation Loading */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <RocketLaunchIcon className="h-16 w-16 text-blue-400" />
                </motion.div>
                
                <motion.h2
                  className="text-2xl font-bold text-white mb-2"
                  key={loadingPhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getPhaseMessage()}
                </motion.h2>
                
                <div className="w-64 mx-auto">
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Full Mars Journey Loading */
              <>
            {/* Mars Planet */}
            <motion.div
              className="relative mx-auto mb-16"
              style={{ width: '300px', height: '200px' }}
            >
              {/* Mars */}
              <motion.div
                className="absolute top-4 right-8 w-24 h-24 rounded-full bg-gradient-to-br from-red-500 via-orange-600 to-red-700 shadow-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Mars Surface Details */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-400/30 to-orange-500/30" />
                <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-red-800/60" />
                <div className="absolute bottom-4 right-3 w-3 h-1 rounded-full bg-red-800/40" />
                <div className="absolute top-6 right-5 w-1 h-1 rounded-full bg-red-900/60" />
              </motion.div>

              {/* Earth (starting point) */}
              <motion.div
                className="absolute top-12 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 shadow-lg"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-300/20 to-green-400/20" />
                <div className="absolute top-2 left-3 w-2 h-3 rounded-full bg-green-600/80" />
                <div className="absolute bottom-3 right-2 w-3 h-2 rounded-full bg-green-700/60" />
              </motion.div>

              {/* Rocket Trail */}
              <motion.div
                className="absolute top-16 left-16"
                style={{
                  width: `${loadingProgress * 2}px`,
                  height: '2px'
                }}
              >
                <div className="h-full bg-gradient-to-r from-transparent via-orange-400 to-red-500 rounded-full" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-300 blur-sm"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity
                  }}
                />
              </motion.div>

              {/* Rocket */}
              <AnimatePresence>
                {showRocket && (
                  <motion.div
                    className="absolute top-14 left-12"
                    animate={{
                      x: getRocketPosition().x + 'px',
                      y: getRocketPosition().y + 'px',
                      rotate: getRocketPosition().rotate + 'deg'
                    }}
                    exit={{
                      scale: 0,
                      rotate: 180,
                      opacity: 0
                    }}
                    transition={{
                      exit: { duration: 0.5 }
                    }}
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        y: [0, -2, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <RocketLaunchIcon className="h-8 w-8 text-white transform rotate-45" />
                      
                      {/* Rocket Flame */}
                      <motion.div
                        className="absolute -bottom-1 left-2 w-3 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full transform -rotate-45"
                        animate={{
                          scaleY: [0.8, 1.2, 0.8],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 0.2,
                          repeat: Infinity
                        }}
                      />
                      
                      {/* Rocket Glow */}
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-lg" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                Mars Rover
              </motion.h1>

              <motion.p
                className="text-lg text-blue-200 mb-8"
                key={loadingPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getPhaseMessage()}
              </motion.p>

              {/* Progress Bar */}
              <div className="w-80 mx-auto">
                <div className="flex justify-between text-sm text-blue-300 mb-2">
                  <span>Mission Progress</span>
                  <span>{Math.round(loadingProgress)}%</span>
                </div>
                
                <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm border border-blue-400/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Mission Details */}
              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div className="space-y-1">
                  <motion.div
                    className="text-2xl font-bold text-blue-400"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0
                    }}
                  >
                    Sol {Math.round(loadingProgress * 12.47)}
                  </motion.div>
                  <div className="text-xs text-gray-400">Mission Day</div>
                </div>
                
                <div className="space-y-1">
                  <motion.div
                    className="text-2xl font-bold text-purple-400"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.7
                    }}
                  >
                    {Math.round(loadingProgress * 2.25)}M
                  </motion.div>
                  <div className="text-xs text-gray-400">Distance (km)</div>
                </div>
                
                <div className="space-y-1">
                  <motion.div
                    className="text-2xl font-bold text-pink-400"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1.4
                    }}
                  >
                    {Math.round(loadingProgress * 0.87)}%
                  </motion.div>
                  <div className="text-xs text-gray-400">Fuel Remaining</div>
                </div>
              </div>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              className="flex justify-center space-x-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
              </>
            )}
          </div>

          {/* Bottom Decorative Elements */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="flex items-center space-x-4 text-blue-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Mission Control Active</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingSpinner;
