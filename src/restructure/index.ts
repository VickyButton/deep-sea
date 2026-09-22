import type { GraphicsCanvas } from './providers/graphicsCanvas.types';
import { Engine } from './Engine';
import { FrameLoopDefault } from './engine/frameLoop/FrameLoopDefault';
import { GraphicsEngineDefault } from './engine/graphicsEngine/GraphicsEngineDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { TimeProviderSystem } from './providers/timeProvider/TimeProviderSystem';

export function createEngine(canvas: GraphicsCanvas) {
  const timeProvider = new TimeProviderSystem();

  return new Engine({
    frameLoop: new FrameLoopDefault(timeProvider),
    graphicsEngine: new GraphicsEngineDefault(canvas),
    sceneTree: new SceneTreeDefault(),
  });
}
