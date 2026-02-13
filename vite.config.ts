import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@core': path.resolve(__dirname, './src/core'),
      '@nodes': path.resolve(__dirname, './src/nodes'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      audio: path.resolve(__dirname, './src/core/engine/audio'),
      config: path.resolve(__dirname, './src/config'),
      game: path.resolve(__dirname, './src/game'),
      graphics: path.resolve(__dirname, './src/core/engine/graphics'),
      loop: path.resolve(__dirname, './src/core/engine/loop'),
      renderer: path.resolve(__dirname, './src/core/engine/renderer'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
