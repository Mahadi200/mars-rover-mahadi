import { useState, useEffect } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import MarsBackground from '../../components/MarsBackground';
import {
  FireIcon,
  ClockIcon,
  CloudIcon,
  EyeDropperIcon,
  CubeTransparentIcon,
  Square3Stack3DIcon,
  SignalIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  ChartBarIcon,
  EyeIcon,
  CpuChipIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const Dashboard = ({ roverVersion = "1.0" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [missionSol] = useState(1247);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time data generation with scientific fluctuations
  const [sensorData, setSensorData] = useState({});
  const [alertSystem, setAlertSystem] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [activeTab, setActiveTab] = useState('realtime');
  
  useEffect(() => {
    const updateSensorData = () => {
      setSensorData({
        // Atmospheric Data
        oxygen: 0.13 + (Math.random() - 0.5) * 0.02, // ppm
        carbonDioxide: 95.32 + (Math.random() - 0.5) * 0.5, // %
        humidity: 0.03 + (Math.random() - 0.5) * 0.01, // %
        temperature: -68 + (Math.random() - 0.5) * 8, // °C
        pressure: 610 + (Math.random() - 0.5) * 50, // Pa
        windSpeed: 12 + (Math.random() - 0.5) * 6, // m/s
        dustLevel: 15 + (Math.random() - 0.5) * 10, // %
        
        // Soil and Water Analysis
        soilMoisture: 0.08 + (Math.random() - 0.5) * 0.04, // %
        soilPh: 8.2 + (Math.random() - 0.5) * 0.6, // pH
        tpsReading: 1247 + (Math.random() - 0.5) * 100, // µS/cm
        sulfurContent: 2.4 + (Math.random() - 0.5) * 0.8, // %
        ironOxide: 18.7 + (Math.random() - 0.5) * 2.0, // %
        siliconDioxide: 45.2 + (Math.random() - 0.5) * 3.0, // %
        
        // Gas Detection
        hydrogen: 0.000015 + (Math.random() - 0.5) * 0.00001, // ppm
        methane: 0.0007 + (Math.random() - 0.5) * 0.0003, // ppb
        argon: 1.6 + (Math.random() - 0.5) * 0.2, // %
        nitrogen: 2.7 + (Math.random() - 0.5) * 0.3, // %
        waterVapor: 210 + (Math.random() - 0.5) * 50, // ppm
        
        // System Health
        tiltAxisX: 0.5 + (Math.random() - 0.5) * 2.0, // degrees
        tiltAxisY: -1.2 + (Math.random() - 0.5) * 1.5, // degrees
        tiltAxisZ: 0.8 + (Math.random() - 0.5) * 1.0, // degrees
        
        // Gas sensors (your specified sensors)
        gasSensor: 15.3 + (Math.random() - 0.5) * 5.0, // ppm
        metalDetection: Math.random() > 0.8 ? 'Iron' : Math.random() > 0.6 ? 'Nickel' : 'None',
        metalSignalStrength: 42 + (Math.random() - 0.5) * 30, // %
        tdsReading: 1247 + (Math.random() - 0.5) * 100, // ppm (TDS sensor)
        
        // Battery and Power
        batteryLevel: 87 + (Math.random() - 0.5) * 10, // %
        solarPanelEfficiency: 94 + (Math.random() - 0.5) * 8, // %
        powerConsumption: 145 + (Math.random() - 0.5) * 25, // W
        
        // Mission Status
        missionStatus: 'Active',
        systemHealth: 'Operational',
        signalStrength: 78 + (Math.random() - 0.5) * 15, // %
        dataTransmissionRate: 2.4 + (Math.random() - 0.5) * 0.8, // Mbps
      });
    };

    updateSensorData();
    const interval = setInterval(updateSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  // Alert System Management
  useEffect(() => {
    const checkAlerts = () => {
      const alerts = [];
      
      if (sensorData.temperature < -75) {
        alerts.push({ id: 1, type: 'warning', message: 'Temperature critically low', sensor: 'Temperature' });
      }
      if (sensorData.soilMoisture > 0.15) {
        alerts.push({ id: 2, type: 'info', message: 'Elevated soil moisture detected', sensor: 'Soil Moisture' });
      }
      if (sensorData.hydrogen > 0.00002) {
        alerts.push({ id: 3, type: 'alert', message: 'Hydrogen levels elevated', sensor: 'Gas Detection' });
      }
      if (sensorData.batteryLevel < 25) {
        alerts.push({ id: 4, type: 'critical', message: 'Battery level critically low', sensor: 'Power' });
      }
      if (sensorData.metalDetection !== 'None') {
        alerts.push({ id: 5, type: 'success', message: `Metal detected: ${sensorData.metalDetection}`, sensor: 'Metal Detector' });
      }
      
      setAlertSystem(alerts);
    };

    if (Object.keys(sensorData).length > 0) {
      checkAlerts();
    }
  }, [sensorData]);

  // Trends Data Collection
  useEffect(() => {
    if (Object.keys(sensorData).length > 0) {
      const timestamp = new Date().toLocaleTimeString();
      setTrendsData(prev => {
        const newData = [...prev, {
          timestamp,
          temperature: sensorData.temperature,
          co2: sensorData.carbonDioxide,
          soilMoisture: sensorData.soilMoisture,
          hydrogen: sensorData.hydrogen,
          tds: sensorData.tdsReading,
          battery: sensorData.batteryLevel
        }];
        // Keep only last 20 data points
        return newData.slice(-20);
      });
    }
  }, [sensorData]);



  // 3D Visualization Component
  const Sensor3DVisualizer = ({ type, value, className }) => {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
        <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 hover:border-cyan-400/60 transition-all duration-500 group">
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <motion.div
            animate={{ 
              rotateY: animationActive ? [0, 360] : 0,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear"
            }}
            className="text-center"
          >
            <div className="text-cyan-400 text-lg font-bold mb-1">{type}</div>
            <div className="text-white text-2xl font-mono">{value}</div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        </div>
      </div>
    );
  };

  // Gauge Chart Component
  const GaugeChart = ({ value, max, label, unit, color = "cyan", size = "normal" }) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const sizeClasses = size === "large" ? "w-32 h-32" : "w-24 h-24";
    
    return (
      <div className="flex flex-col items-center">
        <div className={`relative ${sizeClasses}`}>
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="45"
              stroke="rgba(75, 85, 99, 0.3)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45"
              stroke={`rgb(var(--color-${color}-400))`}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ '--color-cyan-400': '34, 211, 238' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`font-bold text-white ${size === "large" ? "text-lg" : "text-sm"}`}>
                {value?.toFixed(1)}
              </div>
              <div className={`text-gray-400 ${size === "large" ? "text-sm" : "text-xs"}`}>
                {unit}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <div className="text-white text-sm font-medium">{label}</div>
        </div>
      </div>
    );
  };

  // Donut Chart Component
  const DonutChart = ({ percentage, label, color = "emerald" }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="40"
              stroke="rgba(75, 85, 99, 0.3)"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="40"
              stroke={color === "emerald" ? "#10b981" : "#f59e0b"}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-white text-lg">
                {percentage?.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <div className="text-white text-sm font-medium">{label}</div>
        </div>
      </div>
    );
  };

  // Radar/Sonar Chart Component
  const RadarChart = ({ obstacles = [] }) => {
    const radius = 60;
    const centerX = 80;
    const centerY = 80;
    
    // Generate mock obstacles if none provided
    const mockObstacles = obstacles.length ? obstacles : [
      { angle: 45, distance: 0.7, size: 'small' },
      { angle: 120, distance: 0.4, size: 'medium' },
      { angle: 200, distance: 0.9, size: 'large' },
      { angle: 300, distance: 0.3, size: 'small' }
    ];
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full">
            {/* Radar circles */}
            {[0.25, 0.5, 0.75, 1].map((scale, i) => (
              <circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={radius * scale}
                stroke="rgba(34, 211, 238, 0.3)"
                strokeWidth="1"
                fill="transparent"
              />
            ))}
            
            {/* Radar lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const radian = (angle * Math.PI) / 180;
              const x = centerX + radius * Math.cos(radian);
              const y = centerY + radius * Math.sin(radian);
              return (
                <line
                  key={angle}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="rgba(34, 211, 238, 0.2)"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Obstacles */}
            {mockObstacles.map((obstacle, i) => {
              const radian = (obstacle.angle * Math.PI) / 180;
              const x = centerX + radius * obstacle.distance * Math.cos(radian);
              const y = centerY + radius * obstacle.distance * Math.sin(radian);
              const size = obstacle.size === 'large' ? 4 : obstacle.size === 'medium' ? 3 : 2;
              
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={size}
                  fill="#ef4444"
                  className="animate-pulse"
                />
              );
            })}
            
            {/* Rover position */}
            <circle
              cx={centerX}
              cy={centerY}
              r="3"
              fill="#10b981"
            />
            
            {/* Scanning beam */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={centerX + radius}
              y2={centerY}
              stroke="#22d3ee"
              strokeWidth="2"
              opacity="0.8"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${centerX}px ${centerY}px` }}
            />
          </svg>
        </div>
        <div className="text-center mt-2">
          <div className="text-white text-sm font-medium">Sonar Detection</div>
          <div className="text-gray-400 text-xs">{mockObstacles.length} obstacles detected</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      
      <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-900/50 via-slate-900/50 to-gray-900/50 backdrop-blur-sm relative z-10">
      {/* Scientific Header with Real-time Status */}
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
                  animate={{ rotate: animationActive ? 360 : 0 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <Square3Stack3DIcon className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Mars Rover {roverVersion} - Scientific Analysis Center
                  </h1>
                  <div className="flex items-center space-x-6 text-sm text-cyan-300 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      <span className="font-medium">All Systems Operational</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>Sol {missionSol} • {currentTime.toLocaleTimeString()} MST</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Real-time Data Indicators */}
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  <span className="text-cyan-300">Live Data Stream</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FireIcon className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-300">{sensorData.temperature?.toFixed(1)}°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CloudIcon className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{sensorData.pressure?.toFixed(0)} Pa</span>
                </div>
              </div>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-2">
              {['1h', '24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    selectedTimeRange === range
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-cyan-300 hover:bg-gray-700/50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Atmospheric Data Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <CloudIcon className="h-8 w-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Atmospheric Analysis</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Sensor3DVisualizer 
            type="O₂ Sensor" 
            value={`${sensorData.oxygen?.toFixed(3)} ppm`}
            className="hover:scale-105 transition-transform duration-300"
          />
          <Sensor3DVisualizer 
            type="CO₂ Sensor" 
            value={`${sensorData.carbonDioxide?.toFixed(2)}%`}
            className="hover:scale-105 transition-transform duration-300"
          />
          <Sensor3DVisualizer 
            type="Humidity" 
            value={`${sensorData.humidity?.toFixed(3)}%`}
            className="hover:scale-105 transition-transform duration-300"
          />
          <Sensor3DVisualizer 
            type="Temperature" 
            value={`${sensorData.temperature?.toFixed(1)}°C`}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-400/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-300 text-sm">Pressure</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-white text-xl font-mono">{sensorData.pressure?.toFixed(0)} Pa</div>
            <div className="text-xs text-gray-400 mt-1">Atmospheric pressure</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-amber-400/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-300 text-sm">Wind Speed</span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-white text-xl font-mono">{sensorData.windSpeed?.toFixed(1)} m/s</div>
            <div className="text-xs text-gray-400 mt-1">Surface wind velocity</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-orange-400/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-300 text-sm">Dust Level</span>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-white text-xl font-mono">{sensorData.dustLevel?.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Atmospheric opacity</div>
          </div>
        </div>
      </motion.div>

      {/* Soil and Water Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <EyeDropperIcon className="h-8 w-8 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Soil & Water Analysis</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-emerald-900/50 to-green-900/50 rounded-lg p-6 border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-500"
          >
            <div className="absolute top-2 right-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <div className="text-emerald-300 text-sm font-medium mb-2">Soil Moisture Sensor</div>
            <div className="text-white text-3xl font-mono mb-2">{sensorData.soilMoisture?.toFixed(3)}%</div>
            <div className="text-xs text-gray-400">Volumetric water content</div>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((sensorData.soilMoisture || 0) * 1000, 100)}%` }}
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-lg p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-500"
          >
            <div className="absolute top-2 right-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            <div className="text-blue-300 text-sm font-medium mb-2">TPS Meter</div>
            <div className="text-white text-3xl font-mono mb-2">{sensorData.tpsReading?.toFixed(0)}</div>
            <div className="text-xs text-gray-400">µS/cm conductivity</div>
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-xs text-gray-500">pH:</span>
              <span className="text-blue-300 font-mono">{sensorData.soilPh?.toFixed(1)}</span>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-lg p-6 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-500"
          >
            <div className="absolute top-2 right-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div className="text-yellow-300 text-sm font-medium mb-2">Sulfur Sensor</div>
            <div className="text-white text-3xl font-mono mb-2">{sensorData.sulfurContent?.toFixed(2)}%</div>
            <div className="text-xs text-gray-400">Elemental sulfur content</div>
          </motion.div>
        </div>
        
        {/* Soil Composition */}
        <div className="mt-6 bg-gray-800/50 rounded-lg p-6 border border-gray-600/30">
          <h3 className="text-lg font-bold text-white mb-4">Soil Composition Analysis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-orange-400 text-2xl font-mono">{sensorData.ironOxide?.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Iron Oxide (Fe₂O₃)</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 text-2xl font-mono">{sensorData.siliconDioxide?.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Silicon Dioxide (SiO₂)</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-2xl font-mono">{sensorData.sulfurContent?.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Sulfur (S)</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 text-2xl font-mono">{(100 - (sensorData.ironOxide || 0) - (sensorData.siliconDioxide || 0) - (sensorData.sulfurContent || 0)).toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Other Elements</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gas Detection Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <CubeTransparentIcon className="h-8 w-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Gas Detection & Analysis</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.08, rotateX: 5 }}
            className="relative bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg p-6 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-500 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-purple-300 text-sm font-medium mb-2">Hydrogen Sensor</div>
              <div className="text-white text-2xl font-mono mb-2">{(sensorData.hydrogen * 1000000)?.toFixed(3)} ppm</div>
              <div className="text-xs text-gray-400">Molecular hydrogen (H₂)</div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Detection Level</span>
                  <span className="text-purple-300">Ultra-trace</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-1 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.08, rotateX: 5 }}
            className="relative bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-lg p-6 border border-red-400/30 hover:border-red-400/60 transition-all duration-500 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-red-300 text-sm font-medium mb-2">Methane Sensor</div>
              <div className="text-white text-2xl font-mono mb-2">{(sensorData.methane * 1000)?.toFixed(3)} ppb</div>
              <div className="text-xs text-gray-400">Methane (CH₄)</div>
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Status:</span>
                  <span className="text-red-300 text-xs">Monitoring</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.08, rotateX: 5 }}
            className="relative bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-lg p-6 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-cyan-300 text-sm font-medium mb-2">Water Vapor</div>
              <div className="text-white text-2xl font-mono mb-2">{sensorData.waterVapor?.toFixed(0)} ppm</div>
              <div className="text-xs text-gray-400">H₂O vapor content</div>
            </div>
          </motion.div>
        </div>
        
        {/* Additional Gas Components */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30 text-center">
            <div className="text-indigo-400 text-lg font-mono">{sensorData.argon?.toFixed(2)}%</div>
            <div className="text-xs text-gray-400">Argon (Ar)</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30 text-center">
            <div className="text-green-400 text-lg font-mono">{sensorData.nitrogen?.toFixed(2)}%</div>
            <div className="text-xs text-gray-400">Nitrogen (N₂)</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30 text-center">
            <div className="text-yellow-400 text-lg font-mono">{sensorData.sulfurContent?.toFixed(2)}%</div>
            <div className="text-xs text-gray-400">Sulfur (S)</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30 text-center">
            <div className="text-pink-400 text-lg font-mono">1.2 ppb</div>
            <div className="text-xs text-gray-400">Trace Gases</div>
          </div>
        </div>
      </motion.div>

      {/* Tilt Axis & System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-amber-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Square3Stack3DIcon className="h-8 w-8 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Tilt Axis & Orientation</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            animate={{ rotateZ: sensorData.tiltAxisX || 0 }}
            transition={{ duration: 2 }}
            className="bg-gradient-to-br from-red-900/50 to-pink-900/50 rounded-lg p-6 border border-red-400/30 text-center"
          >
            <div className="text-red-300 text-sm font-medium mb-2">X-Axis Tilt</div>
            <div className="text-white text-3xl font-mono mb-2">{sensorData.tiltAxisX?.toFixed(2)}°</div>
            <div className="text-xs text-gray-400">Roll orientation</div>
            <div className="mt-3 w-12 h-12 mx-auto border-2 border-red-400 rounded-full flex items-center justify-center">
              <div 
                className="w-2 h-6 bg-red-400 rounded-full origin-bottom"
                style={{ transform: `rotate(${sensorData.tiltAxisX || 0}deg)` }}
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ rotateY: sensorData.tiltAxisY || 0 }}
            transition={{ duration: 2 }}
            className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-lg p-6 border border-green-400/30 text-center"
          >
            <div className="text-green-300 text-sm font-medium mb-2">Y-Axis Tilt</div>
            <div className="text-white text-3xl font-mono mb-2">{sensorData.tiltAxisY?.toFixed(2)}°</div>
            <div className="text-xs text-gray-400">Pitch orientation</div>
            <div className="mt-3 w-12 h-12 mx-auto border-2 border-green-400 rounded-full flex items-center justify-center">
              <div 
                className="w-2 h-6 bg-green-400 rounded-full origin-bottom"
                style={{ transform: `rotate(${sensorData.tiltAxisY || 0}deg)` }}
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ rotateX: sensorData.tiltAxisZ || 0 }}
            transition={{ duration: 2 }}
            className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-lg p-6 border border-blue-400/30 text-center"
          >
            <div className="text-blue-300 text-sm font-medium mb-2">Z-Axis Tilt</div>
            <div className="text-white text-3xl font-mono mb-2">{sensorData.tiltAxisZ?.toFixed(2)}°</div>
            <div className="text-xs text-gray-400">Yaw orientation</div>
            <div className="mt-3 w-12 h-12 mx-auto border-2 border-blue-400 rounded-full flex items-center justify-center">
              <div 
                className="w-2 h-6 bg-blue-400 rounded-full origin-bottom"
                style={{ transform: `rotate(${sensorData.tiltAxisZ || 0}deg)` }}
              ></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Dashboard Sections with New Visualizations */}
      
      {/* Gas Sensors & Metal Detection Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <MagnifyingGlassIcon className="h-8 w-8 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Gas Sensors & Metal Detection</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <GaugeChart 
            value={sensorData.gasSensor} 
            max={50} 
            label="Gas Sensor"
            unit="ppm"
            color="yellow"
          />
          
          <DonutChart 
            percentage={sensorData.soilMoisture * 1000}
            label="Soil Moisture"
            color="emerald"
          />
          
          <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-400/30 text-center">
            <div className="text-orange-300 text-sm font-medium mb-2">TDS Sensor</div>
            <div className="text-white text-3xl font-mono mb-2">{sensorData.tdsReading?.toFixed(0)}</div>
            <div className="text-xs text-gray-400">ppm Total Dissolved Solids</div>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((sensorData.tdsReading || 0) / 2000 * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-400/30 text-center">
            <div className="text-purple-300 text-sm font-medium mb-2">Metal Detection</div>
            <div className="text-white text-2xl font-mono mb-2">{sensorData.metalDetection}</div>
            <div className="text-xs text-gray-400 mb-2">Current Detection</div>
            <div className="flex items-center justify-center">
              <div className="text-xs text-gray-500 mr-2">Signal:</div>
              <div className="text-purple-300 font-mono text-sm">{sensorData.metalSignalStrength?.toFixed(0)}%</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation & Mapping Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <SignalIcon className="h-8 w-8 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Navigation & Mapping</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-indigo-400/30">
            <RadarChart />
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GaugeChart 
                value={sensorData.signalStrength} 
                max={100} 
                label="Signal Strength"
                unit="%"
                color="indigo"
              />
              
              <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/30 text-center">
                <div className="text-cyan-300 text-sm font-medium mb-2">Data Rate</div>
                <div className="text-white text-2xl font-mono mb-1">{sensorData.dataTransmissionRate?.toFixed(1)}</div>
                <div className="text-xs text-gray-400">Mbps</div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-emerald-400/30">
              <h3 className="text-emerald-300 text-lg font-bold mb-4">Mission Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-emerald-400 font-semibold">{sensorData.missionStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">System Health:</span>
                  <span className="text-emerald-400 font-semibold">{sensorData.systemHealth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Power Level:</span>
                  <span className="text-yellow-400 font-semibold">{sensorData.batteryLevel?.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alert System */}
      {alertSystem.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-red-500/30 shadow-2xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
            <h2 className="text-2xl font-bold text-white">System Alerts</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alertSystem.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-lg border ${
                  alert.type === 'critical' ? 'bg-red-900/30 border-red-500/50' :
                  alert.type === 'warning' ? 'bg-yellow-900/30 border-yellow-500/50' :
                  alert.type === 'success' ? 'bg-green-900/30 border-green-500/50' :
                  'bg-blue-900/30 border-blue-500/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {alert.type === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  ) : (
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                  )}
                  <span className="text-white font-semibold text-sm">{alert.sensor}</span>
                </div>
                <div className="text-gray-300 text-sm">{alert.message}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trend Analysis Tab */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-pink-500/30 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-pink-400" />
            <h2 className="text-2xl font-bold text-white">Trend Analysis</h2>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('realtime')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'realtime'
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Real-time
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'trends'
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Historical
            </button>
          </div>
        </div>
        
        {activeTab === 'trends' && trendsData.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-pink-400/30">
              <h3 className="text-pink-300 text-lg font-bold mb-4">Historical Data Trends</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-cyan-400 text-2xl font-mono">
                    {trendsData.length > 0 ? trendsData[trendsData.length - 1].temperature?.toFixed(1) : '0'}°C
                  </div>
                  <div className="text-xs text-gray-400">Latest Temperature</div>
                  <div className="text-xs text-emerald-400 mt-1">
                    Trend: {trendsData.length > 1 && trendsData[trendsData.length - 1].temperature > trendsData[trendsData.length - 2].temperature ? '↗' : '↘'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-blue-400 text-2xl font-mono">
                    {trendsData.length > 0 ? trendsData[trendsData.length - 1].co2?.toFixed(1) : '0'}%
                  </div>
                  <div className="text-xs text-gray-400">Latest CO₂</div>
                  <div className="text-xs text-emerald-400 mt-1">
                    Trend: {trendsData.length > 1 && trendsData[trendsData.length - 1].co2 > trendsData[trendsData.length - 2].co2 ? '↗' : '↘'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-emerald-400 text-2xl font-mono">
                    {trendsData.length > 0 ? (trendsData[trendsData.length - 1].soilMoisture * 100)?.toFixed(2) : '0'}%
                  </div>
                  <div className="text-xs text-gray-400">Latest Soil Moisture</div>
                  <div className="text-xs text-emerald-400 mt-1">
                    Trend: {trendsData.length > 1 && trendsData[trendsData.length - 1].soilMoisture > trendsData[trendsData.length - 2].soilMoisture ? '↗' : '↘'}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-gray-400 text-sm mb-2">Data Points: {trendsData.length}/20</div>
                <div className="text-xs text-gray-500">
                  First: {trendsData.length > 0 ? trendsData[0].timestamp : 'N/A'} | 
                  Latest: {trendsData.length > 0 ? trendsData[trendsData.length - 1].timestamp : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-pink-400/30 text-center">
            <EyeIcon className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <div className="text-white text-lg font-semibold mb-2">Real-time Monitoring Active</div>
            <div className="text-gray-400">Switch to Historical view to see trend analysis</div>
          </div>
        )}
      </motion.div>

      {/* 3D Rover Model Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30 shadow-2xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <CpuChipIcon className="h-8 w-8 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">3D Rover Model & Sensor Placement</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-400/30 text-center">
            <motion.div
              animate={{ 
                rotateY: animationActive ? [0, 360] : 0,
                rotateX: [0, 10, 0, -10, 0]
              }}
              transition={{ 
                rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
                rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-64 h-64 mx-auto mb-4 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex items-center justify-center"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)'
              }}
            >
              <div className="text-white text-lg font-bold">Mars Rover 1.0</div>
              
              {/* Sensor placement indicators */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full animate-pulse" title="Camera"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse" title="Gas Sensor"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" title="Soil Sensor"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse" title="Metal Detector"></div>
            </motion.div>
            <div className="text-cyan-300 font-semibold">Interactive 3D Model</div>
            <div className="text-gray-400 text-sm">Sensor positions highlighted</div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
              <h3 className="text-white font-bold mb-3">Sensor Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">HD AI Camera System</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Gas Detection Array</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Soil Analysis Probe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Metal Detection Unit</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
              <h3 className="text-white font-bold mb-3">System Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <GaugeChart 
                  value={sensorData.batteryLevel} 
                  max={100} 
                  label="Battery"
                  unit="%"
                  size="normal"
                />
                <GaugeChart 
                  value={sensorData.solarPanelEfficiency} 
                  max={100} 
                  label="Solar Efficiency"
                  unit="%"
                  size="normal"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAnimationActive(!animationActive)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                animationActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {animationActive ? 'Pause' : 'Resume'} Animations
            </button>
            <div className="text-sm text-gray-400">
              Data updating every 3 seconds • {alertSystem.length} active alerts
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>All sensors operational</span>
            </div>
            <div>Last update: {currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
