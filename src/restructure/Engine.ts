
import type { EngineLoop } from './engine/engineLoop/engineLoop.types';
import type { GraphicsEngine } from './engine/graphicsEngine/graphicsEngine.types';
import type { PluginManager } from './engine/pluginManager/pluginManager.types';
import type { SceneTree } from './engine/sceneTree.types';
import type { EventController } from './events/EventController';
import type { Node } from './nodes';
import { graphicsEngineEvents } from './engine/graphicsEngine/graphicEngineEvents';
import { GraphicsEngineEventController } from './engine/graphicsEngine/GraphicsEngineEventController';
import { PluginManagerEventController } from './engine/pluginManager/PluginManagerEventController';
import { pluginManagerEvents } from './engine/pluginManager/pluginManagerEvents';
import { NewFrameEvent } from './events/NewFrameEvent';

/** Coordinates interactions between engine components. */
export class Engine {
  private readonly engineLoop: EngineLoop; // TODO: Remove after implementing Frame Loop controller.
  private readonly sceneTree: SceneTree; // TODO: Remove after implementing Scene Tree controller.
  private readonly controllerManager: EventControllerManager;

  constructor(options: EngineOptions) {
    this.engineLoop = options.engineLoop;
    this.sceneTree = options.sceneTree;
    this.controllerManager = this.createControllerManager(options);
  }

  private createControllerManager(options: EngineOptions) {
    const manager = new EventControllerManager();

    this.addControllersToManager(manager, this.createControllers(options));

    return manager;
  }

  private createControllers(options: EngineOptions) {
    return [
      new GraphicsEngineEventController(options.graphicsEngine, graphicsEngineEvents),
      new PluginManagerEventController(options.pluginManager, pluginManagerEvents),
    ];
  }

  private addControllersToManager(manager: EventControllerManager, controllers: EventController[]) {
    for (const controller of controllers) {
      manager.addController(controller);
    }
  }

  /** Starts the engine. */
  public start() {
    this.startListeningOnControllers();
    this.startPlugins();
    this.startFrameLoop();
  }

  private startListeningOnControllers() {
    this.controllerManager.startListening();
  }

  private startPlugins() {
    pluginManagerEvents.StartPlugins.emit();
  }

  private clearCanvas() {
    graphicsEngineEvents.ClearCanvas.emit();
  }

  private processDrawCommandQueue() {
    graphicsEngineEvents.ProcessDrawCommandQueue.emit();
  }

  private startFrameLoop() {
    this.engineLoop.setLoopCallback(this.executeGameLoop); // TODO: Replace with event emit after implementing Frame Loop controller.
    this.engineLoop.start();  // TODO: Replace with event emit after implementing Frame Loop controller. The Frame Loop start even should accept a loop callback to be passed.
  }

  private executeGameLoop = () => {
    this.clearCanvas();
    this.processDrawCommandQueue();
  };

  /** Stops the engine. */
  public stop() {
    this.removeEventListeners(); // TODO: Remove after implementing Frame Loop controller.
    this.stopFrameLoop(); // TODO: Replace after implementing Frame Loop controller.
    this.stopPlugins();
    this.stopListeningOnControllers();
  }

  private removeEventListeners() {
    this.removeNewFrameCallback();
  }

  private removeNewFrameCallback() {
    NewFrameEvent.removeListener(this.executeGameLoop);
  }

  private stopFrameLoop() {
    this.engineLoop.stop(); // TODO: Replace with event emit after implementing Frame Loop controller.
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
    graphicsEngineEvents.ClearDrawCommandQueue.emit();
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
  engineLoop: EngineLoop;
  graphicsEngine: GraphicsEngine;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}
