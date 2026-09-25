
import type { Engine } from './engine.types';
import type { Graphics } from './graphics/graphics.types';
import type { Loop } from './loop/loop.types';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';
import type { EventController } from '../events/EventController';
import type { Node } from '../nodes/Node';
import { GraphicsEventController } from './graphics/GraphicsEventController';
import { graphicsEvents } from './graphics/graphicsEvents';
import { LoopEventController } from './loop/LoopEventController';
import { loopEvents } from './loop/loopEvents';
import { PluginManagerEventController } from './pluginManager/PluginManagerEventController';
import { pluginManagerEvents } from './pluginManager/pluginManagerEvents';

export class EngineDefault implements Engine {
  private readonly sceneTree: SceneTree; // TODO: Remove after implementing Scene Tree controller.
  private readonly controllerManager: EventControllerManager;

  constructor(options: EngineOptions) {
    this.sceneTree = options.sceneTree;
    this.controllerManager = this.createControllerManager(options);
    this.setLoopCallback();
  }

  private createControllerManager(options: EngineOptions) {
    const manager = new EventControllerManager();

    this.addControllersToManager(manager, this.createControllers(options));

    return manager;
  }

  private createControllers(options: EngineOptions) {
    return [
      new LoopEventController(options.loop, loopEvents),
      new GraphicsEventController(options.graphics, graphicsEvents),
      new PluginManagerEventController(options.pluginManager, pluginManagerEvents),
    ];
  }

  private addControllersToManager(manager: EventControllerManager, controllers: EventController[]) {
    for (const controller of controllers) {
      manager.addController(controller);
    }
  }

  private setLoopCallback() {
    loopEvents.SetLoopCallback.emit(this.executeLoop);
  }

  private executeLoop = () => {
    this.clearCanvas();
    this.processDrawCommandQueue();
  };

  private clearCanvas() {
    graphicsEvents.ClearCanvas.emit();
  }

  private processDrawCommandQueue() {
    graphicsEvents.ProcessDrawCommandQueue.emit();
  }

  /** Starts the engine. */
  public start() {
    this.startListeningOnControllers();
    this.startPlugins();
    this.startLoop();
  }

  private startListeningOnControllers() {
    this.controllerManager.startListening();
  }

  private startPlugins() {
    pluginManagerEvents.StartPlugins.emit();
  }

  private startLoop() {
    loopEvents.Start.emit();
  }

  /** Stops the engine. */
  public stop() {
    this.stopLoop();
    this.stopPlugins();
    this.stopListeningOnControllers();
  }

  private stopLoop() {
    loopEvents.Stop.emit();
  }

  private stopPlugins() {
    pluginManagerEvents.StopPlugins.emit();
  }

  private stopListeningOnControllers() {
    this.controllerManager.stopListening();
  }

  /**
   * Sets the current scene in the scene tree.
   * @param scene The scene to switch to.
   */
  public switchToScene(scene: Node) {
    // TODO: Move scene teardown/setup logic into Scene Tree.
    this.teardownCurrentScene();
    this.setScene(scene);
    this.setupCurrentScene();
  }

  private teardownCurrentScene() {
    this.clearDrawCommandQueue();
    this.deactivateSceneTree();
    this.teardownSceneTree();
  }

  private clearDrawCommandQueue() {
    graphicsEvents.ClearDrawCommandQueue.emit();
  }

  private deactivateSceneTree() {
    this.sceneTree.deactivate(); // TODO: Replace with event emit after implementing Scene Tree controller.
  }

  private teardownSceneTree() {
    this.sceneTree.teardown(); // TODO: Replace with event emit after implementing Scene Tree controller.
  }

  private setScene(scene: Node) {
    this.sceneTree.setScene(scene);
  }

  private setupCurrentScene() {
    this.setupSceneTree();
    this.activateSceneTree();
  }

  private setupSceneTree() {
    this.sceneTree.setup(); // TODO: Replace with event emit after implementing Scene Tree controller.
  }

  private activateSceneTree() {
    this.sceneTree.activate(); // TODO: Replace with event emit after implementing Scene Tree controller.
  }
}

/** Manages event controllers. */
class EventControllerManager {
  private readonly controllers = new Set<EventController>();

  /**
   * Adds an event controller.
   * @param controller The controller to add.
   */
  public addController(controller: EventController) {
    this.controllers.add(controller);
  }

  /**
   * Removes an event controller.
   * @param controller The controller to remove.
   */
  public removeController(controller: EventController) {
    this.controllers.delete(controller);
  }

  /** Starts listening on all event controllers. */
  public startListening() {
    for (const controller of this.controllers) {
      controller.startListening();
    }
  }

  /** Stops listening on all event controllers. */
  public stopListening() {
    for (const controller of this.controllers) {
      controller.stopListening();
    }
  }
}

interface EngineOptions {
  loop: Loop;
  graphics: Graphics;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}
