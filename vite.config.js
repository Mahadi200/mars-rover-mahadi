import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          icons: ['@heroicons/react', 'lucide-react'],
          charts: ['recharts']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'esbuild',
    // Enable source maps for production debugging
    sourcemap: false
  },
  server: {
    // Enable hot reload
    hmr: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
})
