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
    return this.nodeRelationshipManager.getParent();
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

  public setParent(node: Node) {
    this.nodeRelationshipManager.setParent(node);
  }

  public removeParent() {
    this.nodeRelationshipManager.removeParent();
  }

  public addChild(node: Node) {
    this.nodeRelationshipManager.addChild(node);
  }

  public removeChild(node: Node) {
    this.nodeRelationshipManager.removeChild(node);
  }

  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children.values()) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}

class NodeRelationshipManager {
  private readonly self: Node;
  private parent: Node | null = null;
  private children = new Set<Node>();

  constructor(self: Node) {
    this.self = self;
  }

  public getParent() {
    return this.parent;
  }

  public setParent(parent: Node) {
    this.throwIfParentIsSelf(parent);
    this.parent = parent;
  }

  private throwIfParentIsSelf(parent: Node) {
    if (this.isSelf(parent)) {
      throw new Error('Cannot set self as parent.');
    }
  }

  private isSelf(node: Node) {
    return node === this.self;
  }

  public removeParent() {
    this.parent = null;
  }

  public getChildren() {
    return Array.from(this.children);
  }

  public addChild(child: Node) {
    this.throwIfChildIsSelf(child);
    this.removeChildFromOriginalParent(child);
    this.children.add(child);
    child.setParent(this.self);
  }

  private throwIfChildIsSelf(child: Node) {
    if (this.isSelf(child)) {
      throw new Error('Cannot add self as a child.');
    }
  }

  private removeChildFromOriginalParent(child: Node) {
    child.parent?.removeChild(child);
  }

  public removeChild(child: Node) {
    this.children.delete(child);
    child.removeParent();
  }
}
