import type { Canvas } from './domain/canvases';
import type { Engine } from './engine/engine.types';
import type { NodeFactory } from './nodes/nodeFactory.types';
import { SignalController_Base } from './controllers/SignalController_Base';
import { Engine_Base } from './engine/Engine_Base';
import { Graphics_Base } from './engine/graphics/Graphics_Base';
import { Loop_Base } from './engine/loop/Loop_Base';
import { PluginManager_Base } from './engine/pluginManager/PluginManager_Base';
import { SceneTree_Base } from './engine/sceneTree/SceneTree_Base';
import { Node_Base } from './nodes/node/Node_Base';
import { NodeFactory_Base } from './nodes/NodeFactory_Base';
import { ClockSystem } from './providers/clock/ClockSystem';
import { Signal_Base } from './signals/signal/Signal_Base';

/**
 * Creates a new engine instance.
 * @param canvas The canvas to use for drawing graphics.
 * @returns The instantiated engine.
 */
export function createEngine(canvas: Canvas): Engine {
  return new Engine_Base(createComponents(canvas), {
    SignalController: SignalController_Base,
  });
}

function createComponents(canvas: Canvas) {
  return {
    graphics: createGraphics(canvas),
    loop: createLoop(),
    pluginManager: createPluginManager(),
    sceneTree: createSceneTree(),
  };
}

function createGraphics(canvas: Canvas) {
  return new Graphics_Base(canvas);
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
  return new SceneTree_Base(createRootNode(), {
    Signal: Signal_Base,
  });
}

function createRootNode() {
  return new Node_Base('root', {
    Signal: Signal_Base,
    SignalController: SignalController_Base,
  });
}

/**
 * Creates a new node factory instance.
 * @returns The instantiated node factory.
 */
export function createNodeFactory(): NodeFactory {
  return new NodeFactory_Base({
    Signal: Signal_Base,
    SignalController: SignalController_Base,
  });
}
