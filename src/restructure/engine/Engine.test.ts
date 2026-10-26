import type { DrawInstructionsQueue } from './drawInstructionsQueue/drawInstructionsQueue.types';
import type { DrawInstructions } from '../domain/drawInstructions/drawInstructions.types';
import { DrawEngine } from './drawEngine/DrawEngine';
import { DrawInstructionsResolver } from './drawInstructionsResolver/DrawInstructionsResolver';
import { Engine } from './Engine';
import { EngineController } from './engineController/EngineController';
import { Loop } from './loop/Loop';
import { PluginManager } from './pluginManager/PluginManager';
import { SceneTree } from './sceneTree/SceneTree';
import { Canvas_Mock } from '../domain/canvas/Canvas_Mock';
import { DrawStepTranslator_Main } from '../domain/drawStep/translator/DrawStepTranslator_Main';
import { Queue_Mock } from '../domain/queue/Queue_Mock';
import { Node } from '../nodes/node/Node';
import { AnimationFrameProvider_Mock } from '../providers/animationFrameProvider/AnimationFrameProvider_Mock';
import { TimeProvider_Mock } from '../providers/timeProvider/TimeProvider_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('Engine', () => {
  it('should not be active by default', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: new Canvas_Mock(),
    });

    expect(engine.isActive).toBe(false);
  });

  it('should set loop callback upon instantiation', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const loop = createLoop();
    const sceneTree = createSceneTree();
    const setLoopCallbackSpy = vi.spyOn(loop, 'setLoopCallback');

    new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop,
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: new Canvas_Mock(),
    });

    expect(setLoopCallbackSpy).toHaveBeenCalled();
  });

  it('should set current scene in scene tree', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });
    const addSceneSpy = vi.spyOn(sceneTree, 'addScene');

    engine.replaceScene(Node);

    expect(addSceneSpy).toHaveBeenCalled();
  });

  it('should remove current scene when replacing scene in scene tree', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });
    const removeSceneSpy = vi.spyOn(sceneTree, 'removeScene');

    engine.replaceScene(Node);
    engine.replaceScene(Node);

    expect(removeSceneSpy).toHaveBeenCalled();
  });

  it('should start plugins upon starting', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const pluginManager = createPluginManager();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager,
      sceneTree: createSceneTree(),
      targetCanvas: new Canvas_Mock(),
    });
    const startPluginsSpy = vi.spyOn(pluginManager, 'startPlugins');

    engine.start();

    expect(startPluginsSpy).toHaveBeenCalled();
  });

  it('should start scene tree after starting plugins', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const pluginManager = createPluginManager();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager,
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });
    const startSpy = vi.spyOn(sceneTree, 'start');
    const startPluginsSpy = vi.spyOn(pluginManager, 'startPlugins');

    engine.start();

    expect(startSpy).toHaveBeenCalledAfter(startPluginsSpy);
  });

  it('should start loop after starting scene tree', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const loop = createLoop();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop,
      pluginManager: createPluginManager(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });
    const loopStartSpy = vi.spyOn(loop, 'start');
    const sceneTreeStartSpy = vi.spyOn(sceneTree, 'start');

    engine.start();

    expect(loopStartSpy).toHaveBeenCalledAfter(sceneTreeStartSpy);
  });

  it('should be active after starting', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: new Canvas_Mock(),
    });

    engine.start();

    expect(engine.isActive).toBe(true);
  });

  it('should stop loop upon stopping', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const loop = createLoop();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop,
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: new Canvas_Mock(),
    });
    const loopStopSpy = vi.spyOn(loop, 'stop');

    engine.stop();

    expect(loopStopSpy).toHaveBeenCalled();
  });

  it('should stop scene tree after stopping loop', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const loop = createLoop();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop,
      pluginManager: createPluginManager(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });
    const sceneTreeStopSpy = vi.spyOn(sceneTree, 'stop');
    const loopStopSpy = vi.spyOn(loop, 'stop');

    engine.stop();

    expect(sceneTreeStopSpy).toHaveBeenCalledAfter(loopStopSpy);
  });

  it('should stop plugins after stopping scene tree', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const pluginManager = createPluginManager();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager,
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });
    const pluginManagerStopPluginsSpy = vi.spyOn(pluginManager, 'stopPlugins');
    const sceneTreeStopSpy = vi.spyOn(sceneTree, 'stop');

    engine.stop();

    expect(pluginManagerStopPluginsSpy).toHaveBeenCalledAfter(sceneTreeStopSpy);
  });

  it('should not be active after starting', () => {
    const drawInstructionsQueue = createDrawInstructionsQueue();
    const sceneTree = createSceneTree();
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      engineController: createEngineController(drawInstructionsQueue, sceneTree),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: new Canvas_Mock(),
    });

    engine.stop();

    expect(engine.isActive).toBe(false);
  });
});

function createDrawEngine() {
  return new DrawEngine(new DrawStepTranslator_Main());
}

function createDrawInstructionsQueue() {
  return new Queue_Mock<DrawInstructions>();
}

function createDrawInstructionsResolver() {
  return new DrawInstructionsResolver();
}

function createEngineController(drawInstructionsQueue: DrawInstructionsQueue, sceneTree: SceneTree) {
  return new EngineController({
    drawInstructionsQueue,
    sceneTree,
  });
}

function createLoop() {
  return new Loop(createAnimationFrameProvider(), createTimeProvider());
}

function createAnimationFrameProvider() {
  return new AnimationFrameProvider_Mock();
}

function createTimeProvider() {
  return new TimeProvider_Mock();
}

function createPluginManager() {
  return new PluginManager();
}

function createSceneTree() {
  return new SceneTree();
}
