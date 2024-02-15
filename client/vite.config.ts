import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  server: {
    port: 3000,
  },
  define: {
    VITE_BACKEND_URL: process.env.VITE_SERVER_API_URL,
  },
});
