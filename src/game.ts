import { Game } from '@core/Game';

export function setGame(_game: Game) {
  game = _game;
}

export let game = new Game();
