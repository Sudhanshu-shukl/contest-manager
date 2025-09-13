import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/contest-manager/' : '/',
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
