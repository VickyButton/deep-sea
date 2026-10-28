import type { AnimationFrameProvider } from './providers/animationFrameProvider/animationFrameProvider.types';
import type { TimeProvider } from './providers/timeProvider/timeProvider.types';
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
    loop: createLoop(config),
    pluginManager: createPluginManager(),
    sceneTree: createSceneTree(),
  });
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
