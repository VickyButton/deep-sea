import type { Canvas } from './domain/canvases/Canvas';
import { Engine } from './Engine';
import { EngineLoopDefault } from './engine/engineLoop/EngineLoopDefault';
import { GraphicsEngineDefault } from './engine/graphicsEngine/GraphicsEngineDefault';
import { PluginManagerDefault } from './engine/pluginManager/PluginManagerDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { TimeProviderSystem } from './providers/timeProvider/TimeProviderSystem';

export function createEngine(canvas: Canvas) {
  const timeProvider = new TimeProviderSystem();

  return new Engine({
    engineLoop: new EngineLoopDefault(timeProvider),
    graphicsEngine: new GraphicsEngineDefault(canvas),
    pluginManager: new PluginManagerDefault(),
    sceneTree: new SceneTreeDefault(),
  });
}
