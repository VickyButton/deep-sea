import type { Canvas } from './domain/canvases/Canvas';
import { EngineDefault } from './engine/EngineDefault';
import { GraphicsDefault } from './engine/graphics/GraphicsDefault';
import { LoopDefault } from './engine/loop/LoopDefault';
import { PluginManagerDefault } from './engine/pluginManager/PluginManagerDefault';
import { SceneTreeDefault } from './engine/sceneTree/SceneTreeDefault';
import { GraphicsEvents } from './events/graphics/GraphicsEvents';
import { LoopEvents } from './events/loop/LoopEvents';
import { PluginManagerEvents } from './events/pluginManager/PluginManagerEvents';
import { SceneTreeEvents } from './events/sceneTree/SceneTreeEvents';
import { ClockSystem } from './providers/clock/ClockSystem';

export function createEngine(canvas: Canvas) {
  const clock = new ClockSystem();
  const options = {
    loop: new LoopDefault(clock),
    graphics: new GraphicsDefault(canvas),
    pluginManager: new PluginManagerDefault(),
    sceneTree: new SceneTreeDefault(),
  };
  const events = {
    graphics: new GraphicsEvents(),
    loop: new LoopEvents(),
    pluginManager: new PluginManagerEvents(),
    sceneTree: new SceneTreeEvents(),
  };

  return new EngineDefault(options, events);
}
