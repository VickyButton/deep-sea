import { resetScenes } from '@core/engine/scenes';
import { resetTasks } from '@core/engine/tasks';
import { Game } from '@core/Game';
import { resetAssets } from 'assets';
import { resetAudio } from 'audio';
import { resetGraphics } from 'graphics';
import { resetInput } from 'input';
import { resetLoop } from 'loop';
import { resetPhysics } from 'physics';
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
  resetScenes();
  resetTasks();
}

export function restartGame() {
  game.stop();
  game.teardown();

  resetEngine();

  game = new Game();
  game.setup();
  game.start();
}
