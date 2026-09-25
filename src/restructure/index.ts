import type { Canvas } from './domain/canvases/Canvas';
import { EngineDefault } from './engine/EngineDefault';
import { EngineLoopDefault } from './engine/engineLoop/EngineLoopDefault';
import { GraphicsDefault } from './engine/graphics/GraphicsDefault';
import { PluginManagerDefault } from './engine/pluginManager/PluginManagerDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { TimeProviderSystem } from './providers/timeProvider/TimeProviderSystem';

export function createEngine(canvas: Canvas) {
  const timeProvider = new TimeProviderSystem();

  return new EngineDefault({
    engineLoop: new EngineLoopDefault(timeProvider),
    graphicsEngine: new GraphicsDefault(canvas),
    pluginManager: new PluginManagerDefault(),
    sceneTree: new SceneTreeDefault(),
  });
}
