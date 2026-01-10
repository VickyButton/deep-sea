import { Game } from '@core/Game';
import { Vector2D } from '@core/structures/Vector2D';
import { setGame } from './game';

const CANVAS_SIZE = new Vector2D(window.innerWidth, window.innerHeight);

const gameConfiguration = {
  initialSceneName: '',
  engine: {
    assetLoader: {
      imagesPath: '/src/assets/images',
    },
    graphics: {
      size: new Vector2D(CANVAS_SIZE.x, CANVAS_SIZE.y),
    },
    loop: {
      framesPerSecond: 60,
    },
  },
};
const game = new Game(gameConfiguration);

function createGameCanvas() {
  const canvas = document.createElement('canvas');

  canvas.id = 'game-canvas';
  canvas.width = CANVAS_SIZE.x;
  canvas.height = CANVAS_SIZE.y;

  return canvas;
}

function createGameContainer() {
  const container = document.createElement('div');

  container.id = 'game-container';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.backgroundColor = 'black';
  container.style.width = '100%';
  container.style.height = '100%';

  return container;
}

function createGameStartButton() {
  const button = document.createElement('button');

  button.id = 'game-start-button';
  button.textContent = 'Play Game';
  button.type = 'button';
  button.style.padding = '16px';
  button.style.border = 'none';
  button.style.borderRadius = '16px';
  button.style.background = '#2b66aaff';
  button.style.color = 'white';
  button.style.fontSize = '1.2rem';
  button.style.fontWeight = 'bold';

  return button;
}

function setUpGameDom() {
  const gameContainer = createGameContainer();
  const gameCanvas = createGameCanvas();
  const gameStartButton = createGameStartButton();

  gameContainer.appendChild(gameStartButton);
  document.body.appendChild(gameContainer);

  gameStartButton.addEventListener('click', () => {
    gameContainer.removeChild(gameStartButton);
    gameContainer.appendChild(gameCanvas);

    setGame(game);
    startGame();
  });
}

function startGame() {
  game.setup();
  game.start();
}

function onLoad() {
  setUpGameDom();
}

window.addEventListener('load', onLoad);
