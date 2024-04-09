import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // This code made for to resolve core exception
  server: {
    proxy: {
      // Proxy all "/api" requests to "http://localhost:8000"
      "proxy": "http://localhost:8000",
      '/api': 'http://localhost:8000',
    }
  }
})

