import type { Node } from '../domain/node.types';

/**
 * The base implementation of the node interface.
 */
export class BaseNode implements Node {
  public id: string;
  public isActive = false;
  public isReady = false;
  public parent: Node | null = null;
  public children = new Set<Node>();

  constructor(id: string) {
    this.id = id;
  }

  public activate() {
    this.isActive = true;
  }

  public deactivate() {
    this.isActive = false;
  }

  public ready() {
    this.isReady = true;
  }

  public unready() {
    this.isReady = false;
  }

  public addChild(node: Node) {
    this.throwIfNodeIsSelf(node);
    this.removeNodeFromOriginalParent(node);
    this.addNodeToChildren(node);
    this.setNodeParentToThis(node);
  }

  private throwIfNodeIsSelf(node: Node) {
    if (node === this) {
      throw new Error('Cannot add self as a child.');
    }
  }

  private removeNodeFromOriginalParent(node: Node) {
    node.parent?.children.delete(node);
  }

  private addNodeToChildren(node: Node) {
    this.children.add(node);
  }

  private setNodeParentToThis(node: Node) {
    node.parent = this;
  }

  public removeChild(node: Node) {
    this.removeNodeFromChildren(node);
    this.removeNodeParent(node);
  }

  private removeNodeFromChildren(node: Node) {
    this.children.delete(node);
  }

  private removeNodeParent(node: Node) {
    node.parent = null;
  }

  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children.values()) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}
