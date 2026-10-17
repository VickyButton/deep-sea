import type { Engine } from './engine/engine.types';
import type { NodeConstructor } from './nodes/node/node.types';
import { Canvas_2D } from './domain/canvas/Canvas_2D';
import { Clock_System } from './domain/clock/Clock_System';
import { Engine_Main } from './engine/Engine_Main';
import { EngineController_Main } from './engine/engineController/EngineController_Main';
import { Graphics_Main } from './engine/graphics/Graphics_Main';
import { Loop_Main } from './engine/loop/Loop_Main';
import { PluginManager_Main } from './engine/pluginManager/PluginManager_Main';
import { SceneTree_Main } from './engine/sceneTree/SceneTree_Main';

/**
 * Creates a new engine instance.
 * @param config The engine configuration.
 * @returns The instantiated engine.
 */
export function createEngine(config: Config): Engine {
  const graphics = createGraphics(createCanvas(config.canvas.width, config.canvas.height));
  const sceneTree = createSceneTree();
  const engineController = createEngineController(graphics, sceneTree);
  const clock = createClock();
  const loop = createLoop(clock);
  const pluginManager = createPluginManager();

  return new Engine_Main({
    engineController,
    graphics,
    loop,
    pluginManager,
    sceneTree,
  });
}

function createGraphics(canvas: ReturnType<typeof createCanvas>) {
  return new Graphics_Main(canvas);
}

function createCanvas(width: number, height: number) {
  return new Canvas_2D(width, height);
}

function createSceneTree() {
  return new SceneTree_Main();
}

function createEngineController(graphics: ReturnType<typeof createGraphics>, sceneTree: ReturnType<typeof createSceneTree>) {
  return new EngineController_Main({
    graphics,
    sceneTree,
  });
}

function createLoop(clock: ReturnType<typeof createClock>) {
  return new Loop_Main(clock);
}

function createClock() {
  return new Clock_System();
}

function createPluginManager() {
  return new PluginManager_Main();
}

interface Config {
  initialScene: NodeConstructor;
  canvas: {
    width: number;
    height: number;
  };
}
