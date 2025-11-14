import { game } from './game';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

function onLoad() {
  // Set up DOM.
  const gameWindow = document.createElement('div');
  const canvas = document.createElement('canvas');

  gameWindow.id = 'game-window';
  gameWindow.appendChild(canvas);

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  document.body.appendChild(gameWindow);

  // Start game.
  game.initialize(canvas);
  game.start();
}

window.addEventListener('load', onLoad);
