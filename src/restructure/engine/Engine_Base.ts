import type { Engine } from './engine.types';
import type { EngineController } from './engineController/engineController.types';
import type { Graphics } from './graphics/graphics.types';
import type { Loop } from './loop/loop.types';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';

/** The base implementation of the Engine interface. */
export class Engine_Base implements Engine {
  private readonly engineController: EngineController;
  private readonly graphics: Graphics;
  private readonly loop: Loop;
  private readonly pluginManager: PluginManager;
  private readonly sceneTree: SceneTree;

  constructor({ engineController, graphics, loop, pluginManager, sceneTree }: EngineComponents) {
    this.engineController = engineController;
    this.graphics = graphics;
    this.loop = loop;
    this.pluginManager = pluginManager;
    this.sceneTree = sceneTree;
    this.setupController();
    this.setLoopCallback();
  }

  private setupController() {
    this.engineController.setup();
  }

  private setLoopCallback() {
    this.loop.setLoopCallback(this.executeLoop);
  }

  private executeLoop = () => {
    this.clearCanvas();
    this.processDrawCommandQueue();
  };

  private clearCanvas() {
    this.graphics.clearCanvas();
  }

  private processDrawCommandQueue() {
    this.graphics.processDrawCommandQueue();
  }

  public get isActive() {
    return this.engineController.isListening;
  }

  public start() {
    this.startController();
    this.startPlugins();
    this.startSceneTree();
    this.startLoop();
  }

  private startController() {
    this.engineController.startListening();
  }

  private startPlugins() {
    this.pluginManager.startPlugins();
  }

  private startSceneTree() {
    this.sceneTree.start();
  }

  private startLoop() {
    this.loop.start();
  }

  public stop() {
    this.stopLoop();
    this.stopSceneTree();
    this.stopPlugins();
    this.stopController();
  }

  private stopLoop() {
    this.loop.stop();
  }

  private stopSceneTree() {
    this.sceneTree.stop();
  }

  private stopPlugins() {
    this.pluginManager.stopPlugins();
  }

  private stopController() {
    this.engineController.stopListening();
  }
}

interface EngineComponents {
  engineController: EngineController;
  graphics: Graphics;
  loop: Loop;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}
