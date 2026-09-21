import { Engine } from './Engine';
import { FrameLoopDefault } from './engine/frameLoop/FrameLoopDefault';
import { GraphicsEngineDefault } from './engine/graphicsEngine/GraphicsEngineDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { TimeProviderSystem } from './providers/timeProvider/TimeProviderSystem';

export function createGame() {
  const timeProvider = new TimeProviderSystem();

  return new Engine({
    frameLoop: new FrameLoopDefault(timeProvider),
    graphicsEngine: new GraphicsEngineDefault(),
    sceneTree: new SceneTreeDefault(),
  });
}
