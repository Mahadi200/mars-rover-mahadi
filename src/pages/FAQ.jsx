import { motion } from 'framer-motion';
import MarsBackground from '../components/MarsBackground';

const FAQ = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Mars Background */}
      <MarsBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 py-20 space-y-8"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h1>
          <p className="text-center text-gray-600 text-lg">Find answers to common questions about our Mars Rover project.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
