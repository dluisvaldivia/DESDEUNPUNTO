import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: el sitio se sirve en https://dluisvaldivia.github.io/DESDEUNPUNTO/
export default defineConfig({
  base: '/DESDEUNPUNTO/',
  plugins: [react(), tailwindcss()],
})
