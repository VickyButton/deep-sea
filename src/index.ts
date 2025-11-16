import { Game } from '@core/Game';
import { setGame } from './game';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

const gameConfiguration = {
  graphics: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  loop: {
    framesPerSecond: 60,
  },
  sceneManager: {
    defaultSceneName: 'DeepSeaSplash',
  },
};

function onLoad() {
  // Set up DOM.
  const gameWindow = document.createElement('div');
  const canvas = document.createElement('canvas');
  const game = new Game(gameConfiguration);

  gameWindow.id = 'game-window';
  gameWindow.appendChild(canvas);

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  document.body.appendChild(gameWindow);

  setGame(game);

  // Start game.
  game.initialize(canvas);
  game.start();
}

window.addEventListener('load', onLoad);
