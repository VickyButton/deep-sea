import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@core': path.resolve(__dirname, './src/core'),
      '@nodes': path.resolve(__dirname, './src/nodes'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      assets: path.resolve(__dirname, './src/core/engine/assets'),
      audio: path.resolve(__dirname, './src/core/engine/audio'),
      config: path.resolve(__dirname, './src/config'),
      game: path.resolve(__dirname, './src/game'),
      graphics: path.resolve(__dirname, './src/core/engine/graphics'),
      input: path.resolve(__dirname, './src/core/engine/input'),
      loop: path.resolve(__dirname, './src/core/engine/loop'),
      physics: path.resolve(__dirname, './src/core/engine/physics'),
      renderer: path.resolve(__dirname, './src/core/engine/renderer'),
      scenes: path.resolve(__dirname, './src/core/engine/scenes'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
