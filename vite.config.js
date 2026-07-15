import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project site under /penmai/, so built asset URLs
  // must be prefixed with it. Only applied in CI, so local dev/preview stay at '/'.
  base: process.env.GITHUB_ACTIONS ? '/penmai/' : '/',
  plugins: [react()],
})
