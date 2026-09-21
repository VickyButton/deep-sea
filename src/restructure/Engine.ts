
import type { FrameLoop } from './engine/frameLoop.types';
import type { GraphicsEngine } from './engine/graphicsEngine.types';
import type { SceneTree } from './engine/sceneTree.types';
import type { Node } from './nodes';
import type { GraphicsCanvas } from './providers/graphicsCanvas.types';
import { NewFrameEvent } from './events/NewFrameEvent';

/**
 * Coordinates all main engine logic.
 */
export class Engine {
  private readonly frameLoop: FrameLoop;
  private readonly graphicsEngine: GraphicsEngine;
  private readonly sceneTree: SceneTree;

  constructor(options: {
    frameLoop: FrameLoop;
    graphicsEngine: GraphicsEngine;
    sceneTree: SceneTree;
  }) {
    this.frameLoop = options.frameLoop;
    this.graphicsEngine = options.graphicsEngine;
    this.sceneTree = options.sceneTree;
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
  }

  private setupEngine() {
    this.graphicsEngine.setup();
  }

  /** Starts the engine. */
  public start() {
    this.addEventListeners();
    this.startFrameLoop();
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

  /** Stops the engine. */
  public stop() {
    this.removeEventListeners();
    this.stopFrameLoop();
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
}
