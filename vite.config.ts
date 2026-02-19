import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@nodes': path.resolve(__dirname, './src/core/nodes'),
      '@structures': path.resolve(__dirname, './src/core/structures'),
      '@utils': path.resolve(__dirname, './src/core/utils'),
      assets: path.resolve(__dirname, './src/core/engine/assets'),
      audio: path.resolve(__dirname, './src/core/engine/audio'),
      config: path.resolve(__dirname, './src/core/engine/config'),
      game: path.resolve(__dirname, './src/core/engine/game'),
      graphics: path.resolve(__dirname, './src/core/engine/graphics'),
      input: path.resolve(__dirname, './src/core/engine/input'),
      loop: path.resolve(__dirname, './src/core/engine/loop'),
      nodes: path.resolve(__dirname, './src/core/engine/nodes'),
      physics: path.resolve(__dirname, './src/core/engine/physics'),
      renderer: path.resolve(__dirname, './src/core/engine/renderer'),
      scenes: path.resolve(__dirname, './src/core/engine/scenes'),
      tasks: path.resolve(__dirname, './src/core/engine/tasks'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
