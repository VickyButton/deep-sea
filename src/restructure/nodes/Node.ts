import type { Event, EventListener } from '../events/Event';
import { EventController } from '../events/EventController';

/**
 * Core building blocks for scenes. Nodes encapsulate state, functionality, and hierarchy.
 */
export class Node {
  /** The node's unique ID. */
  public id: string;
  /** Maps events to their listeners. */
  protected controller = new EventController();
  /** Manages the node's relationships. */
  protected relationships = new NodeRelationships(this);

  constructor(id: string) {
    this.id = id;
  }

  /** The node's child nodes. */
  public get children() {
    return this.relationships.getChildren();
  }

  /** True if node has a parent, false if not. */
  public get hasParent() {
    return this.relationships.getParent() !== null;
  }

  /** A flag indicating whether or not the node is listening for events. */
  public get isListening() {
    return this.controller.isListening;
  }

  /** The node's parent node, or null if the node has no parent node. */
  public get parent() {
    return this.relationships.getParent();
  }

  /**
   * Adds a child node to the node tree.
   * @param node The node to add as a child.
   */
  public addChild(child: Node) {
    this.relationships.addChild(child);
  }

  /**
   * Adds a listener to an event. The listener will only execute if the node is active.
   * @param event The event to add a listener to.
   * @param listener The listener to execute when an event is emitted.
   */
  public addEventListener<T>(event: Event<T>, listener: EventListener<T>) {
    this.controller.on(event, listener);
  }

  /**
   * Assigns a parent to the node. If the node already has a parent, use the `reparent` method
   * instead.
   * @param node The node to add as a parent.
   */
  public assignParent(parent: Node) {
    this.relationships.assignParent(parent);
  }

  /**
   * Removes a child node from the node tree.
   * @param node The child node to remove.
   */
  public removeChild(child: Node) {
    this.relationships.removeChild(child);
  }

  /**
   * Removes a listener for an event.
   * @param event The event to remove a listener from.
   * @param listener The listener to remove from the event.
   */
  public removeEventListener<T>(event: Event<T>, listener: EventListener<T>) {
    this.controller.remove(event, listener);
  }

  /**
   * Reparents the node.
   * @param newParent The new parent to assign to the node.
   */
  public reparent(newParent: Node) {
    this.relationships.reparent(newParent);
  }

  /** Starts the node, allowing it to listen for events. */
  public start() {
    this.startListening();
  }

  private startListening() {
    this.controller.startListening();
  }

  /** Stops the node, preventing it from listening for events. */
  public stop() {
    this.stopListening();
  }

  private stopListening() {
    this.controller.stopListening();
  }

  public teardown() {
    // TODO: Remove all relationships.
    this.stopListening();
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

  /** Unassigns the node's parent from the node. */
  public unassignParent() {
    this.relationships.unassignParent();
  }
}

/**
 * Manages a node's relationships.
 */
class NodeRelationships {
  /** The node being managed. */
  private readonly self: Node;
  /** The node's child nodes. */
  private children = new Set<Node>();
  /** The node's parent node. */
  private parent: Node | null = null;

  constructor(self: Node) {
    this.self = self;
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

  /** Gets the node's children. */
  public getChildren() {
    return Array.from(this.children);
  }

  /** Gets the node's parent. */
  public getParent() {
    return this.parent;
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

  private removeSelfFromParent() {
    this.self.parent?.removeChild(this.self);
  }

  private addSelfToParent(newParent: Node) {
    newParent.addChild(this.self);
  }

  /** Unassigns the node's parent from the node. */
  public unassignParent() {
    this.parent = null;
  }
}
