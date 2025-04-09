import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    mainFields: ["module", "main", "jsnext:main", "jsnext"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/setupTestEnvironment.js", // Path to your test setup file
    testFiles: [
      "**/*.{test,spec}.js", // Default pattern to find test files
      "**/*.test.jsx", // For React test files
      "**/*.spec.jsx", // For React test files
    ],
  },
  ssr: {
    external: ['util', 'path', 'stream', 'url', 'os', 'tty', 'assert', 'buffer', 'events', 'vm', 'fs/promises', 'timers', 'console'],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        'global:TextEncoder': 'TextEncoder',
        'global:Readable': 'Readable',
        'global:Buffer': 'Buffer'
      },
    },
  },
});
