import type { Node } from '../../domain/node.types';
import type { SceneTree } from '../sceneTree.types';
import { BaseNode } from '../../nodes/BaseNode';

export class SceneTreeDefault implements SceneTree {
  public root = new BaseNode('root'); // TODO: Replace with Viewport.

  public addScene(scene: Node) {
    this.addSceneToRoot(scene);
  }

  private addSceneToRoot(scene: Node) {
    this.root.addChild(scene);
  }

  public removeScene(scene: Node) {
    this.removeSceneFromRoot(scene);
  }

  private removeSceneFromRoot(scene: Node) {
    this.root.removeChild(scene);
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
