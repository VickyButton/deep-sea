import type { Node } from './domain/node.types';
import type { FrameLoop } from './engine/frameLoop.types';
import type { SceneTree } from './engine/sceneTree.types';

/** Coordinates all main engine logic. */
export class Engine {
  private readonly frameLoop: FrameLoop;
  private readonly sceneTree: SceneTree;

  constructor(options: {
    frameLoop: FrameLoop;
    sceneTree: SceneTree;
  }) {
    this.frameLoop = options.frameLoop;
    this.sceneTree = options.sceneTree;
  }

  /** Sets the current scene in the scene tree. */
  public setScene(scene: Node) {
    this.sceneTree.switchToScene(scene);
  }

  /** Starts the engine. */
  public start() {
    this.readySceneTree();
    this.activateSceneTree();
    this.startFrameLoop();
  }

  private readySceneTree() {
    this.sceneTree.ready();
  }

  private activateSceneTree() {
    this.sceneTree.activate();
  }

  private startFrameLoop() {
    this.frameLoop.start();
  }

  /** Stops the engine. */
  public stop() {
    this.stopFrameLoop();
    this.deactivateSceneTree();
    this.unreadySceneTree();
  }

  private stopFrameLoop() {
    this.frameLoop.stop();
  }

  private deactivateSceneTree() {
    this.sceneTree.deactivate();
  }

  private unreadySceneTree() {
    this.sceneTree.unready();
  }
}
