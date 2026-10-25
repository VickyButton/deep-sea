import { DrawEngine_Mock } from './drawEngine/DrawEngine_Mock';
import { DrawInstructionsResolver_Mock } from './drawInstructionsResolver/DrawInstructionsResolver_Mock';
import { Engine } from './Engine';
import { EngineController_Mock } from './engineController/EngineController_Mock';
import { Loop_Mock } from './loop/Loop_Mock';
import { PluginManager_Mock } from './pluginManager/PluginManager_Mock';
import { SceneTree_Mock } from './sceneTree/SceneTree_Mock';
import { Canvas_Mock } from '../domain/canvas/Canvas_Mock';
import { Queue_Mock } from '../domain/queue/Queue_Mock';
import { Node } from '../nodes/node/Node';
import { describe, expect, it } from 'vitest';

describe('Engine', () => {
  it('should not be active by default', () => {
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
      targetCanvas: new Canvas_Mock(),
    });

    expect(engine.isActive).toBe(false);
  });

  it('should set loop callback upon instantiation', () => {
    const loop = new Loop_Mock();

    new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
      targetCanvas: new Canvas_Mock(),
    });

    expect(loop.setLoopCallback).toHaveBeenCalled();
  });

  it('should set current scene in scene tree', () => {
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });

    engine.replaceScene(Node);

    expect(sceneTree.addScene).toHaveBeenCalled();
  });

  it('should remove current scene when replacing scene in scene tree', () => {
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });

    engine.replaceScene(Node);
    engine.replaceScene(Node);

    expect(sceneTree.removeScene).toHaveBeenCalled();
  });

  it('should start plugins upon starting', () => {
    const pluginManager = new PluginManager_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree: new SceneTree_Mock(),
      targetCanvas: new Canvas_Mock(),
    });

    engine.start();

    expect(pluginManager.startPlugins).toHaveBeenCalled();
  });

  it('should start scene tree after starting plugins', () => {
    const pluginManager = new PluginManager_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });

    engine.start();

    expect(sceneTree.start).toHaveBeenCalledAfter(pluginManager.startPlugins);
  });

  it('should start loop after starting scene tree', () => {
    const loop = new Loop_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });

    engine.start();

    expect(loop.start).toHaveBeenCalledAfter(sceneTree.start);
  });

  it('should be active after starting', () => {
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
      targetCanvas: new Canvas_Mock(),
    });

    engine.start();

    expect(engine.isActive).toBe(true);
  });

  it('should stop loop upon stopping', () => {
    const loop = new Loop_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
      targetCanvas: new Canvas_Mock(),
    });

    engine.stop();

    expect(loop.stop).toHaveBeenCalled();
  });

  it('should stop scene tree after stopping loop', () => {
    const loop = new Loop_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });

    engine.stop();

    expect(sceneTree.stop).toHaveBeenCalledAfter(loop.stop);
  });

  it('should stop plugins after stopping scene tree', () => {
    const pluginManager = new PluginManager_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree,
      targetCanvas: new Canvas_Mock(),
    });

    engine.stop();

    expect(pluginManager.stopPlugins).toHaveBeenCalledAfter(sceneTree.stop);
  });

  it('should not be active after starting', () => {
    const engine = new Engine({
      drawEngine: new DrawEngine_Mock(),
      drawInstructionsQueue: new Queue_Mock(),
      drawInstructionsResolver: new DrawInstructionsResolver_Mock(),
      engineController: new EngineController_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
      targetCanvas: new Canvas_Mock(),
    });

    engine.stop();

    expect(engine.isActive).toBe(false);
  });
});

