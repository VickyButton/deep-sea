import type { Canvas } from './domain/canvases/Canvas';
import { EngineDefault } from './engine/EngineDefault';
import { GraphicsDefault } from './engine/graphics/GraphicsDefault';
import { LoopDefault } from './engine/loop/LoopDefault';
import { PluginManagerDefault } from './engine/pluginManager/PluginManagerDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { GraphicsEvents } from './events/graphics/GraphicsEvents';
import { LoopEvents } from './events/loop/LoopEvents';
import { PluginManagerEvents } from './events/pluginManager/PluginManagerEvents';
import { TimeProviderSystem } from './providers/timeProvider/TimeProviderSystem';

export function createEngine(canvas: Canvas) {
  const timeProvider = new TimeProviderSystem();
  const options = {
    loop: new LoopDefault(timeProvider),
    graphics: new GraphicsDefault(canvas),
    pluginManager: new PluginManagerDefault(),
    sceneTree: new SceneTreeDefault(),
  };
  const events = {
    graphics: new GraphicsEvents(),
    loop: new LoopEvents(),
    pluginManager: new PluginManagerEvents(),
  };

  return new EngineDefault(options, events);
}
