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
    this.throwIfAddingSelfAsChild(node);
    this.removeChildFromOriginalParent(node);
    this.children.add(node);
    node.parent = this;
  }

  private throwIfAddingSelfAsChild(node: Node) {
    if (node === this) {
      throw new Error('Cannot add self as a child.');
    }
  }

  private removeChildFromOriginalParent(node: Node) {
    if (node.parent) {
      node.parent.children.delete(node);
    }
  }

  public removeChild(node: Node) {
    this.children.delete(node);
    node.parent = null;
  }

  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children.values()) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}
