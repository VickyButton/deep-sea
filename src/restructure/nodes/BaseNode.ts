import type { Node } from '../domain/node.types';

export class BaseNode implements Node {
  public id: string;
  public isActive = false;
  public isReady = false;
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

  public getChildren() {
    return Array.from(this.children);
  }

  public addChild(node: Node) {
    this.children.add(node);
  }

  public removeChild(node: Node) {
    this.children.delete(node);
  }
}
