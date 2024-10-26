import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Это позволяет сделать проект доступным по локальной сети
    port: 5173  // Порт можно изменить при необходимости
  }
})
