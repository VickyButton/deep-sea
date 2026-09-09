/**
 * Core building blocks for scenes. Nodes encapsulate state, functionality, and hierarchy.
 */
export class Node {
  /** The node's unique ID. */
  public id: string;
  /** A flag indicating if the node is active or not. */
  public isActive: boolean;
  /** A flag indicating if the node is ready or not. */
  public isReady: boolean;
  protected nodeRelationshipManager: NodeRelationshipManager;

  constructor(id: string, options?: Node_Options) {
    this.id = id;
    this.isActive = options?.isActive ?? false;
    this.isReady = options?.isReady ?? false;
    this.nodeRelationshipManager = new NodeRelationshipManager(this);
  }

  /** The node's parent node, or null if the node has no parent node. */
  public get parent() {
    return this.nodeRelationshipManager.getParent();
  }

  /** True if node has a parent, false if not. */
  public get hasParent() {
    return this.nodeRelationshipManager.getParent() !== null;
  }

  /** The node's child nodes. */
  public get children() {
    return this.nodeRelationshipManager.getChildren();
  }

  /** Activates the node. */
  public activate() {
    this.isActive = true;
  }

  /** Deactivates the node. */
  public deactivate() {
    this.isActive = false;
  }

  /** Readies the node. */
  public ready() {
    this.isReady = true;
  }

  /** Unreadies the node. */
  public unready() {
    this.isReady = false;
  }

  /**
   * Assigns a parent to the node. If the node already has a parent, use the `reparent` method
   * instead.
   * @param node The node to add as a parent.
   */
  public assignParent(parent: Node) {
    this.nodeRelationshipManager.assignParent(parent);
  }

  /** Unassigns the node's parent from the node. */
  public unassignParent() {
    this.nodeRelationshipManager.unassignParent();
  }

  /**
   * Reparents the node.
   * @param newParent The new parent to assign to the node.
   */
  public reparent(newParent: Node) {
    this.nodeRelationshipManager.reparent(newParent);
  }

  /**
   * Adds a child node to the node tree.
   * @param node The node to add as a child.
   */
  public addChild(child: Node) {
    this.nodeRelationshipManager.addChild(child);
  }

  /**
   * Removes a child node from the node tree.
   * @param node The child node to remove.
   */
  public removeChild(child: Node) {
    this.nodeRelationshipManager.removeChild(child);
  }

  /**
   * Traverses the node tree in post-order.
   * @param callback The callback to execute on each node.
   */
  public traversePostorder(callback: (node: Node) => void) {
    for (const child of this.children.values()) {
      child.traversePostorder(callback);
    }

    callback(this);
  }
}

export interface Node_Options {
  isActive?: boolean;
  isReady?: boolean;
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
