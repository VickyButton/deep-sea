import type { Engine, NewFrameCallback } from './engine.types';
import type { EngineController } from './engineController/engineController.types';
import type { Graphics } from './graphics/graphics.types';
import type { Loop } from './loop/loop.types';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';

/** The main implementation of the Engine interface. */
export class Engine_Main implements Engine {
  private readonly engineController: EngineController;
  private readonly graphics: Graphics;
  private readonly loop: Loop;
  private readonly pluginManager: PluginManager;
  private readonly sceneTree: SceneTree;
  private newFrameCallback: NewFrameCallback | null = null;

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
    if (this.newFrameCallback) {
      this.newFrameCallback(this.renderNewFrame());
    }

    this.clearCommandQueue();
  };

  private renderNewFrame() {
    return this.graphics.render();
  }

  private clearCommandQueue() {
    this.graphics.clearQueue();
  }

  public get isActive() {
    return this.engineController.isListening;
  }

  public setNewFrameCallback(callback: NewFrameCallback) {
    this.newFrameCallback = callback;
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
