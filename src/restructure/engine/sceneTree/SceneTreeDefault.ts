import type { SceneTree } from '../sceneTree.types';
import { Node } from '../../nodes/Node';

export class SceneTreeDefault implements SceneTree {
  private currentScene: Node | null = null;
  public root = new Node('root'); // TODO: Replace with Viewport.

  public switchToScene(scene: Node) {
    this.replaceCurrentScene(scene);
  }

  private replaceCurrentScene(newScene: Node) {
    this.removeCurrentSceneFromTree();
    this.currentScene = newScene;
    this.addCurrentSceneToTree();
  }

  private removeCurrentSceneFromTree() {
    if (this.currentScene) {
      this.removeSceneFromRoot(this.currentScene);
    }
  }

  private removeSceneFromRoot(scene: Node) {
    this.root.removeChild(scene);
  }

  private addCurrentSceneToTree() {
    if (this.currentScene) {
      this.addSceneToRoot(this.currentScene);
    }
  }

  private addSceneToRoot(scene: Node) {
    this.root.addChild(scene);
  }

  public setup() {
    this.root.traversePostorder((node) => node.setup());
  }

  public activate() {
    this.root.traversePostorder((node) => node.activate());
  }

  public deactivate() {
    this.root.traversePostorder((node) => node.deactivate());
  }

  public teardown() {
    this.root.traversePostorder((node) => node.teardown());
  }
}
