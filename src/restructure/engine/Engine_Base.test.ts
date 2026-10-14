import { Engine_Base } from './Engine_Base';
import { EngineController_Mock } from './engineController/EngineController_Mock';
import { Graphics_Mock } from './graphics/Graphics_Mock';
import { Loop_Mock } from './loop/Loop_Mock';
import { PluginManager_Mock } from './pluginManager/PluginManager_Mock';
import { SceneTree_Mock } from './sceneTree/SceneTree_Mock';
import { describe, expect, it } from 'vitest';

describe('Engine_Base', () => {
  it('should not be active by default', () => {
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    expect(engine.isActive).toBe(false);
  });

  it('should set loop callback upon instantiation', () => {
    const loop = new Loop_Mock();

    new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    expect(loop.setLoopCallback).toHaveBeenCalled();
  });

  it('should start plugins upon starting', () => {
    const pluginManager = new PluginManager_Mock();
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree: new SceneTree_Mock(),
    });

    engine.start();

    expect(pluginManager.startPlugins).toHaveBeenCalled();
  });

  it('should start scene tree after starting plugins', () => {
    const pluginManager = new PluginManager_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree,
    });

    engine.start();

    expect(sceneTree.start).toHaveBeenCalledAfter(pluginManager.startPlugins);
  });

  it('should start loop after starting scene tree', () => {
    const loop = new Loop_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree,
    });

    engine.start();

    expect(loop.start).toHaveBeenCalledAfter(sceneTree.start);
  });

  it('should be active after starting', () => {
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    engine.start();

    expect(engine.isActive).toBe(true);
  });

  it('should stop loop upon stopping', () => {
    const loop = new Loop_Mock();
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    engine.stop();

    expect(loop.stop).toHaveBeenCalled();
  });

  it('should stop scene tree after stopping loop', () => {
    const loop = new Loop_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree,
    });

    engine.stop();

    expect(sceneTree.stop).toHaveBeenCalledAfter(loop.stop);
  });

  it('should stop plugins after stopping scene tree', () => {
    const pluginManager = new PluginManager_Mock();
    const sceneTree = new SceneTree_Mock();
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree,
    });

    engine.stop();

    expect(pluginManager.stopPlugins).toHaveBeenCalledAfter(sceneTree.stop);
  });

  it('should not be active after starting', () => {
    const engine = new Engine_Base({
      engineController: new EngineController_Mock(),
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    engine.stop();

    expect(engine.isActive).toBe(false);
  });
});

