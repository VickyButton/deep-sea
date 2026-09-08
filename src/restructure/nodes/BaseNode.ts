import type { Node } from '../domain/node.types';

/**
 * The base implementation of the node interface.
 */
export class BaseNode implements Node {
  public id: string;
  public isActive = false;
  public isReady = false;
  protected nodeRelationshipManager: NodeRelationshipManager;

  constructor(id: string) {
    this.id = id;
    this.nodeRelationshipManager = new NodeRelationshipManager(this);
  }

  public get parent() {
    return this.nodeRelationshipManager.getParentNode();
  }

  public get children() {
    return this.nodeRelationshipManager.getChildNodes();
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

  public setParent(node: Node) {
    this.nodeRelationshipManager.setParent(node);
  }

  public removeParent() {
    this.nodeRelationshipManager.removeParent();
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
  private readonly node: Node;
  private parentNode: Node | null = null;
  private childNodes = new Set<Node>();

  constructor(node: Node) {
    this.node = node;
  }

  public getParentNode() {
    return this.parentNode;
  }

  public setParent(parent: Node) {
    // TODO: Throw error if self.
    this.parentNode = parent;
  }

  public removeParent() {
    this.parentNode = null;
  }

  public getChildNodes() {
    return Array.from(this.childNodes);
  }

  public addChildNode(child: Node) {
    this.throwIfChildIsNode(child);
    this.removeChildFromOriginalParent(child);

    this.childNodes.add(child);
    child.setParent(this.node);
  }

  private throwIfChildIsNode(child: Node) {
    if (child === this.node) {
      throw new Error('Cannot add self as a child.');
    }
  }

  private removeChildFromOriginalParent(child: Node) {
    child.parent?.removeChild(child);
  }

  public removeChildNode(child: Node) {
    this.childNodes.delete(child);
    child.removeParent();
  }
}
