import type { Node } from '../domain/node.types';

/**
 * The base implementation of the node interface.
 */
export class BaseNode implements Node {
  public id: string;
  public isActive = false;
  public isReady = false;
  public parent: Node | null = null;
  protected nodeRelationshipManager: NodeRelationshipManager;

  constructor(id: string) {
    this.id = id;
    this.nodeRelationshipManager = new NodeRelationshipManager(this);
  }

  public get children() {
    return this.nodeRelationshipManager.getChildren();
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
    this.nodeRelationshipManager.addChildNode(node);
  }

  public removeChild(node: Node) {
    this.nodeRelationshipManager.removeChildNode(node);
  }

  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children.values()) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}

class NodeRelationshipManager {
  private readonly parentNode: Node;
  private readonly childNodes = new Set<Node>();

  constructor(parentNode: Node) {
    this.parentNode = parentNode;
  }

  public getChildren() {
    return Array.from(this.childNodes);
  }

  public addChildNode(node: Node) {
    this.throwIfNodeIsParent(node);
    this.removeNodeFromOriginalParent(node);

    this.childNodes.add(node);
    node.parent = this.parentNode;
  }

  private throwIfNodeIsParent(node: Node) {
    if (node === this.parentNode) {
      throw new Error('Cannot add self as a child.');
    }
  }

  private removeNodeFromOriginalParent(node: Node) {
    node.parent?.removeChild(node);
  }

  public removeChildNode(node: Node) {
    this.childNodes.delete(node);
    node.parent = null;
  }
}
