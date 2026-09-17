import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [`${import.meta.dirname}/src/styles`],
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
})