import type { SceneTree } from './sceneTree.types';
import { Node } from '../../nodes/Node';

export class SceneTreeDefault implements SceneTree {
  private currentScene: Node | null = null;
  private root = new Node('root'); // TODO: Replace with Viewport.

  public setCurrentScene(scene: Node) {
    this.replaceCurrentScene(scene);
  }

  private replaceCurrentScene(newScene: Node) {
    if (this.currentScene) {
      this.removeSceneFromTree(this.currentScene);
    }

    this.currentScene = newScene;
    this.addSceneToTree(newScene);
  }

  private removeSceneFromTree(scene: Node) {
    this.removeSceneFromRoot(scene);
    this.stopScene(scene);
    this.teardownScene(scene);
  }

  private stopScene(scene: Node) {
    scene.stop();
  }

  private teardownScene(scene: Node) {
    scene.teardown();
  }

  private removeSceneFromRoot(scene: Node) {
    this.root.removeChild(scene);
  }

  private addSceneToTree(scene: Node) {
    this.addSceneToRoot(scene);
  }

  private addSceneToRoot(scene: Node) {
    this.root.addChild(scene);
  }

  private startScene(scene: Node) {
    scene.start();
  }

  public startCurrentScene() {
    this.currentScene?.start();
  }

  public stopCurrentScene() {
    this.currentScene?.stop();
  }
}
