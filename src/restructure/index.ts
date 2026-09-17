import { Engine } from './Engine';
import { FrameLoopDefault } from './engine/frameLoop/FrameLoopDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { TimeProviderSystem } from './providers/timeProvider/TimeProviderSystem';

export function createGame() {
  const timeProvider = new TimeProviderSystem();

  return new Engine({
    frameLoop: new FrameLoopDefault(timeProvider),
    sceneTree: new SceneTreeDefault(),
  });
}
