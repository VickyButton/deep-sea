import type { Canvas } from './domain/canvases';
import type { Engine } from './engine/engine.types';
import type { Graphics } from './engine/graphics/graphics.types';
import type { SceneTree } from './engine/sceneTree/sceneTree.types';
import { Engine_Base } from './engine/Engine_Base';
import { EngineController_Base } from './engine/engineController/EngineController_Base';
import { Graphics_Main } from './engine/graphics/Graphics_Main';
import { Loop_Base } from './engine/loop/Loop_Base';
import { PluginManager_Base } from './engine/pluginManager/PluginManager_Base';
import { SceneTree_Base } from './engine/sceneTree/SceneTree_Base';
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
  return new EngineController_Base({
    graphics,
    sceneTree,
  });
}

function createGraphics(canvas: Canvas) {
  return new Graphics_Main(canvas);
}

function createLoop() {
  return new Loop_Base(createClock());
}

function createClock() {
  return new ClockSystem();
}

function createPluginManager() {
  return new PluginManager_Base();
}

function createSceneTree() {
  return new SceneTree_Base();
}
