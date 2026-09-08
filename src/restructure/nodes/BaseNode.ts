import type { Node } from '../domain/node.types';

export interface BaseNodeOptions {
  isActive?: boolean;
  isReady?: boolean;
}

/**
 * The base implementation of the node interface.
 */
export class BaseNode<T extends BaseNodeOptions = BaseNodeOptions> implements Node {
  public id: string;
  public isActive: boolean;
  public isReady: boolean;
  protected nodeRelationshipManager: NodeRelationshipManager;

  constructor(id: string, options?: T) {
    this.id = id;
    this.isActive = options?.isActive ?? false;
    this.isReady = options?.isReady ?? false;
    this.nodeRelationshipManager = new NodeRelationshipManager(this);
  }

  public get parent() {
    return this.nodeRelationshipManager.getParent();
  }

  public get hasParent() {
    return this.nodeRelationshipManager.getParent() !== null;
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

  public assignParent(parent: Node) {
    this.nodeRelationshipManager.assignParent(parent);
  }

  public unassignParent() {
    this.nodeRelationshipManager.unassignParent();
  }

  public reparent(newParent: Node) {
    this.nodeRelationshipManager.reparent(newParent);
  }

  public addChild(child: Node) {
    this.nodeRelationshipManager.addChild(child);
  }

  public removeChild(child: Node) {
    this.nodeRelationshipManager.removeChild(child);
  }

  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children.values()) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}

/**
 * Manages a node's relationships.
 */
class NodeRelationshipManager {
  /** The node being managed. */
  private readonly self: Node;
  /** The node's parent node. */
  private parent: Node | null = null;
  /** The node's child nodes. */
  private children = new Set<Node>();

  constructor(self: Node) {
    this.self = self;
  }

  /** Gets the node's parent. */
  public getParent() {
    return this.parent;
  }

  /**
   * Assigns a parent to the node.
   * @param parent The parent to assign to the node.
   * @throws An error if passed parent is the node itself.
   */
  public assignParent(parent: Node) {
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

  /** Unassigns the node's parent from the node. */
  public unassignParent() {
    this.parent = null;
  }

  private removeSelfFromParent() {
    this.self.parent?.removeChild(this.self);
  }

  private addSelfToParent(newParent: Node) {
    newParent.addChild(this.self);
  }

  /** Gets the node's children. */
  public getChildren() {
    return Array.from(this.children);
  }

  /**
   * Adds a child to the node.
   * @param child The child to add to the node.
   * @throws An error if passed child is self.
   * @throws An error if pass child already has a parent.
   */
  public addChild(child: Node) {
    this.throwIfChildIsSelf(child);
    this.throwIfChildAlreadyHasParent(child);
    this.parentChild(child);
  }

  private throwIfChildIsSelf(child: Node) {
    if (this.isSelf(child)) {
      throw new Error('Cannot add self as a child.');
    }
  }

  private throwIfChildAlreadyHasParent(child: Node) {
    if (child.hasParent) {
      throw new Error('Node already has a parent.');
    }
  }

  private parentChild(child: Node) {
    this.children.add(child);
    this.assignSelfAsChildParent(child);
  }

  private assignSelfAsChildParent(child: Node) {
    child.assignParent(this.self);
  }

  /**
   * Removes child from the node.
   * @param child The child to remove.
   */
  public removeChild(child: Node) {
    this.children.delete(child);
    this.unassignParentFromChild(child);
  }

  private unassignParentFromChild(child: Node) {
    child.unassignParent();
  }

  /**
   * Reparents the node.
   * @param newParent The new parent to assign to the node.
   */
  public reparent(newParent: Node) {
    this.removeSelfFromParent();
    this.addSelfToParent(newParent);
  }
}
