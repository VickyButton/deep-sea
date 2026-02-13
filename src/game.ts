import { resetAssets } from '@core/engine/assets';
import { resetAudio } from '@core/engine/audio';
import { resetGraphics } from '@core/engine/graphics';
import { resetLoop } from '@core/engine/loop';
import { resetRenderer } from '@core/engine/renderer';
import { Game } from '@core/Game';

let game = new Game();

export function useGame() {
  return game;
}

export function setGame(_game: Game) {
  game = _game;
}

function resetEngine() {
  resetAssets();
  resetAudio();
  resetGraphics();
  resetLoop();
  resetRenderer();
}

export function restartGame() {
  game.stop();
  game.teardown();

  resetEngine();

  game = new Game();
  game.setup();
  game.start();
}
