import { useConfig, loadConfig, setConfig } from './config';
import { useGame } from './game';

function createGameCanvas() {
  const config = useConfig();
  const canvas = document.createElement('canvas');

  canvas.id = 'game-canvas';
  canvas.width = config.graphics.width;
  canvas.height = config.graphics.height;

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
  const config = useConfig();
  const gameContainer = createGameContainer();
  const gameCanvas = createGameCanvas();
  const gameStartButton = createGameStartButton();

  gameContainer.appendChild(gameStartButton);
  document.body.appendChild(gameContainer);

  gameStartButton.addEventListener('click', () => {
    gameContainer.removeChild(gameStartButton);
    gameContainer.appendChild(gameCanvas);

    startGame();
  });

  if (config.dev.autoStart) gameStartButton.click();
}

function setUpGame() {
  const configPath = new URL('../game.config.json', import.meta.url).pathname;

  loadConfig(configPath)
    .then((config) => {
      setConfig(config);
      setUpGameDom();
    })
    .catch((err: unknown) => {
      console.error(err);
    });
}

function startGame() {
  const game = useGame();

  game.setup();
  game.start();
}

function onLoad() {
  setUpGame();
}

window.addEventListener('load', onLoad);
