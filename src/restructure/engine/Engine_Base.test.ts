import { Engine_Base } from './Engine_Base';
import { Graphics_Mock } from './graphics/Graphics_Mock';
import { Loop_Mock } from './loop/Loop_Mock';
import { PluginManager_Mock } from './pluginManager/PluginManager_Mock';
import { SceneTree_Mock } from './sceneTree/SceneTree_Mock';
import { describe, expect, it } from 'vitest';

describe('Engine_Base', () => {
  it('should set loop callback upon instantiation', () => {
    const loop = new Loop_Mock();

    new Engine_Base({
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
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree: new SceneTree_Mock(),
    });

    engine.start();

    expect(pluginManager.startPlugins).toHaveBeenCalled();
  });

  it('should start loop upon starting', () => {
    const loop = new Loop_Mock();
    const engine = new Engine_Base({
      graphics: new Graphics_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    engine.start();

    expect(loop.start).toHaveBeenCalled();
  });

  it('should stop plugins upon stopping', () => {
    const pluginManager = new PluginManager_Mock();
    const engine = new Engine_Base({
      graphics: new Graphics_Mock(),
      loop: new Loop_Mock(),
      pluginManager,
      sceneTree: new SceneTree_Mock(),
    });

    engine.stop();

    expect(pluginManager.stopPlugins).toHaveBeenCalled();
  });

  it('should stop loop upon stopping', () => {
    const loop = new Loop_Mock();
    const engine = new Engine_Base({
      graphics: new Graphics_Mock(),
      loop,
      pluginManager: new PluginManager_Mock(),
      sceneTree: new SceneTree_Mock(),
    });

    engine.stop();

    expect(loop.stop).toHaveBeenCalled();
  });
});

