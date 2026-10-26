import type { DrawInstructions } from '../domain/drawInstructions/drawInstructions.types';
import { CanvasNode } from '../nodes';
import { DrawInstructionsResolver } from './drawInstructionsResolver/DrawInstructionsResolver';
import { Engine } from './Engine';
import { Loop } from './loop/Loop';
import { PluginManager } from './pluginManager/PluginManager';
import { SceneTree } from './sceneTree/SceneTree';
import { Canvas_Mock } from '../domain/canvas/Canvas_Mock';
import { DrawStepTranslator } from '../domain/drawStep/translator/DrawStepTranslator';
import { Queue_Mock } from '../domain/queue/Queue_Mock';
import { Node } from '../nodes/node/Node';
import { AnimationFrameProvider_Mock } from '../providers/animationFrameProvider/AnimationFrameProvider_Mock';
import { TimeProvider_Mock } from '../providers/timeProvider/TimeProvider_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('Engine', () => {
  it('should not be active by default', () => {
    expect(createEngine().isActive).toBe(false);
  });

  it('should queue draw instructions upon canvas node emitting "redraw_requested" signal', () => {
    const engine = createEngine();
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
    const engine = createEngine();
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
    const engine = createEngine();
    const loopSetLoopCallbackSpy = vi.spyOn(engine.loop, 'setLoopCallback');

    engine.setup();

    expect(loopSetLoopCallbackSpy).toHaveBeenCalled();
  });

  it('should set current scene in scene tree', () => {
    const engine = createEngine();
    const sceneTreeAddSceneSpy = vi.spyOn(engine.sceneTree, 'addScene');

    engine.replaceScene(Node);

    expect(sceneTreeAddSceneSpy).toHaveBeenCalled();
  });

  it('should remove current scene when replacing scene in scene tree', () => {
    const engine = createEngine();
    const sceneTreeRemoveSceneSpy = vi.spyOn(engine.sceneTree, 'removeScene');

    engine.replaceScene(Node);
    engine.replaceScene(Node);

    expect(sceneTreeRemoveSceneSpy).toHaveBeenCalled();
  });

  it('should start plugins upon starting', () => {
    const engine = createEngine();
    const pluginManagerStartPluginsSpy = vi.spyOn(engine.pluginManager, 'startPlugins');

    engine.start();

    expect(pluginManagerStartPluginsSpy).toHaveBeenCalled();
  });

  it('should start scene tree after starting plugins', () => {
    const engine = createEngine();
    const sceneTreeStartSpy = vi.spyOn(engine.sceneTree, 'start');
    const pluginManagerStartPluginsSpy = vi.spyOn(engine.pluginManager, 'startPlugins');

    engine.start();

    expect(sceneTreeStartSpy).toHaveBeenCalledAfter(pluginManagerStartPluginsSpy);
  });

  it('should start loop after starting scene tree', () => {
    const engine = createEngine();
    const loopStartSpy = vi.spyOn(engine.loop, 'start');
    const sceneTreeStartSpy = vi.spyOn(engine.sceneTree, 'start');

    engine.start();

    expect(loopStartSpy).toHaveBeenCalledAfter(sceneTreeStartSpy);
  });

  it('should be active after starting', () => {
    const engine = createEngine();

    engine.start();

    expect(engine.isActive).toBe(true);
  });

  it('should stop loop upon stopping', () => {
    const engine = createEngine();
    const loopStopSpy = vi.spyOn(engine.loop, 'stop');

    engine.stop();

    expect(loopStopSpy).toHaveBeenCalled();
  });

  it('should stop scene tree after stopping loop', () => {

    const engine = createEngine();
    const sceneTreeStopSpy = vi.spyOn(engine.sceneTree, 'stop');
    const loopStopSpy = vi.spyOn(engine.loop, 'stop');

    engine.stop();

    expect(sceneTreeStopSpy).toHaveBeenCalledAfter(loopStopSpy);
  });

  it('should stop plugins after stopping scene tree', () => {
    const engine = createEngine();
    const pluginManagerStopPluginsSpy = vi.spyOn(engine.pluginManager, 'stopPlugins');
    const sceneTreeStopSpy = vi.spyOn(engine.sceneTree, 'stop');

    engine.stop();

    expect(pluginManagerStopPluginsSpy).toHaveBeenCalledAfter(sceneTreeStopSpy);
  });

  it('should not be active after starting', () => {
    const engine = createEngine();

    engine.stop();

    expect(engine.isActive).toBe(false);
  });
});

function createEngine() {
  return new Engine({
    drawInstructionsQueue: createDrawInstructionsQueue(),
    drawInstructionsResolver: createDrawInstructionsResolver(),
    drawStepTranslator: createDrawStepTranslator(),
    loop: createLoop(),
    pluginManager: createPluginManager(),
    sceneTree: createSceneTree(),
    targetCanvas: createTargetCanvas(),
  });
}

function createDrawInstructionsQueue() {
  return new Queue_Mock<DrawInstructions>();
}

function createDrawInstructionsResolver() {
  return new DrawInstructionsResolver();
}

function createDrawStepTranslator() {
  return new DrawStepTranslator();
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
