import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
   publicDir: "public",
     server: {
     proxy: {
      "/api": {
        target: "https://pawpal-api-4szt.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
