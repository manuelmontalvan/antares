import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 5173,
    
    onListening: (server) => {
      const address = server.httpServer?.address();
      let port;
      if (typeof address === 'object' && address) {
        port = address.port;
      }
      console.log(`🚀 Frontend running on: http://localhost:${port}`);
    }
  }
});
