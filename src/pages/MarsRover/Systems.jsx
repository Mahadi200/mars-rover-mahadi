import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BoltIcon,
  SignalIcon,
  CogIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  SunIcon,

  ComputerDesktopIcon,
  WrenchScrewdriverIcon,
  FireIcon,
  CloudIcon,

  CpuChipIcon
} from '@heroicons/react/24/outline';

const Systems = ({ roverVersion = "1.0" }) => {
  const [selectedSystem, setSelectedSystem] = useState('power');
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagnosticsProgress, setDiagnosticsProgress] = useState(0);

  const systemOverview = [
    {
      id: 'power',
      name: 'Power Management',
      status: 'optimal',
      health: 94,
      icon: BoltIcon,
      subsystems: ['Solar Panels', 'Battery Bank', 'Power Distribution', 'Energy Storage']
    },
    {
      id: 'communication',
      name: 'Communication',
      status: 'good',
      health: 87,
      icon: SignalIcon,
      subsystems: ['High-Gain Antenna', 'Low-Gain Antenna', 'UHF Radio', 'Signal Processing']
    },
    {
      id: 'thermal',
      name: 'Thermal Control',
      status: 'warning',
      health: 76,
      icon: FireIcon,
      subsystems: ['Heaters', 'Radiators', 'Insulation', 'Temperature Sensors']
    },
    {
      id: 'computing',
      name: 'Computing Systems',
      status: 'optimal',
      health: 98,
      icon: ComputerDesktopIcon,
      subsystems: ['Main Computer', 'Backup Computer', 'Memory Systems', 'Data Storage']
    },
    {
      id: 'mobility',
      name: 'Mobility & Navigation',
      status: 'good',
      health: 89,
      icon: CogIcon,
      subsystems: ['Wheel Motors', 'Suspension', 'Steering', 'Navigation Sensors']
    },
    {
      id: 'science',
      name: 'Science Instruments',
      status: 'optimal',
      health: 92,
      icon: CpuChipIcon,
      subsystems: ['ChemCam', 'MAHLI', 'APXS', 'Sample Analysis']
    }
  ];

  const powerDetails = {
    solarPanels: {
      status: 'generating',
      currentOutput: 340,
      maxOutput: 400,
      efficiency: 85,
      temperature: 45,
      dustLevel: 12
    },
    battery: {
      charge: 87,
      voltage: 28.4,
      current: -2.1,
      temperature: 15,
      cycleCount: 1247,
      health: 94
    },
    consumption: {
      total: 285,
      breakdown: {
        'Science Instruments': 85,
        'Communication': 65,
        'Computing': 45,
        'Mobility': 40,
        'Thermal Control': 35,
        'Other Systems': 15
      }
    }
  };

  const communicationDetails = {
    antennas: {
      highGain: { status: 'active', signalStrength: -85, pointingAccuracy: 0.02 },
      lowGain: { status: 'standby', signalStrength: -95, omnidirectional: true },
      uhf: { status: 'active', signalStrength: -78, frequency: 437.1 }
    },
    dataRates: {
      uplink: 2.1,
      downlink: 256,
      bufferUsage: 45
    },
    earthContact: {
      nextWindow: '2h 15m',
      duration: '8h 32m',
      elevation: 45,
      quality: 'excellent'
    }
  };

  const diagnosticTests = [
    { name: 'Power System Health', duration: 45, status: 'completed', result: 'pass' },
    { name: 'Communication Link Test', duration: 30, status: 'completed', result: 'pass' },
    { name: 'Mobility System Check', duration: 60, status: 'running', result: 'pending' },
    { name: 'Thermal System Analysis', duration: 35, status: 'pending', result: 'pending' },
    { name: 'Science Instrument Calibration', duration: 90, status: 'pending', result: 'pending' },
    { name: 'Memory & Storage Test', duration: 25, status: 'pending', result: 'pending' }
  ];

  const alerts = [
    { 
      id: 1, 
      severity: 'warning', 
      system: 'Thermal Control', 
      message: 'Heater efficiency below optimal range',
      timestamp: '14:32 MST',
      acknowledged: false
    },
    { 
      id: 2, 
      severity: 'info', 
      system: 'Power Management', 
      message: 'Solar panel cleaning recommended',
      timestamp: '13:45 MST',
      acknowledged: true
    },
    { 
      id: 3, 
      severity: 'warning', 
      system: 'Communication', 
      message: 'Signal quality degraded during last contact',
      timestamp: '12:20 MST',
      acknowledged: false
    }
  ];

  useEffect(() => {
    let interval;
    if (diagnosticsRunning && diagnosticsProgress < 100) {
      interval = setInterval(() => {
        setDiagnosticsProgress(prev => {
          if (prev >= 100) {
            setDiagnosticsRunning(false);
            return 100;
          }
          return prev + 3;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [diagnosticsRunning, diagnosticsProgress]);

  const startDiagnostics = () => {
    setDiagnosticsRunning(true);
    setDiagnosticsProgress(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal': return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case 'good': return <CheckCircleIcon className="h-5 w-5 text-blue-400" />;
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />;
      case 'critical': return <XCircleIcon className="h-5 w-5 text-red-400" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'info': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const renderSystemDetails = () => {
    switch (selectedSystem) {
      case 'power':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Power Management System</h3>
            
            {/* Solar Panels */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <SunIcon className="h-5 w-5 mr-2 text-yellow-400" />
                Solar Panels
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Current Output:</span>
                  <div className="text-white font-semibold">{powerDetails.solarPanels.currentOutput}W</div>
                </div>
                <div>
                  <span className="text-gray-400">Efficiency:</span>
                  <div className="text-white font-semibold">{powerDetails.solarPanels.efficiency}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Dust Level:</span>
                  <div className="text-white font-semibold">{powerDetails.solarPanels.dustLevel}%</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Power Generation</span>
                  <span className="text-white">{powerDetails.solarPanels.currentOutput}/{powerDetails.solarPanels.maxOutput}W</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(powerDetails.solarPanels.currentOutput / powerDetails.solarPanels.maxOutput) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Battery */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <BoltIcon className="h-5 w-5 mr-2 text-green-400" />
                Battery System
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Charge Level:</span>
                  <div className="text-white font-semibold">{powerDetails.battery.charge}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Voltage:</span>
                  <div className="text-white font-semibold">{powerDetails.battery.voltage}V</div>
                </div>
                <div>
                  <span className="text-gray-400">Current:</span>
                  <div className="text-white font-semibold">{powerDetails.battery.current}A</div>
                </div>
              </div>
            </div>

            {/* Power Consumption */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Power Consumption Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(powerDetails.consumption.breakdown).map(([system, power]) => (
                  <div key={system} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{system}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(power / powerDetails.consumption.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm w-8">{power}W</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Communication Systems</h3>
            
            {/* Antenna Status */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <SignalIcon className="h-5 w-5 mr-2 text-blue-400" />
                Antenna Systems
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">High-Gain Antenna</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">{communicationDetails.antennas.highGain.signalStrength} dBm</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Low-Gain Antenna</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white text-sm">{communicationDetails.antennas.lowGain.signalStrength} dBm</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">UHF Radio</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">{communicationDetails.antennas.uhf.frequency} MHz</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Rates */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Data Transfer</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Uplink Rate:</span>
                  <div className="text-white font-semibold">{communicationDetails.dataRates.uplink} kbps</div>
                </div>
                <div>
                  <span className="text-gray-400">Downlink Rate:</span>
                  <div className="text-white font-semibold">{communicationDetails.dataRates.downlink} kbps</div>
                </div>
              </div>
            </div>

            {/* Earth Contact */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Earth Contact Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Contact Window:</span>
                  <span className="text-white">{communicationDetails.earthContact.nextWindow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expected Duration:</span>
                  <span className="text-white">{communicationDetails.earthContact.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Signal Quality:</span>
                  <span className="text-green-400 capitalize">{communicationDetails.earthContact.quality}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-400 py-8">
            <CogIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Select a system to view detailed information</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Management</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <ShieldCheckIcon className="h-4 w-4" />
                <span>Systems Online: {systemOverview.filter(s => s.status !== 'critical').length}/{systemOverview.length}</span>
              </div>
              <div>Overall Health: {Math.round(systemOverview.reduce((acc, s) => acc + s.health, 0) / systemOverview.length)}%</div>
              <div>Last Diagnostics: 2 hours ago</div>
            </div>
          </div>
          <button
            onClick={startDiagnostics}
            disabled={diagnosticsRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
          >
            <WrenchScrewdriverIcon className="h-4 w-4" />
            <span>{diagnosticsRunning ? 'Running Diagnostics...' : 'Run Full Diagnostics'}</span>
          </button>
        </div>
      </motion.div>

      {/* Diagnostics Progress */}
      {diagnosticsRunning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-600/20 rounded-lg p-4 border border-blue-500"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">System Diagnostics in Progress</span>
            <span className="text-blue-400">{diagnosticsProgress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${diagnosticsProgress}%` }}
            ></div>
          </div>
        </motion.div>
      )}

      {/* System Overview Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {systemOverview.map((system, index) => {
          const Icon = system.icon;
          return (
            <motion.div
              key={system.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                selectedSystem === system.id
                  ? 'bg-blue-600/20 border-blue-500'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedSystem(system.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-6 w-6 ${getStatusColor(system.status)}`} />
                {getStatusIcon(system.status)}
              </div>
              <h3 className="font-semibold text-white mb-2">{system.name}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Health:</span>
                <span className="text-white font-medium">{system.health}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full ${
                    system.health >= 90 ? 'bg-green-500' :
                    system.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${system.health}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                {system.subsystems.length} subsystems
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700"
        >
          {renderSystemDetails()}
        </motion.div>

        {/* Alerts & Diagnostics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {/* System Alerts */}
          <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">System Alerts</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)} ${
                    alert.acknowledged ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{alert.timestamp}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-400/20 text-red-400' :
                      alert.severity === 'warning' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-blue-400/20 text-blue-400'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-white mb-1">{alert.message}</p>
                  <p className="text-xs text-gray-500">System: {alert.system}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Tests */}
          <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Diagnostic Tests</h3>
            <div className="space-y-2">
              {diagnosticTests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                  <div className="flex-1">
                    <span className="text-sm text-white">{test.name}</span>
                    <div className="text-xs text-gray-400">{test.duration}s</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {test.status === 'completed' && test.result === 'pass' && (
                      <CheckCircleIcon className="h-4 w-4 text-green-400" />
                    )}
                    {test.status === 'running' && (
                      <ArrowPathIcon className="h-4 w-4 text-blue-400 animate-spin" />
                    )}
                    {test.status === 'pending' && (
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Systems;
