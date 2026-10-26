import type { DrawInstructions } from './domain/drawInstructions/drawInstructions.types';
import type { AnimationFrameProvider } from './providers/animationFrameProvider/animationFrameProvider.types';
import type { TimeProvider } from './providers/timeProvider/timeProvider.types';
import { Canvas_2D } from './domain/canvas/Canvas_2D';
import { DrawStepTranslator_Main } from './domain/drawStep/translator/DrawStepTranslator_Main';
import { Queue_Main } from './domain/queue/Queue_Main';
import { DrawEngine } from './engine/drawEngine/DrawEngine';
import { DrawInstructionsResolver } from './engine/drawInstructionsResolver/DrawInstructionsResolver';
import { Engine } from './engine/Engine';
import { Loop } from './engine/loop/Loop';
import { PluginManager } from './engine/pluginManager/PluginManager';
import { SceneTree } from './engine/sceneTree/SceneTree';
import { AnimationFrameProvider_Browser } from './providers/animationFrameProvider/AnimationFrameProvider_Browser';
import { TimeProvider_Performance } from './providers/timeProvider/TimeProvider_Performance';

/**
 * Creates a new engine instance.
 * @param config The engine configuration.
 * @returns The instantiated engine.
 */
export function createEngine(config: Config): Engine {
  const drawEngine = createDrawEngine(createDrawStepTranslator());
  const drawInstructionsQueue = createDrawInstructionsQueue();
  const drawInstructionsResolver = createDrawInstructionsResolver();
  const animationFrameProvider = createAnimationFrameProvider();
  const timeProvider = createTimeProvider();
  const loop = createLoop(animationFrameProvider, timeProvider);
  const pluginManager = createPluginManager();
  const sceneTree = createSceneTree();
  const targetCanvas = createTargetCanvas(config.canvas.width, config.canvas.height);

  return new Engine({
    drawEngine,
    drawInstructionsQueue,
    drawInstructionsResolver,
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
  return new SceneTree();
}

function createLoop(animationFrameProvider: AnimationFrameProvider, timeProvider: TimeProvider) {
  return new Loop(animationFrameProvider, timeProvider);
}

function createAnimationFrameProvider() {
  return new AnimationFrameProvider_Browser();
}

function createTimeProvider() {
  return new TimeProvider_Performance();
}

function createPluginManager() {
  return new PluginManager();
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
