import type { DrawInstructions } from './domain/drawInstructions/drawInstructions.types';
import type { Engine } from './engine/engine.types';
import { Canvas_2D } from './domain/canvas/Canvas_2D';
import { Clock_System } from './domain/clock/Clock_System';
import { DrawStepTranslator_Main } from './domain/drawStep/translator/DrawStepTranslator_Main';
import { Queue_Main } from './domain/queue/Queue_Main';
import { DrawEngine } from './engine/drawEngine/DrawEngine';
import { DrawInstructionsResolver } from './engine/drawInstructionsResolver/DrawInstructionsResolver';
import { Engine_Main } from './engine/Engine_Main';
import { EngineController_Main } from './engine/engineController/EngineController_Main';
import { Loop_Main } from './engine/loop/Loop_Main';
import { PluginManager_Main } from './engine/pluginManager/PluginManager_Main';
import { SceneTree_Main } from './engine/sceneTree/SceneTree_Main';

/**
 * Creates a new engine instance.
 * @param config The engine configuration.
 * @returns The instantiated engine.
 */
export function createEngine(config: Config): Engine {
  const drawEngine = createDrawEngine(createDrawStepTranslator());
  const drawInstructionsQueue = createDrawInstructionsQueue();
  const drawInstructionsResolver = createDrawInstructionsResolver();
  const sceneTree = createSceneTree();
  const engineController = createEngineController(drawInstructionsQueue, sceneTree);
  const clock = createClock();
  const loop = createLoop(clock);
  const pluginManager = createPluginManager();
  const targetCanvas = createTargetCanvas(config.canvas.width, config.canvas.height);

  return new Engine_Main({
    drawEngine,
    drawInstructionsQueue,
    drawInstructionsResolver,
    engineController,
    loop,
    pluginManager,
    sceneTree,
    targetCanvas,
  });
}

function createDrawEngine(resolver: ReturnType<typeof createDrawStepTranslator>) {
  return new DrawEngine(resolver);
}

function createDrawStepTranslator() {
  return new DrawStepTranslator_Main();
}

function createDrawInstructionsQueue() {
  return new Queue_Main<DrawInstructions>();
}

function createDrawInstructionsResolver() {
  return new DrawInstructionsResolver();
}

function createSceneTree() {
  return new SceneTree_Main();
}

function createEngineController(drawInstructionsQueue: ReturnType<typeof createDrawInstructionsQueue>, sceneTree: ReturnType<typeof createSceneTree>) {
  return new EngineController_Main({
    drawInstructionsQueue,
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

function createTargetCanvas(width: number, height: number) {
  return new Canvas_2D(width, height);
}

interface Config {
  canvas: {
    width: number;
    height: number;
  };
}
