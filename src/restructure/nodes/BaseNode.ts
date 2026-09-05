import type { Node } from '../domain/node.types';

/**
 * The base implementation of the node interface.
 */
export class BaseNode implements Node {
  public id: string;
  public isActive = false;
  public isReady = false;
  /** The node's parent. */
  protected parent: Node | null = null;
  /** The node's child nodes. */
  protected children = new Set<Node>();

  constructor(id: string) {
    this.id = id;
  }

  public activate() {
    this.isActive = true;
  }

  public deactivate() {
    this.isActive = false;
  }

  public getParent() {
    return this.parent;
  }

  public setParent(node: Node) {
    this.parent = node;
  }

  public getChildren() {
    return Array.from(this.children);
  }

  public addChild(node: Node) {
    this.children.add(node);
    node.setParent(this);
  }

  public removeChild(node: Node) {
    this.children.delete(node);
    node.setParent(null);
  }
}
