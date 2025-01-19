import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@weather-icons/css': path.resolve(__dirname, 'node_modules/@weather-icons/css')
    }
  }
})
