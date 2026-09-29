import type { Canvas } from './domain/canvases/Canvas';
import type { Clock } from './providers/clock.types';
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
  const options = createOptions({
    canvas,
    clock: new ClockSystem(),
  });
  const events = createEvents();

  return new EngineDefault(options, events);
}

function createOptions(dependencies: {
  canvas: Canvas;
  clock: Clock;
}) {
  return {
    loop: new LoopDefault(dependencies.clock),
    graphics: new GraphicsDefault(dependencies.canvas),
    pluginManager: new PluginManagerDefault(),
    sceneTree: new SceneTreeDefault(),
  };
}

function createEvents() {
  return {
    graphics: new GraphicsEvents(),
    loop: new LoopEvents(),
    pluginManager: new PluginManagerEvents(),
    sceneTree: new SceneTreeEvents(),
  };
}
