import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@config": "/src/config",
      "@features": "/src/features",
      "@hooks": "/src/hooks",
      "@lib": "/src/lib",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@stores": "/src/stores",
      "@tests": "/src/tests",
      "@theme": "/src/theme",
      "@utils": "/src/utils",
    }
  },
})
