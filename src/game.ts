import { Game } from '@core/Game';

const GRAPHICS_WIDTH = 1000;
const GRAPHICS_HEIGHT = 1000;

const LOOP_FRAMES_PER_SECOND = 60;

const SCENE_MANAGER_DEFAULT_SCENE_NAME = 'DeepSeaSplash';

// Set up game.
export const game = new Game({
  graphics: {
    width: GRAPHICS_WIDTH,
    height: GRAPHICS_HEIGHT,
  },
  loop: {
    framesPerSecond: LOOP_FRAMES_PER_SECOND,
  },
  sceneManager: {
    defaultSceneName: SCENE_MANAGER_DEFAULT_SCENE_NAME,
  },
});
