import { Game } from '@core/Game';

let game = new Game();

export function useGame() {
  return game;
}

export function setGame(_game: Game) {
  game = _game;
}

export function restartGame() {
  game.stop();
  game.teardown();

  const newGame = new Game();

  game = newGame;

  game.setup();
  game.start();
}
