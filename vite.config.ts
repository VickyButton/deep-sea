import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
      '@nodes': path.resolve(__dirname, './src/nodes'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
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
