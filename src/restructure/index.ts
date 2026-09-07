import { Engine } from './Engine';
import { FrameLoopDefault } from './engine/frameLoop/FrameLoopDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { TimeProviderDefault } from './providers/timeProvider/TimeProviderDefault';

export function createGame() {
  const timeProvider = new TimeProviderDefault();

  return new Engine({
    frameLoop: new FrameLoopDefault(timeProvider),
    sceneTree: new SceneTreeDefault(),
  });
}
