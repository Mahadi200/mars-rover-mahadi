import { useState, useEffect } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import {
  FireIcon,
  ClockIcon,
  CloudIcon,
  EyeDropperIcon,
  CubeTransparentIcon,
  Square3Stack3DIcon
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
      });
    };

    updateSensorData();
    const interval = setInterval(updateSensorData, 3000);
    return () => clearInterval(interval);
  }, []);



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

  return (
    <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
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

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
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
              Data updating every 3 seconds
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
  );
};

export default Dashboard;
