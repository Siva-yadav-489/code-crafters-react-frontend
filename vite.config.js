import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@rollup/rollup-linux-x64-gnu'],
      output: {
        manualChunks: undefined
      }
    },
    target: 'esnext',
    minify: 'esbuild'
  },
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu']
  }
})
