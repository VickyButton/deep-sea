import type { Node } from '../../domain/node.types';
import type { SceneTree } from '../sceneTree.types';
import { BaseNode } from '../../nodes/BaseNode';

export class SceneTreeDefault implements SceneTree {
  public root = new BaseNode('root'); // TODO: Replace with Viewport.

  public addScene(scene: Node) {
    this.addSceneToRoot(scene);
    this.readyScene(scene);
    this.activateScene(scene);
  }

  private addSceneToRoot(scene: Node) {
    this.root.addChild(scene);
  }

  private readyScene(scene: Node) {
    scene.traversePostorder((node) => node.ready());
  }

  private activateScene(scene: Node) {
    scene.traversePostorder((node) => node.activate());
  }

  public removeScene(scene: Node) {
    this.deactivateScene(scene);
    this.unreadyScene(scene);
    this.removeSceneFromRoot(scene);
  }

  private deactivateScene(scene: Node) {
    scene.traversePostorder((node) => node.deactivate());
  }

  private unreadyScene(scene: Node) {
    scene.traversePostorder((node) => node.unready());
  }

  private removeSceneFromRoot(scene: Node) {
    this.root.removeChild(scene);
  }
}
