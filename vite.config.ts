import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist-renderer'
  },
  server: {
    port: 5173
  }
})