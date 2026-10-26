import type { DrawInstructions } from '../domain/drawInstructions/drawInstructions.types';
import { CanvasNode } from '../nodes';
import { DrawEngine } from './drawEngine/DrawEngine';
import { DrawInstructionsResolver } from './drawInstructionsResolver/DrawInstructionsResolver';
import { Engine } from './Engine';
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
    expect(new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    }).isActive).toBe(false);
  });

  it('should queue draw instructions upon canvas node emitting "redraw_requested" signal', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const canvasNode = new CanvasNode('node');
    const instructions = {
      steps: [],
      zIndex: canvasNode.globalZIndex,
    };
    const drawInstructionsQueueAddSpy = vi.spyOn(engine.drawInstructionsQueue, 'add');

    engine.setup();
    engine.start();
    engine.sceneTree.node_registered.emit(canvasNode);
    canvasNode.redraw_requested.emit(instructions);

    expect(drawInstructionsQueueAddSpy).toHaveBeenCalledWith(instructions);
  });

  it('should not queue draw instructions upon deregistered canvas node emitting "redraw_requested" signal', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const canvasNode = new CanvasNode('node');
    const instructions = {
      steps: [],
      zIndex: canvasNode.globalZIndex,
    };
    const drawInstructionsQueueAddSpy = vi.spyOn(engine.drawInstructionsQueue, 'add');

    engine.setup();
    engine.start();
    engine.sceneTree.node_registered.emit(canvasNode);
    engine.sceneTree.node_deregistered.emit(canvasNode);
    canvasNode.redraw_requested.emit(instructions);

    expect(drawInstructionsQueueAddSpy).not.toHaveBeenCalledWith();
  });

  it('should set loop callback upon setup', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const loopSetLoopCallbackSpy = vi.spyOn(engine.loop, 'setLoopCallback');

    engine.setup();

    expect(loopSetLoopCallbackSpy).toHaveBeenCalled();
  });

  it('should set current scene in scene tree', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const sceneTreeAddSceneSpy = vi.spyOn(engine.sceneTree, 'addScene');

    engine.replaceScene(Node);

    expect(sceneTreeAddSceneSpy).toHaveBeenCalled();
  });

  it('should remove current scene when replacing scene in scene tree', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const sceneTreeRemoveSceneSpy = vi.spyOn(engine.sceneTree, 'removeScene');

    engine.replaceScene(Node);
    engine.replaceScene(Node);

    expect(sceneTreeRemoveSceneSpy).toHaveBeenCalled();
  });

  it('should start plugins upon starting', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const pluginManagerStartPluginsSpy = vi.spyOn(engine.pluginManager, 'startPlugins');

    engine.start();

    expect(pluginManagerStartPluginsSpy).toHaveBeenCalled();
  });

  it('should start scene tree after starting plugins', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const sceneTreeStartSpy = vi.spyOn(engine.sceneTree, 'start');
    const pluginManagerStartPluginsSpy = vi.spyOn(engine.pluginManager, 'startPlugins');

    engine.start();

    expect(sceneTreeStartSpy).toHaveBeenCalledAfter(pluginManagerStartPluginsSpy);
  });

  it('should start loop after starting scene tree', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const loopStartSpy = vi.spyOn(engine.loop, 'start');
    const sceneTreeStartSpy = vi.spyOn(engine.sceneTree, 'start');

    engine.start();

    expect(loopStartSpy).toHaveBeenCalledAfter(sceneTreeStartSpy);
  });

  it('should be active after starting', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });

    engine.start();

    expect(engine.isActive).toBe(true);
  });

  it('should stop loop upon stopping', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const loopStopSpy = vi.spyOn(engine.loop, 'stop');

    engine.stop();

    expect(loopStopSpy).toHaveBeenCalled();
  });

  it('should stop scene tree after stopping loop', () => {

    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const sceneTreeStopSpy = vi.spyOn(engine.sceneTree, 'stop');
    const loopStopSpy = vi.spyOn(engine.loop, 'stop');

    engine.stop();

    expect(sceneTreeStopSpy).toHaveBeenCalledAfter(loopStopSpy);
  });

  it('should stop plugins after stopping scene tree', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
    });
    const pluginManagerStopPluginsSpy = vi.spyOn(engine.pluginManager, 'stopPlugins');
    const sceneTreeStopSpy = vi.spyOn(engine.sceneTree, 'stop');

    engine.stop();

    expect(pluginManagerStopPluginsSpy).toHaveBeenCalledAfter(sceneTreeStopSpy);
  });

  it('should not be active after starting', () => {
    const engine = new Engine({
      drawEngine: createDrawEngine(),
      drawInstructionsQueue: createDrawInstructionsQueue(),
      drawInstructionsResolver: createDrawInstructionsResolver(),
      loop: createLoop(),
      pluginManager: createPluginManager(),
      sceneTree: createSceneTree(),
      targetCanvas: createTargetCanvas(),
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

function createTargetCanvas() {
  return new Canvas_Mock();
}
