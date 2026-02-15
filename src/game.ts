import { resetInput } from '@core/engine/input';
import { resetPhysics } from '@core/engine/physics';
import { Game } from '@core/Game';
import { resetAssets } from 'assets';
import { resetAudio } from 'audio';
import { resetGraphics } from 'graphics';
import { resetLoop } from 'loop';
import { resetRenderer } from 'renderer';

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
  resetInput();
  resetLoop();
  resetPhysics();
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
