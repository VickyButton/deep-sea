import type { SceneConstructor } from './engine.types';
import type { Loop } from './loop/Loop';
import type { PluginManager } from './pluginManager/PluginManager';
import type { SceneTree } from './sceneTree/SceneTree';
import type { Node } from '../nodes/node/Node';
import { SignalController } from '../domain/signalController/SignalController';

/** Coordinates interactions between engine components. */
export class Engine {
  public readonly loop: Loop;
  public readonly pluginManager: PluginManager;
  public readonly sceneTree: SceneTree;
  private readonly controller = new EngineController(this);
  private currentScene: Node | null = null;

  constructor(components: EngineComponents) {
    this.loop = components.loop;
    this.pluginManager = components.pluginManager;
    this.sceneTree = components.sceneTree;
  }

  /** Whether or not the engine is listening for signals. */
  public get isActive() {
    return this.controller.isListening;
  }

  /** Replaces the current scene in the scene tree. */
  public replaceScene(Scene: SceneConstructor) {
    const sceneNode = new Scene('scene');

    if (this.currentScene) {
      this.removeSceneFromSceneTree(this.currentScene);
    }

    this.currentScene = sceneNode;
    this.addSceneToSceneTree(this.currentScene);
  }

  private removeSceneFromSceneTree(scene: Node) {
    this.sceneTree.removeScene(scene);
  }

  private addSceneToSceneTree(scene: Node) {
    this.sceneTree.addScene(scene);
  }

  /** Sets up the engine. This should be called before starting the engine. */
  public setup() {
    this.setupController();
  }

  private setupController() {
    this.controller.setup();
  }

  /** Starts the engine. */
  public start() {
    this.startController();
    this.startPlugins();
    this.startSceneTree();
    this.startLoop();
  }

  private startController() {
    this.controller.startListening();
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

  /** Stops the engine. */
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
    this.controller.stopListening();
  }
}

/** The main controller used for listening for signals from engine components. */
class EngineController {
  private readonly controller = new SignalController();
  private readonly engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public get isListening() {
    return this.controller.isListening;
  }

  public setup() {
    this.registerLoopSignals();
  }

  private registerLoopSignals() {
    this.controller.register(this.engine.loop.interval_elapsed, this.onIntervalElapsed);
  }

  private onIntervalElapsed = (dt: number) => {
    this.processSceneTree(dt);
  };

  private processSceneTree(dt: number) {
    this.engine.sceneTree.process(dt);
  }

  public startListening() {
    this.controller.startListening();
  }

  public stopListening() {
    this.controller.stopListening();
  }
}

interface EngineComponents {
  loop: Loop;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}
