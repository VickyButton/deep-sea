import { Game } from '@core/Game';

let game = new Game();

export function getGame() {
  return game;
}

export function setGame(_game: Game) {
  game = _game;
}
