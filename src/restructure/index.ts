import type { Canvas } from './domain/canvases';
import type { Engine } from './engine/engine.types';
import type { Graphics } from './engine/graphics/graphics.types';
import type { SceneTree } from './engine/sceneTree/sceneTree.types';
import { Engine_Base } from './engine/Engine_Base';
import { EngineController_Main } from './engine/engineController/EngineController_Main';
import { Graphics_Main } from './engine/graphics/Graphics_Main';
import { Loop_Main } from './engine/loop/Loop_Main';
import { PluginManager_Main } from './engine/pluginManager/PluginManager_Main';
import { SceneTree_Main } from './engine/sceneTree/SceneTree_Main';
import { ClockSystem } from './providers/clock/ClockSystem';

/**
 * Creates a new engine instance.
 * @param canvas The canvas to use for drawing graphics.
 * @returns The instantiated engine.
 */
export function createEngine(canvas: Canvas): Engine {
  return new Engine_Base(createComponents(canvas));
}

function createComponents(canvas: Canvas) {
  const graphics = createGraphics(canvas);
  const sceneTree = createSceneTree();

  return {
    engineController: createEngineController(graphics, sceneTree),
    graphics,
    loop: createLoop(),
    pluginManager: createPluginManager(),
    sceneTree,
  };
}

function createEngineController(graphics: Graphics, sceneTree: SceneTree) {
  return new EngineController_Main({
    graphics,
    sceneTree,
  });
}

function createGraphics(canvas: Canvas) {
  return new Graphics_Main(canvas);
}

function createLoop() {
  return new Loop_Main(createClock());
}

function createClock() {
  return new ClockSystem();
}

function createPluginManager() {
  return new PluginManager_Main();
}

function createSceneTree() {
  return new SceneTree_Main();
}
