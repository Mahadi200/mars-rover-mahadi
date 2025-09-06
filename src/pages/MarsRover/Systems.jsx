import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MarsBackground from '../../components/MarsBackground';
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
  CpuChipIcon,
  CircleStackIcon,
  WifiIcon,
  ServerIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

const Systems = ({ roverVersion: _roverVersion = "1.0" }) => {
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
      subsystems: ['Solar Panels', 'RTG Unit', 'Battery Bank', 'Power Distribution', 'Energy Storage', 'Dust Cleaning System']
    },
    {
      id: 'communication',
      name: 'Communication',
      status: 'good',
      health: 87,
      icon: SignalIcon,
      subsystems: ['High-Gain Antenna', 'Low-Gain Antenna', 'UHF Radio', 'X-Band Transceiver', 'Signal Processing', 'Data Encryption']
    },
    {
      id: 'diagnostics',
      name: 'Diagnostics',
      status: 'optimal',
      health: 96,
      icon: DocumentChartBarIcon,
      subsystems: ['Health Monitoring', 'Error Detection', 'Performance Analysis', 'Predictive Maintenance', 'Data Logging', 'Alert System']
    },
    {
      id: 'thermal',
      name: 'Thermal Control',
      status: 'warning',
      health: 76,
      icon: FireIcon,
      subsystems: ['Heaters', 'Radiators', 'Insulation', 'Temperature Sensors', 'WEB System']
    },
    {
      id: 'computing',
      name: 'Computing Systems',
      status: 'optimal',
      health: 98,
      icon: ComputerDesktopIcon,
      subsystems: ['Main Computer', 'Backup Computer', 'Memory Systems', 'Data Storage', 'AI Processing Unit']
    },
    {
      id: 'science',
      name: 'Science Instruments',
      status: 'optimal',
      health: 92,
      icon: CpuChipIcon,
      subsystems: ['HD AI Camera', 'Spectrometer', 'Drill System', 'Sample Analysis', 'Metal Detector', 'Gas Sensors']
    }
  ];

  const powerDetails = {
    solarPanels: {
      status: 'generating',
      currentOutput: 340,
      maxOutput: 400,
      efficiency: 85,
      temperature: 45,
      dustLevel: 12,
      cleaningCycles: 847,
      degradation: 3.2,
      peakDailyOutput: 2.8 // kWh
    },
    rtg: {
      status: 'active',
      thermalPower: 2000, // Watts thermal
      electricalOutput: 125, // Watts electrical
      efficiency: 6.25,
      temperature: 850,
      fuelRemaining: 87.3,
      expectedLifetime: '14+ years'
    },
    battery: {
      charge: 87,
      voltage: 28.4,
      current: -2.1,
      temperature: 15,
      cycleCount: 1247,
      health: 94,
      capacity: 42, // Ah
      energyStored: 1.18, // kWh
      chargingRate: 0.5, // A
      dischargingRate: 2.1, // A
      expectedLifetime: '8-10 years'
    },
    powerDistribution: {
      busVoltage: 28.0,
      loadSwitches: 24,
      activeSwitches: 18,
      powerConverters: 6,
      backupSystems: 3,
      faultTolerance: 'Triple redundancy'
    },
    consumption: {
      total: 285,
      peak: 450,
      average: 220,
      standby: 85,
      breakdown: {
        'Science Instruments': 85,
        'Communication': 65,
        'Computing & AI': 45,
        'Mobility & Drive': 40,
        'Thermal Control': 35,
        'Cameras & Imaging': 25,
        'Sample Processing': 20,
        'Navigation': 15,
        'Diagnostics': 10,
        'Other Systems': 15
      }
    },
    dustCleaning: {
      status: 'auto',
      lastCleaning: '2 days ago',
      cleaningEfficiency: 92,
      schedule: 'Every 3 sols',
      electrostatic: true,
      mechanicalBrush: true
    }
  };

  const communicationDetails = {
    antennas: {
      highGain: { 
        status: 'active', 
        signalStrength: -85, 
        pointingAccuracy: 0.02,
        diameter: 3.0, // meters
        frequency: '8.4 GHz',
        beamWidth: 0.3, // degrees
        gain: 48 // dBi
      },
      lowGain: { 
        status: 'standby', 
        signalStrength: -95, 
        omnidirectional: true,
        frequency: '8.4 GHz',
        gain: 3, // dBi
        coverage: '360°'
      },
      uhf: { 
        status: 'active', 
        signalStrength: -78, 
        frequency: 437.1,
        bandwidth: 1, // MHz
        purpose: 'Orbit relay'
      },
      xBand: {
        status: 'active',
        frequency: '8.4 GHz',
        power: 15, // Watts
        dataRate: 256, // kbps
        range: '400M km'
      }
    },
    dataTransmission: {
      uplink: {
        rate: 2.1, // kbps
        frequency: '7.145 GHz',
        power: 20, // kW (Earth-based)
        protocols: ['Reed-Solomon', 'Turbo Codes']
      },
      downlink: {
        rate: 256, // kbps
        frequency: '8.4 GHz',
        power: 15, // Watts
        compression: 'JPEG2000'
      },
      bufferUsage: 45, // %
      queuedData: 2.8, // GB
      transmittedToday: 156, // MB
      errorRate: 0.001 // %
    },
    earthContact: {
      nextWindow: '2h 15m',
      duration: '8h 32m',
      elevation: 45,
      quality: 'excellent',
      distance: 225, // million km
      lightDelay: 12.5, // minutes
      earthStation: 'DSN Goldstone',
      weather: 'Clear',
      atmosphericLoss: 0.2 // dB
    },
    networkProtocols: {
      primary: 'Deep Space Network',
      backup: 'Mars Relay Network',
      encryption: 'AES-256',
      errorCorrection: 'LDPC',
      packetLoss: 0.02, // %
      latency: 750000, // ms (12.5 min)
      jitter: 50 // ms
    },
    emergencyComm: {
      status: 'standby',
      beacon: 'active',
      frequency: '401.586 MHz',
      power: 1, // Watt
      range: '100 km',
      autonomousMode: true
    }
  };

  const diagnosticsDetails = {
    healthMonitoring: {
      systemsMonitored: 247,
      sensorsActive: 156,
      dataPointsPerMinute: 2400,
      historicalData: '2.8 years',
      predictionAccuracy: 94.7,
      anomaliesDetected: 23,
      falsePositives: 2.1 // %
    },
    errorDetection: {
      realTimeScanning: true,
      errorTypes: ['Hardware', 'Software', 'Communication', 'Thermal', 'Power'],
      detectionMethods: ['Checksums', 'Parity', 'ECC', 'Watchdog', 'Heartbeat'],
      responseTime: 0.05, // seconds
      errorLog: 'Last 30 days: 12 errors',
      criticalErrors: 0,
      warningLevel: 8
    },
    performanceAnalysis: {
      cpuUsage: 34, // %
      memoryUsage: 67, // %
      storageUsage: 43, // %
      networkLatency: 750000, // ms
      taskCompletion: 98.7, // %
      benchmarkScore: 94.2,
      degradationRate: 0.8 // % per year
    },
    predictiveMaintenance: {
      algorithmsActive: 15,
      componentsMonitored: 89,
      maintenanceScheduled: 4,
      replacementRecommendations: 2,
      confidenceLevel: 87, // %
      nextMaintenance: '47 sols',
      criticalComponents: ['Drill Motor', 'Camera Focus']
    },
    dataLogging: {
      logFiles: 15847,
      totalLogSize: 847, // GB
      compressionRatio: 3.2,
      retentionPeriod: '5 years',
      backupCopies: 3,
      integrityChecks: 'Weekly',
      lastBackup: '6 hours ago'
    },
    alertSystem: {
      alertLevels: ['Info', 'Warning', 'Critical', 'Emergency'],
      activeAlerts: 8,
      acknowledgedAlerts: 23,
      escalationRules: 12,
      notificationChannels: ['Earth Command', 'Autonomous', 'Backup Systems'],
      responseTime: 0.1, // seconds
      falseAlarmRate: 1.2 // %
    }
  };

  const diagnosticTests = [
    { name: 'Power System Health Check', duration: 45, status: 'completed', result: 'pass', lastRun: '2h ago', score: 94 },
    { name: 'Communication Link Verification', duration: 30, status: 'completed', result: 'pass', lastRun: '4h ago', score: 87 },
    { name: 'Mobility System Diagnostics', duration: 60, status: 'running', result: 'pending', lastRun: 'Running', score: null },
    { name: 'Thermal System Analysis', duration: 35, status: 'pending', result: 'pending', lastRun: '1 day ago', score: 76 },
    { name: 'Science Instrument Calibration', duration: 90, status: 'pending', result: 'pending', lastRun: '3 days ago', score: 92 },
    { name: 'Memory & Storage Integrity', duration: 25, status: 'pending', result: 'pending', lastRun: '12h ago', score: 98 },
    { name: 'AI System Performance', duration: 55, status: 'completed', result: 'pass', lastRun: '8h ago', score: 96 },
    { name: 'Navigation System Check', duration: 40, status: 'completed', result: 'warning', lastRun: '6h ago', score: 83 },
    { name: 'Sample Processing Test', duration: 75, status: 'pending', result: 'pending', lastRun: '2 days ago', score: 89 },
    { name: 'Emergency Protocol Verification', duration: 20, status: 'completed', result: 'pass', lastRun: '1h ago', score: 100 }
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

            {/* RTG Power Source */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <FireIcon className="h-5 w-5 mr-2 text-red-400" />
                RTG Power Source
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Thermal Power:</span>
                  <div className="text-white font-semibold">{powerDetails.rtg.thermalPower}W</div>
                </div>
                <div>
                  <span className="text-gray-400">Electrical Output:</span>
                  <div className="text-white font-semibold">{powerDetails.rtg.electricalOutput}W</div>
                </div>
                <div>
                  <span className="text-gray-400">Fuel Remaining:</span>
                  <div className="text-white font-semibold">{powerDetails.rtg.fuelRemaining}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Temperature:</span>
                  <div className="text-white font-semibold">{powerDetails.rtg.temperature}°C</div>
                </div>
                <div>
                  <span className="text-gray-400">Efficiency:</span>
                  <div className="text-white font-semibold">{powerDetails.rtg.efficiency}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Expected Life:</span>
                  <div className="text-green-400 font-semibold">{powerDetails.rtg.expectedLifetime}</div>
                </div>
              </div>
            </div>

            {/* Dust Cleaning System */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <CloudIcon className="h-5 w-5 mr-2 text-amber-400" />
                Dust Cleaning System
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Status:</span>
                  <div className="text-green-400 font-semibold capitalize">{powerDetails.dustCleaning.status}</div>
                </div>
                <div>
                  <span className="text-gray-400">Last Cleaning:</span>
                  <div className="text-white font-semibold">{powerDetails.dustCleaning.lastCleaning}</div>
                </div>
                <div>
                  <span className="text-gray-400">Efficiency:</span>
                  <div className="text-white font-semibold">{powerDetails.dustCleaning.cleaningEfficiency}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Schedule:</span>
                  <div className="text-white font-semibold">{powerDetails.dustCleaning.schedule}</div>
                </div>
                <div>
                  <span className="text-gray-400">Methods:</span>
                  <div className="text-cyan-400 font-semibold">Electrostatic + Brush</div>
                </div>
              </div>
            </div>

            {/* Power Consumption */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Power Consumption Overview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-400">Current Total:</span>
                  <div className="text-white font-semibold">{powerDetails.consumption.total}W</div>
                </div>
                <div>
                  <span className="text-gray-400">Peak Usage:</span>
                  <div className="text-white font-semibold">{powerDetails.consumption.peak}W</div>
                </div>
                <div>
                  <span className="text-gray-400">Average:</span>
                  <div className="text-white font-semibold">{powerDetails.consumption.average}W</div>
                </div>
                <div>
                  <span className="text-gray-400">Standby:</span>
                  <div className="text-white font-semibold">{powerDetails.consumption.standby}W</div>
                </div>
              </div>
              <h5 className="text-cyan-400 font-medium mb-3">System Breakdown:</h5>
              <div className="space-y-2">
                {Object.entries(powerDetails.consumption.breakdown).map(([system, power]) => (
                  <div key={system} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{system}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(power / powerDetails.consumption.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-xs w-12">{power}W</span>
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
            
            {/* Antenna Systems */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <SignalIcon className="h-5 w-5 mr-2 text-blue-400" />
                Antenna Systems
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-cyan-400 font-medium">High-Gain Antenna</h5>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">{communicationDetails.antennas.highGain.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Frequency:</span>
                      <span className="text-white">{communicationDetails.antennas.highGain.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Diameter:</span>
                      <span className="text-white">{communicationDetails.antennas.highGain.diameter}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gain:</span>
                      <span className="text-white">{communicationDetails.antennas.highGain.gain} dBi</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-yellow-400 font-medium">X-Band Transceiver</h5>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Power:</span>
                      <span className="text-white">{communicationDetails.antennas.xBand.power}W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Rate:</span>
                      <span className="text-white">{communicationDetails.antennas.xBand.dataRate} kbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Range:</span>
                      <span className="text-white">{communicationDetails.antennas.xBand.range}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Transmission */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <WifiIcon className="h-5 w-5 mr-2 text-green-400" />
                Data Transmission
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Uplink Rate:</span>
                  <div className="text-white font-semibold">{communicationDetails.dataTransmission.uplink.rate} kbps</div>
                  <div className="text-gray-500 text-xs">Error Rate: {communicationDetails.dataTransmission.errorRate}%</div>
                </div>
                <div>
                  <span className="text-gray-400">Downlink Rate:</span>
                  <div className="text-white font-semibold">{communicationDetails.dataTransmission.downlink.rate} kbps</div>
                  <div className="text-gray-500 text-xs">Transmitted: {communicationDetails.dataTransmission.transmittedToday} MB</div>
                </div>
                <div>
                  <span className="text-gray-400">Buffer Usage:</span>
                  <div className="text-white font-semibold">{communicationDetails.dataTransmission.bufferUsage}%</div>
                  <div className="text-gray-500 text-xs">Queued: {communicationDetails.dataTransmission.queuedData} GB</div>
                </div>
              </div>
            </div>

            {/* Earth Contact & Network */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Earth Contact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Window:</span>
                    <span className="text-white">{communicationDetails.earthContact.nextWindow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Distance:</span>
                    <span className="text-white">{communicationDetails.earthContact.distance}M km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Light Delay:</span>
                    <span className="text-white">{communicationDetails.earthContact.lightDelay} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Station:</span>
                    <span className="text-green-400">{communicationDetails.earthContact.earthStation}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Network Protocols</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Primary:</span>
                    <span className="text-white">{communicationDetails.networkProtocols.primary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Encryption:</span>
                    <span className="text-white">{communicationDetails.networkProtocols.encryption}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Packet Loss:</span>
                    <span className="text-white">{communicationDetails.networkProtocols.packetLoss}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Error Correction:</span>
                    <span className="text-white">{communicationDetails.networkProtocols.errorCorrection}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'diagnostics':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Diagnostics & Health Monitoring</h3>
            
            {/* Health Monitoring Overview */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <DocumentChartBarIcon className="h-5 w-5 mr-2 text-cyan-400" />
                Health Monitoring
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Systems Monitored:</span>
                  <div className="text-white font-semibold">{diagnosticsDetails.healthMonitoring.systemsMonitored}</div>
                </div>
                <div>
                  <span className="text-gray-400">Active Sensors:</span>
                  <div className="text-white font-semibold">{diagnosticsDetails.healthMonitoring.sensorsActive}</div>
                </div>
                <div>
                  <span className="text-gray-400">Data Points/Min:</span>
                  <div className="text-white font-semibold">{diagnosticsDetails.healthMonitoring.dataPointsPerMinute}</div>
                </div>
                <div>
                  <span className="text-gray-400">Prediction Accuracy:</span>
                  <div className="text-white font-semibold">{diagnosticsDetails.healthMonitoring.predictionAccuracy}%</div>
                </div>
              </div>
            </div>

            {/* Error Detection & Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-red-400" />
                  Error Detection
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Real-time Scanning:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time:</span>
                    <span className="text-white">{diagnosticsDetails.errorDetection.responseTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Critical Errors:</span>
                    <span className="text-green-400">{diagnosticsDetails.errorDetection.criticalErrors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warning Level:</span>
                    <span className="text-yellow-400">{diagnosticsDetails.errorDetection.warningLevel}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <CpuChipIcon className="h-5 w-5 mr-2 text-purple-400" />
                  Performance Analysis
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPU Usage:</span>
                    <span className="text-white">{diagnosticsDetails.performanceAnalysis.cpuUsage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Memory Usage:</span>
                    <span className="text-white">{diagnosticsDetails.performanceAnalysis.memoryUsage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Task Completion:</span>
                    <span className="text-white">{diagnosticsDetails.performanceAnalysis.taskCompletion}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Benchmark Score:</span>
                    <span className="text-green-400">{diagnosticsDetails.performanceAnalysis.benchmarkScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Maintenance & Data Logging */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <WrenchScrewdriverIcon className="h-5 w-5 mr-2 text-orange-400" />
                  Predictive Maintenance
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Components Monitored:</span>
                    <span className="text-white">{diagnosticsDetails.predictiveMaintenance.componentsMonitored}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Maintenance Scheduled:</span>
                    <span className="text-yellow-400">{diagnosticsDetails.predictiveMaintenance.maintenanceScheduled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Maintenance:</span>
                    <span className="text-white">{diagnosticsDetails.predictiveMaintenance.nextMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence Level:</span>
                    <span className="text-green-400">{diagnosticsDetails.predictiveMaintenance.confidenceLevel}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <ServerIcon className="h-5 w-5 mr-2 text-blue-400" />
                  Data Logging
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Log Files:</span>
                    <span className="text-white">{diagnosticsDetails.dataLogging.logFiles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Size:</span>
                    <span className="text-white">{diagnosticsDetails.dataLogging.totalLogSize} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compression:</span>
                    <span className="text-white">{diagnosticsDetails.dataLogging.compressionRatio}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Backup:</span>
                    <span className="text-green-400">{diagnosticsDetails.dataLogging.lastBackup}</span>
                  </div>
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
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      
      <div className="space-y-6 p-6 min-h-screen bg-gradient-to-br from-gray-900/50 via-slate-900/50 to-gray-900/50 backdrop-blur-sm relative z-10">
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
        {systemOverview.map((system) => {
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
              {diagnosticTests.map((test, _index) => (
                <div key={_index} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">{test.name}</span>
                    <div className="flex items-center space-x-2">
                      {test.status === 'completed' && test.result === 'pass' && (
                        <CheckCircleIcon className="h-4 w-4 text-green-400" />
                      )}
                      {test.status === 'completed' && test.result === 'warning' && (
                        <ExclamationTriangleIcon className="h-4 w-4 text-yellow-400" />
                      )}
                      {test.status === 'running' && (
                        <ArrowPathIcon className="h-4 w-4 text-blue-400 animate-spin" />
                      )}
                      {test.status === 'pending' && (
                        <ClockIcon className="h-4 w-4 text-gray-400" />
                      )}
                      {test.score !== null && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          test.score >= 90 ? 'bg-green-400/20 text-green-400' :
                          test.score >= 70 ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}>
                          {test.score}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Duration: {test.duration}s</span>
                    <span>Last run: {test.lastRun}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Systems;
