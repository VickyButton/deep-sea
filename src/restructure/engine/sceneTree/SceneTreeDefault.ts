import type { Node } from '../../domain/node.types';
import type { SceneTree } from '../sceneTree.types';
import { BaseNode } from '../../nodes/BaseNode';

export class SceneTreeDefault implements SceneTree {
  private currentScene: Node | null = null;
  public root = new BaseNode('root'); // TODO: Replace with Viewport.

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

  public ready() {
    this.root.traversePostorder((node) => node.ready());
  }

  public unready() {
    this.root.traversePostorder((node) => node.unready());
  }

  public activate() {
    this.root.traversePostorder((node) => node.activate());
  }

  public deactivate() {
    this.root.traversePostorder((node) => node.deactivate());
  }
}
