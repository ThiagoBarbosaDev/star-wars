import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig(() => ({
  build: {
    outDir: 'build',
  },
  plugins: [eslint(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    coverage: {
      provider: 'istanbul', // or 'c8'
    },
  },
}))
