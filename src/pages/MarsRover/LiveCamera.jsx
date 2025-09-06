import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarsBackground from '../../components/MarsBackground';
import {
  CameraIcon,
  PhotoIcon,
  VideoCameraIcon,
  AdjustmentsHorizontalIcon,
  ArrowsPointingOutIcon,
  SunIcon,
  EyeIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowPathIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  SparklesIcon,
  Square3Stack3DIcon,
  GlobeAltIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const LiveCamera = ({ roverVersion: _roverVersion = "1.0" }) => {
  const [selectedCamera, setSelectedCamera] = useState('MAST');
  const [isRecording, setIsRecording] = useState(false);
  const [isStreamActive, setIsStreamActive] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [panoramaMode, setPanoramaMode] = useState(false);
  const [cameraSettings, setCameraSettings] = useState({
    brightness: 50,
    contrast: 50,
    saturation: 50,
    exposure: 50,
    sharpness: 50,
    gamma: 50
  });
  const [lastImageTime, setLastImageTime] = useState(new Date());
  const [recordingDuration, setRecordingDuration] = useState(0);

  // Real Mars rover images from different cameras
  const marsImages = useMemo(() => ({
    MAST: [
      {
        url: 'https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631300503690E01_DXXX.jpg',
        fallback: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&h=600&fit=crop',
        description: 'Martian landscape panorama with distant hills',
        sol: 1000,
        timestamp: '2023-05-15T14:32:00Z'
      },
      {
        url: 'https://mars.nasa.gov/msl-raw-images/msss/01247/mcam/1247MR0055570000503691E01_DXXX.jpg',
        fallback: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
        description: 'Rocky terrain with geological formations',
        sol: 1247,
        timestamp: '2023-08-22T09:15:00Z'
      },
      {
        url: 'https://mars.nasa.gov/msl-raw-images/msss/01200/mcam/1200MR0052000000503689E01_DXXX.jpg',
        fallback: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop',
        description: 'Dust devil traces across Martian plains',
        sol: 1200,
        timestamp: '2023-07-10T16:45:00Z'
      }
    ],
    NAVCAM: [
      {
        url: 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01247/opgs/edr/ncam/NLA_000000000EDR_S.JPG',
        fallback: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
        description: 'Navigation view of planned route',
        sol: 1247,
        timestamp: '2023-08-22T11:20:00Z'
      }
    ],
    HAZCAM_FRONT: [
      {
        url: 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01247/opgs/edr/fcam/FLA_000000000EDR_S.JPG',
        fallback: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
        description: 'Front hazard detection view',
        sol: 1247,
        timestamp: '2023-08-22T13:58:00Z'
      }
    ],
    MAHLI: [
      {
        url: 'https://mars.nasa.gov/msl-raw-images/msss/01247/mhli/1247MH0006500000400652E01_DXXX.jpg',
        fallback: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop',
        description: 'Close-up microscopic rock analysis',
        sol: 1247,
        timestamp: '2023-08-22T13:42:00Z'
      }
    ]
  }), []);

  const cameras = [
    { 
      id: 'MAST', 
      name: 'Mast Camera (MastCam)', 
      description: 'High-resolution color imaging system',
      resolution: '1600x1200',
      status: 'active',
      location: 'Rover mast - 2m height',
      fov: '15° x 20°',
      spectrum: 'Visible + Near-IR'
    },
    { 
      id: 'NAVCAM', 
      name: 'Navigation Camera', 
      description: 'Stereo black & white navigation',
      resolution: '1024x1024',
      status: 'active',
      location: 'Rover mast - paired stereo',
      fov: '45° x 45°',
      spectrum: 'Monochrome'
    },
    { 
      id: 'HAZCAM_FRONT', 
      name: 'Front Hazard Camera', 
      description: 'Obstacle & hazard detection',
      resolution: '1024x1024',
      status: 'active',
      location: 'Front chassis corners',
      fov: '120° fisheye',
      spectrum: 'Monochrome'
    },
    { 
      id: 'HAZCAM_REAR', 
      name: 'Rear Hazard Camera', 
      description: 'Rear obstacle detection',
      resolution: '1024x1024',
      status: 'standby',
      location: 'Rear chassis corners',
      fov: '120° fisheye',
      spectrum: 'Monochrome'
    },
    { 
      id: 'MAHLI', 
      name: 'Hand Lens Imager (MAHLI)', 
      description: 'Microscopic close-up imaging',
      resolution: '1600x1200',
      status: 'active',
      location: 'Robotic arm turret',
      fov: 'Variable focus 2.5cm - ∞',
      spectrum: 'Full color + UV'
    },
    { 
      id: 'MARDI', 
      name: 'Descent Imager (MARDI)', 
      description: 'Landing sequence documentation',
      resolution: '1600x1200',
      status: 'inactive',
      location: 'Under rover chassis',
      fov: '90° downward',
      spectrum: 'Full color'
    }
  ];

  // Enhanced useEffect hooks
  useEffect(() => {
    // Auto-cycle through images
    if (isStreamActive && autoRotate) {
      const interval = setInterval(() => {
        const currentImages = marsImages[selectedCamera] || [];
        if (currentImages.length > 1) {
          setImageTransition(true);
          setTimeout(() => {
            setCurrentImageIndex(prev => 
              prev >= currentImages.length - 1 ? 0 : prev + 1
            );
            setImageTransition(false);
          }, 300);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedCamera, isStreamActive, autoRotate, marsImages]);

  useEffect(() => {
    // Recording duration timer
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    // Simulated data updates
    const timer = setInterval(() => {
      setLastImageTime(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-pan in panorama mode
    if (panoramaMode && isStreamActive) {
      const interval = setInterval(() => {
        setPanPosition(prev => ({
          x: (prev.x + 1) % 360,
          y: Math.sin(Date.now() / 2000) * 10
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [panoramaMode, isStreamActive]);

  // Enhanced handler functions
  const handleCameraChange = (cameraId) => {
    setSelectedCamera(cameraId);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setImageTransition(true);
    setTimeout(() => setImageTransition(false), 500);
  };

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 8) {
      setZoomLevel(prev => prev + 0.5);
    } else if (direction === 'out' && zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.5);
    }
  };

  const handleImageNavigation = (direction) => {
    const currentImages = marsImages[selectedCamera] || [];
    if (currentImages.length <= 1) return;
    
    setImageTransition(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentImageIndex(prev => 
          prev >= currentImages.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentImageIndex(prev => 
          prev <= 0 ? currentImages.length - 1 : prev - 1
        );
      }
      setImageTransition(false);
    }, 200);
  };

  const handleSettingChange = (setting, value) => {
    setCameraSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-400';
      case 'standby': return 'text-amber-400';
      case 'inactive': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-400';
      case 'standby': return 'bg-amber-400';
      case 'inactive': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const selectedCameraData = cameras.find(cam => cam.id === selectedCamera);
  const currentImages = marsImages[selectedCamera] || [];
  const currentImage = currentImages[currentImageIndex] || null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      
      <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-900/50 via-slate-900/50 to-gray-900/50 backdrop-blur-sm relative z-10">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl"></div>
        <div className="relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ 
                    rotate: isStreamActive ? 360 : 0,
                    scale: isStreamActive ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <CameraIcon className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Mars Rover Live Camera System
                  </h1>
                  <div className="flex items-center space-x-6 text-sm text-cyan-300 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${isStreamActive ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-red-400 shadow-red-400/50'}`}></div>
                      <span className="font-medium">{isStreamActive ? 'Live Stream Active' : 'Stream Offline'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>Last Update: {lastImageTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Status Indicators */}
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Square3Stack3DIcon className="h-4 w-4 text-cyan-400" />
                  <span className="text-cyan-300">Camera: {selectedCameraData?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GlobeAltIcon className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{selectedCameraData?.resolution}</span>
                </div>
                {isRecording && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                    <span className="text-red-300">REC {formatRecordingTime(recordingDuration)}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  autoRotate 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ArrowPathIcon className="h-4 w-4 mr-2 inline" />
                Auto Cycle
              </button>
              <button
                onClick={() => setPanoramaMode(!panoramaMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  panoramaMode 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ArrowsPointingOutIcon className="h-4 w-4 mr-2 inline" />
                Panorama
              </button>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30'
                }`}
              >
                {isRecording ? <StopIcon className="h-5 w-5" /> : <VideoCameraIcon className="h-5 w-5" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Enhanced Camera Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 shadow-2xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Square3Stack3DIcon className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Camera Systems</h2>
          </div>
          <div className="space-y-3">
            {cameras.map((camera, index) => (
              <motion.button
                key={camera.id}
                onClick={() => handleCameraChange(camera.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  selectedCamera === camera.id
                    ? 'bg-gradient-to-r from-cyan-600/80 to-blue-600/80 text-white border border-cyan-400/50 shadow-lg shadow-cyan-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/60 border border-gray-600/30'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{camera.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${getStatusBgColor(camera.status)} shadow-lg`}></div>
                      <span className={`text-xs font-medium ${getStatusColor(camera.status)}`}>
                        {camera.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs opacity-80 mb-1">{camera.description}</p>
                  <div className="flex items-center justify-between text-xs opacity-60">
                    <span>{camera.resolution}</span>
                    <span>{camera.fov}</span>
                  </div>
                  <p className="text-xs opacity-50 mt-1">{camera.location}</p>
                  <div className="mt-2 text-xs">
                    <span className="inline-block px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
                      {camera.spectrum}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Main Camera View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedCameraData?.name}</h2>
              <p className="text-sm text-cyan-300">{selectedCameraData?.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 0.5}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                <MagnifyingGlassMinusIcon className="h-5 w-5 text-white" />
              </button>
              <div className="px-4 py-2 bg-gray-800 rounded-lg">
                <span className="text-cyan-400 text-lg font-mono">{zoomLevel}x</span>
              </div>
              <button
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 8}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                <MagnifyingGlassPlusIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Enhanced Camera View with Real Mars Images */}
          <div className="relative bg-black rounded-xl overflow-hidden aspect-video mb-6 group">
            <AnimatePresence mode="wait">
              {isStreamActive && currentImage ? (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: imageTransition ? 0.95 : 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{
                    transform: panoramaMode 
                      ? `scale(${zoomLevel}) translate(${-panPosition.x}px, ${-panPosition.y}px)` 
                      : `scale(${zoomLevel})`,
                    filter: `brightness(${cameraSettings.brightness}%) contrast(${cameraSettings.contrast}%) saturate(${cameraSettings.saturation}%)`
                  }}
                >
                  <img
                    src={currentImage.fallback}
                    alt={currentImage.description}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = currentImage.fallback;
                    }}
                  />
                  
                  {/* Enhanced Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
                  
                  {/* Image Navigation */}
                  {currentImages.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageNavigation('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all duration-300 hover:scale-110"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => handleImageNavigation('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
                >
                  {isStreamActive ? (
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <CameraIcon className="h-20 w-20 text-cyan-400 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-cyan-400 text-xl font-medium">Initializing Camera Feed</p>
                      <p className="text-gray-400 mt-2">Loading Mars surface imagery...</p>
                      <div className="mt-6 w-64 h-3 bg-gray-700 rounded-full overflow-hidden mx-auto">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <EyeIcon className="h-20 w-20 text-red-400 mx-auto mb-4" />
                      <p className="text-red-400 text-xl font-medium">Camera Offline</p>
                      <p className="text-gray-400 mt-2">No signal from Mars surface</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Camera Overlays */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>{selectedCamera}</span>
                </div>
              </div>
              <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-xs">
                {selectedCameraData?.resolution} • {selectedCameraData?.fov}
              </div>
            </div>
            
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
                {lastImageTime.toLocaleTimeString()} MST
              </div>
              {currentImage && (
                <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-xs">
                  Sol {currentImage.sol}
                </div>
              )}
            </div>
            
            <div className="absolute bottom-4 left-4">
              <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
                <div className="flex items-center space-x-4">
                  <span>Zoom: {zoomLevel}x</span>
                  {panoramaMode && <span>Panorama Mode</span>}
                  {autoRotate && <span>Auto Cycling</span>}
                </div>
              </div>
            </div>

            {currentImage && (
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-xs max-w-xs">
                  {currentImage.description}
                </div>
              </div>
            )}

            {/* Image Counter */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
                  {currentImageIndex + 1} / {currentImages.length}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Camera Controls */}
          <div className="grid grid-cols-6 gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-lg transition-all duration-300 group"
              title="Capture Image"
            >
              <PhotoIcon className="h-6 w-6 text-white mx-auto group-hover:animate-pulse" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsStreamActive(!isStreamActive)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                isStreamActive 
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700' 
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
              }`}
              title={isStreamActive ? "Pause Stream" : "Resume Stream"}
            >
              {isStreamActive ? <PauseIcon className="h-6 w-6 text-white mx-auto" /> : <PlayIcon className="h-6 w-6 text-white mx-auto" />}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEnhanced(!showEnhanced)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                showEnhanced 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
              }`}
              title="Enhanced View"
            >
              <SparklesIcon className="h-6 w-6 text-white mx-auto" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg transition-all duration-300"
              title="Reset View"
              onClick={() => {
                setZoomLevel(1);
                setPanPosition({ x: 0, y: 0 });
              }}
            >
              <ArrowPathIcon className="h-6 w-6 text-white mx-auto" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-300"
              title="Fullscreen"
            >
              <ArrowsPointingOutIcon className="h-6 w-6 text-white mx-auto" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 rounded-lg transition-all duration-300"
              title="Settings"
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-white mx-auto" />
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Settings & Gallery */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Enhanced Settings Panel */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Camera Settings</h3>
            </div>
            <div className="space-y-5">
              {Object.entries(cameraSettings).map(([setting, value]) => (
                <motion.div 
                  key={setting}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <div className="flex justify-between mb-3">
                    <label className="text-sm text-purple-300 capitalize font-medium">
                      {setting}
                    </label>
                    <span className="text-sm text-white bg-purple-600/20 px-2 py-1 rounded-lg">
                      {value}%
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleSettingChange(setting, parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider group-hover:bg-gray-600 transition-colors duration-300"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${value}%, #374151 ${value}%, #374151 100%)`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Image Gallery */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <PhotoIcon className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Image Gallery</h3>
              </div>
              <div className="text-sm text-emerald-300">
                {currentImages.length} images available
              </div>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {currentImages.map((image, index) => (
                <motion.div 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 cursor-pointer group ${
                    index === currentImageIndex 
                      ? 'bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 border border-emerald-400/50' 
                      : 'bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/30'
                  }`}
                >
                  <div className="relative">
                    <div className="w-16 h-12 bg-gray-600 rounded-lg overflow-hidden">
                      <img 
                        src={image.fallback} 
                        alt={image.description}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = image.fallback;
                        }}
                      />
                    </div>
                    {index === currentImageIndex && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate group-hover:text-emerald-300 transition-colors">
                      {image.description}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-xs text-gray-400">Sol {image.sol}</p>
                      <p className="text-xs text-cyan-400">
                        {new Date(image.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    className="text-gray-400 group-hover:text-emerald-400 transition-colors"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              ))}
              
              {currentImages.length === 0 && (
                <div className="text-center py-8">
                  <EyeIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No images available for this camera</p>
                  <p className="text-sm text-gray-500 mt-1">Switch to another camera system</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Square3Stack3DIcon className="h-6 w-6 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Camera Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-mono text-amber-400">{currentImages.length}</div>
                <div className="text-xs text-gray-400">Images</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono text-cyan-400">{zoomLevel}x</div>
                <div className="text-xs text-gray-400">Zoom</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono text-emerald-400">
                  {selectedCameraData?.status === 'active' ? 'ON' : 'OFF'}
                </div>
                <div className="text-xs text-gray-400">Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono text-purple-400">
                  {isRecording ? formatRecordingTime(recordingDuration) : '--:--'}
                </div>
                <div className="text-xs text-gray-400">Recording</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default LiveCamera;
