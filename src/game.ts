import { Game } from '@core/Game';

const GAME_CANVAS_WIDTH = 1000;
const GAME_CANVAS_HEIGHT = 1000;
const GAME_FRAMES_PER_SECOND = 60;

// Set up game.
export const game = new Game({
  graphics: {
    width: GAME_CANVAS_WIDTH,
    height: GAME_CANVAS_HEIGHT,
  },
  loop: {
    framesPerSecond: GAME_FRAMES_PER_SECOND,
  },
});
