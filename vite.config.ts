import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@core': path.resolve(__dirname, './src/core'),
      '@nodes': path.resolve(__dirname, './src/nodes'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      config: path.resolve(__dirname, './src/config'),
      game: path.resolve(__dirname, './src/game'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
