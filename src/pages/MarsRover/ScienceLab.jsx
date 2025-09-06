import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarsBackground from '../../components/MarsBackground';
import {
  BeakerIcon,
  MagnifyingGlassIcon,
  FireIcon,
  SparklesIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CloudIcon,
  RocketLaunchIcon,
  EyeIcon,
  CubeTransparentIcon,
  Square3Stack3DIcon,
  CircleStackIcon,
  CommandLineIcon,
  CpuChipIcon,
  BoltIcon,
  LightBulbIcon,

  AcademicCapIcon,
  GlobeAltIcon,
  StarIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  PlayIcon,
  PauseIcon,
  StopIcon
} from '@heroicons/react/24/outline';

const ScienceLab = ({ roverVersion: _roverVersion = "1.0" }) => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [activeInstrument, setActiveInstrument] = useState('ChemCam');
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [labMode, _setLabMode] = useState('analysis'); // 'analysis', 'spectroscopy', 'molecular', 'quantum'
  const [_holographicView, _setHolographicView] = useState(false);
  const [_aiAssistant, _setAiAssistant] = useState(true);
  const [quantumProcessor, setQuantumProcessor] = useState(false);
  const [molecularScanning, _setMolecularScanning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemHealth, setSystemHealth] = useState(98);
  const [powerConsumption, setPowerConsumption] = useState(65);
  const [processingUnits, setProcessingUnits] = useState(12);
  const [activeScans, setActiveScans] = useState(3);
  const [discoveryMode, setDiscoveryMode] = useState(false);
  const _hologramRef = useRef(null);
  const _particleRef = useRef(null);

  const instruments = [
    {
      id: 'ChemCam',
      name: 'Quantum ChemCam X1',
      description: 'Advanced laser-induced breakdown spectroscopy with AI analysis',
      status: 'active',
      lastUsed: '2 hours ago',
      icon: CubeTransparentIcon,
      powerLevel: 92,
      temperature: 23.5,
      accuracy: 99.7,
      processingSpeed: 'Ultra-Fast',
      capabilities: ['Quantum element analysis', 'Molecular structure mapping', 'AI-powered composition detection', '3D atomic visualization']
    },
    {
      id: 'MAHLI',
      name: 'Holographic Lens Imager',
      description: 'Next-gen 4D holographic microscopy system',
      status: 'active',
      lastUsed: '1 hour ago',
      icon: MagnifyingGlassIcon,
      powerLevel: 88,
      temperature: 21.2,
      accuracy: 99.9,
      processingSpeed: 'Real-time',
      capabilities: ['4D holographic imaging', 'Atomic-scale resolution', 'Time-lapse molecular motion', 'Virtual reality visualization']
    },
    {
      id: 'APXS',
      name: 'Neural Particle Analyzer',
      description: 'AI-enhanced alpha particle X-ray spectroscopy',
      status: 'standby',
      lastUsed: '4 hours ago',
      icon: CircleStackIcon,
      powerLevel: 76,
      temperature: 25.8,
      accuracy: 98.9,
      processingSpeed: 'Fast',
      capabilities: ['Neural network analysis', 'Predictive composition modeling', 'Real-time weathering simulation', 'Crystal structure prediction']
    },
    {
      id: 'SAM',
      name: 'Quantum Sample Analyzer',
      description: 'Revolutionary quantum-enhanced molecular analysis',
      status: 'maintenance',
      lastUsed: '1 day ago',
      icon: CpuChipIcon,
      powerLevel: 45,
      temperature: 28.1,
      accuracy: 99.95,
      processingSpeed: 'Quantum',
      capabilities: ['Quantum state analysis', 'Organic matter detection', 'Biomarker identification', 'Temporal molecular tracking']
    },
    {
      id: 'MARDI',
      name: 'Omnispectral Imager',
      description: 'Advanced multi-dimensional surface analysis',
      status: 'active',
      lastUsed: '30 minutes ago',
      icon: GlobeAltIcon,
      powerLevel: 94,
      temperature: 22.3,
      accuracy: 99.2,
      processingSpeed: 'Ultra-Fast',
      capabilities: ['Omnispectral imaging', 'Terrain modeling', 'Subsurface scanning', 'Atmospheric interaction mapping']
    },
    {
      id: 'NOVA',
      name: 'Neural Analysis Engine',
      description: 'AI-powered discovery and prediction system',
      status: 'experimental',
      lastUsed: 'Just now',
      icon: BoltIcon,
      powerLevel: 100,
      temperature: 19.8,
      accuracy: 99.99,
      processingSpeed: 'Instantaneous',
      capabilities: ['Pattern recognition', 'Anomaly detection', 'Predictive modeling', 'Scientific discovery assistance']
    }
  ];

  const samples = useMemo(() => [
    {
      id: 'SAMPLE_001',
      name: 'Martian Rock Alpha',
      type: 'Igneous Rock',
      location: 'Crater Rim Site A',
      collectedDate: 'Sol 1245',
      status: 'analyzed',
      composition: {
        Silicon: 45.2,
        Iron: 18.7,
        Aluminum: 12.1,
        Calcium: 8.9,
        Magnesium: 7.3,
        Others: 7.8
      },
      findings: ['High iron content suggests volcanic origin', 'No organic compounds detected', 'Evidence of past water interaction']
    },
    {
      id: 'SAMPLE_002',
      name: 'Soil Sample Beta',
      type: 'Regolith',
      location: 'Plains Site B',
      collectedDate: 'Sol 1246',
      status: 'analyzing',
      composition: {
        Silicon: 42.1,
        Iron: 22.3,
        Aluminum: 9.8,
        Calcium: 6.2,
        Magnesium: 11.4,
        Others: 8.2
      },
      findings: ['Analysis in progress...']
    },
    {
      id: 'SAMPLE_003',
      name: 'Crystalline Formation',
      type: 'Mineral Deposit',
      location: 'Rock Garden Site C',
      collectedDate: 'Sol 1247',
      status: 'pending',
      composition: null,
      findings: ['Awaiting analysis']
    }
  ], []);

  const analysisQueue = [
    { id: 1, sample: 'SAMPLE_002', instrument: 'ChemCam', estimatedTime: '45 min', priority: 'high' },
    { id: 2, sample: 'SAMPLE_003', instrument: 'MAHLI', estimatedTime: '20 min', priority: 'medium' },
    { id: 3, sample: 'SAMPLE_003', instrument: 'APXS', estimatedTime: '2 hours', priority: 'low' },
  ];

  const recentFindings = [
    {
      timestamp: '14:32 MST',
      finding: 'Trace amounts of sulfur detected in Sample Alpha',
      significance: 'High',
      instrument: 'ChemCam'
    },
    {
      timestamp: '13:15 MST',
      finding: 'Crystalline structure confirmed in mineral deposit',
      significance: 'Medium',
      instrument: 'MAHLI'
    },
    {
      timestamp: '12:45 MST',
      finding: 'No methane detected in atmospheric analysis',
      significance: 'High',
      instrument: 'SAM'
    },
    {
      timestamp: '11:20 MST',
      finding: 'Evidence of ancient water flow patterns',
      significance: 'Very High',
      instrument: 'MARDI'
    }
  ];

  const atmosphericData = {
    temperature: -68,
    pressure: 610,
    humidity: 0.03,
    windSpeed: 12,
    dustLevel: 'Low',
    visibility: 'Excellent'
  };

  // Enhanced useEffect hooks for futuristic system monitoring
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate dynamic system parameters
      setSystemHealth(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setPowerConsumption(prev => Math.max(50, Math.min(80, prev + (Math.random() - 0.5) * 5)));
      setProcessingUnits(prev => Math.max(8, Math.min(16, prev + Math.floor((Math.random() - 0.5) * 3))));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (analysisInProgress && analysisProgress < 100) {
      interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            setAnalysisInProgress(false);
            return 100;
          }
          return prev + (quantumProcessor ? 5 : 2);
        });
      }, quantumProcessor ? 200 : 500);
    }
    return () => clearInterval(interval);
  }, [analysisInProgress, analysisProgress, quantumProcessor]);

  useEffect(() => {
    // Molecular scanning animation
    if (molecularScanning) {
      const interval = setInterval(() => {
        setActiveScans(prev => Math.max(1, Math.min(8, prev + Math.floor((Math.random() - 0.5) * 3))));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [molecularScanning]);

  useEffect(() => {
    // Discovery mode auto-activation
    if (discoveryMode && !analysisInProgress) {
      const timer = setTimeout(() => {
        const pendingSample = samples.find(s => s.status === 'pending');
        if (pendingSample) {
          startAnalysis(pendingSample.id, 'NOVA');
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [discoveryMode, analysisInProgress, samples]);

  const startAnalysis = (sampleId, instrumentId) => {
    setAnalysisInProgress(true);
    setAnalysisProgress(0);
    setSelectedSample(sampleId);
    setActiveInstrument(instrumentId);
  };

  // Enhanced NASA-style helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-400';
      case 'standby': return 'text-amber-400';
      case 'maintenance': return 'text-red-400';
      case 'experimental': return 'text-purple-400';
      case 'analyzed': return 'text-cyan-400';
      case 'analyzing': return 'text-orange-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-400';
      case 'standby': return 'bg-amber-400';
      case 'maintenance': return 'bg-red-400';
      case 'experimental': return 'bg-purple-400';
      case 'analyzed': return 'bg-cyan-400';
      case 'analyzing': return 'bg-orange-400';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    const iconClass = "h-5 w-5";
    switch (status) {
      case 'active': return <PlayIcon className={`${iconClass} text-emerald-400 animate-pulse`} />;
      case 'experimental': return <StarIcon className={`${iconClass} text-purple-400 animate-pulse`} />;
      case 'analyzed': return <CheckCircleIcon className={`${iconClass} text-cyan-400`} />;
      case 'analyzing': return <ArrowPathIcon className={`${iconClass} text-orange-400 animate-spin`} />;
      case 'pending': return <ClockIcon className={`${iconClass} text-gray-400`} />;
      case 'maintenance': return <WrenchScrewdriverIcon className={`${iconClass} text-red-400`} />;
      default: return <CheckCircleIcon className={`${iconClass} text-gray-400`} />;
    }
  };

  const _getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-amber-400 bg-amber-400/10';
      case 'low': return 'text-emerald-400 bg-emerald-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getProcessingSpeedColor = (speed) => {
    switch (speed) {
      case 'Instantaneous': return 'text-purple-400';
      case 'Quantum': return 'text-pink-400';
      case 'Ultra-Fast': return 'text-cyan-400';
      case 'Real-time': return 'text-emerald-400';
      case 'Fast': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getLabModeColor = (mode) => {
    switch (mode) {
      case 'analysis': return 'from-cyan-500 to-blue-500';
      case 'spectroscopy': return 'from-purple-500 to-pink-500';
      case 'molecular': return 'from-emerald-500 to-teal-500';
      case 'quantum': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      
      <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-900/50 via-slate-900/50 to-gray-900/50 backdrop-blur-sm relative z-10">
      {/* Futuristic NASA-Style Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30 shadow-2xl overflow-hidden"
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${getLabModeColor(labMode)}/10 rounded-xl`}></div>
        
        {/* Particle Animation Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{
                x: [0, 300, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ 
                    rotate: molecularScanning ? 360 : 0,
                    scale: quantumProcessor ? [1, 1.2, 1] : [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: molecularScanning ? 2 : 0, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className={`w-12 h-12 bg-gradient-to-r ${getLabModeColor(labMode)} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <AcademicCapIcon className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Mars Science Laboratory X1
                  </h1>
                  <div className="flex items-center space-x-6 text-sm text-cyan-300 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${getStatusBgColor('active')} shadow-emerald-400/50`}></div>
                      <span className="font-medium">Quantum Systems Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>Sol 1247 • {currentTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Status Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CubeTransparentIcon className="h-4 w-4 text-cyan-400" />
                  <span className="text-gray-300">Active: {instruments.filter(i => i.status === 'active').length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleStackIcon className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">Samples: {samples.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BoltIcon className="h-4 w-4 text-amber-400" />
                  <span className="text-gray-300">Power: {powerConsumption}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-emerald-400" />
                  <span className="text-gray-300">Health: {systemHealth.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            {/* Lab Mode Controls */}
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <div className="text-cyan-300">Processing Units</div>
                    <div className="text-2xl font-mono text-white">{processingUnits}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-purple-300">Active Scans</div>
                    <div className="text-2xl font-mono text-white">{activeScans}</div>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantumProcessor(!quantumProcessor)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  quantumProcessor 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <CpuChipIcon className="h-4 w-4 mr-2 inline" />
                Quantum
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDiscoveryMode(!discoveryMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  discoveryMode 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <StarIcon className="h-4 w-4 mr-2 inline" />
                Auto Discovery
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Futuristic Instruments Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-8">
          <Square3Stack3DIcon className="h-8 w-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Quantum Scientific Instruments</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instruments.map((instrument, index) => {
            const Icon = instrument.icon;
            return (
              <motion.div
                key={instrument.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-xl border cursor-pointer transition-all duration-500 group overflow-hidden ${
                  activeInstrument === instrument.id
                    ? 'bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-cyan-400/50 shadow-lg shadow-cyan-500/25'
                    : 'bg-gray-800/50 border-gray-600/30 hover:border-purple-400/50 hover:bg-gray-700/60'
                }`}
                onClick={() => setActiveInstrument(instrument.id)}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  activeInstrument === instrument.id ? 'opacity-100' : ''
                }`}></div>
                
                {/* Holographic Effect */}
                {activeInstrument === instrument.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={{
                        rotate: instrument.status === 'active' ? 360 : 0
                      }}
                      transition={{
                        duration: instrument.status === 'active' ? 8 : 0,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Icon className={`h-8 w-8 ${getStatusColor(instrument.status)} drop-shadow-lg`} />
                    </motion.div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(instrument.status)}
                      <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                        instrument.status === 'active' ? 'bg-emerald-400/20 text-emerald-400' :
                        instrument.status === 'experimental' ? 'bg-purple-400/20 text-purple-400' :
                        instrument.status === 'standby' ? 'bg-amber-400/20 text-amber-400' :
                        'bg-red-400/20 text-red-400'
                      }`}>
                        {instrument.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                    {instrument.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{instrument.description}</p>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Power</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-1">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-400 h-1 rounded-full transition-all duration-1000"
                            style={{ width: `${instrument.powerLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-emerald-400 text-xs font-mono">{instrument.powerLevel}%</span>
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Accuracy</div>
                      <div className="text-cyan-400 text-sm font-mono">{instrument.accuracy}%</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-400">Processing Speed</span>
                      <span className={`font-medium ${getProcessingSpeedColor(instrument.processingSpeed)}`}>
                        {instrument.processingSpeed}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Temp: {instrument.temperature}°C • Last used: {instrument.lastUsed}
                    </div>
                  </div>

                  {/* Enhanced Capabilities */}
                  <div>
                    <div className="text-xs text-purple-300 mb-2 font-medium">Advanced Capabilities:</div>
                    <div className="grid grid-cols-1 gap-1">
                      {instrument.capabilities.slice(0, 3).map((cap, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="text-xs bg-gradient-to-r from-purple-600/20 to-cyan-600/20 px-2 py-1 rounded text-purple-300 border border-purple-500/30"
                        >
                          • {cap}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Activation Indicator */}
                  {activeInstrument === instrument.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400/50"></div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sample Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-4">Sample Analysis</h2>
          
          {/* Analysis Progress */}
          {analysisInProgress && (
            <div className="mb-4 p-4 bg-blue-600/20 rounded-lg border border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Analysis in Progress</span>
                <span className="text-blue-400">{analysisProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Analyzing {selectedSample} with {activeInstrument}...
              </p>
            </div>
          )}

          {/* Samples List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {samples.map((sample) => (
              <div
                key={sample.id}
                className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-600/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white">{sample.name}</h3>
                    {getStatusIcon(sample.status)}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sample.status === 'analyzed' ? 'bg-blue-400/20 text-blue-400' :
                    sample.status === 'analyzing' ? 'bg-orange-400/20 text-orange-400' :
                    'bg-gray-400/20 text-gray-400'
                  }`}>
                    {sample.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-400 mb-2">
                  <p>Type: {sample.type}</p>
                  <p>Location: {sample.location}</p>
                  <p>Collected: {sample.collectedDate}</p>
                </div>

                {sample.composition && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-white mb-2">Composition</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(sample.composition).map(([element, percentage]) => (
                        <div key={element} className="flex justify-between">
                          <span className="text-gray-400">{element}:</span>
                          <span className="text-white">{percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <h4 className="text-sm font-medium text-white mb-1">Key Findings</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {sample.findings.map((finding, index) => (
                      <li key={index}>• {finding}</li>
                    ))}
                  </ul>
                </div>

                {sample.status === 'pending' && (
                  <button
                    onClick={() => startAnalysis(sample.id, activeInstrument)}
                    disabled={analysisInProgress}
                    className="w-full mt-2 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-all duration-300"
                  >
                    Start Analysis with {activeInstrument}
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Analysis Queue & Recent Findings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Analysis Queue */}
          <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Analysis Queue</h3>
            <div className="space-y-2">
              {analysisQueue.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium text-sm">{item.sample}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.priority === 'high' ? 'bg-red-400/20 text-red-400' :
                        item.priority === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-green-400/20 text-green-400'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{item.instrument} • {item.estimatedTime}</p>
                  </div>
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Findings */}
          <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Recent Findings</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentFindings.map((finding, index) => (
                <div key={index} className="p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{finding.timestamp}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      finding.significance === 'Very High' ? 'bg-purple-400/20 text-purple-400' :
                      finding.significance === 'High' ? 'bg-red-400/20 text-red-400' :
                      finding.significance === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-green-400/20 text-green-400'
                    }`}>
                      {finding.significance}
                    </span>
                  </div>
                  <p className="text-sm text-white mb-1">{finding.finding}</p>
                  <p className="text-xs text-gray-500">Source: {finding.instrument}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Data */}
          <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Environmental Conditions</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Temperature:</span>
                <span className="text-white">{atmosphericData.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pressure:</span>
                <span className="text-white">{atmosphericData.pressure} Pa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Wind Speed:</span>
                <span className="text-white">{atmosphericData.windSpeed} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Dust Level:</span>
                <span className="text-white">{atmosphericData.dustLevel}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default ScienceLab;
