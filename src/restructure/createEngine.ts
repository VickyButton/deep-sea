import type { DrawInstructions } from './domain/drawInstructions/drawInstructions.types';
import type { AnimationFrameProvider } from './providers/animationFrameProvider/animationFrameProvider.types';
import type { TimeProvider } from './providers/timeProvider/timeProvider.types';
import { Canvas_2D } from './domain/canvas/Canvas_2D';
import { DrawStepTranslator } from './domain/drawStep/translator/DrawStepTranslator';
import { Queue_Main } from './domain/queue/Queue_Main';
import { DrawInstructionsResolver } from './engine/drawInstructionsResolver/DrawInstructionsResolver';
import { Engine } from './engine/Engine';
import { Loop } from './engine/loop/Loop';
import { PluginManager } from './engine/pluginManager/PluginManager';
import { SceneTree } from './engine/sceneTree/SceneTree';

/**
 * Creates a new engine instance.
 * @param config The configuration to create the engine with.
 * @returns The new engine instance.
 */
export function createEngine(config: Config) {
  return new Engine({
    drawInstructionsQueue: createDrawInstructionsQueue(),
    drawInstructionsResolver: createDrawInstructionsResolver(),
    drawStepTranslator: createDrawStepTranslator(),
    loop: createLoop(config),
    pluginManager: createPluginManager(),
    sceneTree: createSceneTree(),
    targetCanvas: createTargetCanvas(config),
  });
}

function createDrawInstructionsQueue() {
  return new Queue_Main<DrawInstructions>();
}

function createDrawInstructionsResolver() {
  return new DrawInstructionsResolver();
}

function createDrawStepTranslator() {
  return new DrawStepTranslator();
}

function createLoop(config: Config) {
  return new Loop(createAnimationFrameProvider(config), createTimeProvider(config));
}

function createAnimationFrameProvider({ providers }: Config) {
  return new providers.AnimationFrameProvider();
}

function createTimeProvider({ providers }: Config) {
  return new providers.TimeProvider();
}

function createPluginManager() {
  return new PluginManager();
}

function createSceneTree() {
  return new SceneTree();
}

function createTargetCanvas({ canvas }: Config) {
  return new Canvas_2D(canvas.width, canvas.height);
}

interface Config {
  canvas: CanvasConfig;
  providers: Providers;
}

interface CanvasConfig {
  width: number;
  height: number;
}

interface Providers {
  AnimationFrameProvider: Constructor<AnimationFrameProvider>;
  TimeProvider: Constructor<TimeProvider>;
}

type Constructor<T> = new () => T;
