import { Game } from '@core/Game';

const GAME_CANVAS_WIDTH = 1000;
const GAME_CANVAS_HEIGHT = 1000;

function onLoad() {
  // Set up DOM.
  const gameWindow = document.createElement('div');
  const canvas = document.createElement('canvas');

  gameWindow.id = 'game-window';
  gameWindow.appendChild(canvas);

  canvas.width = GAME_CANVAS_WIDTH;
  canvas.height = GAME_CANVAS_HEIGHT;

  document.body.appendChild(gameWindow);

  // Initialize game.
  const game = new Game({
    graphics: {
      width: GAME_CANVAS_WIDTH,
      height: GAME_CANVAS_HEIGHT,
    },
  });

  game.initialize(canvas);
}

window.addEventListener('load', onLoad);
