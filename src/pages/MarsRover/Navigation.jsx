import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarsBackground from '../../components/MarsBackground';
import {
  MapPinIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StopIcon,
  PlayIcon,
  PauseIcon,
  MapIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ComputerDesktopIcon,
  Square3Stack3DIcon,
  BeakerIcon,
  CameraIcon,
  SignalIcon,
  CommandLineIcon,
  CogIcon,
  BoltIcon,
  ShieldCheckIcon,
  EyeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Navigation = ({ roverVersion = "1.0" }) => {
  const [currentPosition, setCurrentPosition] = useState({ lat: -4.5, lng: 137.4 });
  const [targetWaypoint, setTargetWaypoint] = useState({ lat: -4.4985, lng: 137.4012 });
  const [roverStatus, setRoverStatus] = useState('stopped');
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [distanceTraveled, setDistanceTraveled] = useState(28.47);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [terrain, setTerrain] = useState('rocky');
  const [autoNavMode, setAutoNavMode] = useState(false);
  const [pathOptimization, setPathOptimization] = useState(true);
  const [hazardAvoidance, setHazardAvoidance] = useState(true);
  const [activeCommand, setActiveCommand] = useState(null);
  const [scanningMode, setScanningMode] = useState(false);
  const [roverOrientation, setRoverOrientation] = useState(0);
  const [communicationSignal, setCommunicationSignal] = useState(92);
  const [systemHealth, setSystemHealth] = useState(95);
  const [currentTime, setCurrentTime] = useState(new Date());
  const mapRef = useRef(null);

  const [missionPlan, setMissionPlan] = useState([
    { 
      id: 1, 
      name: 'Sample Site Alpha', 
      lat: -4.4985, 
      lng: 137.4012, 
      status: 'active', 
      type: 'science',
      priority: 'high',
      estimatedDuration: '45 min',
      description: 'Primary drill site for geological sampling'
    },
    { 
      id: 2, 
      name: 'Panorama Point', 
      lat: -4.4972, 
      lng: 137.4025, 
      status: 'pending', 
      type: 'imaging',
      priority: 'medium',
      estimatedDuration: '20 min',
      description: '360° panoramic image capture'
    },
    { 
      id: 3, 
      name: 'Rock Formation Beta', 
      lat: -4.4958, 
      lng: 137.4038, 
      status: 'pending', 
      type: 'science',
      priority: 'high',
      estimatedDuration: '60 min',
      description: 'Spectroscopic analysis of unusual formations'
    },
    { 
      id: 4, 
      name: 'Comm Relay Position', 
      lat: -4.4945, 
      lng: 137.4051, 
      status: 'pending', 
      type: 'communication',
      priority: 'low',
      estimatedDuration: '15 min',
      description: 'High-gain antenna alignment checkpoint'
    },
  ]);

  const [obstacles, setObstacles] = useState([
    { 
      id: 1, 
      type: 'rock_outcrop', 
      lat: -4.4978, 
      lng: 137.4018, 
      severity: 'medium',
      size: '2.3m x 1.8m',
      description: 'Large sedimentary rock formation'
    },
    { 
      id: 2, 
      type: 'impact_crater', 
      lat: -4.4965, 
      lng: 137.4032, 
      severity: 'high',
      size: '5.1m diameter',
      description: 'Recent meteorite impact site - unstable edges'
    },
    { 
      id: 3, 
      type: 'sand_drift', 
      lat: -4.4952, 
      lng: 137.4045, 
      severity: 'low',
      size: '1.2m x 0.8m',
      description: 'Loose regolith accumulation'
    },
  ]);

  const [navigationHistory, setNavigationHistory] = useState([
    { 
      time: '14:30', 
      position: { lat: -4.5000, lng: 137.4000 }, 
      action: 'Moved forward 5.2m', 
      commandId: 'NAV-001',
      batteryUsed: '2%',
      status: 'completed'
    },
    { 
      time: '14:15', 
      position: { lat: -4.5005, lng: 137.3995 }, 
      action: 'Rotated 15° clockwise', 
      commandId: 'ROT-045',
      batteryUsed: '1%',
      status: 'completed'
    },
    { 
      time: '14:00', 
      position: { lat: -4.5005, lng: 137.3995 }, 
      action: 'Stopped for sample collection', 
      commandId: 'STOP-001',
      batteryUsed: '0%',
      status: 'completed'
    },
    { 
      time: '13:45', 
      position: { lat: -4.5010, lng: 137.3990 }, 
      action: 'Avoided obstacle - detoured 2.1m', 
      commandId: 'AVOID-012',
      batteryUsed: '3%',
      status: 'completed'
    },
  ]);

  const terrainTypes = {
    'rocky': { color: 'text-orange-400', difficulty: 'Medium', speedMultiplier: 0.8 },
    'sandy': { color: 'text-yellow-400', difficulty: 'High', speedMultiplier: 0.5 },
    'solid': { color: 'text-emerald-400', difficulty: 'Low', speedMultiplier: 1.0 },
    'steep': { color: 'text-red-400', difficulty: 'Very High', speedMultiplier: 0.3 },
  };

  // Enhanced useEffect hooks for NASA-style monitoring
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate minor fluctuations in system parameters
      setCommunicationSignal(prev => Math.max(85, Math.min(98, prev + (Math.random() - 0.5) * 2)));
      setSystemHealth(prev => Math.max(90, Math.min(99, prev + (Math.random() - 0.5) * 1)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-navigation system
    if (autoNavMode && roverStatus === 'stopped' && batteryLevel > 15) {
      const timer = setTimeout(() => {
        const nextWaypoint = missionPlan.find(w => w.status === 'pending');
        if (nextWaypoint) {
          handleWaypointSet(nextWaypoint);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoNavMode, roverStatus, batteryLevel, missionPlan]);

  useEffect(() => {
    // Scanning mode animation
    if (scanningMode) {
      const interval = setInterval(() => {
        setRoverOrientation(prev => (prev + 5) % 360);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [scanningMode]);

  // Enhanced movement handler with NASA-style command processing
  const handleMovement = (direction) => {
    if (batteryLevel < 10) {
      console.warn('BATTERY CRITICAL: Movement command aborted');
      return;
    }
    
    const commandId = `NAV-${Date.now().toString().slice(-3)}`;
    setActiveCommand(commandId);
    setRoverStatus('executing');
    
    // Simulate pre-movement checks
    setTimeout(() => {
      setRoverStatus('moving');
      setCurrentSpeed(0.8 * terrainTypes[terrain].speedMultiplier);
      
      // Update orientation based on direction
      const orientationMap = {
        'forward': 0,
        'backward': 180,
        'left': 270,
        'right': 90
      };
      
      if (orientationMap[direction] !== undefined) {
        setRoverOrientation(orientationMap[direction]);
      }
      
      // Movement execution
      setTimeout(() => {
        setRoverStatus('stopped');
        setCurrentSpeed(0);
        setDistanceTraveled(prev => prev + 0.1);
        setBatteryLevel(prev => Math.max(0, prev - (Math.random() * 2 + 1)));
        setActiveCommand(null);
        
        // Add to navigation history
        const newEntry = {
          time: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          position: currentPosition,
          action: `Moved ${direction} 0.1km`,
          commandId,
          batteryUsed: `${(Math.random() * 2 + 1).toFixed(1)}%`,
          status: 'completed'
        };
        
        setNavigationHistory(prev => [newEntry, ...prev.slice(0, 9)]);
      }, 3000);
    }, 1000);
  };

  const handleWaypointSet = (waypoint) => {
    setTargetWaypoint(waypoint);
    setRoverStatus('planning');
    
    // Update mission plan status
    setMissionPlan(prev => prev.map(w => 
      w.id === waypoint.id 
        ? { ...w, status: 'active' }
        : { ...w, status: w.status === 'active' ? 'completed' : w.status }
    ));
    
    setTimeout(() => {
      setRoverStatus('stopped');
    }, 2000);
  };

  const handleEmergencyStop = () => {
    setRoverStatus('emergency_stop');
    setCurrentSpeed(0);
    setActiveCommand(null);
    
    setTimeout(() => {
      setRoverStatus('stopped');
    }, 1000);
  };

  const toggleAutoNavigation = () => {
    setAutoNavMode(!autoNavMode);
    if (!autoNavMode) {
      // Starting auto-nav
      setPathOptimization(true);
      setHazardAvoidance(true);
    }
  };

  // Enhanced NASA-style helper functions
  const getStatusIcon = (status) => {
    const iconClass = "h-5 w-5";
    switch (status) {
      case 'moving':
        return <PlayIcon className={`${iconClass} text-emerald-400 animate-pulse`} />;
      case 'stopped':
        return <StopIcon className={`${iconClass} text-red-400`} />;
      case 'planning':
        return <ClockIcon className={`${iconClass} text-amber-400 animate-spin`} />;
      case 'executing':
        return <CommandLineIcon className={`${iconClass} text-cyan-400 animate-pulse`} />;
      case 'emergency_stop':
        return <ShieldCheckIcon className={`${iconClass} text-red-500 animate-bounce`} />;
      default:
        return <PauseIcon className={`${iconClass} text-gray-400`} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'moving': return 'text-emerald-400';
      case 'stopped': return 'text-red-400';
      case 'planning': return 'text-amber-400';
      case 'executing': return 'text-cyan-400';
      case 'emergency_stop': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getObstacleColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500 shadow-lg shadow-red-500/50';
      case 'medium': return 'bg-amber-500 shadow-lg shadow-amber-500/50';
      case 'low': return 'bg-emerald-500 shadow-lg shadow-emerald-500/50';
      default: return 'bg-gray-500';
    }
  };

  const getWaypointIcon = (type) => {
    const iconClass = "h-6 w-6";
    switch (type) {
      case 'science': return <BeakerIcon className={`${iconClass} text-purple-400`} />;
      case 'imaging': return <CameraIcon className={`${iconClass} text-blue-400`} />;
      case 'communication': return <SignalIcon className={`${iconClass} text-green-400`} />;
      default: return <MapPinIcon className={`${iconClass} text-gray-400`} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-amber-400 bg-amber-400/10';
      case 'low': return 'text-emerald-400 bg-emerald-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      
      <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-900/50 via-slate-900/50 to-gray-900/50 backdrop-blur-sm relative z-10">
      {/* Enhanced NASA-Style Header */}
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
                    rotate: scanningMode ? 360 : roverOrientation,
                    scale: roverStatus === 'moving' ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    rotate: { duration: scanningMode ? 2 : 1, repeat: scanningMode ? Infinity : 0, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <ComputerDesktopIcon className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Mars Rover Navigation Control
                  </h1>
                  <div className="flex items-center space-x-6 text-sm text-cyan-300 mt-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(roverStatus)}
                      <span className={`font-medium capitalize ${getStatusColor(roverStatus)}`}>
                        {roverStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>Sol 1247 • {currentTime.toLocaleTimeString()}</span>
                    </div>
                    {activeCommand && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                        <span className="text-cyan-300">CMD: {activeCommand}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Status Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <BoltIcon className="h-4 w-4 text-amber-400" />
                  <span className="text-gray-300">Speed: {currentSpeed.toFixed(1)} m/s</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapIcon className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">Distance: {distanceTraveled.toFixed(2)} km</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SignalIcon className="h-4 w-4 text-emerald-400" />
                  <span className="text-gray-300">Signal: {communicationSignal.toFixed(0)}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">Health: {systemHealth.toFixed(0)}%</span>
                </div>
              </div>
            </div>
            
            {/* Mission Control Panel */}
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${terrainTypes[terrain].color.replace('text-', 'bg-')} shadow-lg`}></div>
                  <div className="text-sm">
                    <div className="text-gray-300">Terrain: {terrain}</div>
                    <div className="text-xs text-gray-400">{terrainTypes[terrain].difficulty}</div>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAutoNavigation}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  autoNavMode 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Square3Stack3DIcon className="h-4 w-4 mr-2 inline" />
                Auto Nav
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScanningMode(!scanningMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  scanningMode 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <EyeIcon className="h-4 w-4 mr-2 inline" />
                Scan
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmergencyStop}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-red-600/30"
              >
                <ShieldCheckIcon className="h-5 w-5 mr-2 inline" />
                Emergency Stop
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Navigation Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MapIcon className="h-8 w-8 text-cyan-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Mars Surface Map</h2>
                <p className="text-sm text-cyan-300">Gale Crater - Sol 1247</p>
              </div>
            </div>
            <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-600/30">
              <div className="text-sm text-cyan-300">Current Position</div>
              <div className="text-xs text-gray-400">4.5°S, 137.4°E</div>
            </div>
          </div>

          {/* Enhanced Mars Surface Map */}
          <div 
            ref={mapRef}
            className="relative bg-gradient-to-br from-red-900/30 via-orange-900/20 to-amber-900/10 rounded-xl h-[450px] overflow-hidden border border-cyan-500/20 shadow-inner"
          >
            {/* Enhanced Grid Overlay */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="marsGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                  <radialGradient id="roverGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#marsGrid)" />
              </svg>
            </div>

            {/* Rover Position with Glow Effect */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: roverStatus === 'moving' ? [1, 1.2, 1] : [1, 1.05, 1],
                rotate: roverOrientation
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 1 }
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 w-8 h-8 bg-cyan-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                <div className="relative w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-2 border-white shadow-lg shadow-cyan-500/50">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-xs text-cyan-300 mt-2 text-center font-medium">ROVER</div>
              <div className="text-xs text-gray-400 text-center">{roverStatus.toUpperCase()}</div>
            </motion.div>

            {/* Target Waypoint with Animation */}
            <motion.div 
              className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 w-6 h-6 bg-emerald-400 rounded-full blur-sm opacity-40"></div>
                <div className="relative w-6 h-6 bg-emerald-500 rounded-full border-2 border-emerald-300 shadow-lg shadow-emerald-500/50"></div>
              </div>
              <div className="text-xs text-emerald-300 mt-1 text-center font-medium">TARGET</div>
            </motion.div>

            {/* Enhanced Obstacles */}
            <AnimatePresence>
              {obstacles.map((obstacle, index) => (
                <motion.div 
                  key={obstacle.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute group cursor-pointer"
                  style={{
                    top: `${30 + index * 15}%`,
                    left: `${25 + index * 20}%`
                  }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.3 }}
                    className={`w-4 h-4 ${getObstacleColor(obstacle.severity)} rounded-full border border-white/50`}
                  />
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="font-medium">{obstacle.type.replace('_', ' ')}</div>
                    <div className="text-gray-300">{obstacle.size}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Enhanced Waypoints */}
            {missionPlan.map((waypoint, index) => (
              <motion.div 
                key={waypoint.id}
                className="absolute cursor-pointer group"
                style={{
                  top: `${20 + index * 18}%`,
                  right: `${15 + index * 15}%`
                }}
                onClick={() => handleWaypointSet(waypoint)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`p-2 rounded-full ${waypoint.status === 'active' ? 'bg-cyan-500/80' : 'bg-gray-700/80'} backdrop-blur-sm border border-white/30 shadow-lg`}>
                  {getWaypointIcon(waypoint.type)}
                </div>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <div className="font-medium">{waypoint.name}</div>
                  <div className="text-gray-300">{waypoint.description}</div>
                  <div className={`text-xs mt-1 px-2 py-1 rounded-full ${getPriorityColor(waypoint.priority)}`}>
                    {waypoint.priority} priority
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Animated Navigation Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
              <motion.path
                d="M 50% 50% Q 60% 40% 70% 35%"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="8,4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>

            {/* Rover Detection Range */}
            {scanningMode && (
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <div className="w-32 h-32 border-2 border-purple-400/50 rounded-full"></div>
              </motion.div>
            )}
          </div>

          {/* Enhanced Map Legend */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30"></div>
              <span className="text-sm text-gray-300">Rover Position</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
              <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
              <span className="text-sm text-gray-300">Target Waypoint</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/30"></div>
              <span className="text-sm text-gray-300">High Risk</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
              <BeakerIcon className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Science Sites</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Enhanced NASA-Style Movement Controls */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <CommandLineIcon className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Navigation Controls</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div></div>
              <motion.button
                onClick={() => handleMovement('forward')}
                disabled={batteryLevel < 10}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  batteryLevel < 10 
                    ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/30'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <ArrowUpIcon className="h-6 w-6 text-white mx-auto relative z-10" />
                <div className="text-xs text-white/80 mt-1 relative z-10">FORWARD</div>
              </motion.button>
              <div></div>
              
              <motion.button
                onClick={() => handleMovement('left')}
                disabled={batteryLevel < 10}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  batteryLevel < 10 
                    ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/30'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <ArrowLeftIcon className="h-6 w-6 text-white mx-auto relative z-10" />
                <div className="text-xs text-white/80 mt-1 relative z-10">LEFT</div>
              </motion.button>
              
              <motion.button
                onClick={handleEmergencyStop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 group relative overflow-hidden shadow-lg shadow-red-600/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <StopIcon className="h-6 w-6 text-white mx-auto relative z-10" />
                <div className="text-xs text-white/80 mt-1 relative z-10">STOP</div>
              </motion.button>
              
              <motion.button
                onClick={() => handleMovement('right')}
                disabled={batteryLevel < 10}
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  batteryLevel < 10 
                    ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/30'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <ArrowRightIcon className="h-6 w-6 text-white mx-auto relative z-10" />
                <div className="text-xs text-white/80 mt-1 relative z-10">RIGHT</div>
              </motion.button>
              
              <div></div>
              <motion.button
                onClick={() => handleMovement('backward')}
                disabled={batteryLevel < 10}
                whileHover={{ scale: 1.05, y: 2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  batteryLevel < 10 
                    ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/30'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <ArrowDownIcon className="h-6 w-6 text-white mx-auto relative z-10" />
                <div className="text-xs text-white/80 mt-1 relative z-10">BACK</div>
              </motion.button>
              <div></div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setHazardAvoidance(!hazardAvoidance)}
                className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                  hazardAvoidance 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ShieldCheckIcon className="h-4 w-4 mr-2 inline" />
                Hazard Avoid
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPathOptimization(!pathOptimization)}
                className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                  pathOptimization 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <SparklesIcon className="h-4 w-4 mr-2 inline" />
                Path Optimize
              </motion.button>
            </div>
          </div>

          {/* Mission Waypoints */}
          <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Mission Plan</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {missionPlan.map((waypoint) => (
                <div
                  key={waypoint.id}
                  onClick={() => handleWaypointSet(waypoint)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    waypoint.status === 'active'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getWaypointIcon(waypoint.type)}</span>
                      <span className="font-medium text-sm">{waypoint.name}</span>
                    </div>
                    {waypoint.status === 'active' && (
                      <CheckCircleIcon className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    {waypoint.lat.toFixed(4)}°, {waypoint.lng.toFixed(4)}°
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Panel */}
          <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Battery Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        batteryLevel > 50 ? 'bg-green-500' : batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${batteryLevel}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm">{batteryLevel}%</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Current Speed</span>
                <span className="text-white">{currentSpeed} m/s</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Distance Today</span>
                <span className="text-white">125 m</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Obstacles Detected</span>
                <span className="text-white">{obstacles.length}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Navigation History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <ClockIcon className="h-8 w-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Mission Timeline</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationHistory.map((entry, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-purple-300 font-medium">{entry.time}</div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  entry.status === 'completed' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-amber-600/20 text-amber-400'
                }`}>
                  {entry.status}
                </div>
              </div>
              <div className="text-white font-medium mb-3 group-hover:text-purple-300 transition-colors">
                {entry.action}
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-gray-400">
                  Position: {entry.position.lat.toFixed(4)}°, {entry.position.lng.toFixed(4)}°
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">CMD: {entry.commandId}</span>
                  <span className="text-cyan-400">Battery: {entry.batteryUsed}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Navigation;
