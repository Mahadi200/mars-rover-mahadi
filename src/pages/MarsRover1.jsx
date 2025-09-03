import { motion } from 'framer-motion';

const MarsRover1 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Mars Rover 1.0</h1>
      <p className="text-center text-gray-600 text-lg">Our first generation Mars exploration vehicle.</p>
    </motion.div>
  );
};

export default MarsRover1;
