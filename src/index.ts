import { Game } from '@core/Game';
import { setGame } from './game';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

const gameConfiguration = {
  camera: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  graphics: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  loop: {
    framesPerSecond: 60,
  },
  sceneManager: {
    defaultSceneName: 'DeepSeaSplash',
  },
};

function createGameCanvas() {
  const canvas = document.createElement('canvas');

  canvas.id = 'game-canvas';
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  return canvas;
}

function createGameWindow() {
  const gameWindow = document.createElement('div');

  gameWindow.id = 'game-window';

  return gameWindow;
}

function onLoad() {
  // Set up DOM.
  const gameWindow = createGameWindow();
  const canvas = createGameCanvas();
  const game = new Game(gameConfiguration);

  gameWindow.appendChild(canvas);
  document.body.appendChild(gameWindow);

  setGame(game);

  // Start game.
  game.initialize(canvas);
  game.start();
}

window.addEventListener('load', onLoad);
