
import type { FrameLoop } from './engine/frameLoop.types';
import type { GraphicsEngine } from './engine/graphicsEngine.types';
import type { SceneTree } from './engine/sceneTree.types';
import type { Node } from './nodes';
import type { GraphicsCanvas } from './providers/graphicsCanvas.types';
import { graphicsEngineEvents } from './engine/graphicsEngine/GraphicEngineEvents';
import { GraphicsEngineEventController } from './engine/graphicsEngine/GraphicsEngineEventController';
import { EngineEvents } from './events';
import { NewFrameEvent } from './events/NewFrameEvent';

/**
 * Coordinates all main engine logic.
 */
export class Engine {
  private readonly frameLoop: FrameLoop;
  public readonly graphicsEngine: GraphicsEngine;
  private readonly sceneTree: SceneTree;
  private readonly pluginManager = new EnginePluginManager();
  private readonly eventController: EngineEventController;

  constructor(options: {
    frameLoop: FrameLoop;
    graphicsEngine: GraphicsEngine;
    sceneTree: SceneTree;
  }) {
    this.frameLoop = options.frameLoop;
    this.graphicsEngine = options.graphicsEngine;
    this.sceneTree = options.sceneTree;
    this.eventController = new EngineEventController(this);
  }

  /**
   * Adds an engine plugin.
   * @param plugin The plugin to add.
   */
  public addPlugin(plugin: EnginePlugin) {
    this.pluginManager.addPlugin(plugin);
  }

  /**
   * Removes an engine plugin.
   * @param plugin The plugin to remove.
   */
  public removePlugin(plugin: EnginePlugin) {
    this.pluginManager.removePlugin(plugin);
  }

  /**
   * Sets the frames per second that the engine loop runs at.
   * @param fps The number of frames per second to run the engine loop at.
   */
  public setFramesPerSecond(fps: number) {
    this.frameLoop.setFramesPerSecond(fps);
  }

  /**
   * Sets the target graphics canvas to draw to.
   * @param canvas The target canvas to draw to.
   */
  public setTargetCanvas(canvas: GraphicsCanvas) {
    this.graphicsEngine.setTargetCanvas(canvas);
  }

  /**
   * Sets the current scene in the scene tree.
   * @param scene The scene to switch to.
   */
  public switchToScene(scene: Node) {
    this.setScene(scene);
    this.setupSceneTree();
    this.activateSceneTree();
  }

  private setScene(scene: Node) {
    this.sceneTree.setScene(scene);
  }

  private setupSceneTree() {
    this.sceneTree.setup();
  }

  private activateSceneTree() {
    this.sceneTree.activate();
  }

  /** Sets up the engine for use. */
  public setup() {
    this.setupEngine();
    this.emitSetupEvent();
  }

  private setupEngine() {
    this.pluginManager.setup();
    this.eventController.setup();
  }

  private emitSetupEvent() {
    EngineEvents.SetupEvent.emit();
  }

  /** Starts the engine. */
  public start() {
    this.addEventListeners();
    this.startFrameLoop();
    this.emitStartEvent();
  }

  private addEventListeners() {
    this.addNewFrameCallback();
  }

  private addNewFrameCallback() {
    NewFrameEvent.addListener(this.executeGameLoop);
  }

  private executeGameLoop = () => {
    this.graphicsEngine.processDrawCommandQueue();
  };

  private startFrameLoop() {
    this.frameLoop.start();
  }

  private emitStartEvent() {
    EngineEvents.StartEvent.emit();
  }

  /** Stops the engine. */
  public stop() {
    this.removeEventListeners();
    this.stopFrameLoop();
    this.emitStopEvent();
  }

  private removeEventListeners() {
    this.removeNewFrameCallback();
  }

  private removeNewFrameCallback() {
    NewFrameEvent.removeListener(this.executeGameLoop);
  }

  private stopFrameLoop() {
    this.frameLoop.stop();
  }

  private emitStopEvent() {
    EngineEvents.StopEvent.emit();
  }
}

/**
 * Manages the engine's plugins.
 */
class EnginePluginManager {
  private readonly plugins = new Set<EnginePlugin>();

  /**
   * Adds a plugin.
   * @param plugin The plugin to add.
   */
  public addPlugin(plugin: EnginePlugin) {
    this.plugins.add(plugin);
  }

  /**
   * Removes a plugin.
   * @param plugin The plugin to remove.
   */
  public removePlugin(plugin: EnginePlugin) {
    this.plugins.delete(plugin);
  }

  /**
   * Sets up the event listeners for the plugins.
   */
  public setup() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    EngineEvents.SetupEvent.addListener(this.onSetup);
    EngineEvents.StartEvent.addListener(this.onStart);
    EngineEvents.StopEvent.addListener(this.onStop);
  }

  private onSetup = () => {
    this.iteratePlugins((plugin) => plugin.setup?.());
  };
  private onStart = () => {
    this.iteratePlugins((plugin) => plugin.start?.());
  };
  private onStop = () => {
    this.iteratePlugins((plugin) => plugin.stop?.());
  };

  private iteratePlugins(callback: (plugin: EnginePlugin) => void) {
    for (const plugin of this.plugins) {
      callback(plugin);
    }
  }

  public teardown() {
    this.teardownEventListeners();
  }

  private teardownEventListeners() {
    EngineEvents.SetupEvent.removeListener(this.onSetup);
    EngineEvents.StartEvent.removeListener(this.onStart);
    EngineEvents.StopEvent.removeListener(this.onStop);
  }
}

/**
 * A plugin that executes callback at different lifecycle steps of the engine.
 */
export class EnginePlugin {
  /** Callback to execute after the engine is set up. */
  public setup?: () => void;
  /** Callback to execute after the engine is started. */
  public start?: () => void;
  /** Callback to execute after the engine is stopped. */
  public stop?: () => void;
}

/**
 * Maps Engine events to their corresponding methods.
 */
class EngineEventController {
  private readonly graphicsEngineEventController: GraphicsEngineEventController;

  constructor(engine: Engine) {
    this.graphicsEngineEventController = new GraphicsEngineEventController(engine.graphicsEngine, graphicsEngineEvents);
  }

  /** Sets up the engine event controllers. */
  public setup() {
    this.setupEventControllers();
  }

  private setupEventControllers() {
    this.setupGraphicsEngineEventController();
  }

  private setupGraphicsEngineEventController() {
    this.graphicsEngineEventController.setup();
  }

  /** Tears down the engine event controllers. */
  public teardown() {
    this.teardownEventControllers();
  }

  private teardownEventControllers() {
    this.teardownGraphicsEngineEventController();
  }

  private teardownGraphicsEngineEventController() {
    this.graphicsEngineEventController.teardown();
  }
}
