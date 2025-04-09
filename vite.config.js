import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/setupTestEnvironment.js',
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1500, // optional, increase if needed
  },
});
